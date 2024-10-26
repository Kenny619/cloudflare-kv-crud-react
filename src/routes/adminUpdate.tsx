import type { Context } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { adminTop } from "./adminTop";
const updateSchema = z.object({
	accountName: z.string().min(1, { message: "Account name is required" }),
	service: z.enum(["Instagram", "TikTok"], {
		message: "Invalid Service",
	}),
	lastAccessed: z
		.string()
		.regex(/^[0-9]+$|^null$/, { message: "Invalid Last Accessed" }),
	lastAccessedId: z
		.string()
		.regex(/^[0-9]+$|^null$/, { message: "Invalid Last Accessed ID" }),
	status: z.enum(["active", "inactive"], { message: "Invalid Status" }),
});

export const updateValidator = zValidator("form", updateSchema, (result, c) => {
	console.log(result);
	if (!result.success) {
		return adminTop(
			c,
			result.error.errors.map((error) => error.message),
			result.data,
		);
	}
});

export const adminUpdate = async (c: Context) => {
	const updatedItem = await c.req.parseBody();
	const id = Number(updatedItem.id);
	// biome-ignore lint/performance/noDelete: <explanation>
	delete updatedItem.id;
	const tracker = await c.env.KV_COLLECTIN.get("tracker");
	const trackerRest = JSON.parse(tracker).filter(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(item: any, index: number) => index !== id,
	);

	await c.env.KV_COLLECTIN.put(
		"tracker",
		JSON.stringify([...trackerRest, updatedItem]),
	);

	return c.redirect("/admin");
};
