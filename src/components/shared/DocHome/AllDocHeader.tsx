import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { RxCross1 } from "react-icons/rx";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

import { HiddenTemplateContext } from "@/context/HiddenTemplateProvide";
import Logo from "@/assets/logo.png";
import Profile from "../Profile";

const AllDocHeader = () => {
	const [inputValue, setInputValue] = useState("");
	const [isInputFocused, setIsInputFocused] = useState(false);

	const { hiddenTempValue, setHiddenTempValue } = useContext(HiddenTemplateContext);

	const handleClearInput = () => {
		setInputValue("");
		const searchInputElement = document.getElementById("searchInput") as HTMLInputElement | null;

		if (searchInputElement) searchInputElement.focus();
	};

	return (
		<>
			<header className="p-2 md:p-4 w-full  bg-white z-10 h-16 fixed top-0">
				{
					hiddenTempValue ? (
						<div className="flex font-semibold items-center w-full h-full">
							<button
								className="p-2 hover:bg-violet-100 rounded-full relative left-0 mr-3"
								onClick={() => setHiddenTempValue(false)}>
								<FaArrowLeft className="size-5 text-violet-500 m" />
							</button>
							<p>Template Gallery</p>
						</div>
					) : (
						<div className="flex items-center justify-between w-full h-full">
							
							{/* Logo */}
							<Link to={"/"}>
								<div className="flex items-center">
									<img src={Logo} className="w-8 h-8 md:w-12 md:h-12" alt="Logo" />
								</div>
							</Link>

							{/* Search bar */}
							<div
								className={`flex w-1/2 items-center ${isInputFocused ? "bg-white border shadow-md" : "bg-violet-100"
									} rounded-lg p-1 relative`}>
								<button
									className={`p-1 md:p-2 ${isInputFocused ? "hover:bg-violet-100" : "hover:bg-violet-200"
									} rounded-full relative right-0`}>
									<FaSearch className="size-5 text-violet-500" />
								</button>
								<div className="flex-grow">
									<input
										id="searchInput"
										type="text"
										value={inputValue}
										onChange={(e) => setInputValue(e.target.value)}
										onFocus={() => setIsInputFocused(true)}
										onBlur={() => setIsInputFocused(false)}
										className={`w-full px-2 md:px-4 py-1 ${isInputFocused ? "bg-white" : "bg-violet-100"
											} outline-none border-none`}
										placeholder="Search..."
									/>
								</div>
								<button
									className={`p-1 md:p-2 ${isInputFocused ? "hover:bg-violet-100" : "hover:bg-violet-200"
										} rounded-full relative left-0 ${inputValue ? "block" : "hidden"
										}`}
									onClick={handleClearInput}>
									<RxCross1 className="size-5 text-violet-500" />
								</button>
							</div>

							{/* Profile */}
							<Profile />
						</div>
					)
				}
			</header>
		</>
	);
};

export default AllDocHeader;
