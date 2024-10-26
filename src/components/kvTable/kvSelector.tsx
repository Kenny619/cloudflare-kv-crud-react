import { useContext } from "react";
import { kvNameContext } from "@/components/kvTable/kvTableUnit";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
export const KVSelector = ({
	kvNames,
}: {
	kvNames: string[];
}) => {
	const [kvName, setKvName] = useContext(kvNameContext);
	return (
		<div className="flex flex-row items-center gap-2">
			<Label>KV Name</Label>
			<Select value={kvName} onValueChange={setKvName}>
				<SelectTrigger className="w-auto">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{kvNames.map((name) => (
						<SelectItem key={name} value={name} className="px-3">
							{name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
