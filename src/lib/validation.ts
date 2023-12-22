import { z } from "zod";

export const SignupValidation = z.object({
	username: z.string().min(4, { message: "username must be at least 4 characters long" }),
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
	confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, { 
	message: "Password and confirm password do not match",
	path: ["confirmPassword"] 
})

export const LoginValidation = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(1, { message: "Password can't be empty" }),
})

//userSchema
//loginUserSchema