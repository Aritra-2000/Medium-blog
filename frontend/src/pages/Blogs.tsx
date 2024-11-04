import { Appbar } from "@/components/Appbar"
import {BlogCard} from "@/components/BlogCard"
import { BlogSkeleton } from "@/components/BlogSkeleton";
import { useBlogs } from "@/hooks"

export const Blogs = () =>{

    const {loading, blogs} = useBlogs();
    console.log(blogs);

    if(loading){

        return <div>
                <Appbar check={true}/>
                <div className="flex justify-center p-4">
                    <div className="w-6/12">
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
            </div>
        </div>
    }

    return <div>
            <Appbar check={true}/>
            <div className="flex justify-center p-4">
                <div>
                <div className="max-w-2xl">
                    {blogs.map(blog => <BlogCard
                        id={blog.id}
                        authorName={blog.author.name || "Anonymus"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={blog.createdAt}
                />)}
                </div>
            </div>
        </div>
    </div>
}