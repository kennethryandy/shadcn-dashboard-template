import IconButton from "@/components/icon-button/icon-button";
import Logo from "@/components/logo";
import SvgColor from "@/components/svg-color";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetPortal, SheetTrigger } from "@/components/ui/sheet";
import type { INavData } from "@/theme/configs/dashboard/navigations";
import NavSectionMobile from "./nav-section-mobile";

// ----------------------------------------------------------------------

interface MobileDrawerMenuProps {
	navData: INavData;
}

export default function MobileDrawerMenu({ navData }: MobileDrawerMenuProps) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<IconButton className="block mr-1 md:hidden">
					<SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
				</IconButton>
			</SheetTrigger>
			<SheetPortal>
				<SheetContent side="left" className="p-0 w-72" closeIcon={false}>
					<div className="h-full w-full">
						<ScrollArea className="h-full flex flex-col [&>div>div]:!block">
							<Logo className={"mt-6 mb-1 ml-6"} />
							<NavSectionMobile navData={navData} />
							<div className="flex-grow" />
						</ScrollArea>
					</div>
				</SheetContent>
			</SheetPortal>
		</Sheet>
	);
}
