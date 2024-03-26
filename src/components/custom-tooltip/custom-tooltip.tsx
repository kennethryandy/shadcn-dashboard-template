import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, type ReactNode } from "react";
import { Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

interface CustomTooltipProps extends ComponentPropsWithoutRef<typeof TooltipContent> {
	children?: ReactNode;
	title: string;
	arrow?: boolean;
	className?: string;
}

const CustomTooltip = forwardRef<ElementRef<typeof TooltipContent>, CustomTooltipProps>(
	({ children, title, arrow = false, className, ...props }, ref) => {
		return (
			<TooltipProvider delayDuration={250}>
				<Tooltip>
					<TooltipTrigger asChild>{children}</TooltipTrigger>
					<TooltipPortal>
						<TooltipContent className={cn("bg-gray-800 dark:bg-gray-700 text-white", className)} ref={ref} {...props}>
							<p className="text-xs text-inherit">{title}</p>
							{arrow && <TooltipArrow className="fill-gray-800 -mt-[0.8px] dark:fill-gray-700" />}
						</TooltipContent>
					</TooltipPortal>
				</Tooltip>
			</TooltipProvider>
		);
	},
);

CustomTooltip.displayName = "CustomTooltip";

export default CustomTooltip;
