import CustomBreadcrumbs from "@/components/custom-breadcrumbs/custom-breadcrumbs";
import { Button } from "@/components/ui/button";
import { paths } from "@/theme/routes/paths";

// ----------------------------------------------------------------------
const colors = ["default", "primary", "secondary", "info", "success", "warning", "error"] as const;
export default function ButtonsPage() {
	return (
		<>
			<div className="py-10 bg-gray-200 dark:bg-gray-800 w-full">
				<div className="container">
					<CustomBreadcrumbs
						heading="Buttons"
						links={[
							{
								name: "Components",
								path: paths.components,
							},
							{ name: "Buttons" },
						]}
					/>
				</div>
			</div>

			<div className="container my-20">
				<div className="flex gap-2">
					{colors.map((color, idx) => (
						<div key={idx} className="flex flex-col gap-2">
							<Button color={color} variant="contained">
								{color} Contained
							</Button>
							<Button color={color} variant="outlined">
								{color} Outlined
							</Button>
							<Button color={color} variant="ghost">
								{color} Ghost
							</Button>
							<Button color={color} variant="link">
								{color} Link
							</Button>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
