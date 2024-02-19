import { Link } from 'react-router-dom';

import { CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoDocumentTextOutline, IoSettingsOutline } from "react-icons/io5";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

import { createLogoutMutation } from '@/lib/react-query/queries';
import useAuth from '@/hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();
	const logoutMutation = createLogoutMutation();

	return (
		<div>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger className="rounded-full">
					<Avatar className="hover:border-2">
						<AvatarImage src={user.imageUrl}/>
						<AvatarFallback className='text-violet-600 font-bold capitalize'>{ user.username[0] }</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>

				<DropdownMenuContent className='w-40'>
					<DropdownMenuLabel className='capitalize text-violet-600'>{user.username}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<Link to="/profile">
						<DropdownMenuItem className="flex items-center cursor-pointer">
							<CgProfile className="size-5 mr-2" />
							Profile
						</DropdownMenuItem>
					</Link>
					<DropdownMenuItem className="flex items-center cursor-pointer">
						<IoDocumentTextOutline className="size-5 mr-2" /> All Documents
					</DropdownMenuItem>
					<DropdownMenuItem className="flex items-center cursor-pointer">
						<IoSettingsOutline className="size-5 mr-2" />
						Notifications
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					{/* Alert Dialog for Logout*/}
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<DropdownMenuItem
								onSelect={(e) => e.preventDefault()}
								className="hover:!bg-violet-600 hover:!text-white flex items-center cursor-pointer">
								<CiLogin className="size-5 mr-2" />
								Log Out
							</DropdownMenuItem>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Logout</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to logout?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel className="hover:text-gray-800 hover:border-violet-500 text-violet-800">
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}>
									{
										logoutMutation.isPending ?
										<>
											<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											Wait...
										</> : <span>Confirm</span>
									}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
					
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default Profile;