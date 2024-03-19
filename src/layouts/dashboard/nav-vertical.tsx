import Logo from "@/components/logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavSectionVertical from "./nav-section/nav-section-vertical";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavData } from "@/theme/configs/dashboard/navigations";

// ----------------------------------------------------------------------
interface INavVertialProps {
	navExpanded: boolean;
	onNavToggle: () => void;
	offset: boolean;
}

export default function NavVertical({ navExpanded, onNavToggle, offset }: INavVertialProps) {
	const navData = useNavData();

	const renderContent = (
		<ScrollArea className="h-full flex flex-col [&>div>div]:!block">
			<Logo width={80} height={80} className="transition-all mt-6 ml-[25%] mb-2 lg:ml-8" />
			<NavSectionVertical navData={navData} />
			<div className="flex-grow" />
		</ScrollArea>
	);

	return (
		<div className={cn("transition-all h-screen z-20", navExpanded ? "min-w-72 w-72" : "min-w-24 w-24")}>
			<Button
				variant="outline"
				size="icon"
				className={cn(
					"transition-all rounded-full w-8 h-8 border-dashed z-30 fixed",
					navExpanded
						? "rotate-0 left-[calc(theme(spacing.72)_-_16px_)] top-6"
						: "rotate-180 left-[calc(theme(spacing.24)_-_16px_)] top-4",
					offset && "top-4",
				)}
				onClick={onNavToggle}>
				<ChevronLeftIcon className="h-4 w-4" />
			</Button>
			<div
				className={cn("z-20 transition-all fixed h-full flex flex-col border-r border-dashed", navExpanded ? "w-72" : "w-24")}>
				{renderContent}
			</div>
		</div>
	);
}
