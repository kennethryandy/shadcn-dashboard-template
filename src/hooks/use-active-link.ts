import { usePathname } from "next/navigation";

// ----------------------------------------------------------------------

export function useActiveLink(path: string = "#", deep = true) {
	const pathname = usePathname();

	const checkPath = path.startsWith("#");

	// const currentPath = path === "/" ? "/" : `${path}/`;

	// const normalActive = !checkPath && pathname === currentPath;

	// const deepActive = !checkPath && pathname.includes(currentPath);

	const normalActive = !checkPath && pathname === path;

	const deepActive = !checkPath && pathname.includes(path);

	return deep ? deepActive : normalActive;
}
