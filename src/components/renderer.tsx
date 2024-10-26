import { jsxRenderer } from "hono/jsx-renderer";
import { Header } from "./header";
import { Footer } from "./footer";
export const renderer = jsxRenderer(async ({ children }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link href="/css/main.css" rel="stylesheet" />
				<title>Document</title>
			</head>
			<body className="bg-base-100">
				<Header />
				<main className="flex flex-col justify-start items-center h-svh container mx-auto p-20">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
});
