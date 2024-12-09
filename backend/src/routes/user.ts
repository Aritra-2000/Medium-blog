import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput , signinInput} from "@aritra-paul/blog-common";

export const userRouter = new Hono<{

    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }

}>();

userRouter.post('/signup', async(c) => {

    const body = await c.req.json();
    console.log(body);

        const {success} = signupInput.safeParse(body);

        if(!success){
            c.status(411);
            return c.json({
                 message: "Inputs not correct"
            })
        }

        console.log(success);

    const prisma = new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        const user = await prisma.user.create({
            data:{
                email: body.email,
                password: body.password,
                name: body.name
            }
        });

        const jwt = await sign({userId: user.id}, c.env.JWT_SECRET);

        return c.json({jwt});

    } catch (error) {
        c.status(403);
        return c.json({error: "error while sining up"});
    }

})

userRouter.post('/signin', async(c) => {

    const body = await c.req.json();

    const {success} = signinInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
             message: "Inputs not correct"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        const user = await prisma.user.findUnique({
            where:{
                email: body.email,
            }
        });

        if(!user){
            c.status(403);
            return c.json({error: "user not found"});
        }

        const jwt = await sign({userId: user.id}, c.env.JWT_SECRET);
        return c.json({jwt});

        } catch (error) {
            c.status(403);
            return c.json({error: "error while sining in"});
        } 
})