import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, icon, type, ...props }, ref) => (
	<div
		className={cn(
			"flex h-12 items-center text-foreground rounded-md border border-input/35 bg-transparent pl-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-common focus-within:ring-offset-0",
			className,
		)}>
		{!!icon && icon}
		<input
			{...props}
			type={type}
			ref={ref}
			className="w-full p-2 placeholder:text-muted-foreground bg-inherit focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
		/>
	</div>
));
Input.displayName = "Input";

export { Input };
