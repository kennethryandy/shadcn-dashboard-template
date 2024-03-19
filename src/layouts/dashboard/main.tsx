import { type ReactNode } from "react";
import type { TClassName } from "@/types";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

interface IProps {
	children: ReactNode;
	classname?: TClassName;
	navExpanded: boolean;
}

export default function Main({ children, classname, navExpanded }: IProps) {
	return <main className={cn("flex flex-col flex-grow min-h-full py-16 lg:py-20 px-4 w-full", classname)}>{children}</main>;
}
