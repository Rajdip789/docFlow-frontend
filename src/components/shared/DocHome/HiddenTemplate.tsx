import { useContext } from "react";

import EachDocCard from "./EachDocCard";
import { HiddenTemplateContext } from "@/context/HiddenTemplateProvide";
import { templateDetails } from "@/assets/ConstantTemp";

const HiddenTemplate = () => {
	const { hiddenTempValue } = useContext(HiddenTemplateContext);

	return (
		<div className={hiddenTempValue ? "block" : "hidden "}>
			<div>
				<div className="text-md py-3 px-5 font-semibold">CVs</div>
				<div className="flex flex-wrap">
					{
						templateDetails[1].map((each, i) => (
							<EachDocCard
								ImgC={each.img}
								Name={each.name}
								SubTitle={each.subtitile}
								key={1 * 10 + i}
								isCreate={false}
							/>
						)
						)
					}
				</div>
			</div>
			<div>
				<div className="text-md py-3 px-5 font-semibold">Letter</div>
				<div className="flex flex-wrap">
					{
						templateDetails[2].map((each, i) => (
							<EachDocCard
								ImgC={each.img}
								Name={each.name}
								SubTitle={each.subtitile}
								key={2 * 10 + i}
								isCreate={false}
							/>
						)
						)
					}
				</div>
			</div>
			<div>
				<div className="text-md py-3 px-5 font-semibold">Personal</div>
				<div className="flex flex-wrap">
					{
						templateDetails[3].map((each, i) => (
							<EachDocCard
								ImgC={each.img}
								Name={each.name}
								SubTitle={each.subtitile}
								key={3 * 10 + i}
								isCreate={false}
							/>
						)
						)
					}
				</div>
			</div>
			<div>
				<div className="text-md py-3 px-5 font-semibold">Works</div>
				<div className="flex flex-wrap">
					{
						templateDetails[4].map((each, i) => (
							<EachDocCard
								ImgC={each.img}
								Name={each.name}
								SubTitle={each.subtitile}
								key={4 * 10 + i}
								isCreate={false}
							/>
						)
						)
					}
				</div>
			</div>
			<div>
				<div className="text-md py-3 px-5 font-semibold">Educational</div>
				<div className="flex flex-wrap">
					{
						templateDetails[5].map((each, i) => (
							<EachDocCard
								ImgC={each.img}
								Name={each.name}
								SubTitle={each.subtitile}
								key={5 * 10 + i}
								isCreate={false}
							/>
						)
						)
					}
				</div>
			</div>
		</div>
	);
};

export default HiddenTemplate;
