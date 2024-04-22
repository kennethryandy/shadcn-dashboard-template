"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const checkboxVariants = cva(
	"peer border-[#637381] border h-4 w-4 shrink-0 flex items-center justify-center select-none rounded-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-35 text-white dark:text-slate-900",
	{
		variants: {
			variant: {
				default:
					"border-common data-[state=checked]:bg-common data-[state=checked]:border-common data-[state=indeterminate]:bg-common data-[state=indeterminate]:border-common",
				primary:
					"data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=checked]:border-primary",
				secondary:
					"data-[state=checked]:bg-secondary data-[state=indeterminate]:bg-secondary data-[state=indeterminate]:border-secondary data-[state=checked]:border-secondary",
				info: "data-[state=checked]:bg-info data-[state=indeterminate]:bg-info data-[state=indeterminate]:border-info data-[state=checked]:border-info data-[state=checked]:text-white data-[state=indeterminate]:text-white",
				success:
					"data-[state=checked]:bg-success data-[state=indeterminate]:bg-success data-[state=indeterminate]:border-success data-[state=checked]:border-success",
				warning:
					"data-[state=checked]:bg-warning data-[state=indeterminate]:bg-warning data-[state=indeterminate]:border-warning data-[state=checked]:border-warning",
				error: "data-[state=checked]:bg-error data-[state=indeterminate]:bg-error data-[state=indeterminate]:border-error data-[state=checked]:border-error",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

interface ICheckbox extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, VariantProps<typeof checkboxVariants> {
	indeterminate?: boolean;
	variant?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, ICheckbox>(
	({ className, variant = "default", indeterminate = false, ...props }, ref) => (
		<CheckboxPrimitive.Root ref={ref} className={cn(checkboxVariants({ variant, className }))} {...props}>
			<CheckboxPrimitive.Indicator className="flex border-1. items-center justify-center text-current [&[data-state=indeterminate]>.indeterminate]:block h-5 [data-state=indeterminate]>.indeterminate]:fill-white [&[data-state=indeterminate]>.check]:hidden">
				<Check className="check h-[1em] w-[1em] p-0.5 stroke-[3]" />
				<Minus className="indeterminate hidden h-[1em] w-[1em] stroke-[3] px-0.5" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
