import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import Label from "@/components/label";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { paths } from "@/theme/routes/paths";

// ----------------------------------------------------------------------
const colors = ["default", "primary", "secondary", "info", "success", "warning", "error"] as const;
const variants = [
	{ title: "contained", colors },
	{ title: "outlined", colors },
	{ title: "ghost", colors },
] as const;

export default function LabelPage() {
	return (
		<>
			<div className="py-10 bg-gray-200 dark:bg-gray-800 w-full">
				<div className="container">
					<CustomBreadcrumbs
						heading="Label"
						links={[
							{
								name: "Components",
								path: paths.components,
							},
							{ name: "Label" },
						]}
					/>
				</div>
			</div>

			<div className="container my-20">
				<div className="flex flex-col gap-6">
					{variants.map((variant) => (
						<Card key={variant.title} className="border-dashed">
							<CardHeader>
								<CardTitle className="capitalize">{variant.title}</CardTitle>
								<div className="flex flex-wrap gap-6 items-center justify-center p-10 min-h-44">
									{variant.colors.map((color) => (
										<Label key={color} color={color} variant={variant.title}>
											{color}
										</Label>
									))}
								</div>
							</CardHeader>
						</Card>
					))}
				</div>
			</div>
		</>
	);
}
