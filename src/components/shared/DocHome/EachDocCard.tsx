import { Link } from "react-router-dom";

const EachDocCard = ({ ImgC, Name, SubTitle, isCreate }: SaveDocCardProps) => {
	return (
		<div className="w-1/3 md:w-1/6">
			<div className="w-4/5 mx-auto">
				{
					isCreate ?
					<Link to="/document/12345">
						<div className="w-full rounded-sm containerStyles bg-white">
							<img src={ImgC} alt={`image- ${Name}`} className="w-full my-5" />
						</div> 
					</Link>
					:
					<div className="w-full rounded-sm containerStyles bg-white">
						<img src={ImgC} alt={`image- ${Name}`} className="w-full" />
					</div>
				}
				<div className="p-2">
					<div className="text-gray-900 font-bold text-xs">{Name}</div>
					<div className="text-sm text-gray-600">{SubTitle}</div>
				</div>
			</div>
		</div>
	);
};

export default EachDocCard;
