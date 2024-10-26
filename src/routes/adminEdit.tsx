import type { Context } from "hono";
import { Card } from "../components/ui/card";
import { Table } from "../components/kvTable/kvTable";
import trackerSchema from "../data/schema/tracker.schema";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { adminTop } from "./adminTop";
const editSchema = z.object({
	id: z
		.string()
		.min(1)
		.regex(/^[0-9]+$/, { message: "Invalid ID" }),
});

export const editValidator = zValidator("form", editSchema, (result, c) => {
	if (!result.success) {
		return adminEdit(
			c,
			result.error.errors.map((error) => error.message),
			result.data,
		);
	}
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const adminEdit = async (c: Context, errMsg?: string[], data?: any) => {
	const req = await c.req.parseBody();
	const id = Number(req.id);
	const tracker = await c.env.KV_COLLECTIN.get("tracker");
	return c.render(
		<Card title="Collectin Tracker" description="" footer="">
			<Table schema={trackerSchema} data={JSON.parse(tracker)} editId={id} />
		</Card>,
	);
};
