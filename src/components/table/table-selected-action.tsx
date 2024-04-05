import { type ReactNode } from "react";
import { Checkbox } from "../ui/checkbox";
import type { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

interface TableSelectedActionProps<T> {
	action?: ReactNode;
	table: Table<T>;
	columnLength: number;
}

export default function TableSelectedAction<T extends Record<string, any>>({ action, table, columnLength = 0 }: TableSelectedActionProps<T>) {
	const numSelected = table.getFilteredSelectedRowModel().rows.length;

	if (numSelected === 0) return null;

	const isSomeRowsSelected = table.getIsSomeRowsSelected();
	const isAllRowsSelected = table.getIsAllRowsSelected();
	const isAllPageRowsSelected = table.getIsAllPageRowsSelected();

	const handleSelect = () => {
		console.log({ isAllPageRowsSelected, isAllRowsSelected, isSomeRowsSelected });

		if (isAllRowsSelected) {
			table.toggleAllRowsSelected(false);
		} else if (isAllPageRowsSelected) {
			table.toggleAllRowsSelected(true);
		} else if (isSomeRowsSelected) {
			table.toggleAllPageRowsSelected(true);
		}
	};

	return (
		<thead className={cn("absolute h-12 top-0 left-0 w-full z-30")}>
			<tr className="flex h-full items-center w-full bg-primary-light px-4">
				<th className="w-full flex items-center justify-between" colSpan={columnLength}>
					<div className="flex items-center gap-4">
						<Checkbox checked={isAllRowsSelected || "indeterminate"} variant="primary" onCheckedChange={handleSelect} />

						<h6 className="text-sm font-semibold text-primary">
							{numSelected} of {table.getFilteredRowModel().rows.length} row(s) selected.
						</h6>
					</div>

					{!!action && action}
				</th>
			</tr>
		</thead>
	);
}
