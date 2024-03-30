import { memo } from "react";
import type { INavData } from "@/theme/configs/dashboard/navigations";
import NavList from "./nav-list";

// ----------------------------------------------------------------------

interface IProps {
	navData: INavData;
}

const NavSectionMini = ({ navData }: IProps) => {
	return (
		<nav className="flex flex-col gap-1">
			{navData.map(({ items }, index) => (
				<Group key={index} items={items} />
			))}
		</nav>
	);
};

export default memo(NavSectionMini);

// ----------------------------------------------------------------------

interface IGroupProps {
	items: INavData[number]["items"];
}

function Group({ items }: IGroupProps) {
	return (
		<>
			{items.map((item) => (
				<NavList key={item.title} item={item} depth={1} />
			))}
		</>
	);
}
