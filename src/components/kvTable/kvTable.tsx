import { useReducer, useState, useContext } from "react";
import { LiaPlusCircleSolid } from "react-icons/lia";
import { KVSchemaObjects } from "@/data/schema/all.schema";
import { dataActionReducer } from "@/components/kvTable/kvDataReducer";
import { kv } from "@/data/fn/kv.handler";
import { KVTableAction } from "@/components/kvTable/kvTableAction";
import { KVTableInputRow } from "@/components/kvTable/kvTableInputRow";
import { kvNameContext } from "./kvTableUnit";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	// TableCaption,
	TableCell,
	// TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const KVTable = () => {
	//manage input mode state
	//add - hide new item button and displays new item input
	//edit - displays edit input fields and replaces action button (..) with update/cancel button
	//null - default state.  Displays both new item button and action button.  No input fields.
	const [inputMode, setInputMode] = useState<{
		action: "add" | "edit" | null;
		index?: number;
	}>({ action: null });

	//defines KVSchema of currently selected KV
	const [kvName] = useContext(kvNameContext);
	const KVSchemaValue = KVSchemaObjects[kvName];
	type KVSchemaType = typeof KVSchemaValue;
	type DataItemType = InferDataSchema<KVSchemaType>;

	const [data, dispatch] = useReducer(dataActionReducer, kv.get(kvName));

	return (
		<>
			<div className="overflow-x-auto">
				{inputMode.action === null && (
					<Button
						type="button"
						className="rounded-md my-5  "
						onClick={() => setInputMode({ action: "add" })}
					>
						<span className="flex flex-row gap-2">
							<LiaPlusCircleSolid size={20} /> New Item
						</span>
					</Button>
				)}
				<Table className="w-fit border-collapse">
					<TableHeader>
						<TableRow>
							{KVSchemaValue.map((item: SchemaItem) => (
								<TableHead
									key={`header-${item.name}`}
									className="text-left items-start pr-24"
								>
									{item.name}
								</TableHead>
							))}
							<TableHead className="text-left items-start whitespace-nowrap">
								Action
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{inputMode.action === "add" && (
							<TableRow key="new">
								<KVTableInputRow
									dispatch={dispatch}
									inputMode={inputMode}
									setInputMode={setInputMode}
								/>
							</TableRow>
						)}

						{data.map((item: DataItemType, index: number) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<TableRow key={`data-${index}`}>
								{inputMode.action === "edit" && inputMode.index === index ? (
									<KVTableInputRow
										dispatch={dispatch}
										inputMode={inputMode}
										setInputMode={setInputMode}
										index={index}
									/>
								) : (
									KVSchemaValue.map((schemaItem: SchemaItem) => (
										<TableCell
											className="text-sm text-left whitespace-nowrap"
											key={`${schemaItem.name}-${item[schemaItem.name]}`}
										>
											{item[schemaItem.name]}
										</TableCell>
									))
								)}
								{inputMode.action === null && (
									<TableCell className="text-left items-start whitespace-nowrap">
										<div className="flex flex-row">
											<KVTableAction
												index={index}
												setInputMode={setInputMode}
												dispatch={dispatch}
											/>
										</div>
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};
