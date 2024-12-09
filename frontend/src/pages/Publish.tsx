
import axios from "axios";
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Button } from "../components/ui/button";
import { Appbar } from "../components/Appbar";


export const Publish = () =>{


    const [ title, setTitle] = useState("");
    const [content , setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return <div>
        <Appbar check={true}/>
        <div className="min-h-screen bg-gray-50 p-4">
        <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>Post Blog</CardTitle>
        </CardHeader>
            <CardContent className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
                <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
            </div>
            <TextEditor onChange={(e) => setContent(e.target.value)}/>
            </CardContent>
            <CardFooter>
            
            <Button onClick={async() =>{

                setIsLoading(true)
                const res = await axios.post(`${backendUrl}/api/v1/blog`, {
                    title,
                    content
                },{
                    headers:{
                        Authorization: localStorage.getItem("token")
                    }
                });

                setIsLoading(false);
                navigate(`/blog/${res.data.id}`)
            }} type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-gray-500 hover:bg-gray-500">
            {isLoading ? 'Updating...' : 'POST'}
            </Button>
            </CardFooter>
        </Card>
    </div>
  </div>
}

function TextEditor({onChange}:{onChange: (e: ChangeEvent<HTMLTextAreaElement>)=> void}){
    return <div className="space-y-2">
    <label htmlFor="content" className="text-sm font-medium text-gray-700">Content</label>
    <Textarea
      id="content"
      onChange={onChange}
      required
      rows={10}
    />
  </div>
}




