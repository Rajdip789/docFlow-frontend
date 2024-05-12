import * as z from "zod";
import axios from '@/lib/api/axios';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SignupValidation, LoginValidation } from "../validation";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const setUserDataAndAuth = ({ setUser, setIsAuthenticated } : Omit<IContextType, 'user'| 'isAuthenticated'>) => (data: any) => {
	const userData: ResponseUser = data.data.user;
  
	setUser({
		id: userData._id,
		username: userData?.username,
		email: userData.email,
		imageUrl: userData?.image,
		accessToken: userData.accessToken
	});
  
	setIsAuthenticated(true);
};

export const createSocialLoginMutation = () => {
	const { setUser, setIsAuthenticated } = useAuth();

	return useMutation({
		mutationFn: (codeResponse: GoogleCodeResponse) =>
			axios.post('auth/google', { code: codeResponse.code }, { withCredentials: true }),

		onSuccess: setUserDataAndAuth({ setUser, setIsAuthenticated })
	});
};

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

		onSuccess: setUserDataAndAuth({ setUser, setIsAuthenticated })
	});
};

export const createRefreshMutation = () => {
	const { setUser, setIsAuthenticated } = useAuth();	

	return useMutation({
		mutationFn: () =>
			axios.post("/auth/refresh", null, { withCredentials: true }),

		onSuccess: setUserDataAndAuth({ setUser, setIsAuthenticated })
	});
};

export const createLogoutMutation = () => {
	const { setUser, setIsAuthenticated } = useAuth();	
	const navigate = useNavigate();

	return useMutation({
		mutationFn: () =>
			axios.post("/auth/logout", null, { withCredentials: true }),

		onSuccess: () => {
			setUser({ id: "", username: "", email: "", imageUrl: "", accessToken: "" });
			setIsAuthenticated(false);
			navigate('/');
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

export const useRenameDocumentMutation = () => {
	const queryClient = useQueryClient()
	const axiosPrivate = useAxiosPrivate();

	return useMutation({
		mutationFn: ({ DocId, docName }: { DocId: string, docName: string }) =>
			axiosPrivate.put(`/doc/rename-docs/${DocId}`, {title : docName}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getAllDocs'], exact: true, }),
			queryClient.invalidateQueries({ queryKey: ['getDoc'], exact: true, })
		}
	});
};

export const useDeleteDocumentMutation = () => {
	const queryClient = useQueryClient()
	const axiosPrivate = useAxiosPrivate();

	return useMutation({
		mutationFn: (DocId : string) =>
			axiosPrivate.delete(`/doc/delete-docs/${DocId}`),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getAllDocs'], exact: true, })
		}
	});
};

export const useUpdateUserMutation = () => {
	const { user, setUser } = useAuth();
	const axiosPrivate = useAxiosPrivate();

	return useMutation({
		mutationFn: (userData : { formData: FormData, UserId: string }) =>
			axiosPrivate.put(`/user/update-account/${userData.UserId}`, userData.formData, { headers: {
				'Content-Type': 'multipart/form-data'
			}}),

		onSuccess: (data: any) => {
			const userData: ResponseUser = data.data.updatedUser;
			setUser({ ...user, username: userData.username, email: userData.email, imageUrl: userData.image })
		}
	});
};

export const useDeleteUserMutation = () => {
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const { setUser, setIsAuthenticated } = useAuth();

	return useMutation({
		mutationFn: (UserId : string) =>
			axiosPrivate.delete(`/user/delete-account/${UserId}`),

		onSuccess: () => {
			setUser({ id: "", username: "", email: "", imageUrl: "", accessToken: "" });
			setIsAuthenticated(false);
			navigate('/');
		}
	});
};

export const createDocumentMutation = (index: Number) => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();

	return useMutation({
		mutationFn: () =>
			axiosPrivate.post('/doc/create-docs', { userId: user.id }),

		onSuccess: (data) => {
			const docs = data?.data?.newDoc;
			navigate(`/document/${docs._id}`, { state: { Name: docs.title, index } });
		}
	});
};

export const useGetDocumentInfoQuery = (DocId : string) => {
	const axiosPrivate = useAxiosPrivate();

	return useQuery({
		queryKey: ['getDocInfo'],
		queryFn: () => axiosPrivate.get(`/doc/get-docs-info/${DocId}`),
		enabled: false,
	});
};

export const useGetDocumentQuery = (DocId : string) => {
	const axiosPrivate = useAxiosPrivate();
	const pathname = useLocation().pathname.split('/')[1];

	return useQuery({
		queryKey: ['getDoc'],
		queryFn: () => axiosPrivate.get(`/doc/get-docs-content/${DocId}?pathname=${pathname}`),
		retry: 1,
	});
};

export const useAddEmailAccessMutation = () => {
	const axiosPrivate = useAxiosPrivate();

	return useMutation({
		mutationFn: ({ DocId, shareEmail } : { DocId : string, shareEmail: EmailAccessEntry[] }) =>
			axiosPrivate.put('/doc/add-email-access', { DocId, shareEmail }),
	});
};

export const useUpdateEmailAccessMutation = () => {
	const axiosPrivate = useAxiosPrivate();

	return useMutation({
		mutationFn: ({ DocId, updatedAccessData } : { DocId : string, updatedAccessData: EmailAccessEntry[] }) =>
			axiosPrivate.put('/doc/update-email-access', { DocId, updatedAccessData }),
	});
};

export const useAddLinkAccessMutation = () => {
	const axiosPrivate = useAxiosPrivate();

	return useMutation({
		mutationFn: ({ DocId, linkShare, linkShareType } : { DocId : string, linkShare: boolean, linkShareType: "view" | "edit"}) =>
			axiosPrivate.put('/doc/add-link-access', { DocId, linkShare, linkShareType }),
	});
};