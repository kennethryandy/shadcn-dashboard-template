import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, id, updatedAt } from ".";
import { users } from "./users";
import { employees } from "./employees";

// ----------------------------------------------------------------------

export const companies = pgTable("companies", {
	id,
	company: varchar("company").notNull(),
	subId: integer("sub_id").notNull(),
	createdBy: varchar("created_by")
		.notNull()
		.references(() => users.id),
	createdAt,
	updatedAt,
	deletedAt,
});
export const companiesRelations = relations(companies, ({ one, many }) => ({
	creator: one(users, {
		fields: [companies.createdBy],
		references: [users.id],
	}),
	employees: many(employees),
}));
