import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import NavList from "./nav-list";
import { type INavData } from "@/theme/configs/dashboard/navigations";

// ----------------------------------------------------------------------
interface IGroupProps {
	items: INavData[number]["items"];
	subheader: INavData[number]["subheader"];
}

export default function NavSectionGroup({ items, subheader }: IGroupProps) {
	return (
		<div className="flex flex-col px-4">
			<Collapsible defaultOpen>
				<CollapsibleTrigger className="w-full [&[data-state=closed]>.nav-subheader]:after:content-['•_•_•'] [&[data-state=closed]>.nav-subheader]:after:ml-2">
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
