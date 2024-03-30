import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

const iconButtonVariants = cva(
	"inline-flex items-center justify-center relative box-border bg-transparent outline-none select-none text-center cursor-pointer flex-auto rounded-full overflow-visible leading-none appearance-none align-middle transition-colors transition-transform hover:scale-105 hover:translate-z-[0px] [&>svg]:text-font-inherit",
	{
		variants: {
			variant: {
				default: "text-foreground hover:bg-foreground/10",
				primary: "text-primary hover:bg-primary/10",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				sm: "p-1 text-lg w-8 max-w-8 h-8 max-h-8",
				md: "p-2 text-2xl w-10 max-w-10 h-10 max-h-10",
				lg: "p-3 text-3xl w-14 max-w-14 h-14 max-h-14",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
	asChild?: boolean;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ className, variant = "default", size = "md", asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return <Comp className={cn(iconButtonVariants({ variant, size, className }))} ref={ref} {...props} />;
	},
);

IconButton.displayName = "IconButton";

export default IconButton;
