import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { FullBlog } from "../components/FullBlog";
import {useBlog} from "../hooks";
import {useParams} from "react-router-dom"

export const Blog = () => {

  const {id} = useParams();
  const {blog, loading} = useBlog({
    id: id || ""
  });

  if(loading){
    return <div>
      <div>
        <Appbar check={true}/>
      </div>
      <div>
        <BlogSkeleton/>
        <BlogSkeleton/>
      </div>
    </div>
  }


  return (
    <div>
      {blog ? <FullBlog blog={blog} /> : <div>Blog not found</div>}
    </div>
  )
}
