import { type ReactNode } from "react";
import DashboardLayout from "@/layouts/dashboard";
import AuthGuardLayout from "@/layouts/auth/auth-guard";

// ----------------------------------------------------------------------
interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<AuthGuardLayout>
			<DashboardLayout>{children}</DashboardLayout>
		</AuthGuardLayout>
	);
}
