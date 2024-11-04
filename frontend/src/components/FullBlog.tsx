import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { AvatarProfile } from "./BlogCard"
import { CalendarDays} from "lucide-react"

export const FullBlog = ({ blog }: { blog: Blog }) => {
    
    const formatDate = ({date}:{date: any}) => {
        const formattedDate =  new Date(date).toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false 
        }).replace(',', ''); 
  
        return <span>{formattedDate}</span>;
    };

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar check={true}/>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 gap-8 px-4 w-full max-w-screen-xl pt-12 md:px-8">
          <div className="col-span-12 md:col-span-8 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <CalendarDays className="w-4 h-4 mr-2" />
              <span>{formatDate({date: blog.createdAt})}</span>
            </div>
            <div className="prose prose-lg max-w-none">
              {blog.content}
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Author
              </h2>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <AvatarProfile name={blog.author.name || "Anonymous"} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {blog.author.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Crafting compelling narratives that captivate and inspire readers across the digital landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}