import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { Container } from "@/components/reusable";
import { paths } from "@/theme/routes/paths";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import UserListView from "@/sections/dashboard/user/view/user-list-views";
import { _roles } from "@/_mock";

// ----------------------------------------------------------------------

export const metadata = {
	title: "Dashboard: User List",
};

interface UserListPageProps {
	searchParams?: {
		roles?: string;
		status?: string;
	};
}

export default function UserListPage({ searchParams }: UserListPageProps) {
	const roles = searchParams?.roles ? searchParams.roles.split(",") : [];
	const status = searchParams?.status ? searchParams?.status : "all";
	return (
		<>
			<Container maxWidth="xl">
				<CustomBreadcrumbs
					heading="List"
					links={[
						{ name: "Dashboard", path: paths.dashboard.root },
						{ name: "User", path: paths.dashboard.user.root },
						{ name: "List" },
					]}
					action={
						<Button color="primary" size="sm" startIcon={<PlusIcon />}>
							New User
						</Button>
					}
				/>
				<div className="my-20">
					<UserListView roles={roles} status={status} />
				</div>
			</Container>
		</>
	);
}
