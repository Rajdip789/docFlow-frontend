type Iuser = {
    id: string
    username: string
	email: string
	imageUrl: string
    accessToken: string;
}

type IContextType = {
    user: Iuser
    setUser: React.Dispatch<React.SetStateAction<Iuser>>
    isAuthenticated: Boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<Boolean>>
}