import React, { useState, ChangeEvent, KeyboardEvent, useRef, useCallback } from "react";

import { RxCross1 } from "react-icons/rx";
import { CgDanger } from "react-icons/cg";
import { GrValidate } from "react-icons/gr";
import { MdOutlineLink } from "react-icons/md";

import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import useAuth from "@/hooks/useAuth";


interface EmailEntry {
	email: string;
	name: string;
}
interface DemoEmEntry {
	email: string;
	name: string;
	type: string;
}
const databaseEmails: EmailEntry[] = [
	{ email: "souvik@email.com", name: "Souvik Maji" },
	{ email: "rajdip@mail.com", name: "Rajdip Pal" },
	{ email: "kousik@edu.in", name: "Kousik" },
];

const accessedEmailsDatabase: DemoEmEntry[] = [
	{ email: "rajdip@mail.com", name: "Rajdip Pal", type: "viewer" },
	{ email: "kousik@edu.in", name: "Kousik", type: "editor" },
];

const ShareModal = ({ name }: { name: string }) => {
	const { user } = useAuth();

	const [inputFocus, setInputFocus] = useState(false);
	const [inputValue, setInputValue] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

	const [animation, setAnimation] = useState(true);
	const [isRestrict, setIsRestrict] = useState(true);

	const [shareEmail, setShareEmail] = useState<EmailEntry[]>([]);
	const [accessedEmails, setAccessedEmails] = useState<DemoEmEntry[]>([]);
	const [shareSubmit, setShareSubmit] = useState("");

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
		if (
			e.key === "Enter" &&
			!shareEmail.find((entry) => entry.email === inputValue) &&
			inputValue.length > 0
		) {
			const type = inputValue.match(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
			)
				? databaseEmails.find((entry) => entry.email === inputValue)
					? databaseEmails.find((entry) => entry.email === inputValue)?.name
					: "No DocFlow Account Found"
				: "Invalid Email";
			const data: EmailEntry = { email: inputValue, name: type || "" };
			setShareEmail([...shareEmail, data]);
			setInputValue("");
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setInputValue(e.target.value);
	};

	const handleDelete = (emailToDelete: string, e: React.MouseEvent): void => {
		// Prevent the event from reaching the parent div
		e.stopPropagation();

		const updatedShareEmail = shareEmail.filter(
			(email) => email.email !== emailToDelete
		);
		setShareEmail(updatedShareEmail);
	};

	const handleClickOnInputParent = useCallback(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleShareButtonClick = () => {
		const hasInvalidEntries = shareEmail.some(
			(entry) =>
				entry.name === "Invalid Email" ||
				entry.name === "No DocFlow Account Found"
		);

		if (hasInvalidEntries) {
			setShareSubmit(
				"Some entries have invalid email types. Please correct them."
			);
			setTimeout(() => {
				setShareSubmit("");
			}, 2000);
		} else {
			setShareEmail([]);
			setInputValue("");
			closeRef.current?.click();
		}
	};

	const handleSubmit = () => {
		setIsRestrict(true);
	}

	return (
		<div>
			<AlertDialog>
				<AlertDialogTrigger
					asChild
					onClick={() => {
						setTimeout(() => {
							setAnimation(false);
							setAccessedEmails(accessedEmailsDatabase);
						}, 2000);
					}}>
					<Button variant="default" className="py-2 px-6 h-fit w-fit">
						Share
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="md:w-2/3 min-h-40">
					{animation ? (
						<div className="flex h-full w-full justify-center items-center">
							<div className="animate-spin rounded-full h-8 w-8 mr-4 border-t-2 border-violet-600 border-solid"></div>
							Loading...
						</div>
					) : (
						<AlertDialogHeader className="text-left">
							<AlertDialogTitle>Share '{name}'</AlertDialogTitle>
							<AlertDialogDescription>
								<div className="flex justify-between mb-2">
									<div
										className={
											"flex justify-start rounded-sm flex-wrap flex-grow border-2 p-2 overflow-y-auto max-h-24 " +
											(inputFocus
												? "border-violet-700 "
												: "border-black-300 ") +
											(shareEmail.length ? "mr-3" : "mr-0 w-full")
										}
										onClick={handleClickOnInputParent}>
										{shareEmail.map((eachmail) => (
											<div
												key={eachmail.email}
												className="flex m-1 py-1 px-2 items-center  bg-violet-100 rounded-md w-fit h-fit">
												<HoverCard>
													{eachmail.name !== "Invalid Email" ? (
														eachmail.name !== "No DocFlow Account Found" ? (
															<HoverCardTrigger className="p-1 mr-1 rounded-full bg-green-600 text-white">
																<GrValidate />
															</HoverCardTrigger>
														) : (
															<HoverCardTrigger className="p-1 mr-1 rounded-full bg-yellow-600 text-white">
																<CgDanger />
															</HoverCardTrigger>
														)
													) : (
														<HoverCardTrigger className="p-1 mr-1 rounded-full bg-red-600 text-white">
															<CgDanger />
														</HoverCardTrigger>
													)}
													<HoverCardContent className="w-fit py-1 px-2 h-fit bg-violet-500 text-white font-semibold">
														{eachmail.name}
													</HoverCardContent>
												</HoverCard>
												<div className="mr-1 text-xs font-medium">
													{eachmail.email.length > 25
														? eachmail.email.slice(0, 22) + "..."
														: eachmail.email}
												</div>
												<div
													className="cursor-pointer p-1 hover:bg-violet-200 rounded-full"
													onClick={(e) => handleDelete(eachmail.email, e)}>
													<RxCross1 />
												</div>
											</div>
										))}
										<input
											type="text"
											ref={inputRef}
											className="border-none outline-none "
											onFocus={() => {
												setInputFocus(true);
											}}
											onBlur={() => {
												setInputFocus(false);
											}}
											onKeyDown={handleKeyDown}
											onChange={handleChange}
											value={inputValue}
										/>
									</div>

									<Select>
										<SelectTrigger
											className={
												(shareEmail.length ? "w-fit" : "hidden") +
												" h-fit  p-2 focus:ring-transparent border-2 border-violet-300"
											}>
											<SelectValue placeholder="viewer" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="viewer">Viewer </SelectItem>
											<SelectItem value="editor">Editor </SelectItem>
										</SelectContent>
									</Select>
								</div>

								{shareEmail.length > 0 ? (
									<div className="flex items-center justify-between h-fit my-10">
										<AlertDialogCancel
											onClick={() => {
												setShareEmail([]);
											}}
											ref={closeRef}
											className="border-2 border-red-600 text-red-600 bg-white hover:text-white hover:bg-red-600">
											Close
										</AlertDialogCancel>
										<Button
											onClick={handleShareButtonClick}
											className="border-2 border-violet-600 text-violet-600 bg-white hover:text-white">
											Share
										</Button>
									</div>
								) : (
									<div>
										<div className="my-2">
											<div className="  text-gray-700 font-bold my-2">
												People with access
											</div>
											<div
												tabIndex={0}
												className="flex justify-between items-center h-fit p-2 rounded-sm hover:bg-violet-200">
												<div className="text-left">
													<div className="text-xs font-bold">{user.username}(You)</div>
													<div className="font-semibold text-xs">
														{user.email}
													</div>
												</div>
												<div className="text-gray-500 p-1 rounded-sm">
													Owner
												</div>
											</div>
											{accessedEmails.map((eachmail, i) => {
												return (
													<div
														key={i + eachmail.email}
														tabIndex={0}
														className="flex justify-between items-center h-fit p-2 rounded-sm focus:bg-violet-200 hover:bg-violet-200">
														<div className="text-left">
															<div className="text-xs">{eachmail.name}</div>
															<div className="font-semibold text-xs">
																{eachmail.email}
															</div>
														</div>
														<Select
															value={eachmail.type}
															onValueChange={(val) => {
																setAccessedEmails((prevEmails) =>
																	prevEmails.map((email, index) =>
																		index === i
																			? { ...email, type: val }
																			: email
																	)
																);
															}}>
															<SelectTrigger className="w-fit h-fit  p-2  bg-transparent border-none focus:ring-transparent  hover:bg-violet-300">
																<SelectValue placeholder="viewer" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem className="cursor-pointer" value="viewer">Viewer </SelectItem>
																<SelectItem className="cursor-pointer" value="editor">Editor </SelectItem>
																<SelectItem className="cursor-pointer" value="remove">Remove access </SelectItem>
															</SelectContent>
														</Select>
													</div>
												);
											})}
										</div>
										<div className="my-2">
											<div className=" text-gray-700 font-bold my-2">
												General access
											</div>
											<div
												tabIndex={0}
												className="flex justify-between items-center h-fit p-2 rounded-sm focus:bg-violet-200 hover:bg-violet-200">
												<div className="text-left">
													<div className="text-xs">
														<Select onValueChange={() => setIsRestrict(prev => !prev)}>
															<SelectTrigger className="w-fit rounded-none h-fit p-1  bg-transparent border-none focus:ring-transparent  hover:bg-violet-300">
																<SelectValue placeholder="Restricted" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem className="cursor-pointer" value="restrict">
																	Restricted{" "}
																</SelectItem>
																<SelectItem className="cursor-pointer" value="anyone">
																	Anyone can with the link{" "}
																</SelectItem>
															</SelectContent>
														</Select>
													</div>
													<div className="font-semibold text-xs ml-1">
														{
															isRestrict ?
																<>Only people with access can open with the link</> :
																<>Anyone on the Internet with the link can view</>
														}
													</div>
												</div>
												{
													!isRestrict &&
													<Select>
														<SelectTrigger className="w-fit h-fit  p-2  bg-transparent border-none focus:ring-transparent  hover:bg-violet-300">
															<SelectValue placeholder="viewer" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem className="cursor-pointer" value="viewer">Viewer </SelectItem>
															<SelectItem className="cursor-pointer" value="editor">Editor </SelectItem>
														</SelectContent>
													</Select>

												}
											</div>
										</div>
										<div className="flex items-center justify-between h-fit mt-10">
											<Button className="px-3 text-gray-600 bg-violet-200 hover:bg-violet-300">
												<MdOutlineLink className="text-xl mr-2" /> Copy Link
											</Button>
											<AlertDialogAction className="border-2 px-7 border-violet-600" onClick={() => handleSubmit()}>
												Done
											</AlertDialogAction>
										</div>
									</div>
								)}
								{shareSubmit === "" ? null : (
									<div className="absolute bottom-0 left-1/2 text-center p-2 -translate-x-1/2 w-1/2 bg-black text-white font-semibold">
										{shareSubmit}
									</div>
								)}
							</AlertDialogDescription>
						</AlertDialogHeader>
					)}
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default ShareModal;
