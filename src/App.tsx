import { Layout } from "@/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { KVTableUnit } from "@/components/kvTable/kvTableUnit";
function App() {
	//states

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Layout>
				<KVTableUnit />
			</Layout>
		</ThemeProvider>
	);
}

export default App;
