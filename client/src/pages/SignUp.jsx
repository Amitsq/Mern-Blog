import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { Card } from "@/components/ui/card";
import { RouteSignIn } from "@/helpers/RouteName";
import { Link, useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import GoogleLogin from "@/components/GoogleLogin";

const SignUp = () => {
  const navigate = useNavigate()

  const formSchema = z.object({
    name: z.string().min(3, 'must be atleat 3 character long'),
    email: z.email(),
    password: z.string().min(6, 'password must be atleast 6 character long'),
    confirmPassword: z.string().refine(data => data.password === data.confirmPassword, 'Password and confirm Password should be same')


  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
  async function onSubmit(values) {
    // Do something with the form values.
    try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/register`, {
        method: "post",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(values)
      })
      //if response is not ok
      const data = await response.json();
      if (!response.ok) {
        //show the alert
        return showToast('error', data.message)
      }

      navigate(RouteSignIn)
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)

    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full px-3 sm:px-0 py-4 ">

      <Card className="w-full max-w-sm p-5 sm:p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-5">Create your Account</h1>
        <div>
          <GoogleLogin />
        <div className="border my-5 flex justify-center items-center">
          <span className="absolute bg-white text-sm">Or</span>
        </div>

        </div>

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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="Enter your Password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="Enter Password again" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-5">
              <Button type="submit" className="w-full">Sign Up</Button>
              <div className="mt-5 text-sm flex justify-center item-center gap-2">
                <p>Already have account?</p>
                <Link className="text-blue-800 hover:underline" to={RouteSignIn}>Sign In</Link>
              </div>
            </div>

          </form>
        </Form>
      </Card>

    </div>
  )
};

export default SignUp;
