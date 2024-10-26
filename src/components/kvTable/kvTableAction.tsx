import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext, type Dispatch } from "react";
import { kvNameContext } from "./kvTableUnit";
import {
	DropdownMenu,
	DropdownMenuContent,
	// DropdownMenuGroup,
	DropdownMenuItem,
	// DropdownMenuLabel,
	// DropdownMenuPortal,
	// DropdownMenuSeparator,
	DropdownMenuShortcut,
	// DropdownMenuSub,
	// DropdownMenuSubContent,
	// DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
export function KVTableAction({
	index,
	setInputMode,
	dispatch,
}: {
	index: number;
	setInputMode: SetInputMode;
	dispatch: Dispatch<Action>;
}) {
	const [kvName] = useContext(kvNameContext);
	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">
						<Ellipsis />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuItem
						onClick={() => {
							setInputMode({ action: "edit", index });
						}}
					>
						Edit
						<DropdownMenuShortcut>e</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DialogTrigger asChild>
						<DropdownMenuItem>
							Delete
							<DropdownMenuShortcut>d</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. Are you sure you want to permanently
						delete this file from our servers?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							type="button"
							className="bg-accent"
							onClick={() => {
								setInputMode({ action: null });
							}}
						>
							Cancel
						</Button>
					</DialogClose>
					<Button
						type="submit"
						className="bg-destructive hover:bg-destructive/70"
						onClick={() => {
							setInputMode({ action: null });
							dispatch({
								type: "delete",
								payload: { schemaName: kvName, index: index },
							});
						}}
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
