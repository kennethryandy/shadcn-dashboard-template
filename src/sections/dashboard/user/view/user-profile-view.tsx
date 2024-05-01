"use client";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { Container } from "@/components/reusable";
import { paths } from "@/theme/routes/paths";
import ProfileCover from "../profile-cover";
import ProfileHome from "../profile-home";
import { IProfileUser, TProfileTab } from "@/types/user";
import ProfileTraining from "../profile-training";
import ProfileGallery from "../profile-gallery";

// ----------------------------------------------------------------------

interface ProfileViewProps {
	user: IProfileUser;
	isOwnProfile: boolean;
	tab: TProfileTab;
}

export default function UserProfileView({ user, tab }: ProfileViewProps) {
	return (
		<Container maxWidth="xl">
			<CustomBreadcrumbs
				heading="Profile"
				links={[
					{ name: "Dashboard", path: paths.dashboard.root },
					{ name: "Users", path: paths.dashboard.user.list },
					{ name: user.fullname },
				]}
				className="mb-6 md:mb-10"
			/>
			<ProfileCover user={user} tab={tab} />
			{tab === "profile" && <ProfileHome user={user} />}
			{tab === "trainings" && <ProfileTraining />}
			{tab === "gallery" && <ProfileGallery />}
		</Container>
	);
}
