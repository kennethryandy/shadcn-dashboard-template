"use client";
import { Button } from "@/components/ui/button";
import { useBoolean, useBreakpoint, useEventListener } from "@/hooks";
import { cn } from "@/lib/utils";
import type { INavData } from "@/theme/configs/dashboard/navigations";
import { ChevronLeftIcon } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import Header from "../../header";
import Main from "../../main";
import NavMiniContent from "../mini/nav-mini-content";
import NavVerticalContent from "./nav-vertical-content";
// import { useSettings } from "@/components/settings/store";

// ----------------------------------------------------------------------
interface INavVertialProps {
	navData: INavData;
	children?: ReactNode;
	themeLayout: "vertical" | "horizontal" | "mini";
}

export default function NavVertical({ children, themeLayout, navData = [] }: INavVertialProps) {
	// const hasHydrated = useSettings((state) => state._hasHydrated);
	const isMini = themeLayout === "mini";
	const isVertical = themeLayout === "vertical";

	const expanded = useBoolean(!isMini);
	const setValueExpandex = expanded.setValue;

	const isOpen = expanded.value;

	const xlUp = useBreakpoint("up", "xl", function breakpointListener(match: boolean) {
		if (isOpen && !match && !isMini) {
			expanded.setValue(false);
		}
	});

	const offset = useBoolean(false);

	useEventListener("scroll", onScroll);

	function onScroll() {
		if (window.scrollY > 100) {
			offset.onTrue();
		} else {
			offset.onFalse();
		}
	}

	useEffect(() => {
		if (isVertical) {
			setValueExpandex(true);
		}
		if (isMini) {
			setValueExpandex(false);
		}
	}, [isMini, isVertical, setValueExpandex]);

	const renderNavVertical = (
		<div className={cn("transition-all h-screen z-[50] hidden md:block", isOpen ? "min-w-72 w-72" : "min-w-24 w-24")}>
			<Button
				variant="outlined"
				size="icon"
				className={cn(
					"transition-all fixed bg-background border border-border border-opacity-24 dark:border-opacity-36 hover:bg-background shadow-sm hover:shadow-lg rounded-full w-8 h-8 border-dashed z-[50]",
					isOpen ? "rotate-0 left-[calc(theme(spacing.72)_-_16px_)] top-6" : "rotate-180 left-[calc(theme(spacing.24)_-_16px_)] top-4",
					offset && "top-4",
				)}
				onClick={expanded.onToggle}>
				<ChevronLeftIcon className="h-4 w-4" />
			</Button>
			<div className={cn("z-20 fixed transition-all h-full hidden md:flex flex-col border-r border-dashed", isOpen ? "w-72" : "w-24")}>
				{isOpen ? <NavVerticalContent navData={navData} /> : <NavMiniContent navData={navData} />}
			</div>
		</div>
	);

	return (
		<>
			<Header navData={navData} navExpanded={isOpen} offset={offset.value} />
			<div className="min-h-full w-full flex flex-col sm:flex-row">
				{renderNavVertical}
				<Main
					classname={cn(
						!xlUp && isOpen && "py-[5.5rem]",
						isOpen ? "md:max-w-[calc(100%_-_theme(spacing.72))]" : "md:max-w-[calc(100%_-_theme(spacing.24))]",
						"max-w-full",
					)}>
					{children}
				</Main>
			</div>
		</>
	);
}
