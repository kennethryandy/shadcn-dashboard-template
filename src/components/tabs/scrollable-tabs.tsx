"use client";
import { type ComponentPropsWithoutRef, type ElementRef, type ReactNode, useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEventListener } from "@/hooks";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

gsap.registerPlugin(ScrollToPlugin);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type TOption = {
	value: string;
	label: ReactNode;
	triggerChild?: boolean;
};

interface CustomScrollableTabsProps<TOptions extends TOption[]> extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
	options: TOptions;
	value: TOptions[number]["value"];
	onChange?: (value: TOptions[number]["value"]) => void;
	tabListProps?: ComponentPropsWithoutRef<typeof TabsList>;
}

export const CustomScrollableTabs = <TOptions extends TOption[]>({
	children,
	options,
	value,
	onChange,
	tabListProps,
}: CustomScrollableTabsProps<TOptions>) => {
	const ref = useRef<ElementRef<"div">>(null);
	const containerRef = useRef<ElementRef<"div">>(null);

	const [parentWidth, setParentWidth] = useState(0);
	const [showLeftBtn, setShowLeftBtn] = useState(false);
	const [showRightBtn, setShowRightBtn] = useState(false);

	useEventListener(
		"resize",
		() => {
			const parentWidth = containerRef.current?.parentElement?.offsetWidth || 1;
			setParentWidth(parentWidth);
		},
		containerRef,
	);

	const handleChange = (value: string) => {
		if (!!onChange) {
			onChange(value as TOptions[number]["value"]);
		}
	};

	const handleBtnVisibility = (scrollLeft: number) => {
		setShowLeftBtn(scrollLeft > 0);
		const isRightButtonDisabled = (ref.current?.scrollWidth || 0) <= parentWidth + (scrollLeft || 0);
		setShowRightBtn(!isRightButtonDisabled);
	};

	useIsomorphicLayoutEffect(() => {
		if (!!ref.current && !!containerRef.current) {
			const parentWidth = containerRef.current?.parentElement?.offsetWidth || 1;
			// const currentWidth = ref.current.scrollWidth;
			setParentWidth(parentWidth);
			if (parentWidth < ref.current.offsetWidth + 8) {
				handleBtnVisibility(ref.current.scrollLeft);
			}
		}
	}, [ref]);

	const moveTo = (to: number) => {
		if (ref.current) {
			gsap.to(ref.current, {
				duration: 0.3,
				scrollTo: { x: to },
			});
		}
	};

	const handleScrollRight = () => {
		if (ref.current) {
			moveTo(ref.current.scrollLeft + parentWidth);
			handleBtnVisibility(ref.current.scrollLeft + parentWidth);
		}
	};

	const handleScrollLeft = () => {
		if (ref.current) {
			moveTo(ref.current.scrollLeft - parentWidth);
			handleBtnVisibility(ref.current.scrollLeft - parentWidth);
		}
	};

	return (
		<div ref={containerRef} className="flex items-center relative overflow-hidden z-20 bg-background">
			{showLeftBtn && (
				<button onClick={handleScrollLeft} className="inline-flex items-center justify-center bg-background text-muted-foreground w-5">
					<ChevronLeft width={18} height={18} />
				</button>
			)}
			<Tabs
				ref={ref}
				className="flex items-center overflow-x-auto scroll-smooth scrollbar-none transition-all"
				value={value}
				onValueChange={!!onChange ? handleChange : undefined}>
				<TabsList {...tabListProps} className={cn("bg-transparent h-full p-0", tabListProps?.className)}>
					{options.map(({ triggerChild = false, ...option }) => {
						return (
							<TabsTrigger
								className="relative h-12 data-[state=active]:bg-transparent data-[state=active]:text-common data-[state=active]:shadow-none before:content-[''] before:duration-150 before:transition-all before:absolute before:bottom-0 before:h-[0.1rem] before:w-0 data-[state=active]:before:w-full before:bg-common space-x-1.5"
								key={option.value}
								value={option.value}
								asChild={triggerChild}>
								{option.label}
							</TabsTrigger>
						);
					})}
				</TabsList>
				{children}
			</Tabs>
			{showRightBtn && (
				<button onClick={handleScrollRight} className="inline-flex items-center justify-center bg-background text-muted-foreground w-5">
					<ChevronRight width={18} height={18} />
				</button>
			)}
		</div>
	);
};
