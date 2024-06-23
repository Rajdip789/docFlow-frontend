import { useState } from "react";
import { Link } from "react-router-dom"
import Quill from "quill";

import { createDocumentMutation } from "@/lib/react-query/queries";
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar"

import { FcSearch } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiRedo, BiUndo } from "react-icons/bi";
import { TbReload, TbWorld } from "react-icons/tb";
import { FiMail, FiUserPlus } from "react-icons/fi";
import { FaDownload, FaPrint } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdEdit, MdFullscreen, MdFullscreenExit, MdOutlineComment, MdOutlineContentCopy, MdOutlineContentCut, MdOutlineContentPaste, MdOutlineDesktopWindows } from "react-icons/md";


const EditorMenu = ({ setOpen, handleDownload, setIsCommentSectionOpen, quill }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, handleDownload: () => {}, setIsCommentSectionOpen: React.Dispatch<React.SetStateAction<boolean>>,  quill: Quill }) => {
	const [fullScreen, setFullScreen] = useState(false);
	const documentMutation = createDocumentMutation(0);

	const handleEdit = async (val: string) => {
		const range = quill.getSelection();

		if(range) {
			const text = quill.getText(range.index, range.length);

			if(val === 'cut') {
				navigator.clipboard.writeText(text);
				quill.deleteText(range.index, range.length);
			} else if(val === 'copy') {
				navigator.clipboard.writeText(text);
			} else {
				const text = await navigator.clipboard.readText();
				quill.insertText(range.index, text);
			}
		}
	}

	const handleToggleFullScreen = () => {
		const element = document.documentElement;

		if (fullScreen || document.fullscreenElement) {
			document.exitFullscreen();
			setFullScreen(false);
		} else {
			element.requestFullscreen();
			setFullScreen(true);
		}
	}

	return (
		<Menubar className="bg-inherit border-none h-6 p-0">
			{/* File Menu */}
			<MenubarMenu>
				<MenubarTrigger className="cursor-pointer">File</MenubarTrigger>
				<MenubarContent>
					<MenubarItem onClick={() => documentMutation.mutate()} className="gap-1.5"> <IoDocumentTextOutline size={16} /> New </MenubarItem>
					<MenubarItem onClick={() => window.open(`/home`, '_blank')} className="gap-2"> <MdOutlineDesktopWindows /> New Window </MenubarItem>
					<MenubarSeparator />
					<MenubarSub>
						<MenubarSubTrigger className="gap-2"><FiUserPlus /> Share </MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem className="gap-2" onClick={() => setOpen((state) => !state)}><FiMail /> Email </MenubarItem>
							<MenubarItem className="gap-2" onClick={() => setOpen((state) => !state)}><TbWorld /> Link </MenubarItem>
						</MenubarSubContent>
					</MenubarSub>
					<MenubarSub>
						<MenubarSubTrigger className="gap-2"><FaDownload /> Download </MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem onClick={handleDownload}>Microsoft Word (.docx)</MenubarItem>
						</MenubarSubContent>
					</MenubarSub>
					<MenubarSeparator />
					<MenubarItem className="gap-2"><FaPrint /> Print... </MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			{/* Edit Menu */}
			<MenubarMenu>
				<MenubarTrigger className="cursor-pointer">Edit</MenubarTrigger>
				<MenubarContent>
					<MenubarItem className="gap-2" onClick={() => quill.history.undo()}><BiUndo size={16} /> Undo </MenubarItem>
					<MenubarItem className="gap-2" onClick={() => quill.history.redo()}><BiRedo size={16} /> Redo </MenubarItem>
					<MenubarSeparator />
					<MenubarSub>
						<MenubarSubTrigger className="gap-2"><IoMdSearch size={16} /> Find </MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem className="gap-2" onClick={() => window.open('https://google.com')}><TbWorld size={16} /> Search the web </MenubarItem>
							<MenubarSeparator />
							<MenubarItem className="gap-2"><FcSearch size={16} />Find...</MenubarItem>
						</MenubarSubContent>
					</MenubarSub>
					<MenubarSeparator />
					<MenubarItem className="gap-2" onClick={() => handleEdit('cut')}><MdOutlineContentCut size={16} /> Cut </MenubarItem>
					<MenubarItem className="gap-2" onClick={() => handleEdit('copy')}><MdOutlineContentCopy size={16} /> Copy </MenubarItem>
					<MenubarItem className="gap-2" onClick={() => handleEdit('paste')}><MdOutlineContentPaste size={16} /> Paste </MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			{/* View Menu */}
			<MenubarMenu>
				<MenubarTrigger className="cursor-pointer">View</MenubarTrigger>
				<MenubarContent>
					<MenubarCheckboxItem> Always Show Bookmarks Bar </MenubarCheckboxItem>
					<MenubarCheckboxItem checked> Always Show Full URLs </MenubarCheckboxItem>
					<MenubarSeparator />
					<MenubarItem className="gap-2" onClick={() => setIsCommentSectionOpen(prev => !prev)}><MdOutlineComment size={16}/> Comments </MenubarItem>
					<MenubarItem className="gap-2" onClick={() => window.location.reload()}><TbReload size={16} /> Reload </MenubarItem>
					<MenubarSeparator />
					<MenubarItem className="gap-2" onClick={handleToggleFullScreen}>
						{ fullScreen ? <MdFullscreenExit size={18} /> : <MdFullscreen size={18} /> }
						Toggle Fullscreen
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			{/* Profile Menu */}
			<MenubarMenu>
				<MenubarTrigger className="cursor-pointer"> Profile </MenubarTrigger>
				<MenubarContent>
					<MenubarSeparator />
					<Link to="/profile">
						<MenubarItem className="gap-2"><CgProfile size={16} /> View </MenubarItem>
					</Link>
					<Link to="/profile">
						<MenubarItem className="gap-2"><MdEdit size={16} /> Edit... </MenubarItem>
					</Link>
					<MenubarSeparator />
					<MenubarItem className="gap-2" disabled><FaRegTrashAlt /> Delete </MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	)
}

export default EditorMenu