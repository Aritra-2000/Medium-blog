import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@aritra-paul/blog-common";


export const postRouter  = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables:{
        userId: string;
    }
}>()

postRouter.use("/*", async(c, next) =>{

    const authHeader = c.req.header("authorization") || "";

    try {
       const user = await verify(authHeader, c.env.JWT_SECRET);

        if (user) {
            c.set("userId", user.userId as string);
            await next();
        }else{
            c.status(403);
                return c.json({
                message: "You are not logged in"
            })
        }
    } catch (error) {
        return c.json({
            messege: "you are not logged in"
        })
    }
})

postRouter.post('/', async(c) => {

    const body = await c.req.json();

    const {success} = createBlogInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
             message: "Inputs not correct"
        })
    }

    const userId = c.get("userId");

    if (!userId) {
        return c.json({ error: "User ID is missing" }, 400);
    }

    const prisma = new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    
        const now = new Date();
        const formattedDate = now.toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
        }).replace(',', ''); 

    const  post = await prisma.post.create({


        data:{
            title: body.title,
            content: body.content,
            authorId: userId,
            createdAt: now
        }

    })

    console.log(post.id)

    return c.json({
        id: post.id
    })

})

postRouter.put('/', async(c) => {

    const body = await c.req.json();
    
    const {success} = updateBlogInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
             message: "Inputs not correct"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const  post = await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: post.id
    })

})

postRouter.get('/bulk', async(c) =>{

    const prisma = new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
        select:{
            content: true,
            title: true,
            id: true,
            createdAt: true,
            author:{
                select:{
                    name: true
                }
            }
        }
    });

    return c.json({
         posts
    })

})

postRouter.get('/:id', async(c) => {

    const id = c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        const  post = await prisma.post.findFirst({

            where:{
                id: id
            },
            select: {
                title: true,
                content: true,
                createdAt: true,
                author:{
                    select:{
                        name: true
                    }
                }
            }

        })

    return c.json({
        post
    })

    } catch (error) {
        c.status(411);
        return c.json({
            message: "Error while fetching post post"
        });
    }

})