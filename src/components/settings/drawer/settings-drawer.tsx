"use client";
import Divider from "@/components/divider";
import IconButton from "@/components/icon-button/icon-button";
import Iconify from "@/components/iconify";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useState, useCallback, type ReactNode } from "react";
import { useSettings } from "../store";
import LayoutOptions from "./layout-options";
import PresetsOptions from "./presets-options";
import { ScrollArea } from "@/components/ui/scroll-area";
import SvgColor from "@/components/svg-color";

// ----------------------------------------------------------------------

interface SettingsDrawerProps {
	children?: ReactNode;
}

type TPresetColors = "default" | "purple" | "blue" | "orange" | "rose" | "zinc";

export default function SettingsDrawer({ children }: SettingsDrawerProps) {
	const [fullscreen, setFullscreen] = useState(false);
	const settings = useSettings();

	const theme = useTheme();

	const onToggleFullScreen = useCallback(() => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
			setFullscreen(true);
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
			setFullscreen(false);
		}
	}, []);

	const renderHead = (
		<div className="flex fixed sm:w-80 z-50 sm:max-w-sm items-center justify-between py-4 pr-2 pl-4">
			<h6 className="flex-grow text-lg">Settings</h6>

			<IconButton onClick={settings.reset} size="sm">
				{/* <Badge color="error" variant="dot" invisible={!settings.canReset}> */}
				<Iconify icon="solar:restart-bold" />
				{/* </Badge> */}
			</IconButton>

			<SheetClose asChild>
				<IconButton size="sm">
					<Iconify icon="mingcute:close-line" />
				</IconButton>
			</SheetClose>
		</div>
	);

	const renderMode = (
		<div>
			<div className="text-xs opacity-50 font-semibold tracking-wide mb-2">Mode</div>
			<ButtionGroup
				value={settings.themeMode}
				onChange={(newValue) => {
					settings.update("themeMode", newValue);
					theme.setTheme(newValue);
				}}
				options={["light", "system", "dark"]}
				icons={["sun", "settings-brightness", "moon"]}
			/>
		</div>
	);

	const renderLayout = (
		<div>
			<div className="text-xs opacity-50 font-semibold tracking-wide mb-2">Layout</div>

			<LayoutOptions
				value={settings.themeLayout}
				onChange={(newValue) => settings.update("themeLayout", newValue)}
				options={["vertical", "horizontal", "mini"]}
			/>
		</div>
	);

	const renderStretch = (
		<div>
			<div className="text-xs opacity-50 font-semibold tracking-wide inline-flex items-center mb-1">Stretch</div>
			<button
				className={cn(buttonVariants(), "w-full h-16 rounded-lg border border-gray-500/10 bg-card hover:bg-inherit")}
				value={settings.themeStretch ? 1 : 0}
				onClick={() => settings.update("themeStretch", !settings.themeStretch)}>
				<div
					className={cn("flex items-center justify-between w-1/4 transition-all", {
						"w-1/2": settings.themeStretch,
					})}>
					<Iconify
						className={cn("w-6 h-6 transition-all", {
							"transform rotate-180 text-primary-dark": settings.themeStretch,
						})}
						icon={"eva:arrow-ios-forward-fill"}
					/>
					<Divider
						className={cn("border-dashed flex-grow transition-colors border-foreground", {
							"border-primary-dark": settings.themeStretch,
						})}
					/>
					<Iconify
						className={cn("w-6 h-6 transition-all", {
							"transform rotate-180 text-primary-dark": settings.themeStretch,
						})}
						icon={"eva:arrow-ios-back-fill"}
					/>
				</div>
			</button>
		</div>
	);

	const renderPresets = (
		<div>
			<div className="text-xs opacity-50 font-semibold tracking-wide inline-flex items-center mb-1">Presets</div>

			<PresetsOptions
				value={settings.themeColorPresets}
				onChange={(newValue: TPresetColors) => {
					document.documentElement.setAttribute("data-theme", newValue);
					settings.update("themeColorPresets", newValue);
				}}
			/>
		</div>
	);

	const renderFullscreen = (
		<div className="fixed bottom-6 z-50 sm:w-80 px-6">
			<button
				className="w-full inline-flex items-center justify-center outline-0 m-0 p-0 cursor-pointer select-none align-middle appearance-none rounded-lg h-12 border border-border/40"
				onClick={onToggleFullScreen}>
				<SvgColor
					className={cn("w-4 h-4 mr-1.5", {
						"text-primary": fullscreen,
					})}
					src={`/assets/icons/setting/${fullscreen ? "ic_exit_full_screen" : "ic_full_screen"}.svg`}
				/>
				<span className={cn("font-semibold", { "text-black": fullscreen })}>Fullscreen</span>
			</button>
		</div>
	);

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="p-0 w-3/4 sm:w-80" overlayProps={{ className: "hidden" }} closeIcon={false}>
				{renderHead}
				<Divider className="border-dashed" />
				<ScrollArea>
					<div className="flex flex-col gap-6 p-6 mt-16">
						{renderMode}
						{renderLayout}
						{renderStretch}
						{renderPresets}
					</div>
				</ScrollArea>
				{renderFullscreen}
			</SheetContent>
		</Sheet>
	);
}

interface IButtonOptionsProps {
	value: string;
	onChange: (...args: any) => void;
	options: string[];
	icons?: string[];
}

function ButtionGroup({ value, onChange, options, icons }: IButtonOptionsProps) {
	return (
		<ToggleGroup type="single" value={value} className="border gap-0 rounded-md">
			{options.map((option, index) => (
				<ToggleGroupItem
					key={option}
					onClick={() => onChange(option)}
					className={cn(
						"w-full text-xs capitalize data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:border-primary/30 rounded-none",
						index === 0 && "rounded-r-none border-r",
						index === option.length - 1 && "rounded-l-none border-l",
					)}
					value={option}>
					{!!icons && <SvgColor className="w-[20px] h-[20px] mr-1.5" src={`/assets/icons/setting/ic_${icons[index]}.svg`} />}
					{option}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
