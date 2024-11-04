import { CalendarIcon, Clock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

export const BlogSkeleton = () =>{
    return <div>
                <div className="pb-4 w-full">
                <div>
                <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                    <div className="h-4 bg-gray-200 rounded-ful w-48 mb-4"></div>
                        <div className="space-y-1">
                        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                        </div>
                        </div>
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                    </CardContent>
                    <CardFooter className="pt-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                    </div>
                    </CardFooter>
                </Card>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
    </div>
}