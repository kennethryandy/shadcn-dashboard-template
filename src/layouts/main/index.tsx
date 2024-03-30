import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

// ----------------------------------------------------------------------

interface MainLayoutProps {
	children?: ReactNode;
	className?: string;
}

export default function MainLayout({ children, className }: MainLayoutProps) {
	return (
		<div className={cn("flex flex-col h-full", className)}>
			<main className="flex-grow">{children}</main>
		</div>
	);
}
