import { INavData } from "@/theme/configs/dashboard/navigations";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CustomTooltip from "@/components/custom-tooltip";
import Iconify from "@/components/iconify";
import { HoverCardTrigger } from "@/components/ui/hover-card";
import { ChevronRightIcon, Info } from "lucide-react";

// ----------------------------------------------------------------------

type TNavItem = INavData[number]["items"][number];

type NavItemProps = TNavItem & {
	depth: number;
	active: boolean;
};

export default function NavItem(props: NavItemProps) {
	const { title, path, icon, info, caption, disabled, children, depth, active } = props;

	const isChild = depth !== 1;

	if (!!children) {
		return (
			<HoverCardTrigger
				aria-disabled={disabled}
				className={cn(
					buttonVariants({ variant: "ghost", size: isChild ? "sm" : "default" }),
					"w-full justify-start flex cursor-pointer py-0 px-1.5 h-8 data-[state=open]:bg-accent [&[data-state=open]>.text>.title]:text-accent-foreground [&[data-state=open]>.icon]:text-accent-foreground [&[data-state=open]>.arrow]:rotate-90 [&[data-state=open]>.arrow]:text-accent-foreground",
					{
						"cursor-default opacity-50": disabled,
						"bg-primary-foreground text-primary": active,
					},
					active ? (!isChild ? "bg-primary/[0.08] text-primary font-bold" : "text-foreground font-bold") : "",
				)}>
				{!!icon && <span className="icon transition-colors text-start w-5 h-5 font-medium mr-1.5">{icon}</span>}

				<span className="text flex-auto min-w-0">
					<span className="title transition-colors text-sm capitalize font-medium text-ellipsis overflow-hidden block w-full text-start">
						{title}
					</span>
				</span>

				{caption && (
					<CustomTooltip side="bottom" sideOffset={8} title={caption} arrow>
						<Info width={16} height={16} className="text-common/60 ml-1.5 transition-colors" />
					</CustomTooltip>
				)}

				{info && <span className="ml-1.5">{info}</span>}
				<ChevronRightIcon width={16} className="arrow ml-1.5 transition-transform" />
			</HoverCardTrigger>
		);
	}

	const renderContent = (
		<div
			aria-disabled={disabled}
			className={cn(
				buttonVariants({ variant: "ghost", size: isChild ? "sm" : "default" }),
				"w-full justify-start flex py-0 px-1.5 h-8",
				{
					"cursor-default opacity-50": disabled,
					"bg-primary-foreground text-primary": active,
				},
				active ? (!isChild ? "bg-primary/[0.08] text-primary font-bold" : "text-foreground font-bold") : "",
			)}>
			{!!icon && <span className="icon text-start w-5 h-5 font-medium mr-1.5 text-inherit">{icon}</span>}

			<span className="flex-auto min-w-0">
				<span className="capitalize font-medium text-ellipsis overflow-hidden block w-full text-start text-sm">{title}</span>
			</span>

			{caption && (
				<CustomTooltip side="bottom" sideOffset={8} title={caption} arrow>
					<Info width={16} height={16} className="text-common/60 ml-1.5 transition-colors" />
				</CustomTooltip>
			)}

			{info && <span className="ml-1.5">{info}</span>}
		</div>
	);

	// External
	if (path?.includes("http")) {
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
		<Link href={path ?? "#"} className="w-full">
			{renderContent}
		</Link>
	);
}
