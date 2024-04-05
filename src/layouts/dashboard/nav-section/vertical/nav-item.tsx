import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TMenuItem } from "@/theme/configs/dashboard/navigations";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

// ----------------------------------------------------------------------

type TProps = {
	depth: number;
	active: boolean;
} & TMenuItem;

export default function NavItem(props: TProps) {
	const { title, path = "#", icon, info, caption, disabled, children, depth, active } = props;

	const isChild = depth !== 1;

	if (!!children) {
		return (
			<CollapsibleTrigger
				disabled={disabled}
				aria-disabled={disabled}
				className={cn(
					buttonVariants({ variant: "ghost", size: isChild ? "sm" : "default" }),
					"text-foreground mb-1 w-full justify-start flex [&[data-state=open]>.text>.title]:font-semibold [&[data-state=open]>.text>.title]:text-accent-foreground [&[data-state=open]>.icon]:text-accent-foreground [&[data-state=open]>.arrow]:rotate-90 [&[data-state=open]>.arrow]:text-accent-foreground",
					{
						"cursor-default opacity-50": disabled,
						"[&_*]:!text-primary bg-primary/[0.08] hover:!bg-primary/[0.08]": active && !isChild,
						"[&>.text>.title]:!text-foreground": active && isChild,
					},
				)}>
				{!icon && (
					<span
						className={cn(
							'icon w-6 h-6 flex justify-center items-center mr-4 before:content-[""] before:h-1 before:w-1 before:rounded-full before:bg-foreground transition-transform',
							{
								"before:bg-primary scale-[2] transform": active,
							},
						)}
					/>
				)}
				{!!icon && <span className="icon text-start w-6 h-6 min-w-6 font-medium mr-4 text-inherit">{icon}</span>}
				<span className="text flex-auto min-w-0">
					<span className="title capitalize font-medium text-ellipsis overflow-hidden block w-full text-start text-inherit">
						{title}
					</span>
					{caption && (
						<span className="overflow-hidden block whitespace-nowrap text-ellipsis text-xs text-muted-foreground/60 w-full max-w-full">
							{caption}
						</span>
					)}
				</span>

				{info && <span>{info}</span>}

				<ChevronRightIcon width={16} className="arrow transition-transform" />
			</CollapsibleTrigger>
		);
	}

	const renderContent = (
		<div
			aria-disabled={disabled}
			className={cn(
				buttonVariants({ variant: "ghost", size: isChild ? "sm" : "default" }),
				"text-foreground mb-1 w-full justify-start flex",
				{
					"cursor-default opacity-50": disabled,
					"[&_*]:font-semibold": active,
					"bg-primary/[0.08] hover:!bg-primary/[0.08]": active && !isChild,
					"[&_*]:!text-accent-foreground": active && isChild,
				},
			)}>
			{!!icon ? (
				<span className="icon text-start w-6 h-6 font-medium mr-4 text-inherit">{icon}</span>
			) : (
				<span
					className={cn(
						'w-6 h-6 flex justify-center items-center mr-4 before:content-[""] before:h-1 before:w-1 before:rounded-full before:bg-foreground transition-transform',
						{
							"before:bg-primary scale-[2] transform": active,
						},
					)}
				/>
			)}

			<span className="flex-auto min-w-0">
				<span className="capitalize font-medium text-ellipsis overflow-hidden block w-full text-start text-inherit">{title}</span>
				{caption && (
					<span className="overflow-hidden block whitespace-nowrap text-ellipsis text-xs text-muted-foreground/60 max-w-full">
						{caption}
					</span>
				)}
			</span>

			{info && <span>{info}</span>}
		</div>
	);

	// External
	if (path.includes("http")) {
		return (
			<Link href={path} target="_blank" rel="noopener" className="mb-1">
				{renderContent}
			</Link>
		);
	}

	if (disabled) {
		return (
			<div className="mb-1" aria-disabled>
				{renderContent}
			</div>
		);
	}

	return (
		<Link href={path} className="mb-1">
			{renderContent}
		</Link>
	);
}
