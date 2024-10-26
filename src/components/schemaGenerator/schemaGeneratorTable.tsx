import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	// TableCaption,
	TableCell,
	// TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const SchemaGeneratorTable = () => {
	return (
		<>
			<div className="overflow-x-auto">
				<Table className="w-fit border-collapse">
					<TableBody>
						<TableRow key="name">
							<TableCell>Name</TableCell>
							<TableCell> </TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</>
	);
};
