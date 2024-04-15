import { Button } from "../ui/button";
import { type Table } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import IconButton from "../icon-button/icon-button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis } from "lucide-react";
import { usePagination } from "@/hooks";
import { useCallback } from "react";
import { ShadcnLabel } from "../ui/shadcn-label";

// ----------------------------------------------------------------------

interface TableCustomFooterProps<T> {
	table: Table<T>;
	totalCount: number;
}

export default function TableCustomFooter<T>({ table, totalCount }: TableCustomFooterProps<T>) {
	const {
		getCanPreviousPage,
		getCanNextPage,
		getState,
		setPageIndex,
		setPageSize,
		firstPage,
		previousPage,
		nextPage,
		lastPage,
		toggleDensity,
	} = table;
	const canPreviousPage = getCanPreviousPage();
	const canNextPage = getCanNextPage();
	const { pageSize, pageIndex } = getState().pagination;

	const paginationRange = usePagination({
		totalCount,
		pageSize,
		siblingCount: 1,
		currentPage: pageIndex + 1,
	});

	const handlePaginate = useCallback(
		(paginate: number) => {
			setPageIndex(paginate - 1);
		},
		[setPageIndex],
	);

	const handlePageSizeChange = (value: string) => {
		setPageSize(Number(value));
	};

	return (
		<div className="flex items-baseline relative md:items-center flex-col md:flex-row-reverse p-2.5 md:p-4 border-t">
			<div className="flex items-center max-lg:items-end max-lg:flex-col-reverse justify-end w-full mb-2 sm:mb-0 md:space-x-4 flex-wrap">
				<div className="block sm:h-10 h-8 max-sm:absolute max-sm:right-2.5 max-sm:bottom-2.5">
					<div className="flex items-center space-x-1">
						<ShadcnLabel htmlFor="row-per-page-select" className="text-common text-sm">
							Rows per page:
						</ShadcnLabel>
						<Select onValueChange={handlePageSizeChange} value={pageSize + ""}>
							<SelectTrigger id="row-per-page-select" className="w-fit h-8 sm:h-10">
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
					</div>
				</div>

				<div className="space-x-1 flex items-center w-full sm:justify-start justify-center md:w-auto flex-wrap">
					<IconButton transitionOff onClick={firstPage} disabled={!canPreviousPage}>
						<ChevronsLeft />
					</IconButton>
					<IconButton transitionOff onClick={previousPage} disabled={!canPreviousPage}>
						<ChevronLeft />
					</IconButton>
					{paginationRange?.map((paginate, idx) => (
						<IconButton
							key={idx}
							onClick={() => handlePaginate(paginate ?? 1)}
							transitionOff
							disabled={!paginate || pageIndex + 1 === paginate}
							data-active={paginate === pageIndex + 1}
							className="text-sm font-medium data-[active=true]:opacity-100 data-[active=true]:font-semibold data-[active=true]:text-common data-[active=true]:bg-common/12">
							{paginate !== null ? paginate : <Ellipsis width={16} height={16} className="!size-4" />}
						</IconButton>
					))}
					<IconButton transitionOff onClick={nextPage} disabled={!canNextPage}>
						<ChevronRight />
					</IconButton>
					<IconButton transitionOff onClick={lastPage} disabled={!canNextPage}>
						<ChevronsRight />
					</IconButton>
				</div>
			</div>
			<div className="self-start h-8 sm:h-10 flex items-center space-x-2">
				<Button size="sm" variant="soft" className="h-8" onClick={() => toggleDensity()}>
					Density
				</Button>
			</div>
		</div>
	);
}
