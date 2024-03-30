import { cn } from "@/lib/utils";
import { type INavData } from "@/theme/configs/dashboard/navigations";
import NavSectionHorizontal from "./nav-section-horizontal";
import { ScrollArea } from "@/components/ui/scroll-area";

// ----------------------------------------------------------------------

interface NavHorizontalProps {
	className?: string;
	navData: INavData;
}

export default function NavHorizontal({ className, navData }: NavHorizontalProps) {
	return (
		<div
			className={cn(
				"fixed hidden sm:flex z-40 w-full transition-all backdrop-blur-sm right-0 top-16 bg-transparent border-t border-dashed",
				className,
			)}>
			<ScrollArea orientation="horizontal">
				<div className="min-h-16 px-6 bg-background/80 w-full p-0 flex items-center">
					<NavSectionHorizontal data={navData} />
				</div>
			</ScrollArea>
		</div>
	);
}
