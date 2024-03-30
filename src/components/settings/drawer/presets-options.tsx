import CustomTooltip from "@/components/custom-tooltip";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

export const presetOptions = [
	["default", "#16a34a"],
	["orange", "#F97316"],
	["blue", "#2563EB"],
	["rose", "#E11D48"],
	["zinc", "#18181B"],
	["purple", "#7738DC"],
] as const;

type TPresetNames = (typeof presetOptions)[number][0];

interface PresetsOptionsProps {
	value: TPresetNames;
	onChange: (newValue: TPresetNames) => void;
}

export default function PresetsOptions({ value, onChange }: PresetsOptionsProps) {
	return (
		<div className="grid grid-cols-3 gap-x-4 gap-y-3">
			{presetOptions.map(([name, color]) => {
				const selected = name === value;
				return <ColorButton key={name} name={name} onClick={() => onChange(name)} color={color} selected={selected} />;
			})}
		</div>
	);
}

function ColorButton({
	name,
	color,
	selected,
	onClick,
}: {
	name: TPresetNames;
	color: string;
	selected: boolean;
	onClick: () => void;
}) {
	return (
		<CustomTooltip className="capitalize" title={name}>
			<button
				className={cn(
					"inline-flex items-center justify-center outline-0 m-0 p-0 cursor-pointer select-none align-middle appearance-none rounded-lg h-14 border border-border/40",
					selected && "bg-primary/10",
				)}
				onClick={onClick}>
				<div
					className={cn("w-4 h-4 rounded-full transition-transform", selected && "scale-150")}
					style={{
						backgroundColor: color,
					}}
				/>
			</button>
		</CustomTooltip>
	);
}
