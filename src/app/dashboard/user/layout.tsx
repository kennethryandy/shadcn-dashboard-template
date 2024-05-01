import { type ReactNode } from "react";
import { env } from "@/env";

// ----------------------------------------------------------------------
interface UserLayoutProps {
	children: ReactNode;
}

export const metadata = {
	title: `${env.APP_TITLE} - Profile`,
};

export default function UserLayout({ children }: UserLayoutProps) {
	return <>{children}</>;
}
