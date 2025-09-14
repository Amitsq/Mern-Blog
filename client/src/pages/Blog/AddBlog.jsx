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
import { useNavigate } from "react-router-dom";
import { RouteBlog } from "@/helpers/RouteName";

const AddBlog = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [filePreview, setPreview] = useState()
  const [file, setFile] = useState()

  // loading state
  const [submitted, setSubmitted] = useState(false)

  const { data: categoryData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'get',
    credentials: 'include'
  })



  const formSchema = z.object({
    category: z.string().min(3, 'Category must be atleat 3 character long'),

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

  // handle Editor value
  const handleEditorData = (event, editor) => {
    const data = editor.getData()
    // console.log(data)
    form.setValue('blogContent', data)
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
      setSubmitted(true)
      const newValues = { ...values, author: user.user._id }
      // console.log(newValues)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('data', JSON.stringify(newValues))

      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/add`, {
        method: "post",

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

    } finally {
      setSubmitted(false) // stop loading
    }


  }

  const handleFileSelection = (files) => {
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setFile(file)
    setPreview(preview)
  }



  return (


    <Card className="pt-5 w-full max-w-3xl mx-auto">

      <CardContent>
        <h1 className='text-2xl font-bold mb-4 text-center'>Add Blog</h1>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* <div className="mb-3"> */}

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* {.log(field)} */}
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValues={field.value}>
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
            {/* </div> */}
            <div className="grid grid-cols-1  gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog Title" {...field} className="w-full" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Slug" {...field} className="w-full" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mb-3 ">
                <span className="mb-2 block">Feature Image</span>
                <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (

                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="flex justify-center items-center  sm:w-40 h-32  border-2 border-dashed rounded overflow-hidden">
                        {filePreview ? (<img src={filePreview} className="max-w-full max-h-full object-contain" />) : (<p className="text-gray-500 text-sm">Upload Image</p>)}

                      </div>

                    </div>

                  )}
                </Dropzone>

              </div>

              <div className="grid grid-cols-1  gap-4">




                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem className="w-full"> 
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                        <div className="w-full overflow-hidden">
                          <Editor props={{ initialData: "", onChange: handleEditorData }} />
                        </div>
                        
                      </FormControl>

                      <FormMessage />
                    </FormItem>)}
                />
              </div>
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
              <Button type="submit" className="w-full" disabled={submitted}>
                {submitted ? (<><svg
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
                  Submitting ...
                </>) : "Submit"}
              </Button>
              {/* </div> */}
            </div>

          </form>
        </Form>
        {/* </div> */}

      </CardContent>


    </Card>


  )
};

export default AddBlog;
