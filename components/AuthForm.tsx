"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import Link from "next/link";
import {toast} from "sonner";
import FormField from './FormField'
import {useRouter} from "next/navigation";

const authFormSchema = (type:FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3).max(50) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3).max(50),
    })
}

const AuthForm = ({type}:{type:FormType}) => {
    const router = useRouter()
    const formSchema = authFormSchema(type)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if(type === "sign-up") {
                toast.success("Account created successfully. Please sign in.")
                router.push("/sign-in")
            } else {
                toast.success("Sign in successfully. ")
                router.push("/")
            }
        } catch (error) {
            console.log(error);
            toast.error(`There was an error creating your account. Please try again. The error is: ${error}`);
        }
    }
    const isSignIn = type === "sign-in"
    return (
        <div className="card-border lg:min-w-[556px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" width={38} height={32} />
                    <h2 className="text-primary-100">PreWise</h2>
                </div>
                <h3 className="des">Practice job interviews with AI</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                        {!isSignIn && <FormField control={form.control} name="name" label="Full name" placeholder="Your Full Name" />}
                        <FormField control={form.control} name="email" label="Email" type="email" placeholder="Your Email address" />
                        <FormField control={form.control} name="password" label="Password" type="password" placeholder="Enter your password" />
                        {/*{!isSignIn && <>*/}
                        {/*  <p>Profile picture</p>*/}
                        {/*  <p>Resume</p>*/}
                        {/*</> }*/}
                        <Button type="submit" className="btn">{isSignIn ? "Sign in" : "Create an Account"}</Button>
                    </form>
                </Form>
                <p className="text-center">
                    {isSignIn ? 'No account yet?' : 'Have an account yet?'}
                    <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">{!isSignIn ? "Sign in" : "Sign up"}</Link>
                </p>
            </div>

        </div>
    )
}
export default AuthForm
