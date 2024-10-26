const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"app/**/*.{ts,tsx}",
		"components/**/*.{ts,tsx}",
		"src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: "true",
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				// sans: ["var(--font-sans)", ...fontFamily.sans]
				sans: ["Satoshi", "sans-serif"],
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

/** @type {import('tailwindcss').Config} */
// export default {
// 	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
// 	theme: {
// 		extend: {},
// 	},
// 	plugins: [require("daisyui")],
// 	daisyui: {
// 		themes: [
// 			{
// 				mytheme: {
// 					"base-100": "#1d232a",
// 					"base-200": "#191e24",
// 					"base-300": "#15191e",
// 					"base-400": "#111418",
// 					"base-500": "#0e1115",
// 					"base-600": "#0a0d10",
// 					"base-700": "#07090c",
// 					"base-800": "#040507",
// 					"base-900": "#020203",
// 					primary: "#fefae0",
// 					secondary: "#dda15e",
// 					accent: "#bc6c25",
// 					neutral: "#2a323c",
// 					info: "#0277BD",
// 					success: "#558B2F",
// 					warning: "#EF6C00",
// 					error: "#D84315",
// 				},
// 			},
// 		],
// 		darkTheme: "dark", // name of one of the included themes for dark mode
// 		base: true, // applies background color and foreground color for root element by default
// 		styled: true, // include daisyUI colors and design decisions for all components
// 		utils: true, // adds responsive and modifier utility classes
// 		prefix: "", // prefix for daisyUI classnames ()
// 		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
// 		themeRoot: ":root", // The element that receives theme color CSS variables
// 	},
// };
