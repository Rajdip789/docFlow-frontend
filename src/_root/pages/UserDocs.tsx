import AllDocBody from "@/components/shared/DocHome/AllDocBody"
import AllDocHeader from "@/components/shared/DocHome/AllDocHeader"
import HiddenTemplateProvider from "@/context/HiddenTemplateProvide"

const UserDocs = () => {
	return (
		<HiddenTemplateProvider>
			<div className="h-screen w-full flex flex-col text-sm md:text-base">
				<AllDocHeader />
				<AllDocBody />
			</div>
		</HiddenTemplateProvider>
	)
}

export default UserDocs
