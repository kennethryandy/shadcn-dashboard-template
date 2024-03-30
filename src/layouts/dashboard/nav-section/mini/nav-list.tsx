import type { TMenuItem } from "@/theme/configs/dashboard/navigations";
import NavItem from "./nav-item";
import { useActiveLink } from "@/hooks";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";

// ----------------------------------------------------------------------

interface NavListProps {
	item: TMenuItem;
	depth: number;
}

export default function NavList({ item, depth = 0 }: NavListProps) {
	const active = useActiveLink(item.path, !!item.children);

	if (!!item.children) {
		return (
			<HoverCard openDelay={250} closeDelay={250}>
				<NavItem {...item} depth={depth} active={active} />
				<HoverCardContent className="w-40 px-1 py-1" side="right" align="center">
					<NavSubList item={item.children} depth={depth} />
				</HoverCardContent>
			</HoverCard>
		);
	}

	return <NavItem {...item} depth={depth} active={active} />;
}

// ----------------------------------------------------------------------

function NavSubList({ item, depth }: { item: TMenuItem[]; depth: number }) {
	return (
		<div className="flex flex-col gap-1">
			{item.map((list) => (
				<NavList item={list} key={list.title} depth={depth + 1} />
			))}
		</div>
	);
}
