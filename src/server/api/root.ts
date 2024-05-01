import { createTRPCRouter } from "@/server/api/trpc";
import { todoRouter } from "./routers/todoRouter";
import { meRouter } from "./routers/me";
import { userRouter } from "./routers/userRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	me: meRouter,
	todos: todoRouter,
	user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
