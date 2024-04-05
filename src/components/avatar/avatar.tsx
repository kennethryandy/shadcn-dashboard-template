import type { HTMLAttributes } from "react";
import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

// ----------------------------------------------------------------------

interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
	alt: string;
	src: string;
	width?: number;
	height?: number;
	children?: string;
}

export default function Avatar({ src, alt, children, className, width = 32, height = 32, ...props }: AvatarProps) {
	let fallback = "";
	if (!!children) {
		const splittedString = children.split(" ");
		fallback = `${splittedString.at(0)?.charAt(0)}${splittedString.at(-1)?.charAt(0)}`;
	} else {
		fallback = `${alt.charAt(0)}${alt.charAt(alt.length - 1)}`;
	}

	return (
		<AvatarUI className={cn("h-8 w-8", className)} {...props}>
			<AvatarImage src={src} asChild>
				<Image src={src} alt={alt} width={width} height={height} />
			</AvatarImage>
			<AvatarFallback className={cn("uppercase text-white bg-primary/80 p-3")}>{fallback}</AvatarFallback>
		</AvatarUI>
	);
}
