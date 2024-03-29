import useAuth from "@/hooks/useAuth";
import { createRefreshMutation } from "@/lib/react-query/queries";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingUi from "./LoadingUi";

const RequireAuth = () => {
    const { user, isAuthenticated } = useAuth();
	const refreshMutation = createRefreshMutation();

	useEffect(() => {
		if(!isAuthenticated && !user.accessToken) refreshMutation.mutate();
	},[])

    return (
		<>
			{
				isAuthenticated && user?.accessToken
				? <Outlet />
				: (
					<>
						{ refreshMutation.isPending && <LoadingUi/> }

						{ refreshMutation.isSuccess && isAuthenticated && <Outlet/>  }
	
						{ refreshMutation.isError && <Navigate to="/sign-in" /> }
					</>
				)
			}
		</>
    );
}

export default RequireAuth;