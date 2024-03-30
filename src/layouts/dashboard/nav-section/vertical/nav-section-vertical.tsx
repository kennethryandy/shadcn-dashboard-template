import type { INavData } from "@/theme/configs/dashboard/navigations";
import { memo } from "react";
import NavSectionGroup from "./nav-section-group";

// ----------------------------------------------------------------------

interface IProps {
	navData: INavData;
}

const NavSectionVertial = ({ navData }: IProps) => {
	return (
		<nav className="flex flex-col">
			{navData.map(({ items, subheader }, index) => (
				<NavSectionGroup key={index} items={items} subheader={subheader} />
			))}
		</nav>
	);
};

export default memo(NavSectionVertial);
