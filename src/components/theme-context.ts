import { createContext } from "react";

type Theme = "dark" | "light" | "system";

export type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

export const initialState: ThemeProviderState = {
	theme: "system",
	setTheme: () => null,
};

// Move this line outside of the ThemeProvider function
export const ThemeProviderContext =
	createContext<ThemeProviderState>(initialState);
