"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const switchVariants = cva(
	"peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-35 data-[state=unchecked]:bg-input",
	{
		variants: {
			color: {
				default:
					"data-[state=checked]:bg-common [&[data-state=checked]>span]:bg-slate-100 dark:[&[data-state=checked]>span]:bg-slate-900",
				primary: "data-[state=checked]:bg-primary",
				secondary: "data-[state=checked]:bg-secondary",
				info: "data-[state=checked]:bg-info",
				success: "data-[state=checked]:bg-success",
				warning: "data-[state=checked]:bg-warning",
				error: "data-[state=checked]:bg-error",
			},
			size: {
				sm: "h-4 w-7 [&[data-state=checked]>span]:translate-x-3 [&>span]:size-3",
				md: "h-5 w-9 [&[data-state=checked]>span]:translate-x-[1.125rem] [&>span]:size-3.5",
				lg: "h-6 w-11 [&[data-state=checked]>span]:translate-x-5 [&>span]:size-5",
			},
		},
		defaultVariants: {
			size: "md",
			color: "default",
		},
	},
);

interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, "color">, VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(({ className, size, color, ...props }, ref) => (
	<SwitchPrimitives.Root className={cn(switchVariants({ size, color, className }))} {...props} ref={ref}>
		<SwitchPrimitives.Thumb
			className={cn(
				"pointer-events-none block rounded-full bg-slate-100 shadow-lg ring-0 transition-transform  data-[state=unchecked]:translate-x-0",
			)}
		/>
	</SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
