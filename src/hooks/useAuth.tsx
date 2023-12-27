import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { user } = useContext<IContextType>(AuthContext);
    useDebugValue(user, user => user?.accessToken ? "Logged In" : "Logged Out")
    return useContext<IContextType>(AuthContext);
}

export default useAuth;