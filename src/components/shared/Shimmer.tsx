import { Skeleton } from "../ui/skeleton";

const Shimmer = () => {
	return (
		<div className="flex flex-wrap">
			{
				Array(10).fill("").map((_e, i) => {
					return (
						<div key={i} className="w-1/2 md:w-1/4 lg:w-1/5 mt-1 mb-5">
							<div className="w-5/6 mx-auto">
								<Skeleton className="rounder-t-sm w-full h-44" />

								<div className="mt-2 p-1 flex justify-between items-center">
									<div className="flex flex-col w-4/5 overflow-hidden">
										<Skeleton className="w-24 h-5" />
										<div className=" flex h-fit items-center mt-2 whitespace-nowrap">
											<Skeleton className="rounded-full w-10 h-7 md:mr-2 mr-1" />
											<Skeleton className="w-full h-5" />
										</div>
									</div>
								</div>

							</div>
						</div>
					);
				})
			}
		</div>
	)
}

export default Shimmer