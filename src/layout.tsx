import { Header } from "./components/header";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<div className="h-14"> </div>
			<main className="flex flex-col justify-start items-center h-svh container mx-auto p-10 ">
				{children}
			</main>
		</>
	);
}
