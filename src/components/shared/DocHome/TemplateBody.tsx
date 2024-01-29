import { useState, useContext } from "react";

import { IoCodeOutline, IoEllipsisVerticalOutline } from "react-icons/io5";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import TemplatePartOne from "./TemplatePartOne";
import HiddenTemplate from "./HiddenTemplate";
import { AppDataContext } from "@/context/AppdataProvider";

const TemplateBody = () => {
	const [templateShow, setTemplateShow] = useState(true);
	const { hiddenTempValue, setHiddenTempValue, searchText } = useContext(AppDataContext);

	return (
		<div className="bg-violet-100 w-full">
			<div
				className={`w-full md:w-3/4 md:py-10 py-5 m-auto px-2 ${(templateShow && !searchText) ? "block" : "hidden"}`}>
				
				{/* upper section template */}
				<div className="md:py-3 md:px-5 px-3 py-2 font-semibold">
					<div
						className={ hiddenTempValue? "hidden" : "flex justify-between items-center" }>
						<div className="py-2">Start a new document</div>
						<div className="flex h-fit items-center">
							<button
								className="relative flex items-center rounded-sm h-fit py-1 px-3 bg-inherit hover:bg-violet-200"
								onClick={() => setHiddenTempValue(true)}>
								Template Gallery
								<IoCodeOutline className="ml-2 size-3 rotate-90" />
								<p className="text-violet-200 text-lg absolute right-0">|</p>
							</button>
							<DropdownMenu modal={false}>
								<DropdownMenuTrigger className="hover:bg-violet-200 h-8 w-8 flex justify-center items-center rounded-full">
									<IoEllipsisVerticalOutline />
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem
										className="!border-1 hover:!bg-violet-200 cursor-pointer"
										onClick={() => setTemplateShow(false)}>
										Hide all templates
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
					<div className={ hiddenTempValue ? "block" : "hidden py-2" }>
						Recently featured all templates
					</div>
				</div>

				{/* Template 1 */}
				<TemplatePartOne />

				{/* Hidden Templates */}
				<HiddenTemplate />
			</div>
		</div>
	);
};

export default TemplateBody;
