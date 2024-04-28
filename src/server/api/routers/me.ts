import { validateRequest } from "@/lib/auth";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { users, employees } from "@/server/db/schema";
import { sql } from "drizzle-orm";

export const meRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		const userSession = await validateRequest();
		if (userSession && !!userSession.user) {
			const userId = userSession.user.id;
			const user = ctx.db.query.users.findFirst({
				extras: {
					fullname: sql<string>`concat(${users.firstName}, ' ', ${users.lastName})`.as("full_name"),
				},
				columns: {
					password: false,
					md5Password: false,
					createdAt: false,
					updatedAt: false,
					deletedAt: false,
					emailVerifiedAt: false,
				},
				with: {
					employee: {
						extras: {
							fullname: sql<string>`concat(${employees.firstName}, ' ', ${employees.lastName})`.as("full_name"),
						},
						columns: {
							createdAt: false,
							updatedAt: false,
							createdBy: false,
							deletedAt: false,
							active: false,
						},
						with: {
							position: {
								columns: {
									id: true,
									position: true,
								},
							},
						},
					},
				},
				where: ({ id }, { eq }) => eq(id, userId),
			});
			return user;
		}
		return null;
	}),
	sleep: publicProcedure.query(async () => {
		await new Promise((r) => setTimeout(r, 6000));
		return [];
	}),
});
