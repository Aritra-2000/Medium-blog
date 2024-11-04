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


                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`, {
                    headers:{
                        Authorization: localStorage.getItem("token")
                    },
                });

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

                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`, {
                    headers:{
                        Authorization: localStorage.getItem("token")
                    },
                });

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
    return {
        loading,
        blogs
    }
}