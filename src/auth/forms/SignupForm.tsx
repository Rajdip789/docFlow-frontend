"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import { createUserMutation } from "@/lib/react-query/queries"
import SocialLogin from "@/components/shared/SocialLogin"

const SignupForm = () => {

	const userMutation = createUserMutation();

	type userData = z.infer<typeof SignupValidation>;

	const form = useForm<userData>({
		resolver: zodResolver(SignupValidation),
		defaultValues: { username: "", email: "", password: "", confirmPassword: "" },
	})

	const onSubmit = (data: userData) => {
		userMutation.mutate(data);
	}

	return (
		<Card className="rounded-xl shadow-sm w-11/12 sm:w-96">
			<CardHeader>
				<CardTitle className="text-center p-2">Create an account</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<div className="flex flex-col gap-6">
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder="username" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input type="email" placeholder="Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input type="password" placeholder="Password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input type="password" placeholder="Confirm password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{
								userMutation.isError ? (
									<div className="text-center text-red-600 text-sm">{userMutation?.error?.response?.data?.message}</div>
								) : null
							}
							{
								userMutation.isSuccess ? ( 
									<div className="text-center text-red-600 text-sm">Registered successfully! Please <Link to="/sign-in">login</Link> to enter.</div> 
								) : null
							}

							<Button className="w-full" type="submit" disabled={userMutation.isPending}>
								{
									userMutation.isPending?
									<>
										<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Please wait...
									</> : <span>Create Account</span>
								}
							</Button>
							
						</form>

					</div>
				</Form>
				<div className="relative pt-5">
					<div className="absolute inset-0 flex items-center pt-5">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or
						</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className="text-sm flex flex-col items-center justify-center">
				<SocialLogin/>
				<Button variant="link" className="text-black font-normal text-sm">
					<Link to="/sign-in">Aready have an Account?</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}

export default SignupForm