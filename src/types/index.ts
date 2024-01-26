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

type DocumentResponse = {
	_id: string;
	chat_id: string;
	content: string;
	mail_access_id: string;
	owner_id: string;
	title: string;
	createdAt: string;
	updatedAt: string;
}

type SaveDocCardProps = {
	DocId: string;
	ImgC: string;
	Name: string;
	SubTitle: string;
	isCreate: boolean;
}