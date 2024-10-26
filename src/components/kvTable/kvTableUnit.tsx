import { useState, createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import { CardContainer } from "@/components/cardContainer";
import { KVSelector } from "@/components/kvTable/kvSelector";
import { KVTable } from "@/components/kvTable/kvTable";
import { KVSchemaObjects } from "@/data/schema/all.schema";

//create context for kvName
export const kvNameContext = createContext<
	[string, Dispatch<SetStateAction<string>>]
>(["", () => {}]);

export const KVTableUnit = () => {
	//set first item in KVSchemaObjects as default
	const kvNames = Object.keys(KVSchemaObjects);
	const defaultKV = kvNames[0];
	const [kvName, setKvName] = useState<string>(defaultKV);
	//exit if KVSchemaObjects is empty
	if (Object.keys(KVSchemaObjects).length === 0) return null;

	return (
		<kvNameContext.Provider value={[kvName, setKvName]}>
			<CardContainer title="KV Table" description="" footer="">
				<div className=" flex flex-col w-fit">
					<div className="flex justify-end items-end">
						<KVSelector kvNames={kvNames} />
					</div>
					<KVTable />
				</div>
			</CardContainer>
		</kvNameContext.Provider>
	);
};
