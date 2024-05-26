import { Link } from "react-router-dom"
import { useContext, useState } from "react";

import Quill from 'quill'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

import Profile from "../Profile"
import EditorMenu from "./EditorMenu";
import ShareModal from "./ShareModal";
import Logo from "@/assets/logo.png";

import { MdOutlineMessage } from "react-icons/md";
import { IoCloudOfflineOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaArrowsRotate, FaClockRotateLeft } from "react-icons/fa6";

import { AppDataContext } from "@/context/AppDataProvider";
import { useRenameDocumentMutation } from "@/lib/react-query/queries";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

dayjs.extend(relativeTime);

const EditorHeader = ({ DocId, saveState, handleDownload, quill }: { DocId: string, saveState: 'saved' | 'unsaved' | 'saving', handleDownload: () => {}, quill: Quill }) => {
	const { doc, setDoc } = useContext(AppDataContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const renameDocumentMutation = useRenameDocumentMutation();

	const lastUpdate = dayjs(doc.updatedAt).fromNow();

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
								onChange={(e) => setDoc({ ...doc, title: e.target.value })}
								onBlur={(e) => renameDocumentMutation.mutate({ DocId, docName: e.target.value })}
							/>

							{
								saveState === 'saved' ?
									<HoverCard openDelay={300}>
										<HoverCardTrigger className="cursor-pointer text-violet-700">
											<IoIosCheckmarkCircleOutline size={24} />
										</HoverCardTrigger>
										<HoverCardContent className="bg-black text-xs text-white w-fit py-1 px-3 cursor-default">
											Changes saved
										</HoverCardContent>
									</HoverCard> :
									saveState === 'unsaved' ?
										<div className="app-flex gap-1">
											<IoCloudOfflineOutline size={20} color='#6403ff' />
											<span className="">Unsaved</span>
										</div> :
										<div className="app-flex gap-1">
											<FaArrowsRotate size={18} color='#6b51c9' />
											<span className="">Saving...</span>
										</div>
							}
						</div>
						{/* Menu */}
						<EditorMenu setOpen={setIsModalOpen} handleDownload={handleDownload} quill={quill} />
					</div>
				</div>

				{/* Right Portion */}
				<div className="flex items-center justify-around gap-6">
					<HoverCard openDelay={300}>
						<HoverCardTrigger className="app-flex w-10 h-10 cursor-pointer rounded-full hover:bg-violet-200">
							<FaClockRotateLeft size={20} />
						</HoverCardTrigger>
						<HoverCardContent side="left" className="bg-black text-xs text-white w-fit py-1 px-3 cursor-default">
							Last edit was {lastUpdate}
						</HoverCardContent>
					</HoverCard>

					{/* Comment section*/}
					<HoverCard openDelay={300}>
						<HoverCardTrigger className="app-flex w-10 h-10 cursor-pointer rounded-full hover:bg-violet-200">
							<MdOutlineMessage size={23} />
						</HoverCardTrigger>
						<HoverCardContent side="left" className="bg-black text-xs text-white w-fit py-1 px-3 cursor-default">
							Show all comments
						</HoverCardContent>
					</HoverCard>

					<ShareModal DocId={DocId} open={isModalOpen} setOpen={setIsModalOpen} />

					{/* Profile */}
					<Profile />
				</div>
			</div>

		</header>
	)
}

export default EditorHeader