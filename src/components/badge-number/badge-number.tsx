import type { ReactNode, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeFloatVariants = cva(
	"inline-flex items-center place-content-center absolute px-[5px] z-[1] rounded-full border min-w-5 h-5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 top-0 right-0 scale-100 origin-top-center origin-center transform",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground",
				secondary: "border-transparent bg-secondary text-secondary-foreground",
				destructive: "border-transparent bg-destructive text-destructive-foreground",
				outline: "text-foreground",
			},
			align: {
				start: "-translate-x-1/2 -translate-y-1/2",
				center: "-translate-x-1/2 -translate-y-1/2 left-1/2",
				end: "translate-x-1/2 -translate-y-1/2",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeFloatVariants> {
	badgeContent?: ReactNode;
}

function BadgeFloat({ className, variant, children, badgeContent, align = "end", ...props }: BadgeProps) {
	return (
		<span className="relative inline-flex align-middle flex-shrink-0">
			<div className={cn("badge-content", badgeFloatVariants({ variant, align }), className)} {...props}>
				{badgeContent}
			</div>
			{children}
		</span>
	);
}

export { BadgeFloat, badgeFloatVariants };
