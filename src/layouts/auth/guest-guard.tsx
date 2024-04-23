import { SplashScreen } from "@/components/loading";
import { validateRequest } from "@/lib/auth";
import { api } from "@/trpc/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";

// ----------------------------------------------------------------------

interface GuestGuardLayoutProps {
	title?: string;
	children?: ReactNode;
}

export default async function GuestGuardLayout({ title, children }: GuestGuardLayoutProps) {
	const me = await api.me.get.query();

	if (me) {
		return redirect("/dashboard");
	}

	return (
		<Suspense fallback={<SplashScreen />}>
			<main className="flex min-h-screen h-full">
				<div className="hidden sm:block relative flex-grow">
					<h3 className="text-4xl z-[100] text-white font-bold absolute top-4 absolute-x-center">{title || "Hi, Welcome back"}</h3>
					<Image src="/assets/background/auth-background.png" alt="men at work" fill className="object-cover" />
				</div>
				<div className="md:pt-36 md:pb-0 md:px-16 px-4 py-28 w-[480px] m-auto flex justify-center min-h-screen">{children}</div>
			</main>
		</Suspense>
	);
}
