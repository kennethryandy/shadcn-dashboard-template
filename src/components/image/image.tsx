/* eslint-disable jsx-a11y/alt-text */
import { AspectRatio } from "../ui/aspect-ratio";
import { getRatio, ratios } from "./utils";
import { cn } from "@/lib/utils";
import { default as NextImage, type ImageProps } from "next/image";

// ----------------------------------------------------------------------

interface ImageCompProps {
	className?: string;
	imageProps?: Omit<ImageProps, "alt" | "src">;
	ratio?: keyof typeof ratios;
	alt?: string;
	src: string;
}

export default function Image({ className, alt = "Image", ratio = "4/3", imageProps, src }: ImageCompProps) {
	const r = getRatio(ratio);
	return (
		<AspectRatio
			ratio={r}
			className={cn(
				"relative overflow-hidden align-bottom inline-block before:content-[''] before:top-0 before:left-0 before:w-1 before:h-1 before:z-[1] before:absolute before:bg-gray-600/5",
				className,
			)}>
			<NextImage
				placeholder="blur"
				blurDataURL="/assets/placeholder.svg"
				src={src}
				quality={100}
				alt={alt}
				className={cn("object-cover align-bottom", imageProps?.className)}
				fill={!imageProps?.width || !imageProps?.height}
				{...imageProps}
			/>
		</AspectRatio>
	);
}
