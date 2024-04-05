import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const twPlugins = plugin(function ({ matchUtilities, theme }) {
	matchUtilities(
		{
			"translate-z": (value) => ({
				"--tw-translate-z": value,
				transform: `translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
			}),
		},
		{
			values: theme("translate"),
			supportsNegativeValues: true,
		},
	);
});

const config = {
	darkMode: ["class"],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		screens: defaultTheme.screens,
		extend: {
			fontSize: {
				"font-inherit": "inherit",
			},
			backgroundSize: {
				full: "100%",
			},
			colors: {
				border: "hsl(var(--border) / var(--tw-border-opacity))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				disabled: "hsl(var(--disabled))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
					dark: "hsl(var(--primary-dark))",
					light: "hsl(var(--primary-light))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
					dark: "hsl(var(--secondary-dark))",
				},
				info: {
					DEFAULT: "hsl(var(--info))",
					foreground: "hsl(var(--info-foreground))",
					dark: "hsl(var(--info-dark))",
				},
				success: {
					DEFAULT: "hsl(var(--success))",
					foreground: "hsl(var(--success-foreground))",
					dark: "hsl(var(--success-dark))",
				},
				warning: {
					DEFAULT: "hsl(var(--warning))",
					foreground: "hsl(var(--warning-foreground))",
					dark: "hsl(var(--warning-dark))",
				},
				error: {
					DEFAULT: "hsl(var(--error))",
					foreground: "hsl(var(--error-foreground))",
					dark: "hsl(var(--error-dark))",
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
				common: {
					DEFAULT: "hsl(var(--common))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				inherit: "inherit",
			},
			transformOrigin: {
				"left-right": "0% 50%",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				progress: {
					"0%": { transform: " translateX(0) scaleX(0)" },
					"40%": { transform: "translateX(0) scaleX(0.4)" },
					"100%": { transform: "translateX(100%) scaleX(0.5)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				progress: "progress 1s infinite linear",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), twPlugins],
} satisfies Config;

export default config;
