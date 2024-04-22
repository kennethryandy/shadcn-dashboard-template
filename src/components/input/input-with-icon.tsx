import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariant = cva(
	"border-none w-full leading-4 text-common placeholder:text-muted-foreground bg-inherit focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-35 px-3 py-2",
	{
		variants: {
			size: {
				sm: "h-12 text-sm",
				md: "h-14 text-base",
				lg: "h-16 text-lg",
			},
		},
		defaultVariants: {
			size: "sm",
		},
	},
);

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariant> {
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	containerClass?: string;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, startIcon, endIcon, type, containerClass, size = "sm", ...props }, ref) => {
		console.log({ startIcon, endIcon });

		return (
			<div
				className={cn(
					"flex items-center text-foreground rounded-md border border-input/35 bg-transparent ring-offset-background focus-within:ring-2 focus-within:ring-common focus-within:ring-offset-0 focus-visible:border-0 disabled:cursor-not-allowed disabled:opacity-35",
					{
						"space-x-1.5": !!startIcon || !!endIcon,
					},
					containerClass,
				)}>
				{!!startIcon && startIcon}
				<input {...props} ref={ref} className={cn(inputVariant({ size, className }))} />
				{endIcon && endIcon}
			</div>
		);
	},
);
InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
