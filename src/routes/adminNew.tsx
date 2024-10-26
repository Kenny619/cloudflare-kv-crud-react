import type { Context } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { adminTop } from "./adminTop";
const newSchema = z.object({
	accountName: z.string().min(1, { message: "Account name is required" }),
	service: z.enum(["Instagram", "TikTok"], {
		message: "Invalid Service",
	}),
	lastAccessed: z.literal("null"),
	lastAccessedId: z.literal("null"),
	status: z.enum(["active", "inactive"], { message: "Invalid Status" }),
});

export const newValidator = zValidator("form", newSchema, (result, c) => {
	console.log(result);
	if (!result.success) {
		return adminTop(
			c,
			result.error.errors.map((error) => error.message),
			result.data,
		);
	}
});

export const adminNew = async (c: Context) => {
	const newItem = await c.req.parseBody();
	const tracker = await c.env.KV_COLLECTIN.get("tracker");

	await c.env.KV_COLLECTIN.put(
		"tracker",
		JSON.stringify([...JSON.parse(tracker), newItem]),
	);

	return c.redirect("/admin");
};
