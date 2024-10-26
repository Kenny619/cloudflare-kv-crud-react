import { CardContainer } from "@/components/cardContainer";

export const SchemaGeneratorUnit = () => {
	return (
		<CardContainer title="KV Table" description="" footer="">
			<div className=" flex flex-col w-fit">
				<SchemaGeneratorTable />
			</div>
		</CardContainer>
	);
};
