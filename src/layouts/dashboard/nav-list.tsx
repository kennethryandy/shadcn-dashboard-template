import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { TMenuItems } from "@/theme/configs/dashboard/navigations";
import NavItem from "./nav-item";
import { useActiveLink } from "@/hooks";
import { usePathname } from "next/navigation";

// ----------------------------------------------------------------------
interface IProps {
	item: TMenuItems;
	depth: number;
}

export default function NavList({ item, depth }: IProps) {
	const pathname = usePathname();
	const active = useActiveLink(item.path, !!item.children);
	// console.table({ active, title: item.title, path: item.path, pathname });

	if (!!item.children) {
		return (
			<Collapsible defaultOpen={active}>
				<NavItem {...item} depth={depth} active={active} />
				<CollapsibleContent className="pl-3">
					<NavSubList item={item.children} depth={depth + 1} />
				</CollapsibleContent>
			</Collapsible>
		);
	}

	return (
		<>
			<NavItem {...item} depth={depth} active={active} />
		</>
	);
}

// ----------------------------------------------------------------------

function NavSubList({ item, depth }: { item: TMenuItems[]; depth: number }) {
	return (
		<>
			{item.map((list) => (
				<NavList item={list} key={list.title} depth={depth} />
			))}
		</>
	);
}
