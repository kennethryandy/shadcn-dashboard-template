import AuthLoginForm from "@/sections/auth/login/auth-login-form";
import Image from "next/image";
import Link from "next/link";

// ----------------------------------------------------------------------

export default function LoginPage() {
	return (
		<div className="flex flex-col w-full">
			<div className="flex justify-center mb-6">
				<Image className="w-24 h-auto" src="/assets/logo.png" alt="Company Logo" width={140} height={60} />
			</div>
			<div className="flex flex-col relative">
				<div className="mb-10 flex flex-col">
					<div className="mb-4">
						<h5 className="text-xl font-bold text-common">Sign in to</h5>
						<h5 className="text-xl font-bold text-common">
							<span className="text-primary">I</span>ntegrated <span className="text-primary">M</span>anagement{" "}
							<span className="text-primary">S</span>ystem
						</h5>
					</div>
					<div className="flex items-center space-x-1">
						<p className="leading-none tracking-normal text-sm text-common font-medium">New User?</p>
						<Link href="/sign-up" className="leading-none tracking-normal text-sm text-primary hover:underline">
							Create an account
						</Link>
					</div>
				</div>
			</div>

			<AuthLoginForm />
		</div>
	);
}
