"use client";
import {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableHead, TableHeader, TableHeaderRow } from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";
import { TableContainer, TableSelectedAction, TableFooter, TableNoData } from "@/components/table";
import IconButton from "@/components/icon-button/icon-button";
import { Trash2Icon } from "lucide-react";
import UserTableRow from "../user-table-row";
import UserTableToolbar from "../user-table-toolbar";
import { _userList } from "@/_mock";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, useSearchParams } from "next/navigation";
import { paths } from "@/theme/routes/paths";
import UserFilterResult from "../user-table-filter-result";
import { DensityFeature, useUserColumnDef } from "../user-list-columns-data";
import { DensityState } from "@/types/tables";
import { type ITabsOption } from "@/components/tabs";
import UserTableTabs from "../user-table-tabs";

// ----------------------------------------------------------------------

export default function UserListView({ roles = [], status }: { roles: string[]; status: string }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const columns = useUserColumnDef();
	const [density, setDensity] = useState<DensityState>("md");

	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const [tableData, setTableData] = useState(_userList);

	const table = useReactTable({
		_features: [DensityFeature],
		data: tableData,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onDensityChange: setDensity,
		state: {
			density,
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		initialState: {
			pagination: {
				pageSize: 5,
			},
		},
	});

	useEffect(() => {
		if (roles.length > 0 && status !== "all") {
			const newData = _userList.filter((u) => roles.includes(u.role) && u.status === status);
			setTableData(newData);
		} else {
			if (roles.length > 0) {
				setTableData(_userList.filter((u) => roles.includes(u.role)));
			} else if (status !== "all") {
				setTableData(_userList.filter((u) => u.status === status));
			} else {
				setTableData(_userList);
			}
		}
	}, [roles, status]);

	const statuses = { active: 0, pending: 0, banned: 0, rejected: 0 };
	const statusCounts = _userList.reduce((acc, row) => ({ ...acc, [row.status]: acc[row.status] + 1 }), statuses);

	const STATUS_OPTIONS: ITabsOption[] = [
		{
			value: "all",
			label: "All",
			icon: {
				label: table.getRowCount(),
				variant: "contained",
			},
		},
		{
			value: "active",
			label: "Active",
			icon: {
				label: statusCounts.active,
				color: "success",
			},
		},
		{
			value: "pending",
			label: "Pending",
			icon: {
				label: statusCounts.pending,
				color: "warning",
			},
		},
		{
			value: "banned",
			label: "Banned",
			icon: {
				label: statusCounts.banned,
				color: "error",
			},
		},
		{
			value: "rejected",
			label: "Rejected",
			icon: {
				label: statusCounts.rejected,
			},
		},
	];

	type TStatusOptions = typeof STATUS_OPTIONS;
	type TStatusValue = TStatusOptions[number]["value"];

	const handleFilterRoleChange = useCallback(
		(value: string, isSelected: boolean) => () => {
			const params = new URLSearchParams(searchParams);

			if (!isSelected) {
				params.set("roles", [...roles, value].join(","));
				const newPath = paths.dashboard.user.list + "?" + params.toString();
				router.push(newPath, { scroll: false });
			} else {
				const newRoles = roles.filter((role) => role !== value);
				newRoles.length > 0 ? params.set("roles", newRoles.join(",")) : params.delete("roles");
				const newPath = paths.dashboard.user.list + "?" + params.toString();
				router.push(newPath, { scroll: false });
			}
		},
		[roles, searchParams, router],
	);

	const handleFilterStatusChange = (value: TStatusValue) => {
		const params = new URLSearchParams(searchParams);
		params.set("status", value);
		const newPath = paths.dashboard.user.list + "?" + params.toString();
		router.push(newPath, { scroll: false });
	};

	const canHideColumns = table.getAllColumns().filter((column) => column.getCanHide());
	const rows = table.getRowModel().rows;

	const isFiltered = roles.length > 0 || columnFilters.length > 0 || status !== "all";
	return (
		<TableContainer dense={density}>
			<UserTableTabs value={status} options={STATUS_OPTIONS} onChange={handleFilterStatusChange} canHideColumns={canHideColumns} />

			<UserTableToolbar table={table} canHideColumns={canHideColumns} onSearchRole={handleFilterRoleChange} roles={roles} />

			{isFiltered && (
				<UserFilterResult
					canHideColumns={canHideColumns}
					result={rows.length}
					roles={roles}
					columnFilters={columnFilters}
					setColumnFilters={setColumnFilters}
					status={status}
				/>
			)}

			<ScrollArea orientation="horizontal">
				<Table>
					<TableSelectedAction
						table={table}
						columnLength={columns.length}
						action={
							<IconButton size="sm">
								<Trash2Icon className="text-error" />
							</IconButton>
						}
					/>
					<TableHeader className="bg-accent dark:bg-accent/10">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableHeaderRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											className="transition-all p-4 group-data-[dense=sm]:py-1 group-data-[dense=sm]:px-2.5 group-data-[dense=md]:py-2 group-data-[dense=md]:px-3"
											key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableHeaderRow>
						))}
					</TableHeader>
					<TableBody>
						{rows?.length ? (
							rows.map((row) => <UserTableRow key={row.id} row={row} />)
						) : (
							<TableNoData columnLength={columns.length} notFound={isFiltered} />
						)}
					</TableBody>
				</Table>
			</ScrollArea>

			<TableFooter table={table} totalCount={_userList.length} />
		</TableContainer>
	);
}
