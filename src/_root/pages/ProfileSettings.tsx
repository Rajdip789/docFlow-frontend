import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "@/assets/logo.png";
import Avatar from "@/assets/avatar.png"
import Profile from "@/components/shared/Profile";
import useAuth from "@/hooks/useAuth";
import { useDeleteUserMutation, useUpdateUserMutation } from "@/lib/react-query/queries";

import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ProfileSetting = () => {
	const { user } = useAuth();
	
	const deleteUserMutation = useDeleteUserMutation();
	const updateUserMutation = useUpdateUserMutation();

	const imageInputRef = useRef<HTMLInputElement>(null);
	const [isModified, setIsModified] = useState(false);

	const [image, setImage] = useState<File | string>(user.imageUrl);
	const [name, setName] = useState(user.username);
	const [isValidName, setIsValidName] = useState(true);
	const [email, setEmail] = useState(user.email);
	const [isValidEmail, setIsValidEmail] = useState(true);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;
		setImage(event.target.files[0]);
		setIsModified(true);
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
		const isValid = /^[\w\d\s]{4,}$/.test(event.target.value);
		setIsValidName(isValid);
		setIsModified(true);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
		const isValid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(event.target.value);
		setIsValidEmail(isValid);
		setIsModified(true);
	};

	const handleSubmit = () => {
		if (isModified && isValidName && isValidEmail) {

			const formData = new FormData();
			formData.append('username', name);
			formData.append('email', email);
			formData.append('image', image);

			updateUserMutation.mutate({ formData, UserId: user.id });

			setIsModified(false);
		}
	}

	return (
		<div className="w-full">
			{/* Header */}
			<div className="flex bg-white items-center justify-between w-screen h-fit py-2 px-5 shadow-md fixed z-10">
				<Link to={"/home"}>
					<div className="flex items-center">
						<img src={Logo} className="w-8 h-8 md:w-12 md:h-12" alt="Logo" />
					</div>
				</Link>
				<Profile />
			</div>

			{/* Body */}
			<div className="md:container flex flex-col items-center mx-auto pt-6 relative top-16">
				{/* update Section */}
				<div className="w-11/12 md:w-4/5 border-2 h-fit rounded-lg overflow-hidden">
					<div className="p-4 border-b-2 border-violet-300">
						<p className="text-xl font-semibold text-violet-700">Profile</p>
						<p>Manage settings for your docflow profile</p>
					</div>

					<div className="p-4 border-b-2 border-violet-300">
						<div className="flex h-fit items-center">
							<div className="h-20 w-20 rounded-full overflow-hidden bg-white">
								{image ? (
									<img
										src={typeof image === 'string' ? image : URL.createObjectURL(image)}
										alt="upload image"
										className="object-cover"
									/>
								) : (
									<img src={Avatar} alt="avatar" className="object-cover" />
								)}
							</div>
							<div className="ml-5">
								<input
									type="file"
									ref={imageInputRef}
									className="hidden"
									onChange={handleImageChange}
								/>
								<p className="font-semibold mb-2">Profile image</p>
								<div
									onClick={() => imageInputRef.current!.click()}
									className="cursor-pointer py-1 px-4 rounded-lg border-2 font-semibold  border-violet-700 bg-white text-violet-700">
									Upload Photo
								</div>
							</div>
						</div>
						<div className="mt-5">
							<p className="py-1 font-semibold">Full name</p>
							<input
								type="text"
								onChange={handleNameChange}
								value={name}
								className={
									"border-2 bg-transparent outline-none w-full rounded-sm py-1 px-3 " +
									(isValidName
										? "focus:border-violet-400 border-violet-300"
										: "focus:border-red-400 border-red-300")
								}
							/>
						</div>
						<div className="my-5">
							<p className="py-1 font-semibold">Email</p>
							<input
								type="email"
								onChange={handleEmailChange}
								value={email}
								className={
									"border-2 bg-transparent outline-none w-full rounded-sm py-1 px-3 " +
									(isValidEmail
										? "focus:border-violet-400 border-violet-300"
										: "focus:border-red-400 border-red-300")
								}
							/>
						</div>
					</div>

					{/* Update button */}
					<div className="bg-violet-200 h-24 flex justify-end items-end p-4">
						<div
							className={"py-2 px-5 w-24 app-flex bg-violet-500 hover:bg-violet-700 rounded-lg hover:shadow-md text-white font-bold " +
								(isValidEmail && isValidName && isModified ? "cursor-pointer" : "cursor-not-allowed")}
							onClick={() => handleSubmit()}
						>
							{
								updateUserMutation.isPending ?
									<svg className="animate-spin -ml-1 w-5 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg> : <span>Update</span>
							}
						</div>
					</div>
				</div>

				{/* Delete Section */}
				<div className="my-5 w-11/12 md:w-4/5 border-2 h-fit rounded-lg overflow-hidden">
					<div className="p-4 border-b-2 border-violet-300">
						<p className="font-semibold text-lg text-red-600">Danger zone</p>
						<p>Be careful!. Account deletion cannot be undone.</p>
					</div>

					{/* Delete button */}
					<div className="bg-violet-200 h-fit flex justify-end p-4">
						<Dialog>
							<DialogTrigger>
								<div className="app-flex gap-1 py-2 px-5 bg-red-500 hover:bg-red-700 rounded-lg hover:shadow-md text-white font-bold cursor-pointer">
									<FaRegTrashAlt /> Delete account
								</div>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle className="text-red-600 font-bold text-xl">Warning!</DialogTitle>
									<DialogDescription className="py-2">
										This action is irreversible and will permanently delete all your data and files from our server.
										Are you absolutely sure you want to continue?
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<Button
										className="app-flex !bg-red-700 hover:!bg-red-500"
										onClick={() => deleteUserMutation.mutate(user.id)}
									>
										{
											deleteUserMutation.isPending ?
												<svg className="animate-spin -ml-1 w-5 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
													<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
													<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
												</svg> : <span>Confirm</span> 
										}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSetting;