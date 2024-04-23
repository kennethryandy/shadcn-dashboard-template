import * as z from "zod";

export const loginFormSchema = z.object({
	username: z.string().trim().min(1, { message: "Username or Email is required" }),
	password: z.string().trim().min(4, { message: "Password is required with minimum of 4 characters" }),
	remember: z.boolean(),
});

export type TLoginFormValues = z.infer<typeof loginFormSchema>;

export const loginDialogFormSchema = z.object({
	username: z.string().trim().min(1, { message: "Username or Email is required" }),
	password: z.string().trim().min(4, { message: "Password is required with minimum of 4 characters" }),
});

export type TLoginDialogFormValues = z.infer<typeof loginDialogFormSchema>;
