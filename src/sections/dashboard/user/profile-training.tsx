"use client";
import Iconify from "@/components/iconify";
import { Card, CardContent } from "@/components/ui/card";

// ----------------------------------------------------------------------

interface ProfileTrainingProps {}

export default function ProfileTraining({}: ProfileTrainingProps) {
	return (
		<div className="space-y-4">
			<h3 className="text-2xl font-bold text-common">Trainings</h3>
			<div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:gap-x-16">
				<Card className="rounded-xl">
					<CardContent className="rounded-b-xl p-4 px-8">
						<div className="flex space-x-6 items-center">
							<div className="rounded-full size-14 flex items-center justify-center border-8 border-primary/36">
								<Iconify icon="clarity:certificate-solid" className="size-6 text-primary/80" />
							</div>
							<div className="flex flex-col justify-between">
								<h6 className="text-lg font-bold">Total</h6>
								<div className="flex flex-col">
									<p className="text-sm tracking-wide">
										<strong className="text-common font-semibold">0</strong> total hours
									</p>
									<p className="text-sm tracking-wide">
										<strong className="text-common font-semibold">0</strong> trainings
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="rounded-xl">
					<CardContent className="rounded-b-xl p-4 px-8">
						<div className="flex space-x-6 items-center">
							<div className="rounded-full size-14 flex items-center justify-center border-8 border-primary/36">
								<Iconify icon="clarity:certificate-solid" className="size-6 text-primary/80" />
							</div>
							<div className="flex flex-col justify-between">
								<h6 className="text-lg font-bold">In House</h6>
								<div className="flex flex-col">
									<p className="text-sm tracking-wide">
										<strong className="text-common font-semibold">0</strong> total hours
									</p>
									<p className="text-sm tracking-wide">
										<strong className="text-common font-semibold">0</strong> trainings
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="rounded-xl">
					<CardContent className="rounded-b-xl p-4 px-8">
						<div className="flex space-x-6 items-center">
							<div className="rounded-full size-14 flex items-center justify-center border-8 border-primary/36">
								<Iconify icon="clarity:certificate-solid" className="size-6 text-primary/80" />
							</div>
							<div className="flex flex-col justify-between">
								<h6 className="text-lg font-bold">Client</h6>
								<div className="flex flex-col">
									<p className="text-sm tracking-wide">
										<strong className="text-common font-semibold">0</strong> total hours
									</p>
									<p className="text-sm tracking-wide">
										<strong className="text-common font-semibold">0</strong> trainings
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="rounded-xl">
					<CardContent className="rounded-b-xl p-4 px-8">
						<div className="flex space-x-6 items-center">
							<div className="rounded-full size-14 flex items-center justify-center border-8 border-primary/36">
								<Iconify icon="clarity:certificate-solid" className="size-6 text-primary/80" />
							</div>
							<div className="flex flex-col justify-between">
								<h6 className="text-lg font-bold">External</h6>
								<div className="flex flex-col">
									<p className="text-sm tracking-wide">
										<strong className="text-common font-semibold">0</strong> total hours
									</p>
									<p className="text-sm tracking-wide">
										<strong className="text-common font-semibold">0</strong> trainings
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
