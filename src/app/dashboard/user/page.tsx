import UserProfileView from "@/sections/dashboard/user/view/user-profile-view";
import { paths } from "@/theme/routes/paths";
import { api } from "@/trpc/server";
import { notFound, redirect } from "next/navigation";

// ----------------------------------------------------------------------

const user = {
	id: "K_qmo4Lbqw7GKx",
	firstName: "Rryanneal",
	lastName: "Respondo",
	email: "testhse.manager@fiafigroup.com",
	username: "admin",
	userType: 0,
	subId: 1,
	profilePic: "Passport picture new.png",
	status: 1,
	empId: "_iDdZqtPZMvsJs",
	fullname: "Rryanneal Respondo",
	employee: {
		id: "kbyDozc0vtq-Sp",
		firstName: "Rryanneal",
		middleName: null,
		lastName: "Respondo",
		workEmail: "hse.manager@fiafigroup.com",
		company: "iv_yCOpZy-SVgn",
		companyType: "main contractor",
		department: "e3DMHCoP2lcm9Z",
		position: { id: "IVeT-2dWnUfC1g", position: "HSE Manager" },
		gender: "male",
		country: "Denmark",
		nationality: null,
		active: true,
		phone: "422-141-75",
		profilePic: null,
		bio: null,
		subId: 1,
		userId: "K_qmo4Lbqw7GKx",
		createdBy: "K_qmo4Lbqw7GKx",
		dateOfBirth: "1982-08-03T16:00:00.000Z",
		fullname: "Rryanneal Respondo",
	},
};

export default async function UserPage() {
	const user = await api.me.get.query();
	if (!user) {
		return notFound();
	}
	return redirect(paths.dashboard.user.profileTab(user.username, ""));
}
