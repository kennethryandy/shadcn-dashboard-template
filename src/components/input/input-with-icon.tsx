import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	containerClass?: string;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, startIcon, endIcon, type, containerClass, ...props }, ref) => {
		return (
			<div
				className={cn(
					"flex h-12 items-center text-foreground rounded-md border border-input/35 bg-transparent pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-common focus-within:ring-offset-0",
					{
						"space-x-1.5": !!startIcon || !!endIcon,
					},
					containerClass,
				)}>
				{!!startIcon && startIcon}
				<input
					{...props}
					ref={ref}
					className={cn(
						"w-full p-2 placeholder:text-muted-foreground bg-inherit focus-visible:outline-none ,disabled:cursor-not-allowed disabled:opacity-35",
						className,
					)}
				/>
				{endIcon && endIcon}
			</div>
		);
	},
);
InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
