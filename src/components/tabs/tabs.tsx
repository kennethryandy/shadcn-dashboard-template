import { type ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import Label from "../label";
import { ITabsOption } from ".";

// ----------------------------------------------------------------------

interface CustomTabsProps<T extends ITabsOption[]> {
	children?: ReactNode;
	options: ITabsOption[];
	value?: T[number]["value"];
	onChange?: (value: T[number]["value"]) => void;
}

export function CustomTabs<T extends ITabsOption[]>({ children, value, onChange, options }: CustomTabsProps<T>) {
	const handleChange = (value: string) => {
		if (!!onChange) {
			onChange(value as T[number]["value"]);
		}
	};
	return (
		<Tabs value={value} onValueChange={!!onChange ? handleChange : undefined} className="h-full border-b-[0.1rem]">
			<TabsList className="bg-transparent flex-wrap h-full p-0">
				{options.map((option) => {
					const variant = option?.icon?.variant || (option.value === value ? "contained" : "ghost");
					return (
						<TabsTrigger
							className="relative h-12 data-[state=active]:bg-transparent [&[data-state=active]>span]:text-common data-[state=active]:shadow-none before:content-[''] before:duration-150 before:transition-all before:absolute before:bottom-[-1px] before:h-[0.1rem] before:w-0 data-[state=active]:before:w-full before:bg-common space-x-1.5"
							key={option.value}
							value={option.value}>
							<span className="font-medium">{option.label}</span>
							{!!option.icon && (
								<Label className="label-icon" variant={variant} color={option.icon.color}>
									{option.icon.label}
								</Label>
							)}
						</TabsTrigger>
					);
				})}
			</TabsList>
			{children}
		</Tabs>
	);
}
