"use client";
import { _mock } from "@/_mock";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import image from "@/components/image";
import Image from "@/components/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { paths } from "@/theme/routes/paths";

// ----------------------------------------------------------------------

const RATIO = ["4/3", "3/4", "6/4", "4/6", "16/9", "9/16", "21/9", "9/21", "1/1"] as const;

const IMAGES = RATIO.map((ratio, index) => ({
	ratio,
	url: _mock.image.cover(index + 1),
}));

export default function ImageView() {
	return (
		<>
			<div className="py-10 bg-gray-200 dark:bg-gray-800 w-full">
				<div className="container">
					<CustomBreadcrumbs
						heading="Image"
						links={[
							{
								name: "Components",
								path: paths.components,
							},
							{ name: "Image" },
						]}
					/>
				</div>
			</div>

			<div className="container my-20">
				<div className="flex flex-col gap-10">
					<Card>
						<CardHeader>
							<CardTitle>List</CardTitle>
							<div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-6 p-6">
								{IMAGES.map((img) => (
									<Image key={img.ratio} alt={img.ratio} src={img.url} className="rounded-lg" />
								))}
							</div>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Aspect Ratio</CardTitle>
							<div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-6 p-6">
								{IMAGES.map((img) => (
									<div key={img.ratio} className="flex flex-col gap-2">
										<p className="text-gray-400 font-bold text-xs">{img.ratio}</p>
										<Image ratio={img.ratio} alt={img.ratio} src={img.url} className="rounded-lg" />
									</div>
								))}
							</div>
						</CardHeader>
					</Card>
				</div>
			</div>
		</>
	);
}
