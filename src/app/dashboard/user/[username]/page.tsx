import UserProfileView from "@/sections/dashboard/user/view/user-profile-view";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

// ----------------------------------------------------------------------

type Params = {
	username: string;
};

interface UserProfilePageProps {
	params: Params;
}

export default async function UserProfilePage({ params: { username } }: UserProfilePageProps) {
	const user = await api.user.getUserByUsername.query({ username });
	const session = (await api.me.session.query()) as string;

	if (!user) {
		return notFound();
	}

	return (
		<>
			<UserProfileView user={user} isOwnProfile={session === user.id} tab="profile" />
		</>
	);
}
