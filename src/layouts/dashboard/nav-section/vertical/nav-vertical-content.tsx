import { HTMLAttributes } from "react";
import type { INavData } from "@/theme/configs/dashboard/navigations";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import NavSectionVertical from "./nav-section-vertical";
import { ScrollArea } from "@/components/ui/scroll-area";

// ----------------------------------------------------------------------

interface NavVerticalContentProps extends HTMLAttributes<HTMLDivElement> {
	navData: INavData;
}

export default function NavVerticalContent({ className, navData, ...props }: NavVerticalContentProps) {
	return (
		<div className={cn("h-full w-full", className)} {...props}>
			<ScrollArea className="h-full flex flex-col [&>div>div]:!block">
				<Logo className={"mt-6 mb-1 ml-6"} />
				<NavSectionVertical navData={navData} />
				<div className="flex-grow" />
			</ScrollArea>
		</div>
	);
}
