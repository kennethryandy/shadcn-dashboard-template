import { env } from "@/env";
import LoginModal from "@/sections/auth/login/auth-login-modal";
import { type ReactNode } from "react";

// ----------------------------------------------------------------------

interface DashboardLoginPageProps {
	children?: ReactNode;
}

export const metadata = {
	title: `${env.APP_TITLE} - Login`,
};

export default function DashboardLoginPage({}: DashboardLoginPageProps) {
	return (
		<>
			<LoginModal />
		</>
	);
}
