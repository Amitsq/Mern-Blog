import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa6";


const LikeCount = ({ props }) => {
    const [likeCount, setLikeCount] = useState(0)
    const [hasLiked, setHasLikeCount] = useState(false)
    const user = useSelector((state) => state.user)

    const { data: BlogLikeCount, loading } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog-like/get-like/${props.blogid}/${user && user.isLoggedIn ? user.user._id : ''}`, {
        method: 'get',
        credentials: 'include',

    })
    // console.log(BlogLikeCount)

    useEffect(()=>{
        if(BlogLikeCount){
            setLikeCount(BlogLikeCount.likecount)
            setHasLikeCount(BlogLikeCount.isUserLiked)
        }
    },[BlogLikeCount])

    const handleLike = async () => {
        try {
            if (!user.isLoggedIn) {
                return showToast('error', 'Please login into your account')
            }

            //user is logged in
            //so we fetch api for update like

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog-like/do-like`, {
                method: 'post',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ user: user?.user._id, blogid: props.blogid })
            })

            if (!response.ok) {
                showToast('error', response.statusText)
            }

            const responseData = await response.json()
            setLikeCount(responseData.likecount)
            setHasLikeCount(!hasLiked)
        } catch (error) {
            showToast('error', error.message)

        }
    }


    return (
        <button onClick={handleLike} type="button" className="flex justify-center items-center gap-2">
            {!hasLiked?<FaRegHeart /> : <FaHeart fill="red"/>
}
            
            {likeCount}
        </button>

    )
};

export default LikeCount;
