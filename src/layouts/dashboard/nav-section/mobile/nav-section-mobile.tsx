import { memo } from "react";
import type { INavData } from "@/theme/configs/dashboard/navigations";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import NavList from "./nav-list";

// ----------------------------------------------------------------------

interface IProps {
	navData: INavData;
}

const NavSectionMobile = ({ navData }: IProps) => {
	return (
		<nav className="flex flex-col">
			{navData.map(({ items, subheader }, index) => (
				<Group key={index} items={items} subheader={subheader} />
			))}
		</nav>
	);
};

// ----------------------------------------------------------------------
interface IGroupProps {
	items: INavData[number]["items"];
	subheader: INavData[number]["subheader"];
}

function Group({ items, subheader }: IGroupProps) {
	return (
		<div className="flex flex-col px-4">
			<Collapsible defaultOpen>
				<CollapsibleTrigger className="w-full [&[data-state=closed]>.nav-subheader]:text-accent-foreground [&[data-state=closed]>.nav-subheader]:after:content-['•_•_•'] [&[data-state=closed]>.nav-subheader]:after:ml-2">
					<li className="nav-subheader w-full box-border cursor-pointer text-xs font-bold leading-normal uppercase inline-flex text-gray-400 transition-colors pt-4 pr-2 pb-4 pl-3 hover:text-foreground select-none">
						{subheader}
					</li>
				</CollapsibleTrigger>
				<CollapsibleContent className="flex w-full">
					<div className="w-full">
						{items.map((item) => (
							<NavList key={item.title} item={item} depth={1} />
						))}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}

export default memo(NavSectionMobile);
