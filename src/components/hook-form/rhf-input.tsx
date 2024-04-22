"use client";
import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../input";
import { cn } from "@/lib/utils";
import { ShadcnLabel } from "../ui/shadcn-label";

// ----------------------------------------------------------------------

interface CustomRHFInputProps
	extends Omit<ComponentPropsWithoutRef<typeof Controller>, "control" | "render">,
		Omit<ComponentPropsWithoutRef<typeof Input>, "name" | "defaultValue"> {
	helperText?: string;
	containerClass?: Pick<HTMLAttributes<HTMLDivElement>, "className">;
	label?: string;
}

export default function CustomRHFInput({
	name,
	label,
	helperText,
	type,
	defaultValue,
	rules,
	containerClass,
	className,
	...other
}: CustomRHFInputProps) {
	const { control } = useFormContext();
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={rules}
			render={({ field, fieldState: { error } }) => (
				<div className={cn("space-y-2", containerClass)}>
					{!!label && (
						<ShadcnLabel
							className={cn({
								"text-error": error,
							})}>
							{label}
						</ShadcnLabel>
					)}
					<Input
						{...field}
						{...other}
						className={cn(className, {
							"text-error border-error focus-visible:ring-error": !!error,
						})}
					/>
					{!!helperText && <p className="text-sm text-muted-foreground">{helperText}</p>}
					{!!error && <p className="text-sm text-error">{error?.message}</p>}
				</div>
			)}
		/>
	);
}
