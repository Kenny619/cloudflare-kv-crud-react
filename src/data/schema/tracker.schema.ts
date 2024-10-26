import { z } from "zod";

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

export default trackerSchema;
