import { AvatarFn } from "./BlogCard"
import { Link } from "react-router-dom"
import { PenSquare } from "lucide-react"

export const Appbar = ({check} :{check: boolean}) => {
  return (
    <div className="border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to={check ? '/blogs' : '/signin'} 
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200"
          >
            <PenSquare className="h-6 w-6 text-primary" />
            <span>Medium</span>
          </Link>
            <div className={ check ? "flex items-center space-x-4":"visibility: hidden"}>
                <Link to={`/publish`}>
                    <button className="px-4 py-2 rounded-full text-sm font-medium text-gray-100 bg-green-800 hover:bg-gray-400 transition-colors duration-200">
                    Write
                    </button>
                </Link>
                <AvatarFn name={"Aritra"} />
            </div>
        </div>
      </div>
    </div>
  )
}