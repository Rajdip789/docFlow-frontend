import { createContext, useState, ReactNode } from "react";

type DocType = {
	id: string,
	title: string,
	owner_id: string,
	email_access: EmailAccessEntry[],
	updatedAt: string,
	linkIsActive: boolean
}

const INITIAL_DOC = {
	id: "",
	title: "",
	owner_id: "",
	email_access: [],
	updatedAt: "",
	linkIsActive: false
}

const INITIAL_STATE = {
	hiddenTempValue: false,
	setHiddenTempValue: () => { },
	searchText: "",
	setSearchText: () => {},
	doc: INITIAL_DOC,
	setDoc: () => {}
}


type IContextType = {
	hiddenTempValue: boolean
	setHiddenTempValue: React.Dispatch<React.SetStateAction<boolean>>
	searchText: string
	setSearchText: React.Dispatch<React.SetStateAction<string>>
	doc: DocType
	setDoc: React.Dispatch<React.SetStateAction<DocType>>
}

export const AppDataContext = createContext<IContextType>(INITIAL_STATE);

const AppDataProvider = ({ children }: { children : ReactNode }) => {
	const [hiddenTempValue, setHiddenTempValue] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>("");
	const [doc, setDoc] = useState<DocType>(INITIAL_DOC);

	return (
		<AppDataContext.Provider value={{ hiddenTempValue, setHiddenTempValue, searchText, setSearchText, doc, setDoc }}>
			{children}
		</AppDataContext.Provider>
	);
};

export default AppDataProvider;
