import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarIcon, Clock } from "lucide-react"
import {useNavigate} from "react-router-dom"

interface BlogCardProps {
  id: string
  authorName: string
  title: string
  content?: string
  publishedDate?: string
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate

}: BlogCardProps) => {
  const contentPreview = content && content.length > 150 ? content.slice(0, 150) + "..." : content
  const readTime = Math.max(1, Math.ceil((content?.length || 0) / 200));

  const navigate = useNavigate();

  function sendRequest(){
      navigate(`/blog/${id}`)
  }

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

  return (<div className="pb-4 w-full max-w-5xl mx-auto" onClick={sendRequest}>
          <div>
          <Card className="w-full max-w-2xl overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <AvatarFn name={authorName}/>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium leading-none">{authorName}</h3>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    <time dateTime={publishedDate}>{formatDate({ date: publishedDate })}</time>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="mb-2 text-xl font-bold leading-tight text-card-foreground line-clamp-2">
                {title}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {contentPreview || "No content available"}
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                <span>{`${readTime} min read`}</span>
              </div>
            </CardFooter>
          </Card>
          </div>
    </div>
  )
}

export const AvatarFn = ({name} : {name: string}) =>{
  return <div>
    <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">
              {name[0].toUpperCase()}
            </AvatarFallback>
    </Avatar>
  </div>
}

export const AvatarProfile = ({name} : {name: string}) =>{
  return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-600 rounded-full dark:bg-gray-600">
          <span className="font-xs text-gray-300 dark:text-gray-300">{name[0]}</span>
      </div>
}