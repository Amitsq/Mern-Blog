import React, { useEffect } from "react";
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

const AddCategory = () => {


  const formSchema = z.object({
    name: z.string().min(3, 'must be atleat 3 character long'),
    slug: z.string().min(3, 'must be atleat 3 character long'),



  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",

    },
  })
const categoryName = form.watch('name')
  useEffect(()=>{
    
    if(categoryName){
      const slug = slugify(categoryName,{lower: true})
      form.setValue('slug',slug)
    }
  },[categoryName])

  async function onSubmit(values) {
    // Do something with the form values.
    try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/category/add`, {
        method: "post",
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values)
      })
      //if response is not ok
      const data = await response.json();
      if (!response.ok) {
        //show the alert
        return showToast('error', data.message)
      }

      form.reset()
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)

    }
  }

  return (


    <Card className="pt-5 max-w-screen-md mx-auto mt-20">

      <CardContent>
        <h1 className='text-2xl font-bold mb-4'>Add Category</h1>

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



            <Button type="submit" className="w-full">Submit</Button>

          </form>
        </Form>
      </CardContent>


    </Card>


  )
};

export default AddCategory;
