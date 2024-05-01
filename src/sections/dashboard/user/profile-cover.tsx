"use client";
import { ScrollableTabs } from "@/components/tabs";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { paths } from "@/theme/routes/paths";
import { IProfileUser, TProfileTab } from "@/types/user";
import Iconify from "@/components/iconify";

// ----------------------------------------------------------------------

interface ProfileCoverProps {
	user: IProfileUser;
	tab: TProfileTab;
}

export default function ProfileCover({ user, tab }: ProfileCoverProps) {
	const router = useRouter();
	const handleTabChange = (tabValue: string) => {
		router.push(paths.dashboard.user.profileTab(user.username, tabValue), { scroll: false });
	};
	const profileTabs = [
		{
			value: "profile",
			label: (
				<span className="flex items-center space-x-1.5">
					<Iconify icon="solar:user-id-bold" className="size-6" />
					<span>Profile</span>
				</span>
			),
		},
		{
			value: "trainings",
			label: (
				<span className="flex items-center space-x-1.5">
					<Iconify icon="clarity:certificate-solid" className="size-6" />
					<span>Trainings</span>
				</span>
			),
		},
		{
			value: "gallery",
			label: (
				<span className="flex items-center space-x-1.5">
					<Iconify icon="solar:gallery-wide-bold" className="size-6" />
					<span>Gallery</span>
				</span>
			),
		},
	];
	return (
		<Card className="relative z-10 rounded-xl mb-6 md:mb-10">
			<CardHeader className="relative h-72 p-0">
				<Image
					alt={`${user.fullname} cover photo`}
					src="https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg"
					sizes="80vw"
					fill
					className="object-cover w-full h-full rounded-xl"
				/>
				<div className="absolute flex z-30 left-6 bottom-6">
					<div className="size-32 rounded-full bg-slate-400"></div>
					<div className="ml-6 mt-8">
						<span className="block text-2xl font-bold text-white">{user.fullname}</span>
						{user.employee && <span className="block text-sm font-semibold text-slate-300">{user.employee?.position.position}</span>}
					</div>
				</div>
			</CardHeader>
			<CardContent className="absolute rounded-b-xl p-0 w-full -bottom-0.5 z-20 flex bg-background min-h-12 items-center justify-end">
				<div className="flex justify-end max-w-[80%] max-sm:max-w-full w-full pr-0 sm:pr-2">
					<ScrollableTabs options={profileTabs} value={tab} onChange={handleTabChange} tabListProps={{ className: "space-x-6" }} />
				</div>
			</CardContent>
		</Card>
	);
}
