import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";

import { IoTrashOutline } from "react-icons/io5";
import { showToast } from "@/helpers/showToast";
import { deleteData } from "@/helpers/handleDelete";
import moment from "moment";




const CommentPage = () => {
  const [refresh,setRefresh]= useState(false)


  const { data: commentData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/comment/get-all-comment`, {
    method: 'get',
    credentials: 'include'
  },[refresh])
//   console.log(commentData)

  //delete data

  const handleDelete =async(id)=>{
    const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/comment/delete/${id}`)
    
   if (response) {
            setRefresh(!refresh)
            showToast('success', 'Data deleted.')
        } else {
            showToast('error', 'Data not deleted.')
        }
  }
  if (loading) return <Loading />

  return (
    <div>
      
      <Card>

        <CardContent>
          <div className="overflow-x-auto hidden md:block">
          <Table>

            <TableHeader>
              <TableRow>
                <TableHead >Blog</TableHead>
                <TableHead >Comment By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Action</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              
              {commentData && commentData?.comments.length > 0 ?

                commentData?.comments?.map(comment => 
                  <TableRow key={comment._id}>
                    <TableCell >
                      {comment.blogid?.title}
                    </TableCell>
                    <TableCell >
                      {comment.user?.name || 'Delete User'}
                    </TableCell>
                    <TableCell >
                      {moment(comment.createdAt).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell >
                      {comment.comment || ''}
                    </TableCell>
                    <TableCell >
                      
                      
                      <Button onClick={()=>{handleDelete(comment._id)}} variant='outline' size='icon' className='hover:bg-violet-500 hover:text-white mx-2 transform transition-transform duration-200 
             hover:scale-110 hover:shadow-xl' >
                        
                        <IoTrashOutline />


                        
                      </Button>
                    </TableCell>

                  </TableRow>
                )

                :

                <TableRow>
                  <TableCell colSpan='3'>
                    Data not found
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>

          </div>

              <div className="grid gap-4 md:hidden p-4">
                 {commentData && commentData?.comments?.length > 0 ? (
              commentData?.comments?.map((comment) => (
                <Card key={comment._id} className="p-4  border border-gray-400 shadow-sm ">
                  <div className="text-sm">
                    <span className="font-semibold">Blog:</span>{" "}
                    {comment.blogid?.title}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Comment By:</span>{" "}
                    {comment.user?.name || 'Deleted User'}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Date:</span>{" "}
                    {moment(comment.createdAt).format("DD-MM-YYYY")}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Comment:</span>{" "}
                    {comment.comment || ''}
                  </div>
                  <div className="flex justify-start">
                    <Button
                      onClick={() => {
                        handleDelete(comment._id);
                      }}
                      variant="outline"
                      size="icon"
                      className="hover:bg-violet-500 hover:text-white "
                    >
                      <IoTrashOutline />
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">Data not found</p>
            )}
         
              </div>

        </CardContent>
      </Card>
    </div>
  )
};

export default CommentPage;
