import { FaGlobeAmericas } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const ShareModal = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="flex flex-row justify-around items-center w-28 p-1 md:p-2 rounded-full cursor-pointer bg-violet-200">
					<FaGlobeAmericas size={16} />
					<span className="font-normal">Share</span>
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Share document - ""</DialogTitle>
					<DialogDescription>
						Edit permissions. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<Input id="name" value="Pedro Duarte" className="col-span-3" />
				{/* <div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input id="name" value="Pedro Duarte" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Username
						</Label>
						<Input id="username" value="@peduarte" className="col-span-3" />
					</div>
				</div> */}
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ShareModal

