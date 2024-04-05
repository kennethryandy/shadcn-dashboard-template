import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

const iconButtonVariants = cva(
	"inline-flex items-center justify-center relative box-border bg-transparent outline-none select-none text-center cursor-pointer flex-auto rounded-full overflow-visible leading-none appearance-none align-middle transition-colors [&>svg]:text-font-inherit",
	{
		variants: {
			variant: {
				default: "",
				filled: "",
				outlined: "",
				ghost: "",
			},
			color: {
				default: "",
				primary: "",
				secondary: "",
				info: "",
				success: "",
				warning: "",
				error: "",
			},
			size: {
				sm: "p-1 text-lg w-8 max-w-8 h-8 max-h-8 [&>svg]:h-5 [&>svg]:w-5",
				md: "p-2 text-2xl w-10 max-w-10 h-10 max-h-10 [&>svg]:h-6 [&>svg]:w-6",
				lg: "p-3 text-3xl w-14 max-w-14 h-14 max-h-14 [&>svg]:h-7 [&>svg]:w-7",
			},
		},
		compoundVariants: [
			// Default color
			{
				variant: "default",
				color: "default",
				className: "text-foreground hover:bg-foreground/10",
			},
			{
				variant: "filled",
				color: "default",
				className: "text-slate-900 dark:text-slate-100  bg-slate-600 bg-opacity-45 hover:bg-opacity-100 dark:bg-200",
			},
			{
				variant: "outlined",
				color: "default",
				className:
					"text-slate-900 dark:text-slate-100 border border-slate-400 dark:border-slate-300 dark:hover:bg-slate-600/35 hover:bg-slate-600/10",
			},
			{
				variant: "ghost",
				color: "default",
				className: "dark:text-slate-100 text-slate-900 bg-slate-400/10 hover:bg-slate-400/35",
			},
			// Primary color
			{
				variant: "default",
				color: "primary",
				className: "text-primary hover:bg-primary/15",
			},
			{
				variant: "filled",
				color: "primary",
				className: "text-slate-100 bg-primary hover:bg-primary-dark dark:bg-primary dark:hover:bg-primary/80",
			},
			{
				variant: "outlined",
				color: "primary",
				className: "text-primary border border-primary hover:bg-primary-light/35",
			},
			{
				variant: "ghost",
				color: "primary",
				className: "text-primary bg-primary/10 hover:bg-primary/35",
			},
			// Secondary color
			{
				variant: "filled",
				color: "secondary",
				className: "text-slate-100 bg-secondary hover:bg-secondary-dark dark:bg-secondary dark:hover:bg-secondary/80",
			},
			{
				variant: "outlined",
				color: "secondary",
				className: "text-secondary border border-secondary hover:bg-secondary-light/35",
			},
			{
				variant: "ghost",
				color: "secondary",
				className: "text-secondary bg-secondary/10 hover:bg-secondary/35",
			},
			// Info color
			{
				variant: "filled",
				color: "info",
				className: "text-slate-100 bg-info hover:bg-info-dark dark:bg-info dark:hover:bg-info/80",
			},
			{
				variant: "outlined",
				color: "info",
				className: "text-info border border-info hover:bg-info-light/35",
			},
			{
				variant: "ghost",
				color: "info",
				className: "text-info bg-info/10 hover:bg-info/35",
			},
			// Warning color
			{
				variant: "filled",
				color: "warning",
				className: "text-slate-900 bg-warning hover:bg-warning-dark dark:bg-warning dark:hover:bg-warning/80",
			},
			{
				variant: "outlined",
				color: "warning",
				className: "text-warning border border-warning hover:bg-warning-light/35",
			},
			{
				variant: "ghost",
				color: "warning",
				className: "text-warning bg-warning/10 hover:bg-warning/35",
			},
			// Error color
			{
				variant: "filled",
				color: "error",
				className: "text-slate-100 bg-error hover:bg-error-dark dark:bg-error dark:hover:bg-error/80",
			},
			{
				variant: "outlined",
				color: "error",
				className: "text-error border border-error hover:bg-error-light/35",
			},
			{
				variant: "ghost",
				color: "error",
				className: "text-error bg-error/10 hover:bg-error/35",
			},
		],
		defaultVariants: {
			size: "sm",
			variant: "default",
			color: "default",
		},
	},
);

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">, VariantProps<typeof iconButtonVariants> {
	asChild?: boolean;
	transitionOff?: boolean;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ className, variant = "default", size = "sm", color, transitionOff = false, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(
					iconButtonVariants({
						variant,
						color,
						size,
						className,
					}),
					{
						"transition-transform hover:scale-105 hover:translate-z-[0px]": !transitionOff,
					},
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);

IconButton.displayName = "IconButton";

export default IconButton;
