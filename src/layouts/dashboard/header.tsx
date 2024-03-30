import { cn } from "@/lib/utils";
import Searchbar from "../common/searchbar";
import Notifications from "../common/notifications";
import MobileDrawerMenu from "./nav-section/mobile";
import type { INavData } from "@/theme/configs/dashboard/navigations";
import AccountMenu from "../common/account-menu";
import Settings from "@/components/settings";
import IconButton from "@/components/icon-button/icon-button";
import Iconify from "@/components/iconify";
import CustomTooltip from "@/components/custom-tooltip";
import Logo from "@/components/logo";
import Link from "next/link";

// ----------------------------------------------------------------------

interface IProps {
	className?: string;
	navExpanded: boolean;
	offset: boolean;
	navData: INavData;
	showLogo?: boolean;
}

export default function Header({ className, navData, navExpanded, offset, showLogo }: IProps) {
	return (
		<header
			className={cn(
				"w-full h-16 fixed right-0 top-0 left-auto backdrop-blur-sm md:transition-all z-20 bg-background/80",
				navExpanded ? "md:w-[calc(100%_-_theme(spacing.72)_-_1px)]" : "md:w-[calc(100%_-_theme(spacing.24)_-_1px)]",
				navExpanded ? (offset ? "md:h-16" : "md:h-20") : "md:h-16",
				className,
			)}>
			<div className="h-full flex items-center px-6 lg:px-10">
				{showLogo && <Logo className={"mx-auto h-10 w-10 mr-5 hidden sm:flex"} />}
				<MobileDrawerMenu navData={navData} />
				<Searchbar />
				<div className="flex flex-grow items-center justify-end gap-1 sm:gap-4">
					<Notifications />
					<CustomTooltip title="Settings">
						<div>
							<Settings>
								<IconButton>
									<Iconify icon="solar:settings-bold-duotone" width={24} />
								</IconButton>
							</Settings>
						</div>
					</CustomTooltip>
					<AccountMenu />
				</div>
			</div>
		</header>
	);
}
