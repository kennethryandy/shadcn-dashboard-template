import { useActiveLink } from "@/hooks";
import type { TMenuItem } from "@/theme/configs/dashboard/navigations";
import NavItem from "./nav-item";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { HoverCardPortal } from "@radix-ui/react-hover-card";

// ----------------------------------------------------------------------

interface NavListProps {
	item: TMenuItem;
	depth: number;
}

export default function NavList({ item, depth }: NavListProps) {
	const active = useActiveLink(item.path, !!item.children);

	if (!!item.children) {
		return (
			<HoverCard openDelay={250} closeDelay={250}>
				<NavItem {...item} depth={depth} active={active} />
				<HoverCardPortal>
					<HoverCardContent
						className="w-40 px-1 py-1"
						side={depth > 1 ? "right" : "bottom"}
						align={depth > 1 ? "start" : "center"}>
						<NavSubList item={item.children} depth={depth} />
					</HoverCardContent>
				</HoverCardPortal>
			</HoverCard>
		);
	}

	return <NavItem {...item} depth={depth} active={active} />;
}

// ----------------------------------------------------------------------

function NavSubList({ item, depth }: { item: TMenuItem[]; depth: number }) {
	return (
		<div className="flex flex-col">
			{item.map((list) => (
				<NavList key={list.title} item={list} depth={depth + 1} />
			))}
		</div>
	);
}
