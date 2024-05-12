import { useState } from "react";
import { Link } from "react-router-dom"

import { createDocumentMutation } from "@/lib/react-query/queries";
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar"

const EditorMenu = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const [fullScreen, setFullScreen] = useState(false);
	const documentMutation = createDocumentMutation(0);

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
			<MenubarMenu>
				<MenubarTrigger className="cursor-pointer">File</MenubarTrigger>
				<MenubarContent>
					<MenubarItem onClick={() => documentMutation.mutate()}>
						New
					</MenubarItem>
					<MenubarItem onClick={() => window.open(`/home`, '_blank')}>
						New Window
					</MenubarItem>
					<MenubarSeparator />
					<MenubarSub>
						<MenubarSubTrigger>Share</MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem onClick={() => setOpen((state) => !state)}>Email</MenubarItem>
							<MenubarItem onClick={() => setOpen((state) => !state)}>Link</MenubarItem>
						</MenubarSubContent>
					</MenubarSub>
					<MenubarSeparator />
					<MenubarItem>
						Print...
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger className="cursor-pointer">Edit</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						Undo
					</MenubarItem>
					<MenubarItem>
						Redo
					</MenubarItem>
					<MenubarSeparator />
					<MenubarSub>
						<MenubarSubTrigger>Find</MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem onClick={() => window.open('https://google.com')}>Search the web</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>Find...</MenubarItem>
						</MenubarSubContent>
					</MenubarSub>
					<MenubarSeparator />
					<MenubarItem>Cut</MenubarItem>
					<MenubarItem>Copy</MenubarItem>
					<MenubarItem>Paste</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger className="cursor-pointer">View</MenubarTrigger>
				<MenubarContent>
					<MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
					<MenubarCheckboxItem checked>
						Always Show Full URLs
					</MenubarCheckboxItem>
					<MenubarSeparator />
					<MenubarItem inset onClick={() => window.location.reload()}>
						Reload
					</MenubarItem>
					<MenubarItem disabled inset onClick={() => location.reload()}>
						Force Reload
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem inset onClick={handleToggleFullScreen}>Toggle Fullscreen</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger className="cursor-pointer">Profile</MenubarTrigger>
				<MenubarContent>
					<MenubarSeparator />
					<Link to="/profile">
						<MenubarItem inset>View</MenubarItem>
					</Link>
					<Link to="/profile">
						<MenubarItem inset>Edit...</MenubarItem>
					</Link>
					<MenubarSeparator />
					<Link to="/profile">
						<MenubarItem inset>Delete</MenubarItem>
					</Link>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	)
}

export default EditorMenu