import UserProfileView from "@/sections/dashboard/user/view/user-profile-view";
import { api } from "@/trpc/server";
import { TProfileTab } from "@/types/user";
import { notFound } from "next/navigation";

// ----------------------------------------------------------------------

type Params = {
	username: string;
	tab: TProfileTab;
};

interface UserProfilePageProps {
	params: Params;
}

export default async function UserProfilePage({ params: { username, tab } }: UserProfilePageProps) {
	const user = await api.user.getUserByUsername.query({ username });
	const session = (await api.me.session.query()) as string;

	if (!user) {
		return notFound();
	}

	return (
		<>
			<UserProfileView user={user} isOwnProfile={session === user.id} tab={tab} />
		</>
	);
}
