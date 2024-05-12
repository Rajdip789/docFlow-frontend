import { Link } from "react-router-dom"
import Profile from "../Profile"
import Logo from "@/assets/logo.png";

import { MdOutlineMessage } from "react-icons/md";
import { FaArrowsRotate, FaClockRotateLeft } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import EditorMenu from "./EditorMenu";
import { useContext, useState } from "react";
import ShareModal from "./ShareModal";
import { useRenameDocumentMutation } from "@/lib/react-query/queries";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { AppDataContext } from "@/context/AppDataProvider";
import dayjs from "dayjs";

const EditorHeader = ({ DocId, saveState }: { DocId: string, saveState: boolean }) => {
	const { doc, setDoc } = useContext(AppDataContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const renameDocumentMutation = useRenameDocumentMutation();

	const lastUpdate = dayjs(doc.updatedAt).day() ?
		dayjs(doc.updatedAt).day() :
		dayjs(doc.updatedAt).hour() ?
			dayjs(doc.updatedAt).hour() : dayjs(doc.updatedAt).minute();

	return (
		<header className="p-3 md:p-3 w-full bg-violet-100 fixed top-0 z-10">
			<div className="flex items-center justify-between w-full h-full px-2">

				{/* Left portion */}
				<div className="flex items-center justify-around gap-2">
					{/* Logo */}
					<Link to="/home">
						<div className="flex items-center">
							<img src={Logo} className="w-9 h-9 md:w-10 md:h-10" alt="Logo" />
						</div>
					</Link>

					<div className="flex flex-col items-start justify-between">
						<div className="flex items-center">
							<input
								className="px-2 bg-inherit text-xl outline-violet-500"
								value={doc.title}
								onChange={(e) => setDoc({...doc, title: e.target.value})}
								onBlur={(e) => renameDocumentMutation.mutate({ DocId, docName: e.target.value })}
							/>

							{/* <IoIosCheckmarkCircleOutline size={22} />
							<FaArrowsRotate size={22} /> */}
						</div>
						{/* Menu */}
						<EditorMenu setOpen={setIsModalOpen}/>
					</div>
				</div>

				{/* Right Portion */}
				<div className="flex items-center justify-around gap-6">
					<HoverCard>
						<HoverCardTrigger className="app-flex w-10 h-10 cursor-pointer rounded-full hover:bg-violet-200">
							<FaClockRotateLeft size={20} />
						</HoverCardTrigger>
						<HoverCardContent side="left" className="bg-black text-xs text-white w-fit py-1 px-3 cursor-default">
							{lastUpdate}
						</HoverCardContent>
					</HoverCard>

					{/* Comment section*/}
					<div className="app-flex w-10 h-10 cursor-pointer rounded-full hover:bg-violet-200">
						<MdOutlineMessage size={23} />
					</div>

					<ShareModal DocId={DocId} open={isModalOpen} setOpen={setIsModalOpen} />

					{/* Profile */}
					<Profile />
				</div>
			</div>

		</header>
	)
}

export default EditorHeader