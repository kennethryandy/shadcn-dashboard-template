import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center capitalize whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				link: "underline-offset-4 hover:underline",
				ghost: "",
				contained: "",
				outlined: "",
			},
			color: {
				default: "text-accent-foreground",
				primary: "",
				secondary: "",
				info: "",
				success: "",
				warning: "",
				error: "",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		compoundVariants: [
			// Default color
			{
				variant: "contained",
				color: "default",
				className: "text-accent-foreground bg-accent hover:bg-[#cececf]",
			},
			{
				variant: "outlined",
				color: "default",
				className:
					"text-accent-foreground border-accent border hover:bg-[#cececf] hover:shadow-[currentcolor_0px_0px_0px_0.5px]",
			},
			{
				variant: "ghost",
				color: "default",
				className: "dark:hover:bg-accent/10 hover:bg-accent hover:text-accent-foreground",
			},
			{
				variant: "link",
				color: "default",
				className: "text-default",
			},
			// Primary color
			{
				variant: "contained",
				color: "primary",
				className: "text-white dark:text-accent-foreground bg-primary hover:bg-primary-dark",
			},
			{
				variant: "outlined",
				color: "primary",
				className: "text-primary border-primary border hover:bg-primary/10 hover:shadow-[currentcolor_0px_0px_0px_0.5px]",
			},
			{
				variant: "ghost",
				color: "primary",
				className: "text-primary hover:bg-primary/10",
			},
			{
				variant: "link",
				color: "primary",
				className: "text-primary",
			},
			// Secondary color
			{
				variant: "contained",
				color: "secondary",
				className: "text-white dark:text-accent-foreground bg-secondary hover:bg-secondary-dark",
			},
			{
				variant: "outlined",
				color: "secondary",
				className:
					"text-secondary border-secondary border hover:bg-secondary/10 hover:shadow-[currentcolor_0px_0px_0px_0.5px]",
			},
			{
				variant: "ghost",
				color: "secondary",
				className: "text-secondary hover:bg-secondary/10",
			},
			{
				variant: "link",
				color: "secondary",
				className: "text-secondary",
			},
			// Info color
			{
				variant: "contained",
				color: "info",
				className: "text-white dark:text-accent-foreground bg-info hover:bg-info-dark",
			},
			{
				variant: "outlined",
				color: "info",
				className: "text-info border-info border hover:bg-info/10 hover:shadow-[currentcolor_0px_0px_0px_0.5px]",
			},
			{
				variant: "ghost",
				color: "info",
				className: "text-info hover:bg-info/10",
			},
			{
				variant: "link",
				color: "info",
				className: "text-info",
			},
			// Success color
			{
				variant: "contained",
				color: "success",
				className: "text-white dark:text-accent-foreground bg-success hover:bg-success-dark",
			},
			{
				variant: "outlined",
				color: "success",
				className: "text-success border-success border hover:bg-success/10 hover:shadow-[currentcolor_0px_0px_0px_0.5px]",
			},
			{
				variant: "ghost",
				color: "success",
				className: "text-success hover:bg-success/10",
			},
			{
				variant: "link",
				color: "success",
				className: "text-success",
			},
			// Warning color
			{
				variant: "contained",
				color: "warning",
				className: "text-white dark:text-accent-foreground bg-warning hover:bg-warning-dark",
			},
			{
				variant: "outlined",
				color: "warning",
				className: "text-warning border-warning border hover:bg-warning/10 hover:shadow-[currentcolor_0px_0px_0px_0.5px]",
			},
			{
				variant: "ghost",
				color: "warning",
				className: "text-warning hover:bg-warning/10",
			},
			{
				variant: "link",
				color: "warning",
				className: "text-warning",
			},
			// Error color
			{
				variant: "contained",
				color: "error",
				className: "text-white dark:text-accent-foreground bg-error hover:bg-error-dark",
			},
			{
				variant: "outlined",
				color: "error",
				className: "text-error border-error border hover:bg-error/10 hover:shadow-[currentcolor_0px_0px_0px_0.5px]",
			},
			{
				variant: "ghost",
				color: "error",
				className: "text-error hover:bg-error/10",
			},
			{
				variant: "link",
				color: "error",
				className: "text-error",
			},
		],
		defaultVariants: {
			variant: "contained",
			size: "default",
			color: "default",
		},
	},
);

export interface ButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	offset?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, color, size, asChild = false, offset, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, color, className }), {
					"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2": offset,
				})}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
