import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center capitalize whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none space-x-1 disabled:pointer-events-none disabled:opacity-50 transition-colors",
	{
		compoundVariants: [
			// Default color
			{
				variant: "contained",
				color: "default",
				className: "text-slate-100 dark:text-slate-900 bg-common dark:hover:bg-common/85 hover:bg-common/85",
			},
			{
				variant: "outlined",
				color: "default",
				className: "text-foreground border-input border hover:shadow-[currentcolor_0px_0px_0px_0.5px]",
			},
			{
				variant: "ghost",
				color: "default",
				className: "text-common/95 dark:hover:bg-accent/15 hover:bg-accent hover:text-foreground",
			},
			{
				variant: "soft",
				color: "default",
				className: "text-common/95 dark:bg-accent/15 bg-accent/75 hover:bg-common/15 dark:hover:bg-accent/35 hover:text-common",
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
				className: "text-white bg-primary hover:bg-primary-dark",
			},
			{
				variant: "outlined",
				color: "primary",
				className: "text-primary border-primary border hover:shadow-[currentcolor_0px_0px_0px_0.5px]",
			},
			{
				variant: "ghost",
				color: "primary",
				className: "text-primary hover:bg-primary/15",
			},
			{
				variant: "soft",
				color: "primary",
				className: "text-primary bg-primary/15 hover:bg-primary/35",
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
				className: "text-white bg-secondary hover:bg-secondary-dark",
			},
			{
				variant: "outlined",
				color: "secondary",
				className: "text-secondary border-secondary border hover:shadow-[currentcolor_0px_0px_0px_0.5px]",
			},
			{
				variant: "ghost",
				color: "secondary",
				className: "text-secondary hover:bg-secondary/15",
			},
			{
				variant: "soft",
				color: "secondary",
				className: "text-secondary bg-secondary/15 hover:bg-secondary/35",
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
				className: "text-white bg-info hover:bg-info-dark",
			},
			{
				variant: "outlined",
				color: "info",
				className: "text-info border-info border hover:shadow-[currentcolor_0px_0px_0px_0.5px]",
			},
			{
				variant: "ghost",
				color: "info",
				className: "text-info hover:bg-info/15",
			},
			{
				variant: "soft",
				color: "info",
				className: "text-info bg-info/15 hover:bg-info/35",
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
				className: "text-white bg-success hover:bg-success-dark",
			},
			{
				variant: "outlined",
				color: "success",
				className: "text-success border-success border hover:shadow-[currentcolor_0px_0px_0px_0.5px]",
			},
			{
				variant: "ghost",
				color: "success",
				className: "text-success hover:bg-success/15",
			},
			{
				variant: "soft",
				color: "success",
				className: "text-success bg-success/15 hover:bg-success/35",
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
				className: "text-white bg-warning hover:bg-warning-dark",
			},
			{
				variant: "outlined",
				color: "warning",
				className: "text-warning border-warning border hover:shadow-[currentcolor_0px_0px_0px_0.5px]",
			},
			{
				variant: "ghost",
				color: "warning",
				className: "text-warning hover:bg-warning/15",
			},
			{
				variant: "soft",
				color: "warning",
				className: "text-warning bg-warning/35 hover:bg-warning/15",
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
				className: "text-white bg-error hover:bg-error-dark",
			},
			{
				variant: "outlined",
				color: "error",
				className: "text-error border-error border hover:shadow-[currentcolor_0px_0px_0px_0.5px]",
			},
			{
				variant: "ghost",
				color: "error",
				className: "text-error hover:bg-error/15",
			},
			{
				variant: "soft",
				color: "error",
				className: "text-error bg-error/15 hover:bg-error/35",
			},
			{
				variant: "link",
				color: "error",
				className: "text-error",
			},
		],
		variants: {
			variant: {
				destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				link: "underline-offset-4 hover:underline",
				ghost: "",
				contained: "",
				outlined: "",
				soft: "",
			},
			color: {
				default: "text-foreground",
				primary: "",
				secondary: "",
				info: "",
				success: "",
				warning: "",
				error: "",
			},
			size: {
				default: "h-12 px-4 data-[start-icon=true]:pl-2 data-[end-icon=true]:pr-2",
				sm: "h-9 px-3 data-[start-icon=true]:pl-1.5 data-[end-icon=true]:pr-1.5",
				lg: "h-11 px-8 data-[start-icon=true]:pl-5 data-[end-icon=true]:pr-5",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "contained",
			size: "default",
			color: "default",
		},
	},
);

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	ring?: boolean;
	variant?: "destructive" | "secondary" | "link" | "ghost" | "soft" | "contained" | "outlined";
	color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
	size?: "default" | "sm" | "lg" | "icon";
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, color, size, asChild = false, ring = false, startIcon, endIcon, children, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";

		return (
			<Comp
				data-start-icon={!!startIcon}
				data-end-icon={!!endIcon}
				className={cn(buttonVariants({ variant, size, color, className }), {
					"ring-common ring-offset-0 focus-visible:ring-2": ring,
				})}
				ref={ref}
				{...props}>
				{!!startIcon && startIcon}
				{typeof children === "string" ? (
					<span className="text-left max-w-lg flex-1 overflow-x-hidden text-ellipsis btn-text">{children}</span>
				) : (
					children
				)}
				{!!endIcon && endIcon}
			</Comp>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
