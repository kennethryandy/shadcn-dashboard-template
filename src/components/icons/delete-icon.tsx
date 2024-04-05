import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, SVGAttributes } from "react";

// ----------------------------------------------------------------------

interface DeleteIconProps extends SVGAttributes<SVGElement> {}

export default function DeleteIcon({ ...props }: DeleteIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			aria-hidden="true"
			role="img"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
			className={cn("fill-current", props?.className)}>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06"
				clipRule="evenodd"></path>
		</svg>
	);
}
