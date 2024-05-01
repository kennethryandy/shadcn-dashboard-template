"use client";
import { usePathname } from "next/navigation";

// ----------------------------------------------------------------------

export function useActiveLink(path: string = "#", deep = true) {
	const pathname = usePathname();

	const checkPath = path.startsWith("#");

	const normalActive = !checkPath && pathname === path;

	const deepActive = !checkPath && pathname.includes(path);

	return deep ? deepActive : normalActive;
}
