import AllDocBody from "@/components/shared/DocHome/AllDocBody"
import AllDocHeader from "@/components/shared/DocHome/AllDocHeader"
import AppDataProvider from "@/context/AppdataProvider";

const UserDocs = () => {
	return (
		<AppDataProvider>
			<div className="h-screen w-full flex flex-col text-sm md:text-base">
				<AllDocHeader />
				<AllDocBody />
			</div>
		</AppDataProvider>
	)
}

export default UserDocs
