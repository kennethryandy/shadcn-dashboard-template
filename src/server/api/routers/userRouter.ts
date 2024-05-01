import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { users, employees } from "@/server/db/schema";
import { sql } from "drizzle-orm";
import { z } from "zod";

export const userRouter = createTRPCRouter({
	getUserByUsername: privateProcedure.input(z.object({ username: z.string() })).query(({ ctx, input }) => {
		return ctx.db.query.users.findFirst({
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
						company: {
							columns: {
								id: true,
								company: true,
							},
						},
						department: {
							columns: {
								id: true,
								department: true,
							},
						},
					},
				},
			},
			where: ({ username }, { eq }) => eq(username, input.username),
		});
	}),
});
