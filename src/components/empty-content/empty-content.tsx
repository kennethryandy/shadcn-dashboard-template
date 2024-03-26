import type { ReactNode } from "react";
import { memo } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

interface EmptyContent {
	title?: string;
	imgUrl?: string;
	action?: ReactNode;
	description?: string;
	filled?: boolean;
	className?: string;
	imageProps?: ImageProps;
}

function EmptyContent({ title = "No Data", imgUrl, action, description, className, filled = true, imageProps }: EmptyContent) {
	const isFilled = imageProps?.fill;
	return (
		<div
			className={cn(
				"flex flex-grow items-center flex-col justify-center px-6 h-96 rounded-xl bg-gray-600/5 border-dashed border-gray-600/80",
				className,
			)}>
			<Image
				alt="empty content"
				src={imgUrl ?? "/assets/icons/empty/ic_content.svg"}
				width={imageProps?.width ?? isFilled ? undefined : 160}
				height={imageProps?.height ?? isFilled ? undefined : 160}
			/>

			{title && <span className="text-lg font-bold text-muted-foreground">{title}</span>}

			{description && <span className="text-sm font-medium text-gray-400">{description}</span>}

			{action && action}
		</div>
	);
}

export default memo(EmptyContent);
