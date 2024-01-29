import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import Shimmer from '../Shimmer';
import SaveDocCard from "./SaveDocCard";
import cv from "@/assets/cvTemps/cv4.png";
import { TbCalendarSad } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";

import useAuth from '@/hooks/useAuth';
import { AppDataContext } from '@/context/AppdataProvider';
import { useGetAllDocumentsQuery } from "@/lib/react-query/queries";


const AllSaveDocuments = ({ IsSort, CreatedBy }: { IsSort: boolean, CreatedBy: string }) => {
	const { user } = useAuth();
	const { searchText } = useContext(AppDataContext);
	const { isPending, isError, data } = useGetAllDocumentsQuery();
	const [allUserDocs, setAllUserDocs] = useState<DocumentResponse[]>([]);

	useEffect(() => {
		if (!isPending && !isError && data?.data?.ownedDocuments) {
			const docData: DocumentResponse[] = [...data.data.ownedDocuments];

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


	if (isPending) return <Shimmer />

	if (isError) {
		return (
			<div className="flex flex-wrap">
				<div className="m-10 h-40 w-full p-5 border shadow-lg flex flex-col justify-center items-center">
					<p className="flex font-bold md:text-lg items-center text-red-500 text-center"><MdErrorOutline className="h-8 w-8 mr-2" /> Something went wrong</p>
					<p className="pt-3 text-center">
						Please refresh the page or try again later...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-wrap">
			{
				allUserDocs.length ? (
					allUserDocs.map((each, i) => {
						return (
							<SaveDocCard
								DocId={each._id}
								ImgC={cv}
								Name={each.title}
								SubTitle={dayjs(each.updatedAt).format('DD-MM-YYYY')}
								key={0 * 10 + i}
								isCreate={false}
							/>
						);
					})
				)
					: (
						<div className="m-10 h-40 w-full p-5 border shadow-lg flex flex-col justify-center items-center">
							<p className="flex font-bold md:text-lg items-center text-violet-600 text-center"><TbCalendarSad className="h-10 w-10  mr-2" /> No text documents yet</p>
							<p className="pt-3 text-center">
								Select a blank document or choose another template above to get
								started
							</p>
						</div>
					)
			}
		</div>
	);
};

export default AllSaveDocuments;
