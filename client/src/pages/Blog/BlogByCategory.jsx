import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { useParams } from "react-router-dom";
import { BiCategory } from "react-icons/bi";


const BlogByCategory = () => {
    const {category} = useParams()
    // console.log(category)
    const { data: BlogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-blog-by-category/${category}`, {
      method: 'get',
      credentials: 'include'
    },[category])
    // console.log(BlogData)

    if(loading) return <Loading/>


  return (
    <>
    <div className="flex items-center gap-2 text-2xl font-bold text-violet-500 border-b pb-3 mb-5">
        <BiCategory/>
        <h4 className="">{BlogData && BlogData.categoryData?.name}</h4>
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

export default BlogByCategory;
