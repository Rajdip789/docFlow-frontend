import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

type filterDocProps = {
	isPending: boolean;
	isError: boolean;
	data: AxiosResponse<any, any> | undefined
	IsSort: boolean;
	CreatedBy: string;
	searchText: string;
	user: Iuser
}

const useFilteredDocs = ( {isPending, isError, data, IsSort, CreatedBy, searchText, user} : filterDocProps ) => {
	const [allUserDocs, setAllUserDocs] = useState<DocumentResponse[]>([]);

	useEffect(() => {
		if (!isPending && !isError && data?.data?.allDocuments) {
			const docData: DocumentResponse[] = [...data.data.allDocuments];

			let filteredDocs = docData;

			IsSort ? filteredDocs.sort((t1, t2) => dayjs(t2.updatedAt).diff(dayjs(t1.updatedAt)))
				: filteredDocs.sort((t1, t2) => t1.title.localeCompare(t2.title));

			if (CreatedBy === "me") {
				filteredDocs = filteredDocs.filter((doc) => doc.owner_id === user.id);
			} else if (CreatedBy === "others") {
				filteredDocs = filteredDocs.filter((doc) => doc.owner_id !== user.id);
			}

			if (searchText) filteredDocs = filteredDocs.filter((doc) => doc.title.toLowerCase().includes(searchText.toLowerCase()));

			setAllUserDocs(filteredDocs);
		}
	}, [isPending, isError, data, IsSort, CreatedBy, searchText]);

	return allUserDocs;
}

export default useFilteredDocs