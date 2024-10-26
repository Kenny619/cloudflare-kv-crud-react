import { z } from "zod";

type PrimitiveTypes = "string" | "number" | "boolean";
type ValueTypes =
	| PrimitiveTypes
	| readonly string[]
	| readonly number[]
	| readonly boolean[]
	| null;

type SchemaItem<T extends ValueTypes = ValueTypes> = {
	name: string;
	valueType: T;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	defaultValue?: T extends readonly any[] ? T[number] : T;
	zod: z.ZodType;
	required: boolean;
	nullable: boolean;
	creatable: boolean;
	editable: boolean;
};
type Schema = SchemaItem[];

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
	[K in T[number] as K["name"]]: InferValueType<K["valueType"], K["nullable"]>;
};

const trackerSchema = [
	{
		name: "accountName",
		valueType: "string" as const,
		required: true,
		zod: z.string().min(2, {
			message: "Account name is required and at least 2 characters",
		}),
		nullable: false,
		creatable: true,
		editable: true,
	},
	{
		name: "service",
		valueType: ["Instagram", "TikTok"] as const,
		required: true,
		zod: z.string().refine((value) => ["Instagram", "TikTok"].includes(value), {
			message: "Invalid service value",
		}),
		creatable: true,
		editable: true,
		nullable: false,
		defaultValue: "Instagram" as const,
	},
	{
		name: "lastAccessed",
		valueType: "number" as const,
		required: true,
		zod: z
			.string()
			.regex(/^\d+|null$/, { message: "Value must be either null or a number" })
			.nullable(),
		creatable: false,
		editable: false,
		nullable: true,
		defaultValue: null,
	},
	{
		name: "lastAccessedId",
		valueType: "string" as const,
		required: true,
		nullable: true,
		zod: z
			.string()
			.regex(/^\d+$|null$/, {
				message: "Value must be either null or number",
			})
			.nullable(),
		creatable: false,
		editable: false,
		defaultValue: null,
	},
	{
		name: "status",
		valueType: ["active", "inactive"] as const,
		required: true,
		nullable: false,
		zod: z.string().refine((value) => ["active", "inactive"].includes(value), {
			message: "Invalid status value",
		}),
		creatable: true,
		editable: true,
		defaultValue: "active",
	},
] as const;

type TrackerSchema = typeof trackerSchema;
type TrackerData = InferDataSchema<TrackerSchema>;
