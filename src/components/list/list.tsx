import { cn } from "@/lib/utils";
import * as React from "react";

// ----------------------------------------------------------------------

interface ListProps extends React.ButtonHTMLAttributes<HTMLUListElement> {
	disablePadding?: boolean;
	subheader?: React.ReactNode;
}

const List = ({ children, disablePadding = false, subheader }: ListProps) => {
	return (
		<ul
			className={cn("list-none pt-2 relative", {
				"pt-0": disablePadding,
			})}>
			{subheader && subheader}
			{children}
		</ul>
	);
};

List.displayName = "List";

interface ListSubheaderProps extends React.ButtonHTMLAttributes<HTMLLIElement> {
	disablePadding?: boolean;
	disableSticky?: boolean;
}

const ListSubheader = ({ children, className, disablePadding = false, disableSticky = false }: ListSubheaderProps) => {
	return (
		<li
			className={cn("list-none box-border leading-[48px] appearance-none font-medium px-4 top-0 z-10", className, {
				"px-0": disablePadding,
				sticky: !disableSticky,
			})}>
			{children}
		</li>
	);
};

ListSubheader.displayName = "ListSubheader";

interface ListItemProps extends React.ButtonHTMLAttributes<HTMLLIElement> {
	dense?: boolean;
}

const ListItem = ({ children, className, dense = false }: ListItemProps) => {
	return (
		<li
			className={cn("flex items-center no-underline appearance-none text-left w-full relative box-border py-2 px-4", className, {
				"py-1": dense,
			})}>
			{children}
		</li>
	);
};

ListItem.displayName = "ListItem";

interface ListItemButtonProps extends React.HTMLAttributes<HTMLElement> {
	disablePadding?: boolean;
	component?: keyof JSX.IntrinsicElements;
}

const ListItemButton = ({ children, className, disablePadding, component = "button" }: ListItemButtonProps) => {
	const Comp = component;
	return (
		<Comp
			className={cn(
				"border-0 appearance-none outline-0 text-inherit select-none flex flex-grow align-middle cursor-pointer items-center no-underline min-w-0 box-border text-left transition-colors justify-start px-4 py-2 hover:bg-foreground/10",
				className,
				{
					"p-0": disablePadding,
				},
			)}>
			{children}
		</Comp>
	);
};

ListItemButton.displayName = "ListItemButton";

interface ListItemAvatarProps extends React.HTMLAttributes<HTMLElement> {
	disablePadding?: boolean;
	component?: keyof JSX.IntrinsicElements;
}

const ListItemAvatar = ({ children, className, disablePadding, component = "div" }: ListItemAvatarProps) => {
	const Comp = component;
	return (
		<Comp
			className={cn("shrink-0 min-w-14", className, {
				"p-0": disablePadding,
			})}>
			{children}
		</Comp>
	);
};

ListItemAvatar.displayName = "ListItemAvatar";

interface ListItemTextProps extends React.HTMLAttributes<HTMLElement> {
	component?: keyof JSX.IntrinsicElements;
	primary: React.ReactNode;
	secondary?: React.ReactNode;
	disableTypography?: boolean;
}

const ListItemText = ({ className, component = "li", primary, secondary, disableTypography = false }: ListItemTextProps) => {
	const Comp = component;
	return (
		<Comp className={cn("flex-auto min-w-0 my-1.5", className)}>
			{disableTypography && typeof primary === "string" ? (
				<span dangerouslySetInnerHTML={{ __html: primary }} />
			) : (
				<span>{primary}</span>
			)}
			{!!secondary && <p>{secondary}</p>}
		</Comp>
	);
};

ListItemText.displayName = "ListItemText";

export { List, ListItem, ListSubheader, ListItemButton, ListItemAvatar, ListItemText };
