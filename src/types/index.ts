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

type GoogleCodeResponse =  {
	authuser: string;
	code: string; 
	prompt: string;
	scope: string;
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

type CustomError = {
	message: string;
	response?: {
		data?: {
			message?: string;
		};
	};
}