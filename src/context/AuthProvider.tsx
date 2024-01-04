import { ReactNode, createContext, useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';

const google_client_id = import.meta.env.VITE_GOOGLE_CLIENTID;

export const INITIAL_USER = {
    id: "",
    username: "",
    email: "",
    imageUrl: "",
    accessToken: "",
};
  
const INITIAL_STATE = {
    user: INITIAL_USER,
    setUser: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {}
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

type Props = {
	children: ReactNode
}

export const AuthProvider = ({ children } : Props ) => {
    const [user, setUser] = useState<Iuser>(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            <GoogleOAuthProvider clientId={google_client_id}>
                {children}
            </GoogleOAuthProvider>
        </AuthContext.Provider>
    )
}

export default AuthContext;