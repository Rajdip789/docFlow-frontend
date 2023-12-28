import { axiosPrivate } from "@/lib/api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { createRefreshMutation } from "@/lib/react-query/queries";

const useAxiosPrivate = () => {
    const { user } = useAuth();
	const refreshMutation =  createRefreshMutation();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;

					refreshMutation.mutate();

                    const newAccessToken = refreshMutation.data?.data?.accessToken;

                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [user])

    return axiosPrivate;
}	

export default useAxiosPrivate;