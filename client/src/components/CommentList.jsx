import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import moment from "moment";
import usericon from '@/assets/images/user.png'
import { useSelector } from "react-redux";
import { GoComment } from "react-icons/go";
import { id } from "zod/v4/locales";



const CommentList = ({ props }) => {
    const user = useSelector((state) => state.user)
    const [commentLs, setCommentLs]= useState([])

    const { data, loading } = useFetch(`${getEnv('VITE_API_BASE_URL')}/comment/get/${props.blogid}`, {
        method: 'get',
        credentials: 'include',

    })
    // console.log(data)


    //set inital comments when API load
    useEffect(()=>{
        if(data?.comments){
            setCommentLs(data?.comments)
        }
    },[data])

    //append new comment when props.newcomment changes

    useEffect(()=>{
        if (props.newComment) {
    const enrichedComment = {
      ...props.newComment,
      user: user?.user, // inject current logged-in user object
    };
    setCommentLs(prev => [enrichedComment, ...prev]);
  }
    },[props.newComment,user])

    if (loading) return <div>Loading...</div>


    return (
        <div>
            <h4 className="text-2xl font-bold">{ props.newComment 
    ? (data?.comments?.length || 0) + 1 
    : (data?.comments?.length || 0)} Comments</h4>

            <div className="mt-5 ">

                {/* {props.newComment &&



                    <div className="flex gap-2 mb-3 border-t pt-3">
                        <Avatar>
                            <AvatarImage src={user?.user?.avatar || usericon} />
                        </Avatar>

                        <div>

                            <p className="font-bold">{user?.user?.name|| "Deleted User"}</p>


                            <p>{moment(props.newComment?.createdAt).format('DD-MM-YYYY')}</p>
                            <div className="pt-3 flex justify-center items-center gap-2 ">
                                <GoComment />

                                {props.newComment?.comment}
                            </div>

                        </div>

                    </div>



                } */}




                {commentLs?.length > 0 &&

                    commentLs.map(comment => {
                        return (
                            <div key={comment._id} className="flex gap-2 mb-3 border-t pt-3">
                                <Avatar>
                                    <AvatarImage src={comment?.user?.avatar || usericon
                                    } />
                                </Avatar>

                                <div>
                                    <p className="font-bold">{comment?.user?.name ||'Deleted User'}</p>
                                    <p>{moment(comment?.createdAt).format('DD-MM-YYYY')}</p>
                                    <div className="pt-3 flex justify-center items-center gap-2 ">
                                        <GoComment />

                                        {comment?.comment}
                                    </div>
                                </div>

                            </div>
                        )
                    })

                }

            </div>
        </div>
    )
};

export default CommentList;
