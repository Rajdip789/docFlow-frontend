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
import { Icons } from "@/components/ui/icons"
import { Loader } from "lucide-react"

const SignupForm = () => {

	const userMutation = createUserMutation();

	type userData = z.infer<typeof SignupValidation>;

	const form = useForm<userData>({
		resolver: zodResolver(SignupValidation),
		defaultValues: { username: "", email: "", password: "", confirmPassword: "" },
	})

	const onSubmit = (data: userData) => {
		console.log(data);
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
											<Input placeholder="Email" {...field} />
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
											<Input placeholder="Password" {...field} />
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
											<Input placeholder="Confirm password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{
								userMutation.isPending ? <Loader/> :
								<Button className="w-full" type="submit">Create Account</Button>
							}
						</form>

					</div>
				</Form>
				<div className="relative pt-5">
					<div className="absolute inset-0 flex items-center pt-5">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className="text-sm flex flex-col items-center justify-center">
				<Button variant={"outline"} className="w-full" type="submit">
					<Icons.google className="mr-2 h-4 w-4" />
					Sign up with Google
				</Button>
				<Button variant="link" className="text-black font-normal text-sm">
					<Link to="/sign-in">Aready have an Account?</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}

export default SignupForm