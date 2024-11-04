
import axios from "axios";
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom";


export const Publish = () =>{



    const [ title, setTitle] = useState("");
    const [content , setContent] = useState("");
    const navigate = useNavigate();

    return <div>
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input type="text" onChange={(e) =>{
                    setTitle(e.target.value)
                }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none" placeholder="Title"/>
                <TextEditor onChange={(e)=>{
                    setContent(e.target.value)
                }} /> 
                <div className="flex items-center justify-between px-1 py-2">
                    <button onClick={async() =>{
                        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`, {
                            title,
                            content
                        },{
                            headers:{
                                Authorization: localStorage.getItem("token")
                            }
                        });
                        navigate(`/blog/${res.data.id}`)
                    }} type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-gray-500 hover:bg-gray-500">
                        Post comment
                    </button>
                </div>
            </div>
        </div>
    </div>
}

function TextEditor({onChange}:{onChange: (e: ChangeEvent<HTMLTextAreaElement>)=> void}){
    return <div className="pt-2">
        <div>
            <div className="w-full mb-4">
                <div className="border bg-white rounded-t-lg dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <textarea onChange={onChange} id="comment" rows={4} className="w-full px-0 pl-1 text-sm text-gray-900 bg-white focus:outline-none" placeholder="Write a comment..." required ></textarea>
                </div>
            
            </div>
      </div>
  </div>
}