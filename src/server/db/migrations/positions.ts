import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, id, updatedAt } from ".";
import { users } from "./users";
import { employees } from "./employees";

// ----------------------------------------------------------------------

export const positions = pgTable("positions", {
	id,
	position: varchar("position").notNull(),
	subId: integer("sub_id").notNull(),
	createdBy: varchar("created_by").notNull(),
	createdAt,
	updatedAt,
	deletedAt,
});

export const positionsRelations = relations(positions, ({ one, many }) => ({
	creator: one(users, {
		fields: [positions.createdBy],
		references: [users.id],
	}),
	employees: many(employees),
}));
