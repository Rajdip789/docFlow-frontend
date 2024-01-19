import { Link } from "react-router-dom";

const RoundCreateCard = () => {
	return (
		<div className="cursor-pointer w-12 h-12 md:w-16 md:h-16  lg:w-24 lg:h-24 rounded-full border md:border-2 shadow-lg hover:border-violet-600 overflow-hidden z-50 fixed bottom-10 right-10">
			<Link to="/document/12345">
				<img src="./plus.png" alt="round Create img" className="w-full h-full" />
			</Link>
		</div>
	);
};

export default RoundCreateCard;
