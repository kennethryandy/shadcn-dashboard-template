import { cn } from "@/lib/utils";
import { Icon, type IconProps } from "@iconify/react";
import { type ElementRef, forwardRef, type LegacyRef, type RefAttributes } from "react";

// ----------------------------------------------------------------------

interface Iconify extends IconProps {}

const Iconify = forwardRef<ElementRef<typeof Icon>, Iconify>(({ className, ...props }, ref) => (
	<Icon
		ref={ref as any as (LegacyRef<SVGSVGElement> & RefAttributes<SVGSVGElement>) | undefined}
		className={cn("fill-current text-font-inherit w-[1em] h-[1em] inline-block transition-colors shrink-0 select-none", className)}
		{...props}
	/>
));

Iconify.displayName = "Iconify";

export default Iconify;
