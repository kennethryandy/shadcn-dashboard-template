import type { ComponentPropsWithoutRef } from "react";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

interface CustomTabProps extends ComponentPropsWithoutRef<typeof TabsList> {
	value: string;
	triggerProps?: Omit<ComponentPropsWithoutRef<typeof TabsTrigger>, "value">;
}

export function CustomTab({ children, triggerProps = {}, value = "", ...props }: CustomTabProps) {
	return (
		<TabsList {...props} className={cn("bg-transparent flex-wrap h-full p-0", props.className)}>
			<TabsTrigger
				{...triggerProps}
				value={value}
				className={cn(
					"relative data-[state=active]:bg-transparent [&[data-state=active]>span]:text-common data-[state=active]:shadow-none before:content-[''] before:duration-150 before:transition-all before:absolute before:bottom-[-1px] before:h-[0.1rem] before:w-0 data-[state=active]:before:w-full before:bg-common space-x-1.5",
					triggerProps?.className,
				)}>
				{children}
			</TabsTrigger>
		</TabsList>
	);
}
