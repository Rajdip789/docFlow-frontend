import dayjs from 'dayjs';

import { TbCalendarSad } from "react-icons/tb";

import Shimmer from '../Shimmer';
import SaveDocCard from "./SaveDocCard";
import cv from "@/assets/cvTemps/cv4.png";
import { useGetAllDocumentsQuery } from "@/lib/react-query/queries";

const AllSaveDocuments = () => {
    const { isPending, isError, data } = useGetAllDocumentsQuery();
	const allUserDocs: DocumentResponse[] = data?.data?.ownedDocuments;

	if(isPending) return <Shimmer/>

	if(isError) {
		return (
			<div className="flex flex-wrap">
				<h1>Somthing went wrong plese try again</h1>
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
								SubTitle={dayjs(each.createdAt).format('DD-MM-YYYY')}
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
