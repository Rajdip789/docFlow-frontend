import { useContext } from "react";

import TemplateBody from "./TemplateBody";
import UserDocumentsBody from "./UserDocumentsBody";
import { HiddenTemplateContext } from "@/context/HiddenTemplateProvide";

const AllDocBody = () => {
	const { hiddenTempValue } = useContext(HiddenTemplateContext);
	
	return (
		<div className="relative top-16 bg-white">
			<TemplateBody />
			{hiddenTempValue ? null : <UserDocumentsBody />}
		</div>
	);
};

export default AllDocBody;
