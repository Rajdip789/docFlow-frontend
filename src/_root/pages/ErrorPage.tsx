import { Link } from "react-router-dom";
import errorPage from "@/assets/errorPage.png";

const ErrorPage = () => {
	return (
		<div className="h-screen w-screen flex justify-center items-center bg-violet-100 flex-col">
			<div className="w-5/6 h-1/2">
				<img
					src={errorPage}
					alt="error page pic"
					className="h-full mx-auto object-contain"
				/>
			</div>
			<div className="w-5/6 text-center">
				<h1 className="md:text-3xl text-2xl md:tracking-[0.5rem]  font-extrabold text-violet-700 mx-auto my-5 md:my-10">
					Ooops! 404 Page Not Found
				</h1>
				<Link
					to="/home"
					className="hover:bg-violet-700 bg-transparent hover:shadow-md hover:md:shadow-lg border-2 border-solid border-violet-700 text-violet-700 px-3 py-1 md:px-5 md:py-2 md:border-4 md:text-xl text-lg md:tracking-[0.1rem] font-semibold rounded-full hover:text-white">
					BACK TO HOME
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;