"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { Link, Navigate } from "react-router-dom"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { LoginValidation } from "@/lib/validation"
import { createLoginMutation } from "@/lib/react-query/queries"
import { Icons } from "@/components/ui/icons"

const SigninForm = () => {

	const loginMutation = createLoginMutation();

	type userData = z.infer<typeof LoginValidation>;

	const form = useForm<userData>({
		resolver: zodResolver(LoginValidation),
		defaultValues: { email: "", password: "", },
	})

	function onSubmit(data: userData) {
		loginMutation.mutate(data);
	}
	
	return (
		<Card className="rounded-xl shadow-sm w-11/12 sm:w-96">
			<CardHeader>
				<CardTitle className="text-center p-2">Welcome Back!</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="john.doe@example.com" {...field} />
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
									<FormLabel>Passowrd</FormLabel>
									<FormControl>
										<Input type="password" placeholder="••••••••••••••••" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{
							loginMutation.isError ? (
								<div className="text-center text-red-600 text-sm">{loginMutation?.error?.response?.data?.message}</div>
							) : null
						}

						{
							loginMutation.isSuccess && <Navigate to="/home"/>
						}

						<Button className="w-full" type="submit" disabled={loginMutation.isPending}>
							{
								loginMutation.isPending?
								<>
									<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Please wait...
								</> : <span>Sign in Account</span>
							}
						</Button>
					</form>
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
			<CardFooter className="text-sm flex flex-col items-center justify-center gap-1">
				<Button variant={"outline"} className="w-full" type="submit">
					<Icons.google className="mr-2 h-4 w-4" />
					Sign in with Google
				</Button>
				<Button variant="link" className="text-black font-normal">
					<Link to="/sign-up">Don't have an Account?</Link>
				</Button>
			</CardFooter>
		</Card>

	)
}

export default SigninForm