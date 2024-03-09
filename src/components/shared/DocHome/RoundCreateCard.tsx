import { createDocumentMutation } from "@/lib/react-query/queries";

const RoundCreateCard = () => {
	const documentMutation = createDocumentMutation(0);

	const handleClickTemplate = () => {
		documentMutation.mutate();
	}

	return (
		<div
			onClick={() => handleClickTemplate()}
			className="cursor-pointer bg-white w-12 h-12 md:w-16 md:h-16 lg:w-16 lg:h-16 rounded-full border md:border-2 shadow-lg hover:border-violet-600 overflow-hidden z-50 fixed bottom-10 right-10"
		>
			<img src="./plus.png" alt="round Create img" className="w-full h-full" />
		</div>
	);
};

export default RoundCreateCard;
