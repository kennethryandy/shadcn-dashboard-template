import { type ReactNode } from "react";
import type { TClassName } from "@/types";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

interface IProps {
	children: ReactNode;
	classname?: TClassName;
}

export default function Main({ children, classname }: IProps) {
	return (
		<main id="main" className={cn("flex flex-col flex-grow min-h-full py-16 lg:py-[5.5rem] px-4 w-full h-[200vh]", classname)}>
			{children}
		</main>
	);
}
