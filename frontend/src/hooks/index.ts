import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react"

export interface Blog {
    createdAt: string | undefined;
    id: string;
    title: string;
    content: string;
    author: {
        name: string | null;
    };
}

export const useBlog = ({id} : {id: string}) =>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() =>{

        const fetchData = async () =>{
            try{

                console.log("Fetching data from:", `${BACKEND_URL}/api/v1/blog/${id}`);
                const token = localStorage.getItem("token");
                console.log("Authorization token:", token);

                const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers:{
                        Authorization: localStorage.getItem("token")
                    },
                });

                console.log("API response:", res.data.post);
                setBlog(res.data.post);
            }
            catch(error){
                console.error("Error fetching blogs:", error);
            } finally{
                setLoading(false);
            }

        };

        fetchData();

    }, [])

    console.log(blog);
    console.log(loading)

    return {
        loading,
        blog
    }
}

export const useBlogs = () =>{

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() =>{

        const fetchData = async () =>{
            try{

                console.log("Fetching data from:", `${BACKEND_URL}/api/v1/blog/bulk`);
                const token = localStorage.getItem("token");
                console.log("Authorization token:", token);

                const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers:{
                        Authorization: localStorage.getItem("token")
                    },
                });

                console.log("API response:", res.data);
                setBlogs(res.data.posts);
            }
            catch(error){
                console.error("Error fetching blogs:", error);
            } finally{
                setLoading(false);
            }

        };

        fetchData();

    }, [])

    console.log(blogs);
    console.log(loading)

    return {
        loading,
        blogs
    }
}