"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IProfileUser } from "@/types/user";
import { Contact2, Landmark, Mail, MapPin } from "lucide-react";

// ----------------------------------------------------------------------

interface ProfileHomeProps {
	user: IProfileUser;
}

export default function ProfileHome({ user }: ProfileHomeProps) {
	return (
		<div className="space-y-4">
			<Card className="rounded-xl">
				<CardContent className="rounded-b-xl px-0 pt-6">
					<div className="flex divide-x divide-dashed">
						<div className="flex-1 flex flex-col items-center justify-center">
							<span className="text-2xl font-bold">1,947</span>
							<span className="text-sm text-muted-foreground">Valid Training</span>
						</div>
						<div className="flex-1 flex flex-col items-center justify-center">
							<span className="text-2xl font-bold">9,124</span>
							<span className="text-sm text-muted-foreground">Expired Training</span>
						</div>
					</div>
				</CardContent>
			</Card>
			<Card className="rounded-xl">
				<CardHeader>
					<span className="text-xl font-semibold">About</span>
				</CardHeader>
				<CardContent className="rounded-b-xl pt-0">
					<div className="flex flex-col gap-4">
						<div className="border-b border-dashed pb-6">
							{user.employee?.bio ? (
								<p className="text-common">
									Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..
								</p>
							) : (
								<p className="text-xs text-muted-foreground font-semibold tracking-wide">No bio</p>
							)}
						</div>
						<div className="space-y-4">
							{user.employee?.country && (
								<div className="space-x-2 items-center flex">
									<MapPin
										width={18}
										height={18}
										className="fill-common [&>circle]:stroke-white dark:[&>circle]:stroke-black"
									/>
									<span className="text-sm">
										Live at <strong className="text-common">{user.employee.country}</strong>
									</span>
								</div>
							)}
							<div className="space-x-2 items-center flex">
								<Mail
									width={18}
									height={18}
									className="fill-common [&>path]:stroke-white dark:[&>path]:stroke-black"
									stroke="0"
								/>
								<span className="text-sm">{user.employee ? user.employee.workEmail : user.email}</span>
							</div>

							{user.employee && (
								<div className="space-x-2 items-center flex">
									<Contact2 width={18} height={18} />
									<span className="text-sm">
										{user.employee.position.position} at{" "}
										<strong className="text-common">{user.employee.company.company}</strong>
									</span>
								</div>
							)}
							{user.employee && (
								<div className="space-x-2 items-center flex">
									<Landmark width={18} height={18} />
									<span className="text-sm font-semibold">{user.employee.department.department}</span>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
