import { createDocumentMutation } from "@/lib/react-query/queries";

const EachDocCard = ({ index, ImgC, Name, SubTitle, isCreate }: EachDocCardProps) => {
	const documentMutation = createDocumentMutation(index);

	const handleClickTemplate = () => {
		documentMutation.mutate();
	}

	return (
		<div className="w-1/3 md:w-1/6">
			<div className="w-4/5 mx-auto">
				<div
					onClick={() => handleClickTemplate()}
					className="w-full rounded-sm containerStyles bg-white relative"
				>
					{
						documentMutation.isPending && 
						<div className='absolute top-[41%] left-[34%]'>
								<svg className="animate-spin w-8 text-violet-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
							</div> 
					}						
					<img src={ImgC} alt={`image- ${Name}`} className={`w-full ${isCreate && 'my-5'} ${documentMutation.isPending && 'opacity-40' }`} />
				</div>

				<div className="p-2">
					<div className="text-gray-900 font-bold text-xs">{Name}</div>
					<div className="text-sm text-gray-600">{SubTitle}</div>
				</div>
			</div>
		</div>
	);
};

export default EachDocCard;
