import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { type Updater } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// ----------------------------------------------------------------------

interface TableCustomFooterProps<T> {
	previousPage: () => void;
	canPreviousPage: boolean;
	nextPage: () => void;
	canNextPage: boolean;
	toggleDensity: () => void;
	pageSize: number;
	setPageSize: (value: Updater<number>) => void;
}

export default function TableCustomFooter<T>({
	previousPage,
	canPreviousPage,
	nextPage,
	canNextPage,
	toggleDensity,
	pageSize,
	setPageSize,
}: TableCustomFooterProps<T>) {
	return (
		<div className="flex items-baseline md:items-center flex-col md:flex-row-reverse justify-between p-4 border-t">
			<div className="flex items-center w-full md:w-auto space-x-2 md:space-x-4">
				<span className="text-sm">Rows per page:</span>
				<Select
					onValueChange={(value) => {
						setPageSize(Number(value));
					}}
					value={pageSize + ""}>
					<SelectTrigger className="w-fit">
						<SelectValue />
					</SelectTrigger>
					<SelectContent side="bottom" align="center" className="min-w-10 w-fit">
						{["5", "10", "15", "20", "25", "50"].map((num) => (
							<SelectItem key={num} value={num}>
								{num}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<div className="space-x-2">
					<Button variant="outlined" size="sm" onClick={previousPage} disabled={!canPreviousPage}>
						Previous
					</Button>
					<Button variant="outlined" size="sm" onClick={nextPage} disabled={!canNextPage}>
						Next
					</Button>
				</div>
			</div>
			<div className="self-start h-full flex items-center space-x-2">
				<Button size="sm" variant="soft" className="h-8" onClick={() => toggleDensity()}>
					Toogle Density
				</Button>
			</div>
		</div>
	);
}
