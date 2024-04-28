import { SplashScreen } from "@/components/loading";
import { env } from "@/env";
import GuestGuardLayout from "@/layouts/auth/guest-guard";
import { Suspense, type ReactNode } from "react";

// ----------------------------------------------------------------------

interface LoginLayoutProps {
	children?: ReactNode;
}

export const metadata = {
	title: `${env.APP_TITLE} - Login`,
};

export default function LoginLayout({ children }: LoginLayoutProps) {
	return (
		<Suspense fallback={<SplashScreen />}>
			<GuestGuardLayout>{children}</GuestGuardLayout>
		</Suspense>
	);
}
