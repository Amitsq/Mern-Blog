import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { FaRegComment } from "react-icons/fa";



const CommentCount = ({props}) => {
    

    const { data, loading } = useFetch(`${getEnv('VITE_API_BASE_URL')}/comment/get-count/${props.blogid}`, {
        method: 'get',
        credentials: 'include',

    })
    // console.log(data)

  
  return(
    <button type="button" className="flex justify-center items-center gap-2">
        <FaRegComment/>
        {data && data.commentCount}
    </button>
  )
};

export default CommentCount;
