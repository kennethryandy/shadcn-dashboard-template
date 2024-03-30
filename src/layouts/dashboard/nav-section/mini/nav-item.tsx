import { buttonVariants } from "@/components/ui/button";
import { HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import type { TMenuItem } from "@/theme/configs/dashboard/navigations";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

// ----------------------------------------------------------------------

type NavItemProps = {
	depth: number;
	active: boolean;
} & TMenuItem;

// [&[data-state=open]>.title]:font-bold [&[data-state=open]>.title]:text-accent-foreground

export default function NavItem(props: NavItemProps) {
	const { title, path = "#", icon, disabled, children, depth, active } = props;

	if (!!children) {
		return (
			<HoverCardTrigger
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"flex cursor-pointer rounded-lg flex-col items-center justify-center px-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-full align-middle appearance-none relative data-[state=open]:text-accent-foreground [&[data-state=open]>.title]:font-bold",
					{
						"min-h-14 p-1 mx-1": depth === 1,
						"cursor-default opacity-50": disabled,
						"bg-primary/10 text-primary": active,
					},
				)}>
				{!!icon && <span className="icon text-start w-5 h-5 font-medium text-inherit">{icon}</span>}

				<span
					className={cn(
						"title capitalize text-xs font-medium text-ellipsis overflow-hidden w-full text-center text-inherit mt-1",
						{
							"text-start text-sm px-1 flex items-center justify-between": depth !== 1,
						},
					)}>
					{title}
					<ChevronRightIcon width={16} className={cn({ "absolute top-[11px] right-[6px]": depth === 1 })} />
				</span>
			</HoverCardTrigger>
		);
	}

	const renderContent = (
		<div
			className={cn(
				buttonVariants({ variant: "ghost", size: "sm" }),
				"flex cursor-pointer rounded-lg flex-col items-center justify-center px-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 align-middle appearance-none relative",
				{
					"cursor-default opacity-50": disabled,
					"bg-primary/10 text-primary": active,
					"min-h-14 p-1 mx-1": depth === 1,
				},
			)}>
			{!!icon && <span className="icon text-start w-5 h-5 font-medium text-inherit">{icon}</span>}

			<span
				className={cn(
					"capitalize text-xs font-medium text-ellipsis overflow-hidden block w-full text-center text-inherit mt-1",
					{
						"text-start text-sm px-1": depth !== 1,
					},
				)}>
				{title}
			</span>
		</div>
	);

	// External
	if (path.includes("http")) {
		return (
			<Link href={path} target="_blank" rel="noopener" className="w-full">
				{renderContent}
			</Link>
		);
	}

	if (disabled) {
		return (
			<div className="w-full" aria-disabled>
				{renderContent}
			</div>
		);
	}

	return (
		<Link href={path} className="w-full">
			{renderContent}
		</Link>
	);
}
