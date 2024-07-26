'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { signUp, signIn, getLoggedInUser } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';
import PlaidLink from './PlaidLink';



const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const formSchema = authFormSchema(type)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        try {
            const userData = {
                firstName: values.firstName!,
                lastName: values.lastName!,
                address1: values.address1!,
                city: values.city!,
                state: values.state!,
                postalCode: values.postalCode!,
                dateOfBirth: values.dateOfBirth!,
                ssn: values.ssn!,
                email: values.email,
                password: values.password,
            }
            if (type === 'Sign Up') {
                const newUser = await signUp(userData)
                setUser(newUser)
            }
            if (type === 'Sign In') {
                const userData = await signIn({
                    email: values.email,
                    password: values.password
                })

                if (userData) router.push("/")
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link href="/" className="flex cursor-pointer items-center gap-1">
                    <Image src="/icons/logo.svg" width={34} height={34} alt="BankBalance logo" />
                    <h1 className=" text-26 font-ibm-plex-serif font-bold text-black-1">
                        BankBalance
                    </h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ?
                            'Link your bank account'
                            : type === 'Sign In' ?
                                "Sign In" : "Sign Up"
                        }
                    </h1>
                    <p className='text-16 font-normal text-gray-600'>
                        {user ?
                            "Link your bank account to get started"
                            : "Please enter your details below"
                        }
                    </p>
                </div>
            </header>
            {
                user ? (
                    <div className='flex flex-col gap-4'>
                        <PlaidLink
                            user={user}
                            variant='primary'
                        />
                    </div>
                )
                    :
                    (
                        <>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    {
                                        type === 'Sign Up' &&
                                        (
                                            <>
                                                <div className='flex gap-4'>
                                                    <CustomInput
                                                        control={form.control}
                                                        name="firstName"
                                                        label="First Name"
                                                        placeholder="First Name"
                                                    />
                                                    <CustomInput
                                                        control={form.control}
                                                        name="lastName"
                                                        label="Last Name"
                                                        placeholder="Last Name"

                                                    />
                                                </div>
                                                <div className='flex gap-4'>
                                                    <CustomInput
                                                        control={form.control}
                                                        name="address1"
                                                        label="Address"
                                                        placeholder="Address"
                                                    />
                                                    <CustomInput
                                                        control={form.control}
                                                        name="city"
                                                        label="City"
                                                        placeholder="City"
                                                    />
                                                </div>

                                                <div className='flex gap-4'>
                                                    <CustomInput
                                                        control={form.control}
                                                        name="state"
                                                        label="State"
                                                        placeholder="Example: CA"
                                                    />

                                                    <CustomInput
                                                        control={form.control}
                                                        name="postalCode"
                                                        label="Postal Code"
                                                        placeholder="Postal Code"
                                                    />
                                                </div>
                                                <div className='flex gap-4'>
                                                    <CustomInput
                                                        control={form.control}
                                                        name="dateOfBirth"
                                                        label="Date of Birth"
                                                        placeholder="YYYY-MM-DD"
                                                    />
                                                    <CustomInput
                                                        control={form.control}
                                                        name="ssn"
                                                        label="SSN"
                                                        placeholder="Example: 1234"
                                                    />
                                                </div>

                                            </>
                                        )
                                    }
                                    <CustomInput
                                        control={form.control}
                                        name="email"
                                        label="Email"
                                        placeholder="Email"
                                    />
                                    <CustomInput
                                        control={form.control}
                                        name="password"
                                        label="Password"
                                        placeholder="Password"
                                    />
                                    <div className='flex flex-col gap-4'>
                                        <Button type="submit" className='form-btn' disabled={loading}>
                                            {
                                                loading ?
                                                    (
                                                        <>
                                                            <Loader2 size={16}
                                                                className='animate-spin'
                                                            /> &nbsp; Loading...
                                                        </>
                                                    ) :
                                                    type === 'Sign In' ? 'Sign In' : 'Sign Up'
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </Form>

                            <footer className='flex justify-center gap-1'>
                                <p className='text-14 font-normal text-gray-600'>
                                    {type === 'Sign In' ? 'New to BankBalance?' : 'Already have an account?'}
                                </p>
                                <Link href={type === 'Sign In' ? '/sign-up' : '/sign-in'} className='form-link'>

                                    {type === 'Sign In' ? 'Sign Up' : 'Sign In'}

                                </Link>
                            </footer>
                        </>
                    )

            }
        </section>
    );
}

export default AuthForm;