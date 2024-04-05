"use client";
import { type ReactNode } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useSettings } from "./settings/store";
// ----------------------------------------------------------------------

interface ProgressBarProviderProps {
	children?: ReactNode;
}

export default function ProgressBarProvider({ children }: ProgressBarProviderProps) {
	const preset = useSettings((state) => state.themeColorPresets);
	return (
		<>
			{children}
			<ProgressBar height="4px" options={{ showSpinner: false }} shallowRouting />
		</>
	);
}
