"use server";
import { loginDialogFormSchema, loginFormSchema } from "@/types/auth-types.zod";
import { db } from "../db";
import bcrypt from "bcryptjs";
import * as argon2 from "argon2";
import { users } from "../db/schema";
import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { action } from "./action";
import { redirect } from "next/navigation";

export const loginAction = action(loginFormSchema, async ({ username, password, remember }) => {
	const errorObj = { error: "Invalid username/email or password" };
	try {
		const user = await db.query.users.findFirst({
			where: (table, { eq, or }) => or(eq(table.username, username), eq(table.email, username)),
		});

		if (!user) return errorObj;

		if (!user.md5Password) {
			const isPasswordValid = await argon2.verify(user.password, password);

			if (!isPasswordValid) return errorObj;
		} else {
			const isPasswordValid = await bcrypt.compare(password, user.md5Password);
			if (!isPasswordValid) return errorObj;

			const newPass = await argon2.hash(password);
			await db.update(users).set({ md5Password: null, password: newPass }).where(eq(users.id, user.id));
		}
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return redirect("/dashboard");
	} catch (error: any) {
		console.error(error);
		return { error: "Something went wrong!" };
	}
});

export const loginDialogAction = action(loginDialogFormSchema, async ({ username, password }) => {
	const errorObj = { error: "Invalid username/email or password" };
	try {
		const user = await db.query.users.findFirst({
			where: (table, { eq, or }) => or(eq(table.username, username), eq(table.email, username)),
		});

		if (!user) return errorObj;

		if (!user.md5Password) {
			const isPasswordValid = await argon2.verify(user.password, password);

			if (!isPasswordValid) return errorObj;
		} else {
			const isPasswordValid = await bcrypt.compare(password, user.md5Password);
			if (!isPasswordValid) return errorObj;

			const newPass = await argon2.hash(password);
			await db.update(users).set({ md5Password: null, password: newPass }).where(eq(users.id, user.id));
		}
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return { success: true };
	} catch (error: any) {
		console.error(error);
		return { error: "Something went wrong!" };
	}
});

export const logoutAction = async () => {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized",
		};
	}
	await lucia.invalidateSession(session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
};
