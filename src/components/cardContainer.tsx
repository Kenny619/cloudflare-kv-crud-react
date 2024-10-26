import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type args = {
	title: string;
	description: string | React.ReactNode;
	children: React.ReactNode;
	footer: string | React.ReactNode;
};

export function CardContainer({ title, description, children, footer }: args) {
	return (
		<Card className="w-full px-6 rounded-md overflow-scroll">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter className="flex justify-between">{footer}</CardFooter>
		</Card>
	);
}
