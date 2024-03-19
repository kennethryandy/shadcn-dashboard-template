import { type ReactNode } from "react";
import type { TClassName } from "@/types";
import { cn } from "@/lib/utils";
// ----------------------------------------------------------------------

interface IProps {
	children?: ReactNode;
	className?: TClassName;
}

export default function Container({ children, className }: IProps) {
	return (
		<div className={cn("max-w-full w-full mx-auto box-border block px-4 2xl:max-w-screen-2xl sm:px-6", className)}>{children}</div>
	);
}
