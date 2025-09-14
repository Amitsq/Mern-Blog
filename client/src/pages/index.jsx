import BlogCard from "@/components/BlogCard";

import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";


const index = () => {
  const { data: BlogData, initialLoading, loading, error, fetchData, hasMore,page } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/blogs`, {
      method: "get",
      credentials: "include",
    },
    [],
    { paginated: true, limit: 6 })
    // console.log(BlogData)

    if (initialLoading) {
  return  <p>Loading blogs...</p>// show only before first load
}


  return (

    <div >
    <InfiniteScroll 
    dataLength={BlogData?.length || 0}
    next={()=>fetchData(page)} //load next page
    hasMore = {hasMore}
    loader={loading && <p>Loading more...</p>}
    endMessage ={<p className ='text-center text-gray-500 py-10 '>
      No more Blogs
    </p>}
    >

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 px-2 md:px-7 py-4 md:py-6 "> {BlogData && BlogData?.length>0 ? BlogData.map(blog => <BlogCard key={blog._id} props={blog}/>) : <>Data Not Found</> } 
      
      </div>

    </InfiniteScroll>

    </div>




  )
};

export default index;
