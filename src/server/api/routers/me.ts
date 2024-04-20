import { validateRequest } from "@/lib/auth";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { sql } from "drizzle-orm";

export const meRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		const userSession = await validateRequest();
		if (userSession && !!userSession.user) {
			const userId = userSession.user.id;
			const user = ctx.db.query.users.findFirst({
				extras: {
					fullName: sql<string>`concat(${users.firstName}, ' ', ${users.lastName})`.as("full_name"),
				},
				columns: {
					password: false,
					md5Password: false,
				},
				where: ({ id }, { eq }) => eq(id, userId),
			});
			return user;
		}
		return null;
	}),
});
