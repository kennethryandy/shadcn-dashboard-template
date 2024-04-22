import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LogoSvg from "./logo-svg";

// ----------------------------------------------------------------------

interface ILogoProps {
	className?: string;
	disabled?: boolean;
}

export default function Logo({ className, disabled = false }: ILogoProps) {
	const logo = (
		<span className={cn("inline-flex h-14 w-14", className)}>
			<LogoSvg />
		</span>
	);
	return (
		<Link
			href="/"
			className={cn("contents m-0", {
				"pointer-events-none": disabled,
			})}
			aria-disabled={disabled}>
			{logo}
		</Link>
	);
}
