import { useEffect, useState } from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

import { FaSortAlphaDown } from "react-icons/fa";
import { MdOutlineDateRange, MdSortByAlpha } from "react-icons/md";

import AllSaveDocuments from "./AllSaveDocuments";
import RoundCreateCard from "./RoundCreateCard";

const UserDocumentsBody = () => {
	const [stickyVal, setStickyVal] = useState(false);
	const [showRoundCard, setShowRoundCard] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const saveDocumentsHeader: HTMLElement = document.getElementById("saveDocumentsHeader")!;
			const x = saveDocumentsHeader.getBoundingClientRect().top;

			if (x <= 56) {
				setStickyVal(true);
				setShowRoundCard(true);
			} else {
				setStickyVal(false);
				if (x <= 64) {
					setShowRoundCard(true);
				} else {
					setShowRoundCard(false);
				}
			}
		};

		document.addEventListener("scroll", handleScroll);

		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="w-full px-2 pb-3 bg-white relative font-semibold">
			<div
				id="saveDocumentsHeader"
				className={ stickyVal ? "w-full border-b-5 shadow-md sticky top-14" : "w-full" }>

				{/* upper section template */}
				<div
					className="w-full md:w-3/4  md:px-5 px-3 md:py-10 m-auto flex justify-between items-center py-5 h-16  bg-white">
					<div className="md:py-2 py-1">Saved documents</div>
					<div className="flex items-center h-fit">
						<div className="lg:mr-8 md:mr-4 mr-2">
							<Select>
								<SelectTrigger className="w-44 h-fit py-1 my-0">
									<SelectValue placeholder="Created by anyone" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem className="cursor-pointer" value="x">Created by me </SelectItem>
									<SelectItem className="cursor-pointer" value="y">Created by others</SelectItem>
									<SelectItem className="cursor-pointer" value="z">Created by anyone</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<HoverCard>
							<HoverCardTrigger className="cursor-pointer flex justify-center items-center w-8 h-8 rounded-full hover:bg-violet-200">
								<DropdownMenu modal={false}>
									<DropdownMenuTrigger className="hover:bg-violet-200 h-8 w-8 flex justify-center items-center rounded-full">
										<MdSortByAlpha />
									</DropdownMenuTrigger>
									<DropdownMenuContent className="shadow-md bg-white rounded-sm border p-2">
										<DropdownMenuItem className="flex items-center py-1 px-2 rounded-sm hover:!bg-violet-200 cursor-pointer">
											<MdOutlineDateRange className="mr-3" />
											Sort by Date
										</DropdownMenuItem>
										<DropdownMenuItem className="flex items-center py-1 px-2 rounded-sm hover:!bg-violet-200 cursor-pointer">
											<FaSortAlphaDown className="mr-3" />
											Sort by Title
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</HoverCardTrigger>
							<HoverCardContent className="bg-black text-xs text-white w-fit py-1 px-3 cursor-default">
								Sort option
							</HoverCardContent>
						</HoverCard>
					</div>
				</div>
			</div>
			
			<div className="w-full md:w-3/4 m-auto">
				{/* All Documents */}
				<AllSaveDocuments />
			</div>

			{showRoundCard ? <RoundCreateCard /> : null}
		</div>
	);
};

export default UserDocumentsBody;
