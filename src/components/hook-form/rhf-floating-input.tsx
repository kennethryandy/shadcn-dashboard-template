"use client";
import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FloatingLabelInput } from "../input";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

interface CustomRHFFloatingInputProps
	extends Omit<ComponentPropsWithoutRef<typeof Controller>, "control" | "render">,
		Omit<ComponentPropsWithoutRef<typeof FloatingLabelInput>, "name" | "defaultValue"> {
	helperText?: string;
	containerClass?: Pick<HTMLAttributes<HTMLDivElement>, "className">;
}

export default function CustomRHFFloatingInput({
	name,
	helperText,
	defaultValue,
	rules,
	containerClass,
	label,
	className,
	...other
}: CustomRHFFloatingInputProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={rules}
			render={({ field, fieldState: { error } }) => (
				<div className={cn("space-y-2", containerClass)}>
					<FloatingLabelInput label={label} error={!!error} {...field} {...other} className={className} />
					{!!helperText && <p className="text-xs leading-tight text-muted-foreground">{helperText}</p>}
					{!!error && <p className="text-xs leading-tight text-error">{error?.message}</p>}
				</div>
			)}
		/>
	);
}
