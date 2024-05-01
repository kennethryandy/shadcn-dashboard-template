import { type ReactNode } from "react";
import { env } from "@/env";

// ----------------------------------------------------------------------
interface UserListLayoutProps {
	children: ReactNode;
}

export const metadata = {
	title: `${env.APP_TITLE} - User List`,
};

export default function UserListLayout({ children }: UserListLayoutProps) {
	return <>{children}</>;
}
