import * as z from "zod"
import axios from '../api/axios';

import { useMutation } from "@tanstack/react-query";
import { SignupValidation } from "../validation";

interface CustomError {
	message: string;
	response?: {
	  data?: {
		message?: string;
	  };
	};
  }

export const createUserMutation = () => {
	return useMutation<any, CustomError, z.infer<typeof SignupValidation>>({
		mutationFn: (userData: z.infer<typeof SignupValidation>) => axios.post('/user/create-user', userData),
	})
}