import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LogoSvg from "./logo-svg";

// ----------------------------------------------------------------------

interface ILogoProps {
	className?: string;
}

export default function Logo({ className }: ILogoProps) {
	const logo = (
		<span className={cn("inline-flex h-14 w-14", className)}>
			<LogoSvg />
		</span>
	);
	return (
		<Link href="/" className="contents m-0">
			{logo}
		</Link>
	);
}
