import { relations } from "drizzle-orm";
import { integer, pgTable, smallint, text, timestamp, unique, varchar } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, id, updatedAt } from ".";
import { employees } from "./employees";

// ----------------------------------------------------------------------

export const users = pgTable(
	"users",
	{
		id,
		firstName: varchar("first_name").notNull(),
		lastName: varchar("last_name").notNull(),
		email: varchar("email").notNull(),
		username: varchar("username").notNull(),
		md5Password: varchar("md5_password"),
		password: varchar("password").notNull(),
		userType: smallint("user_type").notNull().default(0),
		subId: integer("sub_id").notNull(),
		profilePic: text("profile_pic"),
		status: smallint("status").default(0),
		empId: varchar("emp_id").notNull(),
		emailVerifiedAt: timestamp("email_verified_at"),
		createdAt,
		updatedAt,
		deletedAt,
	},
	(table) => ({
		emailUnique: unique("unique_email").on(table.email),
	}),
);

export const userRelations = relations(users, ({ one }) => ({
	employees: one(employees, {
		fields: [users.id],
		references: [employees.userId],
	}),
}));
