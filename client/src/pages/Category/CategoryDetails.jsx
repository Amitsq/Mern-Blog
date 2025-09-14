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
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { showToast } from "@/helpers/showToast";
import { deleteData } from "@/helpers/handleDelete";




const CategoryDetails = () => {
  const [refresh,setRefresh]= useState(false)


  const { data: categoryData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'get',
    credentials: 'include'
  },[refresh])
  // console.log(categoryData)

  //delete data

  const handleDelete =async(id)=>{
    const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/category/delete/${id}`)
    
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
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteAddCategory}>
                Add Category
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>

            <TableHeader>
              <TableRow>
                <TableHead >Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              
              {categoryData && categoryData?.category.length > 0 ?

                categoryData?.category?.map(category => 
                  <TableRow key={category._id}>
                    <TableCell >
                      {category.name}
                    </TableCell>
                    <TableCell >
                      {category.slug}
                    </TableCell>
                    <TableCell >
                      <Button variant='outline' className='hover:bg-violet-500 hover:text-white transform transition-transform duration-200 hover:scale-110 hover:shadow-xl' asChild>
                        <Link to={RouteEditCategory(category._id)}>
                        <FaRegEdit />

                        </Link>
                      </Button>
                      
                      <Button onClick={()=>{handleDelete(category._id)}} variant='outline' size='icon' className='hover:bg-violet-500 hover:text-white mx-2 transform transition-transform duration-200 hover:scale-110 hover:shadow-xl' >
                        
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
        </CardContent>
      </Card>
    </div>
  )
};

export default CategoryDetails;
