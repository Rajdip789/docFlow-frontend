"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { LoginValidation } from "@/lib/validation"
import { Link } from "react-router-dom"
import { Icons } from "@/components/ui/icons"

const SigninForm = () => {

	type userData = z.infer<typeof LoginValidation>;

	const form = useForm<userData>({
		resolver: zodResolver(LoginValidation),
		defaultValues: { email: "", password: "", },
	})

	function onSubmit(values: userData) {
		console.log(values);
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
										<Input placeholder="••••••••••••••••" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="w-full" type="submit">Sign in Account</Button>
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
				{/* <div className="w-full grid grid-cols-2 gap-9">
					<Button variant="outline">
						<Icons.gitHub className="mr-2 h-4 w-4" />
						Github
					</Button>
					<Button variant="outline">
						<Icons.google className="mr-2 h-4 w-4" />
						Google
					</Button>
				</div> */}
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