"use client";
import { type ReactNode } from "react";
import Header from "./header";
import { useBoolean, useEventListener } from "@/hooks";
import NavVertical from "./nav-vertical";
import Main from "./main";

// ----------------------------------------------------------------------

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const expanded = useBoolean(true);

	const offset = useBoolean(false);

	const onScroll = () => {
		if (window.scrollY > 100) {
			offset.onTrue();
		} else {
			offset.onFalse();
		}
	};

	useEventListener("scroll", onScroll);

	const renderNavVertical = <NavVertical navExpanded={expanded.value} onNavToggle={expanded.onToggle} offset={offset.value} />;

	return (
		<div className="h-full flex">
			<Header navExpanded={expanded.value} offset={offset.value} />
			<div className="min-h-full w-full flex flex-col sm:flex-row h-[200vh]">
				{renderNavVertical}
				<Main navExpanded={expanded.value}>{children}</Main>
			</div>
		</div>
	);
}
