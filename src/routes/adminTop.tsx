import type { Context } from "hono";
import { Card } from "../components/ui/card";
import { Table } from "../components/kvTable/kvTable";
import trackerSchema from "../data/schema/tracker.schema";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const adminTop = async (c: Context, errMsg?: string[], data?: any) => {
	// await c.env.KV_COLLECTIN.put(
	// 	"tracker",
	// 	JSON.stringify([
	// 		{
	// 			accountName: "emilimisumi",
	// 			service: "Instagram",
	// 			lastAccessed: 1728097408570,
	// 			lastAccessedId: "3277807251907971645",
	// 			status: "active",
	// 		},
	// 	]),
	// );
	const tracker = await c.env.KV_COLLECTIN.get("tracker");
	return c.render(
		<Card title="Collectin Tracker" description="" footer="">
			<Table schema={trackerSchema} data={JSON.parse(tracker)} />
		</Card>,
	);
};
