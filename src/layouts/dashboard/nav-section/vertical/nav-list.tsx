import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { TMenuItem } from "@/theme/configs/dashboard/navigations";
import NavItem from "./nav-item";
import { useActiveLink } from "@/hooks";
// import { usePathname } from "next/navigation";

// ----------------------------------------------------------------------
interface IProps {
	item: TMenuItem;
	depth: number;
}

export default function NavList({ item, depth }: IProps) {
	const active = useActiveLink(item.path, !!item.children);

	if (!!item.children) {
		return (
			<Collapsible defaultOpen={active}>
				<NavItem {...item} depth={depth} active={active} />
				<CollapsibleContent className="pl-3">
					<NavSubList item={item.children} depth={depth} />
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

function NavSubList({ item, depth }: { item: TMenuItem[]; depth: number }) {
	return (
		<>
			{item.map((list) => (
				<NavList item={list} key={list.title} depth={depth + 1} />
			))}
		</>
	);
}
