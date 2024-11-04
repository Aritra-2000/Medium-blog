import { Appbar } from "./Appbar"

export const BlogsSkeleton = () =>{
    return <div className="min-h-screen bg-gray-50">
      <Appbar check={true}/>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 gap-8 px-4 w-full max-w-screen-xl pt-12 md:px-8">
          <div className="col-span-12 md:col-span-8 space-y-6">
          <div className="h-4 bg-gray-200 rounded-ful w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Author
              </h2>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                </div>
                <div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
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
}