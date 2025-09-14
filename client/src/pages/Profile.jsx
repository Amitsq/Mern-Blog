import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card";

import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea"
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";
import { setUser } from "@/redux/user/user.slice";



const Profile = () => {

    const [filePreview, setPreview] = useState()
    const [file, setFile] = useState()
    const user = useSelector((state) => state.user)

    const { data: userData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/user/get-user/${user.user?._id}`,
        { method: 'get', credentials: 'include' },

    )

    // console.log(userData)

    const dispatch = useDispatch()

    const formSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 character long.'),
        email: z.email(),
        bio: z.string().min(3, 'Bio must be at least 3 character long.'),
       

    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            bio: "",
            password: ""
        },
    })

    useEffect(() => {
        if (userData && userData.success) {
            form.reset({
                name: userData?.user?.name,
                email: userData?.user?.email,
                bio: userData?.user?.bio,
            })
        }
    }, [userData])


    async function onSubmit(values) {
        // Do something with the form values.
        try {
            const formData = new FormData()
            formData.append('file',file)
            formData.append('data', JSON.stringify(values))
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`, {
                method: "put",
                
                credentials: 'include',
                body: formData
            })
            //if response is not ok
            const data = await response.json();
            if (!response.ok) {
                //show the alert
                return showToast('error', data.message)
            }

            dispatch(setUser(data.user))

            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)

        }
    }
    const handleFileSelection=(files)=>{
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setFile(file)
        setPreview(preview)
    }

    if (loading) return <Loading />
    return (
        <Card className="max-w-screen-md mx-auto">
            <CardContent>
                <div className="flex justify-center items-center mt-10">
                    <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (

                            <div {...getRootProps()}>
                                <input {...getInputProps()} />

                                <Avatar className="w-20 h-20 relative group">
                                    <AvatarImage src={filePreview? filePreview : userData?.user?.avatar} />
                                    <AvatarFallback>CN</AvatarFallback>
                                    <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  justify-center items-center bg-black bg-opacity-20 border-2 border-violet-500 group-hover:flex hidden cursor-pointer">
                                        <IoCameraOutline color='#7c3aed' />

                                    </div>
                                </Avatar>
                            </div>

                        )}
                    </Dropzone>


                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your Name" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your Email" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea type="password" placeholder="Enter your bio" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your Password" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full">Save Changes</Button>

                        </form>
                    </Form>
                </div>

            </CardContent>

        </Card>
    )
};

export default Profile;
