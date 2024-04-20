import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import superjson from "superjson";

import { db } from "@/server/db";
import { validateRequest } from "@/lib/auth";
// import { env } from "@/env";

export const createTRPCContext = async (opts: { headers: Headers }) => {
	return {
		db,
		...opts,
	};
};

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const privateProcedure = t.procedure.use(
	t.middleware(async ({ ctx, next, ...rest }) => {
		const userSession = await validateRequest();
		if (!userSession || !userSession.user) {
			throw new TRPCError({ code: "FORBIDDEN" });
		}
		return next({
			ctx: {
				...ctx,
				userId: userSession.user.id,
			},
			...rest,
		});
	}),
);
