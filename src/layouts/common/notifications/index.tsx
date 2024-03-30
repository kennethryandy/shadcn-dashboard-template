import { _notifications } from "@/_mock";
import { BadgeFloat } from "@/components/badge-number";
import CustomTooltip from "@/components/custom-tooltip";
import IconButton from "@/components/icon-button/icon-button";
import Iconify from "@/components/iconify";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { CheckCheck, X } from "lucide-react";
import { List, ListItemAvatar, ListItemButton, ListItemText } from "../../../components/list";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { fToNow } from "@/utils/format-time";
import { Button } from "@/components/ui/button";

// ----------------------------------------------------------------------

const TABS = [
	{
		value: "all",
		label: "All",
		count: 22,
	},
	{
		value: "unread",
		label: "Unread",
		count: 12,
	},
	{
		value: "archived",
		label: "Archived",
		count: 10,
	},
];

// ----------------------------------------------------------------------

export default function Notifications() {
	const [notifications, setNotifications] = useState(_notifications);

	const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

	const renderList = (
		<div className="w-full h-full flex flex-grow max-h-[82vh]">
			<ScrollArea>
				<List>
					{notifications.map((notification) => (
						<NotificationItem key={notification.id} notification={notification} />
					))}
				</List>
				<div className="flex-grow" />
			</ScrollArea>
		</div>
	);

	return (
		<Sheet>
			<CustomTooltip title="Notifications">
				<SheetTrigger asChild>
					<IconButton>
						<div>
							<BadgeFloat badgeContent={totalUnRead}>
								<span className="w-6 h-6 flex">
									<Iconify icon="solar:bell-bing-bold-duotone" width={24} />
								</span>
							</BadgeFloat>
						</div>
					</IconButton>
				</SheetTrigger>
			</CustomTooltip>
			<SheetContent className="p-0 w-full sm:w-3/4" overlayProps={{ className: "hidden" }} closeIcon={false}>
				<SheetHeader className="space-y-0 flex flex-row justify-between items-center px-6 py-3">
					<SheetTitle>Notifications</SheetTitle>
					<div className="flex items-center gap-1">
						{!!totalUnRead && (
							<CustomTooltip title="Mark all as read">
								<IconButton variant="primary" size="sm">
									<CheckCheck width={18} height={18} />
								</IconButton>
							</CustomTooltip>
						)}
						<SheetClose asChild>
							<IconButton className="inline-flex sm:hidden" size="sm">
								<X />
							</IconButton>
						</SheetClose>
					</div>
				</SheetHeader>
				<Separator />
				<div className="h-12 sticky p-6"></div>
				<Separator />
				<div>{renderList}</div>
			</SheetContent>
		</Sheet>
	);
}

type NotificationItem = {
	id: string;
	avatarUrl: string | null;
	type: string;
	category: string;
	isUnRead: boolean;
	createdAt: Date;
	title: string;
};
interface NotificationItemProps {
	notification: NotificationItem;
}

function NotificationItem({ notification }: NotificationItemProps) {
	const renderAvatar = (
		<ListItemAvatar>
			{notification?.avatarUrl ? (
				<Avatar>
					<AvatarImage src={notification.avatarUrl} alt={notification.title} />
				</Avatar>
			) : (
				<div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300">
					<Image
						src={`/assets/icons/notification/${
							(notification.type === "order" && "ic_order") ||
							(notification.type === "chat" && "ic_chat") ||
							(notification.type === "mail" && "ic_mail") ||
							(notification.type === "delivery" && "ic_delivery")
						}.svg`}
						alt={notification.title}
						width={24}
						height={24}
					/>
				</div>
			)}
		</ListItemAvatar>
	);

	const renderText = (
		<ListItemText
			disableTypography
			primary={notification.title}
			secondary={
				<div className="flex items-center text-xs -tracking-tight mb-[0.35em] text-muted-foreground leading-relaxed">
					{fToNow(notification.createdAt)}
					<div className="w-1 h-1 bg-current mx-1 rounded-full" />
					{notification.category}
				</div>
			}
		/>
	);

	return (
		<ListItemButton component="div" className="items-start p-5 border-b border-dashed border-b-gray-600/5">
			{renderAvatar}
			<div className="flex flex-col flex-grow">
				{renderText}
				{notification.type === "friend" && (
					<div className="flex flex-row gap-2 mt-3">
						<Button size="sm" color="primary" className="h-6 text-xs">
							Accept
						</Button>
						<Button size="sm" variant="outlined" className="h-6 text-xs">
							Decline
						</Button>
					</div>
				)}
			</div>
		</ListItemButton>
	);
}
