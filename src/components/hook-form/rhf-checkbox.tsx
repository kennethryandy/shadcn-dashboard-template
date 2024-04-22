"use client";
import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { ShadcnLabel } from "../ui/shadcn-label";
import { Checkbox } from "../ui/checkbox";
import { paramCase } from "@/utils/change-case";

// ----------------------------------------------------------------------

type TDivClassName = Pick<HTMLAttributes<HTMLDivElement>, "className">;

interface CustomRHFCheckboxProps
	extends Omit<ComponentPropsWithoutRef<typeof Controller>, "control" | "render">,
		Omit<ComponentPropsWithoutRef<typeof Checkbox>, "name" | "defaultValue"> {
	helperText?: string;
	containerClass?: TDivClassName;
	checkboxContainerClass?: TDivClassName;
	label?: string;
	labelProps?: ComponentPropsWithoutRef<typeof ShadcnLabel>;
}

export default function CustomRHFCheckbox({
	name,
	helperText,
	defaultValue,
	rules,
	containerClass,
	checkboxContainerClass,
	label,
	labelProps,
	className,
	...other
}: CustomRHFCheckboxProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={rules}
			render={({ field: { onChange, value, ...fields }, fieldState: { error } }) => (
				<div className={cn("space-y-2", containerClass)}>
					<div className={cn("flex items-center space-x-1.5", checkboxContainerClass)}>
						<Checkbox id={other.id ?? paramCase(name)} {...fields} {...other} onCheckedChange={onChange} checked={value} />
						{!!label && (
							<ShadcnLabel {...labelProps} htmlFor={other.id ?? paramCase(name)}>
								{label}
							</ShadcnLabel>
						)}
					</div>
					{!!helperText && <p className="text-xs leading-tight text-muted-foreground">{helperText}</p>}
					{!!error && <p className="text-xs leading-tight text-error">{error?.message}</p>}
				</div>
			)}
		/>
	);
}
