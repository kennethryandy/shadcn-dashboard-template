// ----------------------------------------------------------------------

export { default as Tabs } from "./tabs";

export interface ITabsOption {
	value: string;
	label: string;
	icon?: TLabelIcon;
}

export type TLabelIcon = {
	label: string | number;
	color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
	variant?: "contained" | "outlined" | "ghost";
};
