import BlogCard from "@/components/BlogCard";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { useSearchParams } from "react-router-dom";


const SearchResult = () => {
    const [searchParams] = useSearchParams()
    const q = searchParams.get('q')
    // console.log(q)

    
    const { data: BlogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/search?q=${q}`, {
          method: 'get',
          credentials: 'include'
        },[q])
        // console.log(BlogData)


    
  return (
    <>
    <div className="flex items-center gap-2 text-2xl font-bold text-violet-500 border-b pb-3 mb-5">
        
        <h4 className="">Search Result For: {q}</h4>
    </div>
     <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
      {BlogData && BlogData.BlogByCategory.length>0 ?
      BlogData.BlogByCategory.map(blog => <BlogCard key={blog._id} props={blog}/>) :
      <>Data Not Found</>  
    }
    </div>  
    </>
  
 

)
};

export default SearchResult;
