import { Link } from "react-router-dom"
import Profile from "../Profile"
import Logo from "@/assets/logo.png";

import { MdOutlineMessage } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import EditorMenu from "./EditorMenu";
import { useState } from "react";
import ShareModal from "./ShareModal";

const EditorHeader = ({ name } : { name: string }) => {
	const [docName, setDocName] = useState(name);

	return (
		<header className="p-2 md:p-3 w-full bg-violet-100 fixed top-0">
			<div className="flex items-center justify-between w-full h-full">

				{/* Left portion */}
				<div className="flex items-center justify-around gap-2">
					{/* Logo */}
					<Link to="/Home">
						<div className="flex items-center">
							<img src={Logo} className="w-9 h-9 md:w-10 md:h-10" alt="Logo" />
						</div>
					</Link>

					<div className="flex flex-col items-start justify-between">
						<input className="px-2 bg-inherit text-xl outline-violet-500" value={docName} onChange={(e) => setDocName(e.target.value)}/>
				
						{/* Menu */}
						<EditorMenu/>
					</div>
				</div>

				{/* Right Portion */}
				<div className="flex items-center justify-around gap-6">
					<div className="app-flex w-10 h-10 cursor-pointer rounded-full hover:bg-violet-200">
						<FaClockRotateLeft size={20} />
					</div>

					{/* Comment section*/}
					<div className="app-flex w-10 h-10 cursor-pointer rounded-full hover:bg-violet-200">
						<MdOutlineMessage size={23} />
					</div>

					<ShareModal name = {name}/>

					{/* Profile */}
					<Profile />
				</div>
			</div>

		</header>
	)
}

export default EditorHeader