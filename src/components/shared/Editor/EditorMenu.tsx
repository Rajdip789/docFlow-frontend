import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar"


const EditorMenu = () => {
	return (
		<Menubar className="bg-inherit border-none h-6 p-0">
			<MenubarMenu>
				<MenubarTrigger className="cursor-pointer">File</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						New Tab
					</MenubarItem>
					<MenubarItem>
						New Window
					</MenubarItem>
					<MenubarSeparator />
					<MenubarSub>
						<MenubarSubTrigger>Share</MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem>Email</MenubarItem>
							<MenubarItem>Link</MenubarItem>
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
							<MenubarItem>Search the web</MenubarItem>
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
					<MenubarItem inset>
						Reload
					</MenubarItem>
					<MenubarItem disabled inset>
						Force Reload
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem inset>Toggle Fullscreen</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger className="cursor-pointer">Profile</MenubarTrigger>
				<MenubarContent>
					<MenubarSeparator />
					<MenubarItem inset>View</MenubarItem>
					<MenubarItem inset>Edit...</MenubarItem>
					<MenubarSeparator />
					<MenubarItem inset>Delete</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	)
}

export default EditorMenu