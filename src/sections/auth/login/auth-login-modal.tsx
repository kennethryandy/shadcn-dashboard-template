"use client";
import IconButton from "@/components/icon-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useBoolean } from "@/hooks";
import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
// form
import { RHFFloatingInput } from "@/components/hook-form";
import { loginDialogFormSchema, TLoginDialogFormValues } from "@/types/auth-types.zod";
import FormProvider from "@/components/hook-form/form-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginDialogAction } from "@/server/actions/auth.actions";

// ----------------------------------------------------------------------

export default function LoginModal() {
	const showPassword = useBoolean(false);
	const [generalError, setGeneralError] = useState("");
	const router = useRouter();

	const { execute, status } = useAction(loginDialogAction, {
		onSuccess(data) {
			if (data?.error) {
				setGeneralError(data.error);
				toast({
					variant: "destructive",
					description: data.error,
					duration: 60000,
				});
			} else {
				router.back();
				setGeneralError("");
			}
		},
	});

	const methods = useForm<TLoginDialogFormValues>({
		resolver: zodResolver(loginDialogFormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			router.refresh();
		}
	};

	return (
		<Dialog open={true} onOpenChange={handleOpenChange}>
			<DialogContent className="duration-300 max-w-xl">
				<DialogHeader>
					<DialogTitle>Login</DialogTitle>
					{/* <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription> */}
				</DialogHeader>
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
					<DialogFooter>
						<Button disabled={status === "executing"} className="w-full font-bold tracking-wide mt-4" type="submit">
							Login
						</Button>
					</DialogFooter>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
}
