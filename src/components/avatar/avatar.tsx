import type { HTMLAttributes } from "react";
import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
	alt: string;
	src: string;
	children?: string;
}

export default function Avatar({ src, alt, children, className, ...props }: AvatarProps) {
	let fallback = "";
	if (!!children) {
		const splittedString = children.split(" ");
		fallback = `${splittedString.at(0)?.charAt(0)}${splittedString.at(-1)?.charAt(0)}`;
	} else {
		fallback = `${alt.charAt(0)}${alt.charAt(alt.length - 1)}`;
	}

	return (
		<AvatarUI className={cn("h-8 w-8", className)} {...props}>
			<AvatarImage src={src} alt={alt} />
			<AvatarFallback className={cn("uppercase text-white bg-primary/80 p-3")}>{fallback}</AvatarFallback>
		</AvatarUI>
	);
}
