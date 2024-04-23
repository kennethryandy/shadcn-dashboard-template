import LoginModal from "@/sections/auth/login/auth-login-modal";
import { type ReactNode } from "react";

// ----------------------------------------------------------------------

interface DashboardLoginPageProps {
	children?: ReactNode;
}

export default function DashboardLoginPage({}: DashboardLoginPageProps) {
	return (
		<>
			<LoginModal />
		</>
	);
}
