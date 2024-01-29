import { templateDetails } from "@/assets/ConstantTemp";
import EachDocCard from "./EachDocCard";

const TemplatePartOne = () => {
	return (
		<div className="flex flex-wrap justify-start w-full">
			{
				templateDetails[0].map((each, i) => (
					<EachDocCard
						DocId={"id" + i}
						ImgC={each.img}
						Name={each.name}
						SubTitle={each.subtitile}
						key={0 * 10 + i}
						isCreate={i ? false : true}
					/>
				)
				)
			}
		</div>
	);
};

export default TemplatePartOne;
