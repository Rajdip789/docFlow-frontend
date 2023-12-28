import * as z from "zod";
import axios from '@/lib/api/axios';

import { useMutation, useQuery } from "@tanstack/react-query";
import { SignupValidation, LoginValidation } from "../validation";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

type CustomError = {
	message: string;
	response?: {
		data?: {
			message?: string;
		};
	};
}

type ResponseUser = {
	_id: string
	username: string;
	email: string;
	image: string;
	accessToken: string;
	createdAt: string;
	updatedAt: string;
}

export const createUserMutation = () => {
	return useMutation<any, CustomError, z.infer<typeof SignupValidation>>({
		mutationFn: (userData: z.infer<typeof SignupValidation>) =>
			axios.post("/auth/register", userData),
	});
};

export const createLoginMutation = () => {
	const { setUser, setIsAuthenticated } = useAuth();

	return useMutation<any, CustomError, z.infer<typeof LoginValidation>>({
		mutationFn: (userData: z.infer<typeof LoginValidation>) =>
			axios.post("/auth/login", userData, { withCredentials: true }),

		onSuccess: (data) => {
			const userData: ResponseUser = data.data.user;

			setUser({
				id: userData._id,
				username: userData?.username,
				email: userData.email,
				imageUrl: userData?.image,
				accessToken: userData.accessToken
			});
			setIsAuthenticated(true);
		},
	});
};

export const createRefreshMutation = () => {
	const { setUser, setIsAuthenticated } = useAuth();	

	return useMutation({
		mutationFn: () =>
			axios.post("/auth/refresh", null, { withCredentials: true }),

		onSuccess: (data) => {
			const userData: ResponseUser = data.data.user;

			setUser({
				id: userData._id,
				username: userData?.username,
				email: userData.email,
				imageUrl: userData?.image,
				accessToken: userData.accessToken
			});
			
			setIsAuthenticated(true);
		},
	});
};

export const createLogoutMutation = () => {
	const { setUser, setIsAuthenticated } = useAuth();	

	return useMutation({
		mutationFn: () =>
			axios.post("/auth/logout", null, { withCredentials: true }),

		onSuccess: () => {
			setUser({ id: "", username: "", email: "", imageUrl: "", accessToken: "" });
			setIsAuthenticated(false);
		}
	});
};

export const useGetAllDocumentsQuery = () => {
	const { user } = useAuth();
	const axiosPrivate = useAxiosPrivate();

	return useQuery({
		queryKey: ['getAllDocs'],
		queryFn: () => axiosPrivate.get(`/user/docs/${user.id}`),
	});
};