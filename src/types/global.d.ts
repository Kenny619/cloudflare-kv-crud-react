declare global {
	type KVSchemaObject = {
		[key: string]: Schema;
	};
	type PrimitiveTypes = "string" | "number" | "boolean";
	type ValueTypes =
		| PrimitiveTypes
		| readonly string[]
		| readonly number[]
		| readonly boolean[]
		| null;

	type SchemaItem<T extends ValueTypes = ValueTypes> = {
		name: readonly string;
		valueType: T;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		defaultValue?: T extends readonly any[] ? readonly T[number] : readonly T;
		zod: z.ZodType;
		required: boolean;
		nullable: boolean;
		creatable: boolean;
		editable: boolean;
	};
	type Schema = readonly SchemaItem[];

	type DataSchemaEntry =
		| SchemaItem<ValueTypes>
		| SchemaItem<readonly string[]>
		| SchemaItem<readonly number[]>
		| SchemaItem<readonly boolean[]>;

	type Nullable<T, N extends boolean> = N extends true ? T | null : T;

	type InferValueType<V, N extends boolean> = V extends PrimitiveTypes
		? Nullable<
				V extends "string"
					? string
					: V extends "number"
						? number
						: V extends "boolean"
							? boolean
							: never,
				N
			>
		: V extends readonly (string | number | boolean)[]
			? Nullable<V[number], N>
			: never;

	type InferDataSchema<T extends readonly DataSchemaEntry[]> = {
		[K in T[number] as K["name"]]: InferValueType<
			K["valueType"],
			K["nullable"]
		>;
	};

	//table reducer
	export type dataAction = "add" | "edit" | "delete" | null;
	export type Action = {
		type: dataAction;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		payload: { schemaName: string; data?: any; index?: number };
	};

	//InputMode
	export type InputMode = { action: "add" | "edit" | null; index?: number };
	export type SetInputMode = (mode: InputMode) => void;
}

export {};
