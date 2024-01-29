import { createContext, useState, ReactNode } from "react";

const INITIAL_STATE = {
	hiddenTempValue: false,
	setHiddenTempValue: () => { },
	searchText: "",
	setSearchText: () => {}
}


type IContextType = {
	hiddenTempValue: boolean
	setHiddenTempValue: React.Dispatch<React.SetStateAction<boolean>>
	searchText: string
	setSearchText: React.Dispatch<React.SetStateAction<string>>
}

export const AppDataContext = createContext<IContextType>(INITIAL_STATE);

const AppDataProvider = ({ children }: { children : ReactNode }) => {
	const [hiddenTempValue, setHiddenTempValue] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>("")

	return (
		<AppDataContext.Provider value={{ hiddenTempValue, setHiddenTempValue, searchText, setSearchText }}>
			{children}
		</AppDataContext.Provider>
	);
};

export default AppDataProvider;
