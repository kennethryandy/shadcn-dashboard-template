import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, HTMLAttributes, MouseEvent, ReactNode } from "react";
import DeleteIcon from "../icons/delete-icon";

// ----------------------------------------------------------------------

const chipVariants = cva(
	"inline-flex space-x-1 items-center rounded-lg px-1.5 text-xs tracking-wide font-semibold transition-colors data-[state=clickable]:cursor-pointer data-[state=clickable]:selection-none",
	{
		variants: {
			variant: {
				filled: "",
				outlined: "",
				ghost: "",
			},
			color: {
				default: "",
				primary: "",
				secondary: "",
				info: "",
				success: "",
				warning: "",
				error: "",
			},
			size: {
				default: "h-8",
				sm: "h-6",
			},
		},
		compoundVariants: [
			// Default color
			{
				variant: "filled",
				color: "default",
				className:
					"text-slate-100 dark:text-slate-900 bg-slate-900 dark:bg-slate-100 hover:data-[state=clickable]:bg-slate-600/80 dark:hover:data-[state=clickable]:bg-slate-200",
			},
			{
				variant: "outlined",
				color: "default",
				className:
					"text-slate-900 dark:text-slate-100 border border-slate-400 dark:border-slate-300 dark:hover:data-[state=clickable]:bg-slate-600/35 hover:data-[state=clickable]:bg-slate-600/10",
			},
			{
				variant: "ghost",
				color: "default",
				className: "dark:text-slate-100 text-slate-900 bg-slate-400/10 hover:data-[state=clickable]:bg-slate-400/35",
			},
			// Primary color
			{
				variant: "filled",
				color: "primary",
				className:
					"text-slate-100 bg-primary hover:data-[state=clickable]:bg-primary-dark dark:bg-primary dark:hover:data-[state=clickable]:bg-primary/80",
			},
			{
				variant: "outlined",
				color: "primary",
				className: "text-primary border border-primary hover:data-[state=clickable]:bg-primary-light/35",
			},
			{
				variant: "ghost",
				color: "primary",
				className: "text-primary bg-primary/10 hover:data-[state=clickable]:bg-primary/35",
			},
			// Secondary color
			{
				variant: "filled",
				color: "secondary",
				className:
					"text-slate-100 bg-secondary hover:data-[state=clickable]:bg-secondary-dark dark:bg-secondary dark:hover:data-[state=clickable]:bg-secondary/80",
			},
			{
				variant: "outlined",
				color: "secondary",
				className: "text-secondary border border-secondary hover:data-[state=clickable]:bg-secondary-light/35",
			},
			{
				variant: "ghost",
				color: "secondary",
				className: "text-secondary bg-secondary/10 hover:data-[state=clickable]:bg-secondary/35",
			},
			// Info color
			{
				variant: "filled",
				color: "info",
				className:
					"text-slate-100 bg-info hover:data-[state=clickable]:bg-info-dark dark:bg-info dark:hover:data-[state=clickable]:bg-info/80",
			},
			{
				variant: "outlined",
				color: "info",
				className: "text-info border border-info hover:data-[state=clickable]:bg-info-light/35",
			},
			{
				variant: "ghost",
				color: "info",
				className: "text-info bg-info/10 hover:data-[state=clickable]:bg-info/35",
			},
			// Success color
			{
				variant: "filled",
				color: "success",
				className:
					"text-slate-100 bg-success hover:data-[state=clickable]:bg-success-dark dark:bg-success dark:hover:data-[state=clickable]:bg-success/80",
			},
			{
				variant: "outlined",
				color: "success",
				className: "text-success border border-success hover:data-[state=clickable]:bg-success-light/35",
			},
			{
				variant: "ghost",
				color: "success",
				className: "text-success bg-success/10 hover:data-[state=clickable]:bg-success/35",
			},
			// Warning color
			{
				variant: "filled",
				color: "warning",
				className:
					"text-slate-900 bg-warning hover:data-[state=clickable]:bg-warning-dark dark:bg-warning dark:hover:data-[state=clickable]:bg-warning/80",
			},
			{
				variant: "outlined",
				color: "warning",
				className: "text-warning border border-warning hover:data-[state=clickable]:bg-warning-light/35",
			},
			{
				variant: "ghost",
				color: "warning",
				className: "text-warning bg-warning/10 hover:data-[state=clickable]:bg-warning/35",
			},
			// Error color
			{
				variant: "filled",
				color: "error",
				className:
					"text-slate-100 bg-error hover:data-[state=clickable]:bg-error-dark dark:bg-error dark:hover:data-[state=clickable]:bg-error/80",
			},
			{
				variant: "outlined",
				color: "error",
				className: "text-error border border-error hover:data-[state=clickable]:bg-error-light/35",
			},
			{
				variant: "ghost",
				color: "error",
				className: "text-error bg-error/10 hover:data-[state=clickable]:bg-error/35",
			},
		],
		defaultVariants: {
			size: "sm",
			variant: "filled",
			color: "default",
		},
	},
);

export interface ChipProps extends Omit<HTMLAttributes<HTMLDivElement>, "color">, VariantProps<typeof chipVariants> {
	label: string;
	onDelete?: (event: MouseEvent<SVGElement>) => void;
	startIcon?: ReactNode;
	deleteIcon?: ReactNode;
	deleteProps?: ComponentPropsWithoutRef<typeof DeleteIcon>;
	labelProps?: HTMLAttributes<HTMLSpanElement>;
}

export default function Chip({
	className,
	size,
	variant,
	color = "default",
	onClick,
	label,
	onDelete,
	deleteIcon,
	startIcon,
	deleteProps = {},
	labelProps = {},
}: ChipProps) {
	return (
		<div
			data-state={!!onClick ? "clickable" : "not-clickable"}
			className={cn(
				{
					"cursor-pointer clickable": !!onClick,
				},
				chipVariants({ size, variant, color }),
				className,
			)}
			onClick={onClick}>
			{!!startIcon && startIcon}
			<span {...labelProps}>{label}</span>
			{!!deleteIcon ? (
				deleteIcon
			) : !!onDelete ? (
				<DeleteIcon
					width={20}
					height={20}
					className="cursor-pointer transition-opacity hover:opacity-100 opacity-55"
					onClick={onDelete}
					{...deleteProps}
				/>
			) : null}
		</div>
	);
}
