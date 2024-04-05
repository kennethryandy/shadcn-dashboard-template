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
	variants: {
		extends: {
			backgroundOpacity: ["active"],
		},
	},
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
			opacity: {
				"12": "0.12",
				"24": "0.24",
				"36": "0.36",
			},
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				disabled: "hsl(var(--disabled) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
					dark: "hsl(var(--primary-dark) / <alpha-value>)",
					light: "hsl(var(--primary-light) / <alpha-value>)",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
					dark: "hsl(var(--secondary-dark) / <alpha-value>)",
				},
				info: {
					DEFAULT: "hsl(var(--info) / <alpha-value>)",
					foreground: "hsl(var(--info-foreground) / <alpha-value>)",
					dark: "hsl(var(--info-dark) / <alpha-value>)",
				},
				success: {
					DEFAULT: "hsl(var(--success) / <alpha-value>)",
					foreground: "hsl(var(--success-foreground) / <alpha-value>)",
					dark: "hsl(var(--success-dark) / <alpha-value>)",
				},
				warning: {
					DEFAULT: "hsl(var(--warning) / <alpha-value>)",
					foreground: "hsl(var(--warning-foreground) / <alpha-value>)",
					dark: "hsl(var(--warning-dark) / <alpha-value>)",
				},
				error: {
					DEFAULT: "hsl(var(--error) / <alpha-value>)",
					foreground: "hsl(var(--error-foreground) / <alpha-value>)",
					dark: "hsl(var(--error-dark) / <alpha-value>)",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)",
				},
				common: {
					DEFAULT: "hsl(var(--common) / <alpha-value>)",
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
