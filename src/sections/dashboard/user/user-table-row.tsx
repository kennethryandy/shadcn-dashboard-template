import { TableCell, TableRow } from "@/components/ui/table";
import { flexRender, type Row } from "@tanstack/react-table";

// ----------------------------------------------------------------------

interface UserTableRowProps<T> {
	row: Row<T>;
}

export default function UserTableRow<T>({ row }: UserTableRowProps<T>) {
	const isSelected = row.getIsSelected();
	const cell = row.getVisibleCells();
	return (
		<TableRow data-state={isSelected && "selected"}>
			{cell.map((cell) => (
				<TableCell
					className="transition-all p-4 group-data-[dense=sm]:py-1 group-data-[dense=sm]:px-2.5 group-data-[dense=md]:py-2 group-data-[dense=md]:px-3"
					key={cell.id}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
	);
}
