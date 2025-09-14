import React, { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card";
import slugify from "slugify";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFetch } from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RouteBlog } from "@/helpers/RouteName";
import { decode } from "entities";
import Loading from "@/components/Loading";

const EditBlog = () => {
  const {blogid} =useParams()
  const navigate = useNavigate()
  const user = useSelector((state)=>state.user)
  const [filePreview, setPreview] = useState()
  const [file, setFile] = useState()
  const [updating,setUpdating] = useState(false)

  const { data: categoryData } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'get',
    credentials: 'include'
  })
  // console.log(categoryData)

  const {data: blogData ,loading:blogLoading}=useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/edit/${blogid}`, {
    method: 'get',
    credentials: 'include'
  },[blogid])

  // console.log(blogData.blog.category._id)

  const formSchema = z.object({
    category: z.string().min(3, 'Category must be selected'),

    title: z.string().min(3, 'Title must be atleat 3 character long'),
    slug: z.string().min(3, 'must be atleat 3 character long'),
    blogContent: z.string().min(3, 'Blog content must be atleat 3 character long')



  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: ""

    },
  })

  useEffect(()=>{
    if(blogData){
      setPreview(blogData.blog.featuredImage)
      form.setValue('category',blogData.blog.category._id)
      form.setValue('title',blogData.blog.title)
      form.setValue('slug',blogData.blog.slug)
      form.setValue('blogContent',decode(blogData.blog.blogContent))
      

    }
  },[blogData])

 // handle Editor value
  const handleEditorData = (event,editor)=>{
    
    const data = editor.getData()
    // console.log(data)
    form.setValue('blogContent',data)
  }


  const blogTitle = form.watch('title')
  useEffect(() => {

    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true })
      form.setValue('slug', slug)
    }
  }, [blogTitle])

  async function onSubmit(values) {
    // Do something with the form values.
    // console.log(values)
    try {
                setUpdating(true)
               
                const formData = new FormData()
                formData.append('file',file)
                formData.append('data', JSON.stringify(values))

                const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/update/${blogid}`, {
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
    
                // dispatchEvent(setUser(data.user))
                form.reset()
                setFile()
                setPreview()
                navigate(RouteBlog)
                showToast('success', data.message)
            } catch (error) {
                showToast('error', error.message)
              
            }finally{
              setUpdating(false)
            }
 
   
  }

  const handleFileSelection = (files) => {
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setFile(file)
    setPreview(preview)
  }

 if(blogLoading) return <Loading/>

  return (


    <Card className="pt-5 ">

      <CardContent>
        <h1 className='text-2xl font-bold mb-4'>Edit Blog</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="mb-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    {/* {console.log(field)} */}
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full" >
                          <SelectValue placeholder="Select Your Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryData && categoryData.category.length > 0 && categoryData.category.map(category => <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>)}


                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog Title" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Slug" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <span className="mb-2 block">Feature Image</span>
              <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (

                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="flex justify-center items-center w-38 h-30 border-2 border-dashed rounded overflow-hidden">
                      <img src={filePreview} className="max-w-full max-h-full object-contain" />
                    </div>

                  </div>

                )}
              </Dropzone>

            </div>

            <div className="mb-3 w-full">




              <FormField
                control={form.control}
                name="blogContent"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {/* {console.log(field.value)} */}
                    <FormLabel>Blog Content</FormLabel>
                    <FormControl>
                      <div className="w-full overflow-hidden">
                        <Editor props={{ initialData: field.value , onChange: handleEditorData }} />
                      </div>
                      
                    </FormControl>

                    <FormMessage />
                  </FormItem>)}
              />
            </div>

            <Button type="submit" className="w-full" disabled = {updating}>
              {updating?<>
              <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg> 
                Updating ...
              
              </>:"Update"}
              </Button>

          </form>
        </Form>
      </CardContent>


    </Card>


  )
};

export default EditBlog;
