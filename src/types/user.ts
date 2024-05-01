import { employees } from "@/server/db/schema";
import { InferInsertModel } from "drizzle-orm";

export type TProfileTab = "profile" | "trainings" | "gallery";

export interface IProfileUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	userType: number;
	subId: number;
	profilePic: string | null;
	status: number | null;
	empId: string;
	fullname: string;
	employee?: EmployeeWithPositionDepartmentCompany;
}

export type EmployeeWithPositionDepartmentCompany = InferInsertModel<typeof employees> & {
	position: Position;
	company: Company;
	department: Department;
};

interface Position {
	id: string;
	position: string;
}

interface Company {
	id: string;
	company: string;
}

interface Department {
	id: string;
	department: string;
}
