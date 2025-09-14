import { Button } from "@/components/ui/button";
import { Card, CardContent,  } from "@/components/ui/card";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
 
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
import usericon from '@/assets/images/user.png'



const Users = () => {
  const [refresh,setRefresh]= useState(false)


  const { data: UserData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/user/get-all-user`, {
    method: 'get',
    credentials: 'include'
  },[refresh])
  // console.log(UserData)

  //delete data

  const handleDelete =async(id)=>{
    const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/user/delete/${id}`)
    
   if (response) {
            setRefresh(!refresh)
            showToast('success', 'User deleted.')
        } else {
            showToast('error', 'User not deleted.')
        }
  }
  if (loading) return <Loading />

  return (
    <div>
      
      <Card>

        <CardContent>
          {/* Desktop view */}
          <div className="hidden md:block overflow-x-auto">
          <Table className="w-full text-sm">

            <TableHeader>
              <TableRow className="border-b">
                <TableHead >Role</TableHead>
                <TableHead >Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              
              {UserData && UserData?.user.length > 0 ?

                UserData?.user?.map(user => 
                  <TableRow key={user._id} className="border-b">
                    <TableCell >
                      {user?.role}
                    </TableCell>
                    <TableCell >
                      {user?.name}
                    </TableCell>
                    <TableCell >
                      {user?.email}
                    </TableCell>
                    <TableCell >
                      <img src={user?.avatar || usericon} className="w-10 h-12"/>
                    </TableCell>
                    <TableCell >
                      {moment(user.createdAt).format('DD-MM-YYYY')}
                    </TableCell>
                    
                    <TableCell >
                      
                      
                      <Button onClick={()=>{handleDelete(user._id)}} variant='outline' size='icon' className='hover:bg-violet-500 hover:text-white mx-2 transform transition-transform duration-200 hover:scale-110 hover:shadow-xl' >
                        
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

          {/* mobile view */}
          <div className="block md:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              {UserData?.user?.length > 0 ? (
                UserData.user.map((user) => (
                  <div
                    key={user._id}
                    className="border border-b rounded-lg p-4 shadow-sm bg-white"
                  >
                    <p className="text-sm  mb-2">
                      <span className="font-semibold">Role:</span> {user?.role}
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Name:</span> {user?.name}
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Email:</span> {user?.email}
                    </p>
                    <p className="text-sm mb-2 flex items-center   gap-2">
                      <span className="font-semibold">Avatar:</span>
                      <img
                        src={user?.avatar || usericon}
                        className="w-10 h-12 rounded"
                      />
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Date:</span>{" "}
                      {moment(user.createdAt).format("DD-MM-YYYY")}
                    </p>

                    <div className="mt-2">
                      <Button
                        onClick={() => handleDelete(user._id)}
                        variant="outline"
                        size="icon"
                        className="hover:bg-violet-500 hover:text-white "
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

export default Users;
