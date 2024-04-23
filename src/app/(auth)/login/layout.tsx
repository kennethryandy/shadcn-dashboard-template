import { SplashScreen } from "@/components/loading";
import GuestGuardLayout from "@/layouts/auth/guest-guard";
import { Suspense, type ReactNode } from "react";

// ----------------------------------------------------------------------

interface LoginLayoutProps {
	children?: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
	return (
		<Suspense fallback={<SplashScreen />}>
			<GuestGuardLayout>{children}</GuestGuardLayout>
		</Suspense>
	);
}
