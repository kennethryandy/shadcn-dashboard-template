"use client";
import { SplashScreen } from "@/components/loading";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

// ----------------------------------------------------------------------

interface AuthGuardLayoutProps {
	children?: ReactNode;
}

export default function AuthGuardLayout({ children }: AuthGuardLayoutProps) {
	const { isLoading, data } = api.me.get.useQuery();

	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		setLoading(false);
		if (!isLoading && !data) {
			router.push("/login");
		}
	}, [isLoading, data, router]);

	if (isLoading || loading) return <SplashScreen />;
	return <>{children}</>;
}
