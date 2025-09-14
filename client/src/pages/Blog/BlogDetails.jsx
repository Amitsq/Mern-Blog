import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom"; import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RouteBlogAdd, RouteBlogEdit } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import Loading from "@/components/Loading";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import moment from "moment";

const BlogDetails = () => {
  const [refresh, setRefresh] = useState(false)


  const { data: BlogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/show-all`, {
    method: 'get',
    credentials: 'include'
  }, [refresh])
  // console.log(BlogData)
  // console.log(BlogData?.blog._id)

  //delete data

  const handleDelete = async (id) => {
    const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/blog/delete/${id}`)

    if (response) {
      setRefresh(!refresh)
      showToast('success', 'Data deleted.')
    } else {
      showToast('error', 'Data not deleted.')
    }
  }
  if (loading) return <Loading />


  return (

    <div >

      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteBlogAdd}>
                Add Blog
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>

          <div className="hidden md:block overflow-x-auto ">
            <Table>

              <TableHeader>
                <TableRow>
                  <TableHead >Author</TableHead>
                  <TableHead >Category Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Dated</TableHead>
                  <TableHead>Action</TableHead>

                </TableRow>
              </TableHeader>
              <TableBody>

                {BlogData && BlogData?.blog.length > 0 ?

                  BlogData?.blog.map(blog =>
                    <TableRow key={blog._id}>
                      <TableCell >
                        {blog?.author?.name ? blog.author?.name : "Deleted User"}
                      </TableCell>
                      <TableCell >
                        {blog?.category.name}
                      </TableCell>
                      <TableCell >
                        {blog?.title}
                      </TableCell>
                      <TableCell >
                        {blog?.slug}
                      </TableCell>
                      <TableCell  >
                        {moment(blog?.createdAt).format('DD-MM-YYYY, h:mm:ss a')}
                      </TableCell>
                      <TableCell className="flex gap-2" >
                        <Button variant='outline' className='hover:bg-violet-500 hover:text-white  
               transform transition-transform duration-200 
               hover:scale-110 hover:shadow-xl"' asChild>
                          <Link to={RouteBlogEdit(blog._id)}>
                            <FaRegEdit />

                          </Link>
                        </Button>

                        <Button onClick={() => { handleDelete(blog._id) }} variant='outline' size='icon' className='hover:bg-violet-500 hover:text-white mx-2 
               transform transition-transform duration-200 
               hover:scale-110 hover:shadow-xl"' >

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



          {/* ✅ Mobile Cards */}
          <div className="block md:hidden ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BlogData?.blog?.length > 0 ? (
                BlogData.blog.map((blog) => (
                  <div
                    key={blog._id}
                    className="border rounded-lg p-4 shadow-sm bg-white"
                  >
                    <p className="text-sm">
                      <span className="font-semibold">Author:</span>{" "}
                      {blog?.author?.name ? blog.author.name : "Deleted User"}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Category:</span>{" "}
                      {blog?.category.name}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Title:</span> {blog?.title}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Slug:</span> {blog?.slug}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Date:</span>{" "}
                      {moment(blog?.createdAt).format("DD-MM-YYYY, h:mm:ss a")}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" asChild>
                        <Link to={RouteBlogEdit(blog._id)}>
                          <FaRegEdit />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleDelete(blog._id)}
                        variant="outline"
                        size="icon"
                        className="hover:bg-violet-500 hover:text-white"
                      >
                        <IoTrashOutline />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Data not found</p>
              )}

            </div>


          </div>
        </CardContent>
      </Card>
    </div>
  )
};

export default BlogDetails;
