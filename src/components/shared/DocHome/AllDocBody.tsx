import { useContext } from "react";

import TemplateBody from "./TemplateBody";
import UserDocumentsBody from "./UserDocumentsBody";
import { AppDataContext } from "@/context/AppdataProvider";

const AllDocBody = () => {
	const { hiddenTempValue } = useContext(AppDataContext);
	
	return (
		<div className="relative top-16 bg-white">
			<TemplateBody />
			{hiddenTempValue ? null : <UserDocumentsBody />}
		</div>
	);
};

export default AllDocBody;
