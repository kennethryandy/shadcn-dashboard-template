"use client";
import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { default as tailwindConfig } from "../../tailwind.config";

// ----------------------------------------------------------------------

const screens = tailwindConfig.theme.screens;

type Breakpoint = keyof typeof screens;
type Direction = "down" | "up" | "only";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useBreakpoint(direction: Direction, breakpoint: Breakpoint, callback?: (match: boolean) => void) {
	const [match, setMatch] = useState(false);

	const handleResize = useCallback(() => {
		const windowWidth = window.innerWidth;
		const breakpointValue = parseInt(screens[breakpoint]);
		const matching =
			direction === "down"
				? windowWidth <= breakpointValue
				: direction === "up"
				? windowWidth > breakpointValue
				: windowWidth === breakpointValue;
		setMatch(matching);
		if (!!callback) {
			callback(matching);
		}
	}, [direction, breakpoint, callback]);

	useIsomorphicLayoutEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [direction, breakpoint]);

	return match;
}
