// ----------------------------------------------------------------------

export { CustomTabs as Tabs } from "./tabs";
export { CustomTab as Tab } from "./tab";
export { CustomScrollableTabs as ScrollableTabs } from "./scrollable-tabs";

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
