import { forwardRef, type MouseEventHandler, useId, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import IconButton from "../icon-button/icon-button";
import { X } from "lucide-react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ShadcnLabel } from "../ui/shadcn-label";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	onClear?: MouseEventHandler<HTMLButtonElement>;
	containerClass?: string;
}

const SearchInput = forwardRef<HTMLInputElement, InputProps>(
	({ className, startIcon, endIcon = undefined, onClear = undefined, containerClass, ...other }, ref) => {
		const id = useId();
		return (
			<div
				className={cn(
					"w-full flex h-12 items-center text-foreground rounded-md border border-input/35 bg-transparent px-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-common focus-within:ring-offset-0",
					{
						"space-x-1.5": !!startIcon || !!endIcon,
					},
					containerClass,
				)}>
				<ShadcnLabel htmlFor={other.id ?? id}>{!!startIcon ? startIcon : <MagnifyingGlassIcon width={24} height={24} />}</ShadcnLabel>

				<input
					id={id}
					required
					type="search"
					{...other}
					ref={ref}
					className={cn(
						"peer w-full p-2 placeholder:text-muted-foreground bg-inherit focus-visible:outline-none ,disabled:cursor-not-allowed disabled:opacity-35",
						className,
					)}
				/>

				<div className="transition-opacity opacity-0 pointer-events-none peer-focus:opacity-100 peer-focus:pointer-events-auto peer-focus-visible:opacity-100 peer-focus-visible:pointer-events-auto peer-focus-within:opacity-100 peer-focus-within:pointer-events-auto peer-active:opacity-100 peer-active:pointer-events-auto peer-valid:pointer-events-auto peer-valid:opacity-100">
					{!!endIcon ? (
						endIcon
					) : (
						<IconButton onClick={onClear} variant="ghost" color="default" size="xs" transitionOff>
							<X />
						</IconButton>
					)}
				</div>
			</div>
		);
	},
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
