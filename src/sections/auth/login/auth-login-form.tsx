"use client";
import IconButton from "@/components/icon-button";
import { Button } from "@/components/ui/button";
import { useBoolean } from "@/hooks";
import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import Link from "next/link";
// Form
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import FormProvider, { RHFCheckbox, RHFFloatingInput } from "@/components/hook-form";
import { loginFormSchema, TLoginFormValues } from "@/types/auth-types.zod";
import { loginAction } from "@/server/actions/auth.actions";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

// ----------------------------------------------------------------------

const defaultValues = {
	username: "",
	password: "",
	remember: false,
} as const;

export default function AuthLoginForm() {
	const [generalError, setGeneralError] = useState("");
	const showPassword = useBoolean(false);

	const { execute, status } = useAction(loginAction, {
		onSuccess(data) {
			if (data?.error) {
				setGeneralError(data.error);
				toast({
					variant: "destructive",
					description: data.error,
					duration: 60000,
				});
			} else {
				setGeneralError("");
			}
		},
	});

	const methods = useForm<TLoginFormValues>({
		resolver: zodResolver(loginFormSchema),
		defaultValues,
	});

	return (
		<FormProvider {...methods} onSubmit={execute}>
			<div className="space-y-4">
				<RHFFloatingInput
					name="username"
					error={!!generalError}
					className="focus-visible:ring-ring"
					id="username-or-email"
					label="Username or Email"
				/>
				<RHFFloatingInput
					name="password"
					className={cn("focus-visible:ring-ring", {
						"text-[0.625rem]": !showPassword.value,
					})}
					id="password"
					type={showPassword.value ? "text" : "password"}
					label="Password"
					error={!!generalError}
					endIcon={
						<IconButton className="absolute right-2 absolute-y-center" transitionOff onClick={showPassword.onToggle}>
							<EyeClosedIcon
								className={cn("hidden", {
									block: !showPassword.value,
								})}
								width={18}
								height={18}
							/>
							<EyeOpenIcon
								className={cn("hidden", {
									block: showPassword.value,
								})}
								width={18}
								height={18}
							/>
						</IconButton>
					}
				/>
				{!!generalError && <p className="text-xs leading-tight text-error">{generalError}</p>}
			</div>
			<div className="my-4 flex items-center justify-between">
				<RHFCheckbox name="remember" label="Remember me" variant="primary" />
				<Link href="#" className="text-common text-sm font-normal underline">
					Forgot Password
				</Link>
			</div>
			<Button disabled={status === "executing"} className="w-full font-bold tracking-wide" type="submit">
				Login
			</Button>
		</FormProvider>
	);
}
