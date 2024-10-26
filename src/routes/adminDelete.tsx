import type { Context } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { adminTop } from "./adminTop";
const deleteSchema = z.object({
	id: z
		.string()
		.min(1)
		.regex(/^[0-9]+$/, { message: "Invalid ID" }),
});

export const deleteValidator = zValidator("form", deleteSchema, (result, c) => {
	console.log(result);
	if (!result.success) {
		return adminTop(
			c,
			result.error.errors.map((error) => error.message),
			result.data,
		);
	}
});

export const adminDelete = async (c: Context) => {
	const req = await c.req.parseBody();
	const deleteId = Number(req.id);
	const tracker = await c.env.KV_COLLECTIN.get("tracker");
	const updatedTracker = JSON.parse(tracker).filter(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(_: any, index: number) => index !== deleteId,
	);

	await c.env.KV_COLLECTIN.put("tracker", JSON.stringify(updatedTracker));

	return c.redirect("/admin");
};
