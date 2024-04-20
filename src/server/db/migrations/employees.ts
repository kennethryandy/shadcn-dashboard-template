import { boolean, index, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, id, updatedAt } from ".";
import { relations } from "drizzle-orm";
import { positions } from "./positions";
import { departments } from "./departments";
import { companies } from "./companies";
import { users } from "./users";

// ----------------------------------------------------------------------

export const employees = pgTable(
	"employees",
	{
		id,
		firstName: varchar("first_name").notNull(),
		middleName: varchar("middle_name"),
		lastName: varchar("last_name").notNull(),
		workEmail: varchar("work_email").notNull(),
		company: varchar("company"),
		companyType: varchar("company_type", { enum: ["main contractor", "sub contractor", "client"] }).notNull(),
		department: varchar("department"),
		position: varchar("position"),
		gender: varchar("gender"),
		country: varchar("country"),
		nationality: varchar("nationality"),
		active: boolean("active").default(false),
		phone: varchar("phone"),
		profilePic: text("profile_pic"),
		bio: text("bio"),
		subId: integer("sub_id").notNull(),
		userId: varchar("user_id"),
		createdBy: varchar("created_by"),
		dateOfBirth: timestamp("date_of_birth"),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => ({
		userIndex: index("user_id_index").on(table.userId),
		createdByIndex: index("created_by_index").on(table.createdBy),
	}),
);

export const employeesReslations = relations(employees, ({ one }) => ({
	position: one(positions, {
		fields: [employees.position],
		references: [positions.id],
	}),
	department: one(departments, {
		fields: [employees.department],
		references: [departments.id],
	}),
	company: one(companies, {
		fields: [employees.company],
		references: [companies.id],
	}),
	user: one(users, {
		fields: [employees.userId],
		references: [users.id],
	}),
	createdBy: one(users, {
		fields: [employees.createdBy],
		references: [users.id],
	}),
}));
