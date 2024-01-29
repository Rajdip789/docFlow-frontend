const Shimmer = () => {
	return (
		<div className="flex flex-wrap">
			{
				Array(10).fill("").map((_e, i) => {
					return (
						<div key={i} className="animate-pulse w-1/2 md:w-1/4 lg:w-1/5 mt-1 mb-5">
							<div className="w-5/6 mx-auto">
								<div className="bg-violet-100 rounded-md w-full h-44"></div>

								<div className="mt-2 p-1 flex justify-between items-center">
									<div className="flex flex-col w-4/5 overflow-hidden">
										<div className="bg-violet-100 rounded-sm w-24 h-5"></div>
										<div className=" flex h-fit items-center mt-2 whitespace-nowrap">
											<div className="bg-violet-100 rounded-full w-10 h-7 md:mr-2 mr-1"></div>
											<div className="bg-violet-100 rounded-sm w-full h-5"></div>
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