import { createdAt, deletedAt, id, updatedAt } from ".";
import { integer, varchar, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { employees } from "./employees";

// ----------------------------------------------------------------------

export const departments = pgTable("departments", {
	id,
	department: varchar("department").notNull(),
	subId: integer("sub_id").notNull(),
	createdBy: varchar("created_by")
		.notNull()
		.references(() => users.id),
	createdAt,
	updatedAt,
	deletedAt,
});
export const departmentsRelations = relations(departments, ({ one, many }) => ({
	creator: one(users, {
		fields: [departments.createdBy],
		references: [users.id],
	}),
	employees: many(employees),
}));
