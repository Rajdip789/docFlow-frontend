import AllDocBody from "@/components/shared/DocHome/AllDocBody"
import AllDocHeader from "@/components/shared/DocHome/AllDocHeader"
import AppDataProvider from "@/context/AppDataProvider";

const UserDocs = () => {
	return (
		<AppDataProvider>
			<div className="h-screen w-full flex flex-col text-sm md:text-base !overflow-y-scroll">
				<AllDocHeader />
				<AllDocBody />
			</div>
		</AppDataProvider>
	)
}

export default UserDocs
