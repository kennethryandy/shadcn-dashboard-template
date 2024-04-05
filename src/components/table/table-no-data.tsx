import { TableCell, TableRow } from "../ui/table";
import EmptyContent from "../empty-content";

// ----------------------------------------------------------------------

interface CustomTableNoDataProps {
	columnLength: number;
	notFound: boolean;
}

export default function CustomTableNoData({ columnLength, notFound }: CustomTableNoDataProps) {
	return (
		<TableRow>
			<TableCell
				colSpan={columnLength}
				className="h-96 text-center p-4 group-data-[dense=sm]:py-1 group-data-[dense=sm]:px-2.5 group-data-[dense=md]:py-2 group-data-[dense=md]:px-3">
				{notFound && <EmptyContent className="h-full" title="No Data Found" />}
			</TableCell>
		</TableRow>
	);
}
