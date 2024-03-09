import { useContext } from 'react';
import dayjs from 'dayjs';

import Shimmer from '../Shimmer';
import SaveDocCard from "./SaveDocCard";
import cv from "@/assets/cvTemps/cv4.png";
import { TbCalendarSad } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";

import useAuth from '@/hooks/useAuth';
import useFilteredDocs from '@/hooks/useFilteredDocs';
import { AppDataContext } from '@/context/AppDataProvider';
import { useGetAllDocumentsQuery } from "@/lib/react-query/queries";


const AllSaveDocuments = ({ IsSort, CreatedBy }: { IsSort: boolean, CreatedBy: string }) => {
	const { user } = useAuth();
	const { searchText } = useContext(AppDataContext);
	const { isPending, isError, data } = useGetAllDocumentsQuery();

	const allUserDocs = useFilteredDocs({isPending, isError, data, IsSort, CreatedBy, searchText, user});

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
								isDisabled={each.owner_id !== user.id}
								DocId={each._id}
								ImgC={cv}
								Name={each.title}
								SubTitle={dayjs(each.updatedAt).format('DD-MM-YYYY')}
								key={0 * 10 + i}
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
