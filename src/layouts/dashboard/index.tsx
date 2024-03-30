"use client";
import { type ReactNode } from "react";
import Header from "./header";
import NavVertical from "./nav-section/vertical";
import Main from "./main";
import { useNavData } from "@/theme/configs/dashboard/navigations";
import NavHorizontal from "./nav-section/horizontal";
import { useSettings } from "@/components/settings/store";
import SplashScreen from "@/components/loading/splash-screen";

// ----------------------------------------------------------------------

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const themeLayout = useSettings((state) => state.themeLayout);

	const navData = useNavData();

	const isHorizontal = themeLayout === "horizontal";

	// if (!settings._hasHydrated) {
	// 	return (
	// 		<div>
	// 			<Header offset={true} navExpanded={false} navData={navData} className="md:w-full" showLogo />

	// 			<Main classname="pt-40 pb-32 lg:pt-40">{children}</Main>
	// 		</div>
	// 	);
	// }

	if (isHorizontal) {
		return (
			<>
				<Header offset={true} navExpanded={false} navData={navData} className="md:w-full" showLogo />

				<NavHorizontal navData={navData} />

				<Main classname="pt-40 pb-32 lg:pt-40">{children}</Main>
			</>
		);
	}

	return (
		<div className="h-full flex">
			<NavVertical navData={navData} themeLayout={themeLayout}>
				{children}
			</NavVertical>
		</div>
	);
}
