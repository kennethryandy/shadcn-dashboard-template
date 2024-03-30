import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

type TLayout = "vertical" | "horizontal" | "mini";
type TRenderItem = {
	option: TLayout;
	selected: boolean;
};

interface ILayoutOptions {
	value: TLayout;
	onChange: (newValue: TLayout) => void;
	options: TLayout[];
}

export default function LayoutOptions({ value, options, onChange }: ILayoutOptions) {
	const renderItem = ({ option, selected }: TRenderItem) => {
		const circle = (
			<div
				className={cn(
					"flex-shrink-0 rounded-[4px] w-2 h-2",
					selected ? "bg-gradient-to-b from-primary/60 to-primary/80" : "bg-gray-500",
				)}
			/>
		);
		const primaryItem = (
			<div
				className={cn(
					"flex-shrink-0 rounded-[4px] w-full h-1 opacity-45",
					selected ? "bg-gradient-to-b from-primary/60 to-primary/80" : "bg-gray-500",
					{
						"w-3": option === "horizontal",
					},
				)}
			/>
		);

		const secondaryItem = (
			<div
				className={cn(
					"flex-shrink-0 rounded-[4px] w-full h-1 max-w-3 opacity-25",
					selected ? "bg-gradient-to-b from-primary/60 to-primary/80" : "bg-gray-500",
					{
						"w-2": option === "horizontal",
					},
				)}
			/>
		);

		return (
			<div
				className={cn("flex flex-col gap-1 flex-shrink-0 px-1 py-2 w-7 h-full border-solid border-r border-gray-500/10", {
					"flex-row w-full h-4 items-center border-r-0 border-b": option === "horizontal",
					"w-4": option === "mini",
				})}>
				{circle}
				{primaryItem}
				{secondaryItem}
			</div>
		);
	};

	const renderContent = (selected: boolean) => (
		<div className={"p-1 flex-grow h-full w-full"}>
			<div
				className={cn(
					"h-full w-full opacity-10 rounded-md bg-gray-500",
					selected && "opacity-25 bg-gradient-to-b from-primary/60 to-primary/80",
				)}
			/>
		</div>
	);
	return (
		<div className="flex gap-4">
			{options.map((option) => {
				const selected = value === option;
				return (
					<button
						className={cn(
							buttonVariants(),
							"flex p-0 w-full h-16 rounded-lg border border-solid dark:bg-gray-900 dark:hover:bg-primary/5 border-gray-500/10 hover:bg-primary/10",
							{
								"dark:bg-popover bg-popover shadow-md": selected,
								"flex-col": option === "horizontal",
							},
						)}
						key={option}
						onClick={() => onChange(option)}>
						{renderItem({ option, selected })}
						{renderContent(selected)}
					</button>
				);
			})}
		</div>
	);
}
