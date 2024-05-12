import React, { useState, ChangeEvent, KeyboardEvent, useRef, useCallback, useEffect } from "react";

import { RxCross1 } from "react-icons/rx";
import { CgDanger } from "react-icons/cg";
import { GrValidate } from "react-icons/gr";
import { MdClose, MdOutlineLink } from "react-icons/md";

import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

import useAuth from "@/hooks/useAuth";
import { useAddEmailAccessMutation, useAddLinkAccessMutation, useGetDocumentInfoQuery, useUpdateEmailAccessMutation } from "@/lib/react-query/queries";

interface Data {
	docs: {
		email_access: EmailAccessEntry[],
		link_access: { is_active: boolean, access_type: 'view' | 'edit', link: string },
		title: string,
		owner_id: string,
		owner: Iuser
	},
	users: { username: string, email: string }[];
}

const ShareModal = ({ DocId, open, setOpen }: { DocId: string, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
	//Context and queries
	const { user } = useAuth();
	const addLinkAccessMutation = useAddLinkAccessMutation();
	const addEmailAccessMutation = useAddEmailAccessMutation();
	const updateEmailAccessMutation = useUpdateEmailAccessMutation();
	const { isPending, data, refetch } = useGetDocumentInfoQuery(DocId);

	const [docName, setDocName] = useState("");
	const [ownerName, setOwnerName] = useState("");
	const [ownerMail, setOwnerMail] = useState("");
	const [ownerId, setOwnerId] = useState("");
	const [isAnimation, setIsAnimation] = useState(false);

	//Email share -- inputs, data
	const inputRef = useRef<HTMLInputElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);
	const [inputFocus, setInputFocus] = useState(false);
	const [inputValue, setInputValue] = useState<string>("");
	const [shareSubmit, setShareSubmit] = useState("");
	const [emailShareType, setEmailShareType] = useState<'view' | 'edit'>("view");
	const [shareEmail, setShareEmail] = useState<EmailAccessEntry[]>([]); //Input emails

	const [accessedEmails, setAccessedEmails] = useState<EmailAccessEntry[]>([]); //Already shared

	//Database records
	const [databaseEmails, setDatabaseEmails] = useState<EmailEntry[]>([]);
	const [accessedEmailsDatabase, setAccessedEmailsDatabase] = useState<EmailAccessEntry[]>([]);

	//Link share
	const [link, setLink] = useState('');
	const [linkShare, setLinkShare] = useState(false);
	const [linkShareType, setLinkShareType] = useState<'view' | 'edit'>('view');
	const [copyText, setCopyText] = useState("");

	//Load data for dialog
	useEffect(() => {
		if (!isPending && data?.data?.docs && data?.data?.users) {
			const { docs, users } = data?.data as Data;
			const { owner_id, title, email_access, owner } = docs
			const { is_active, access_type, link } = docs?.link_access;

			setAccessedEmails(email_access);
			setAccessedEmailsDatabase(email_access);
			setDatabaseEmails(users);

			setDocName(title);
			setOwnerId(owner_id);
			setOwnerMail(owner.email);
			setOwnerName(owner.username);

			setLinkShareType(access_type);
			setLinkShare(is_active);
			setLink(link);
			setIsAnimation(false);
		}

	}, [isPending, data, isAnimation])

	/**  
	 * Events for share input field   
	 **/

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
					? !accessedEmailsDatabase.find((entry) => entry.email === inputValue)
						? databaseEmails.find((entry) => entry.email === inputValue)?.username
						: "User already have access"
					: "No DocFlow Account Found"
				: "Invalid Email";
			const data: EmailAccessEntry = { email: inputValue, name: type || "", type: emailShareType };
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
				entry.name === "No DocFlow Account Found" ||
				entry.name === "User already have access"
		);

		if (hasInvalidEntries) {
			setShareSubmit(
				"Some entries have invalid email types. Please correct them."
			);
			setTimeout(() => {
				setShareSubmit("");
			}, 2000);
		} else {
			addEmailAccessMutation.mutate({ DocId, shareEmail });
			setShareEmail([]);
			setEmailShareType("view");
			setInputValue("");
			closeRef.current?.click();
		}
	};

	/**  
	 * Events for done/submit button    
	 **/

	const handleSubmit = () => {
		let n1 = accessedEmailsDatabase.length, n2 = accessedEmails.length;
		let isModified = false;

		for (let index = 0; index < n1; index++) {
			if (index >= n2 || accessedEmailsDatabase[index].type !== accessedEmails[index].type) {
				isModified = true;
				break;
			}
		}

		isModified && updateEmailAccessMutation.mutate({ DocId, updatedAccessData: accessedEmails });
	}

	/**  
	 * Start fetching data and set animation when Dialog opens    
	 **/

	useEffect(() => {
		if (open) {
			setIsAnimation(true);
			refetch();
		}
	}, [open])

	return (
		<div>
			<Button
				variant="default"
				className="py-2 px-6 h-fit w-fit"
				onClick={() => setOpen(true)}
			>
				Share
			</Button>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent className="md:w-2/3 min-h-40 rounded-md">
					{isPending || isAnimation ? (
						<div className="flex h-full w-full justify-center items-center">
							<div className="animate-spin rounded-full h-8 w-8 mr-4 border-t-2 border-violet-600 border-solid"></div>
							Loading...
						</div>
					) : (
						<AlertDialogHeader className="text-left">
							<AlertDialogTitle className="flex justify-between items-center pb-1 text-xl">
								Share '{docName}'
								<AlertDialogCancel className="py-0 px-1 border-none h-8 hover:bg-slate-100"><MdClose size={20} /></AlertDialogCancel>
							</AlertDialogTitle>

							<AlertDialogDescription>
								{
									(user.id === ownerId) && <div className="flex justify-between mb-2">
										<div
											className={
												"flex justify-start rounded-sm flex-wrap flex-grow border-2 p-2 cursor-text overflow-y-auto max-h-24 " +
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
																eachmail.name !== "User already have access" ? (
																	<HoverCardTrigger className="p-1 mr-1 rounded-full bg-green-600 text-white">
																		<GrValidate />
																	</HoverCardTrigger>
																) : (
																	<HoverCardTrigger className="p-1 mr-1 rounded-full bg-gray-600 text-white">
																		<CgDanger />
																	</HoverCardTrigger>
																)
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

										<Select
											onValueChange={(value: 'view' | 'edit') => {
												setEmailShareType(value);
												setShareEmail((prevEmails) =>
													prevEmails.map((email) => ({ ...email, type: value }))
												);
											}}
										>
											<SelectTrigger
												className={
													(shareEmail.length ? "w-fit" : "hidden") +
													" h-fit  p-2 focus:ring-transparent border-2 border-violet-300"
												}
											>
												<SelectValue placeholder="viewer" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="view">Viewer </SelectItem>
												<SelectItem value="edit">Editor </SelectItem>
											</SelectContent>
										</Select>
									</div>
								}

								{shareEmail.length > 0 ? (
									<div className="flex items-center justify-between h-fit my-10">
										<AlertDialogCancel
											onClick={() => {
												setShareEmail([]);
											}}
											ref={closeRef}
											className=" text-violet-600 hover:text-violet-600 bg-white hover:bg-violet-100">
											Cancel
										</AlertDialogCancel>
										<Button
											onClick={handleShareButtonClick}
											className="px-5">
											Share
										</Button>
									</div>
								) : (
									<div>
										<div className="my-2">
											<div className="  text-gray-700 font-bold text-base my-2">
												People with access
											</div>
											<div
												tabIndex={0}
												className="text-black flex justify-between items-center h-fit p-2 rounded-sm hover:bg-violet-200">
												<div className="text-left">
													<div className="text-xs font-bold">{ownerName} (You)</div>
													<div className="font-semibold text-xs">
														{ownerMail}
													</div>
												</div>
												<div className="text-gray-500 p-1 rounded-sm">
													Owner
												</div>
											</div>
											{
												(user.id === ownerId) && accessedEmails.map((eachmail, i) => {
													return (
														<div
															key={i + eachmail.email}
															tabIndex={0}
															className="text-black flex justify-between items-center h-fit p-2 rounded-sm focus:bg-violet-200 hover:bg-violet-200">
															<div className="text-left">
																<div className="text-xs font-semibold">{eachmail.name}</div>
																<div className="text-[0.8rem]">
																	{eachmail.email}
																</div>
															</div>
															<Select
																value={eachmail.type}
																onValueChange={(val) => {
																	setAccessedEmails((prevEmails) =>
																		val === 'remove'
																			? prevEmails.filter((_, index) => index !== i)
																			: prevEmails.map((email, index) => (index === i ? { ...email, type: val } : email))
																	);
																}}>
																<SelectTrigger className="w-fit h-fit  p-2  bg-transparent border-none focus:ring-transparent  hover:bg-violet-300">
																	<SelectValue placeholder="viewer" />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem className="cursor-pointer" value="view">Viewer </SelectItem>
																	<SelectItem className="cursor-pointer" value="edit">Editor </SelectItem>
																	<SelectItem className="cursor-pointer" value="remove">Remove access </SelectItem>
																</SelectContent>
															</Select>
														</div>
													);
												})
											}
										</div>
										<div className="my-2">
											<div className=" text-gray-700 font-bold text-base my-2">
												General access
											</div>
											<div
												tabIndex={0}
												className="text-black flex justify-between items-center h-fit p-2 rounded-sm focus:bg-violet-200 hover:bg-violet-200">
												<div className="text-left">
													<div className="text-xs">
														<Select
															disabled={!(user.id === ownerId)}
															value={linkShare ? "anyone" : "private"}
															onValueChange={(value) => {
																setLinkShare(value === 'anyone');
																addLinkAccessMutation.mutate({ DocId, linkShare: value === 'anyone', linkShareType });
																if (addLinkAccessMutation.isSuccess) {
																	setCopyText("Access updated!");
																	setTimeout(() => {
																		setCopyText("");
																	}, 2000);
																}
															}
															}>
															<SelectTrigger className="w-fit rounded-none h-fit p-1  bg-transparent border-none focus:ring-transparent  hover:bg-violet-300">
																<SelectValue placeholder="private" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem className="cursor-pointer" value="private">
																	Private{" "}
																</SelectItem>
																<SelectItem className="cursor-pointer" value="anyone">
																	Anyone can with the link{" "}
																</SelectItem>
															</SelectContent>
														</Select>
													</div>
													<div className="font-semibold text-xs ml-1">
														{
															linkShare ?
																<>Anyone on the Internet with the link can {linkShareType}</> :
																<>No one can view with the link!</>
														}
													</div>
												</div>
												{
													addLinkAccessMutation.isPending ?
														<div className="italic">Updating...</div> :
														linkShare &&
														<Select
															disabled={!(user.id === ownerId)}
															value={linkShareType}
															onValueChange={(value: 'view' | 'edit') => {
																setLinkShareType(value);
																addLinkAccessMutation.mutate({ DocId, linkShare, linkShareType: value })
																if (addLinkAccessMutation.isSuccess) {
																	setCopyText("Access updated!");
																	setTimeout(() => {
																		setCopyText("");
																	}, 2000);
																}
															}
															}>
															<SelectTrigger className="w-fit h-fit  p-2  bg-transparent border-none focus:ring-transparent  hover:bg-violet-300">
																<SelectValue placeholder="view" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem className="cursor-pointer" value="view">Viewer </SelectItem>
																<SelectItem className="cursor-pointer" value="edit">Editor </SelectItem>
															</SelectContent>
														</Select>

												}
											</div>
										</div>
										<div className="flex items-center justify-between h-fit mt-10">
											<Button
												className="px-2 text-gray-600 bg-violet-200 hover:bg-violet-300"
												onClick={() => {
													navigator.clipboard.writeText(link);
													setCopyText("Link copied!");
													setTimeout(() => {
														setCopyText("");
													}, 2000);
												}
												}
											>
												<MdOutlineLink className="text-xl mr-2" /> Copy Link
											</Button>
											<AlertDialogAction className="border-2 px-7 border-violet-600" onClick={() => handleSubmit()}>
												Done
											</AlertDialogAction>
										</div>
									</div>
								)}
								{shareSubmit === "" ? null : (
									<div className="absolute bottom-0 left-1/2 text-center p-2 -translate-x-1/2 w-1/2 bg-slate-900 text-white font-semibold rounded-t-sm">
										{shareSubmit}
									</div>
								)}
								{copyText === "" ? null : (
									<div className="absolute bottom-0 left-1/2 text-center p-2 -translate-x-1/2 w-1/3 bg-slate-900 text-white font-semibold rounded-t-sm">
										{copyText}
									</div>
								)}
							</AlertDialogDescription>
						</AlertDialogHeader>
					)}
				</AlertDialogContent>
			</AlertDialog>
		</div >
	);
};

export default ShareModal;
