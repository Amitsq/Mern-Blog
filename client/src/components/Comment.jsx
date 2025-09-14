import React, { useState } from "react";
import { FaRegComments } from "react-icons/fa";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";

import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RouteSignIn } from "@/helpers/RouteName";
import CommentList from "./CommentList";


const Comment = ({ props }) => {

    const [newComment, setNewComment] = useState()
    const user = useSelector((state) => state.user)

    const formSchema = z.object({
        comment: z.string().min(3, 'comment must be atleat 3 character long'),




    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",


        },
    })


    async function onSubmit(values) {
        // Do something with the form values.
        try {
            const newValues = { ...values, blogid: props.blogid, user: user.user._id }
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/comment/add`, {
                method: "post",
                headers: { 'Content-type': 'application/json' },
                credentials:'include',
                body: JSON.stringify(newValues)
            })
            //if response is not ok
            const data = await response.json();
            if (!response.ok) {
                //show the alert
                return showToast('error', data.message)
            }
            // console.log(data)
            setNewComment(data.comment)
            form.reset()
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)

        }
    }


    return (

        <div>
            <h4 className="flex items-center gap-2 text-2xl font-bold">
                <FaRegComments className="text-violet-500" /> Comment</h4>
            {user && user.isLoggedIn
                ? <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <div className="mb-3 mt-3">
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Comment</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Type your Comment..." {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>




                        <Button type="submit">Submit</Button>

                    </form>
                </Form>
                : <Button asChild>
                    <Link to={RouteSignIn} className="mt-3 m-2">Sign In </Link>
                </Button>


            }
            <div className='border-t mt-5 pt-5'>
                <CommentList props={{ blogid: props.blogid , newComment }} />
            </div>

        </div>
    )
};

export default Comment;
