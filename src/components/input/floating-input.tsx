import * as React from "react";

import { cn } from "@/lib/utils";
import { ShadcnLabel } from "../ui/shadcn-label";
import { type InputProps, CustomInput } from "./input";
import { cva, type VariantProps } from "class-variance-authority";

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
	return <CustomInput placeholder=" " className={cn("peer", className)} ref={ref} {...props} />;
});
FloatingInput.displayName = "FloatingInput";

const floatingLabelVariant = cva(
	"cursor-text absolute start-2 peer-focus:start-2 z-10 origin-[0] transform bg-background px-1.5 duration-300 peer-placeholder-shown:start-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:text-common font-normal",
	{
		variants: {
			size: {
				sm: "text-sm leading-4 top-2 peer-focus:top-2 peer-focus:px-1.5 scale-75 peer-focus:scale-75 -translate-y-4 peer-focus:-translate-y-4",
				md: "text-base leading-4 top-2 peer-focus:top-2 peer-focus:px-1.5 scale-75 peer-focus:scale-75 -translate-y-4 peer-focus:-translate-y-4",
				lg: "text-lg leading-4 top-2 peer-focus:top-2 peer-focus:px-1.5 scale-75 peer-focus:scale-75 -translate-y-4 peer-focus:-translate-y-4",
			},
		},
		defaultVariants: {
			size: "sm",
		},
	},
);

interface FloatingLabelProps extends React.ComponentPropsWithoutRef<typeof ShadcnLabel>, VariantProps<typeof floatingLabelVariant> {}

const FloatingLabel = React.forwardRef<React.ElementRef<typeof ShadcnLabel>, FloatingLabelProps>(({ size = "sm", className, ...props }, ref) => {
	return <ShadcnLabel className={floatingLabelVariant({ size, className })} ref={ref} {...props} />;
});
FloatingLabel.displayName = "FloatingLabel";

type FloatingLabelInputProps = InputProps & {
	label?: string;
	endIcon?: React.ReactNode;
	error?: boolean;
};

const FloatingLabelInput = React.forwardRef<React.ElementRef<typeof FloatingInput>, React.PropsWithoutRef<FloatingLabelInputProps>>(
	({ id, label, endIcon, error = false, className, ...props }, ref) => {
		return (
			<div className={cn("relative", { "text-error": error })}>
				<FloatingInput
					ref={ref}
					id={id}
					className={cn(className, {
						"text-error border-error focus-visible:ring-error": !!error,
						"pr-12": !!endIcon,
					})}
					{...props}
				/>
				<FloatingLabel
					htmlFor={id}
					size={props.size}
					className={cn({
						"text-error peer-focus:text-error": error,
					})}>
					{label}
				</FloatingLabel>
				{!!endIcon && endIcon}
			</div>
		);
	},
);
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingInput, FloatingLabel, FloatingLabelInput };
