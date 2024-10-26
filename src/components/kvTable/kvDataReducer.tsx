import { kv } from "@/data/fn/kv.handler";

//action handler reducer
export const dataActionReducer = (
	_: InferDataSchema<KVSchemaObject[typeof action.payload.schemaName]>[],
	action: Action,
): InferDataSchema<KVSchemaObject[typeof action.payload.schemaName]>[] => {
	if (action.type === "add") {
		console.log("running kv.add");
		return kv.add(action.payload.schemaName, action.payload.data);
	}
	if (action.type === "edit") {
		return kv.edit(
			action.payload.schemaName,
			action.payload.index as number,
			action.payload.data,
		);
	}
	if (action.type === "delete") {
		return kv.delete(action.payload.schemaName, action.payload.index as number);
	}
	return kv.get(action.payload.schemaName);
};
