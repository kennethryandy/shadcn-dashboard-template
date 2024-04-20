// ----------------------------------------------------------------------

import { timestamp, varchar } from "drizzle-orm/pg-core";
import { generateId } from "@/utils/create-id";
import { sql } from "drizzle-orm";

export const id = varchar("id")
	.$defaultFn(() => generateId())
	.primaryKey()
	.notNull();
export const createdAt = timestamp("created_at")
	.default(sql`CURRENT_TIMESTAMP`)
	.notNull();
export const updatedAt = timestamp("updated_at");
export const deletedAt = timestamp("deleted_at");
