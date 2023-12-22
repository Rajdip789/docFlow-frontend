import * as z from "zod"
import axios from 'axios';

import { useMutation } from "@tanstack/react-query";
import { SignupValidation } from "../validation";

export const createUserMutation = () => {
	return useMutation({
		mutationFn: (userData: z.infer<typeof SignupValidation>) => axios.post('http://localhost:5000/users/addUser', userData)
	})
}