import { Button } from "../ui/button";
import { type Table } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import IconButton from "../icon-button/icon-button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis } from "lucide-react";
import { usePagination } from "@/hooks";

// ----------------------------------------------------------------------

interface TableCustomFooterProps<T> {
	table: Table<T>;
	totalCount: number;
}

export default function TableCustomFooter<T>({ table, totalCount }: TableCustomFooterProps<T>) {
	const canPreviousPage = table.getCanPreviousPage();
	const canNextPage = table.getCanNextPage();
	const { pageSize, pageIndex } = table.getState().pagination;

	const paginationRange = usePagination({
		totalCount,
		pageSize,
		siblingCount: 1,
		currentPage: pageIndex + 1,
	});

	const handlePaginate = (paginate: number) => {
		table.setPageIndex(paginate - 1);
	};

	return (
		<div className="flex items-baseline md:items-center flex-col md:flex-row-reverse justify-between p-4 border-t">
			<div className="flex items-center w-full md:w-auto space-x-2 md:space-x-4 flex-wrap">
				<span className="text-sm">Rows per page:</span>
				<Select
					onValueChange={(value) => {
						table.setPageSize(Number(value));
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

				<div className="space-x-1">
					<IconButton size="sm" onClick={table.firstPage} disabled={!canPreviousPage}>
						<ChevronsLeft />
					</IconButton>
					<IconButton size="sm" onClick={table.previousPage} disabled={!canPreviousPage}>
						<ChevronLeft />
					</IconButton>
					{paginationRange?.map((paginate) => (
						<IconButton
							key={paginate}
							size="sm"
							onClick={() => handlePaginate(paginate ?? 1)}
							transitionOff
							disabled={!paginate || pageIndex + 1 === paginate}
							className="text-sm font-medium data-[active=true]:opacity-100 data-[active=true]:font-semibold data-[active=true]:text-common data-[active=true]:bg-common/12"
							data-active={paginate === pageIndex + 1}>
							{paginate !== null ? paginate : <Ellipsis width={16} height={16} className="!size-4" />}
						</IconButton>
					))}
					<IconButton size="sm" onClick={table.nextPage} disabled={!canNextPage}>
						<ChevronRight />
					</IconButton>
					<IconButton size="sm" onClick={table.lastPage} disabled={!canNextPage}>
						<ChevronsRight />
					</IconButton>
				</div>
			</div>
			<div className="self-start h-full flex items-center space-x-2">
				<Button size="sm" variant="ghost" className="h-8" onClick={() => table.toggleDensity()}>
					Density
				</Button>
			</div>
		</div>
	);
}
