import { ModeToggle } from "./mode-toggle";
export const Header = () => {
	return (
		<div className="bg-background fixed z-50 h-14 w-full">
			<div className="flex items-center justify-start h-full pl-6">
				<a href="/" className="text-xl font-bold ">
					KV
				</a>
				<div className="flex items-end ml-auto pr-6">
					<ModeToggle />
				</div>
			</div>
		</div>
	);
};
