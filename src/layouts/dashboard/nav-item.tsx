import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TMenuItems } from "@/theme/configs/dashboard/navigations";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

// ----------------------------------------------------------------------

type TProps = {
	depth: number;
	active: boolean;
} & TMenuItems;
export default function NavItem(props: TProps) {
	const { title, path = "#", icon, info, caption, disabled, children, depth, active } = props;

	if (active) {
		console.log(title, path);
	}
	const isChild = depth !== 1;
	if (!!children) {
		return (
			<CollapsibleTrigger
				disabled={disabled}
				aria-disabled={disabled}
				className={cn(
					buttonVariants({ variant: "ghost", size: isChild ? "sm" : "default" }),
					"mb-1 w-full justify-start text-gray-600 flex [&[data-state=open]>.arrow]:rotate-90",
					{
						"cursor-default opacity-50": disabled,
						"bg-primary-foreground text-primary": active,
					},
				)}>
				{!icon && (
					<span
						className={cn(
							'w-6 h-6 flex justify-center items-center mr-4 before:content-[""] before:h-1 before:w-1 before:rounded-full before:bg-gray-600',
							{
								"before:text-primary": active,
							},
						)}
					/>
				)}
				{!!icon && <span className="icon text-start w-6 h-6 min-w-6 font-medium mr-4 text-inherit">{icon}</span>}
				<span className="flex-auto min-w-0">
					<span className="capitalize font-medium text-ellipsis overflow-hidden block w-full text-start text-inherit">
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
				"mb-1 w-full justify-start text-gray-600 flex",
				{
					"cursor-default opacity-50": disabled,
				},
				active ? (!isChild ? "bg-primary/[0.08] text-primary font-bold" : "text-foreground font-bold") : "",
			)}>
			{!!icon ? (
				<span className="icon text-start w-6 h-6 font-medium mr-4 text-inherit">{icon}</span>
			) : (
				<span
					className={cn(
						'w-6 h-6 flex justify-center items-center mr-4 before:content-[""] before:h-1 before:w-1 before:rounded-full before:bg-gray-600',
						{
							"before:text-primary": active,
						},
					)}
				/>
			)}

			<span className="flex-auto min-w-0">
				<span className="capitalize font-medium text-ellipsis overflow-hidden block w-full text-start text-inherit">
					{title}
				</span>
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
			<Link href={path} target="_blank" rel="noopener" className={cn("mb-1")}>
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
		<Link href={path} className={"mb-1"}>
			{renderContent}
		</Link>
	);
}
