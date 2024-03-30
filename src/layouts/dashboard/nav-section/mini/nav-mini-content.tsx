import Logo from "@/components/logo";
import { HTMLAttributes } from "react";
import NavSectionMini from "./nav-section-mini";
import { cn } from "@/lib/utils";
import { INavData } from "@/theme/configs/dashboard/navigations";

// ----------------------------------------------------------------------

interface NavMiniContentProps extends HTMLAttributes<HTMLDivElement> {
	navData: INavData;
}

export default function NavMiniContent({ navData, className }: NavMiniContentProps) {
	return (
		<div style={{ scrollbarWidth: "none" }} className={cn("flex flex-col pb-4 z-20 h-full overflow-x-scroll", className)}>
			<Logo className={"mx-auto my-4"} />
			<NavSectionMini navData={navData} />
		</div>
	);
}
