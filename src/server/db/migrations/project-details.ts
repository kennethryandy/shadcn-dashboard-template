import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, id, updatedAt } from ".";

// ----------------------------------------------------------------------

export const projectDetails = pgTable("project-details", {
	id,
	title: varchar("title").notNull(),
	name: varchar("name"),
	subId: integer("sub_id").notNull(),
	createdAt,
	updatedAt,
	deletedAt,
});
