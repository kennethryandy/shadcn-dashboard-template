import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariant = cva(
	"px-3 py-2 flex leading-4 w-full text-common rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-common focus-visible:ring-offset-0 focus-visible:border-0 disabled:cursor-not-allowed disabled:opacity-35",
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
	size?: "sm" | "md" | "lg";
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", size = "sm", ...props }, ref) => {
	return <input type={type} className={cn(inputVariant({ size, className }))} ref={ref} {...props} />;
});
CustomInput.displayName = "CustomInput";

export { CustomInput };
