import IconButton from "@/components/icon-button/icon-button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { type User } from "@/_mock";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { makeStateUpdater, type TableFeature, type ColumnDef, RowData, Table, Updater, functionalUpdate } from "@tanstack/react-table";
import { ArrowDown } from "lucide-react";
import Avatar from "@/components/avatar";
import { useMemo } from "react";
import type { DensityInstance, DensityOptions, DensityState, DensityTableState } from "@/types/tables";
import Label from "@/components/label";

declare module "@tanstack/react-table" {
	interface TableState extends DensityTableState {}
	interface TableOptionsResolved<TData extends RowData> extends DensityOptions {}
	interface Table<TData extends RowData> extends DensityInstance {}
}

export const DensityFeature: TableFeature<any> = {
	// define the new feature's initial state
	getInitialState: (state): DensityTableState => {
		return {
			density: "md",
			...state,
		};
	},

	// define the new feature's default options
	getDefaultOptions: <TData extends RowData>(table: Table<TData>): DensityOptions => {
		return {
			enableDensity: true,
			onDensityChange: makeStateUpdater("density", table),
		} as DensityOptions;
	},
	// if you need to add a default column definition...
	// getDefaultColumnDef: <TData extends RowData>(): Partial<ColumnDef<TData>> => {
	//   return { meta: {} } //use meta instead of directly adding to the columnDef to avoid typescript stuff that's hard to workaround
	// },

	// define the new feature's table instance methods
	createTable: <TData extends RowData>(table: Table<TData>): void => {
		table.setDensity = (updater) => {
			const safeUpdater: Updater<DensityState> = (old) => {
				let newState = functionalUpdate(updater, old);
				return newState;
			};
			return table.options.onDensityChange?.(safeUpdater);
		};
		table.toggleDensity = (value) => {
			table.setDensity((old) => {
				if (value) return value;
				return old === "lg" ? "md" : old === "md" ? "sm" : "lg"; //cycle through the 3 options
			});
		};
	},

	// if you need to add row instance APIs...
	// createRow: <TData extends RowData>(row, table): void => {},
	// if you need to add cell instance APIs...
	// createCell: <TData extends RowData>(cell, column, row, table): void => {},
	// if you need to add column instance APIs...
	// createColumn: <TData extends RowData>(column, table): void => {},
	// if you need to add header instance APIs...
	// createHeader: <TData extends RowData>(header, table): void => {},
};

export function useUserColumnDef(): ColumnDef<User>[] {
	return useMemo(
		() => [
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						variant="primary"
						checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
						onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
						aria-label="Select all"
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						variant="primary"
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label="Select row"
					/>
				),
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "name",
				header: ({ column }) => {
					const isSorted = column.getIsSorted() === "asc";
					return (
						<div
							className="cursor-pointer whitespace-nowrap inline-flex items-center"
							onClick={() => column.getToggleSortingHandler()}>
							<span>Name</span>
							<ArrowDown className={cn("w-4 h-4 ml-2 transition-all transform", { "rotate-180": isSorted })} />
						</div>
					);
				},
				cell: ({ row, getValue }) => {
					const user = row.original;
					const name = getValue() as string;
					return (
						<div className="flex items-center">
							<Avatar src={user.avatarUrl} alt={`@${name}`} className="mr-4">
								{name}
							</Avatar>
							<div className="flex flex-col items-left">
								<span className="text-base">{name}</span>
								<span className="text-disabled">{user.email}</span>
							</div>
						</div>
					);
				},
			},
			{
				accessorKey: "phoneNumber",
				header: ({ column }) => {
					const isSorted = column.getIsSorted() === "asc";
					return (
						<div
							className="cursor-pointer whitespace-nowrap inline-flex items-center group/header"
							onClick={() => column.toggleSorting(isSorted)}>
							<span>Phone Number</span>
							<ArrowDown
								className={cn("w-4 h-4 ml-2 opacity-0 transition-all transform group-hover/header:opacity-100", {
									"rotate-180": isSorted,
								})}
							/>
						</div>
					);
				},
				cell: ({ row }) => <div className="capitalize">{row.getValue("phoneNumber")}</div>,
			},
			{
				accessorKey: "company",
				header: ({ column }) => {
					const isSorted = column.getIsSorted() === "asc";
					return (
						<div
							className="cursor-pointer whitespace-nowrap inline-flex items-center group/header"
							onClick={() => column.getToggleSortingHandler()}>
							<span>Company</span>
							<ArrowDown
								className={cn("w-4 h-4 ml-2 opacity-0 transition-all transform group-hover/header:opacity-100", {
									"rotate-180": isSorted,
								})}
							/>
						</div>
					);
				},
				cell: ({ row }) => <div className="capitalize">{row.getValue("company")}</div>,
			},
			{
				accessorKey: "role",
				header: ({ column }) => {
					const isSorted = column.getIsSorted() === "asc";
					return (
						<div
							className="cursor-pointer whitespace-nowrap inline-flex items-center group/header"
							onClick={() => column.getToggleSortingHandler()}>
							<span>Role</span>
							<ArrowDown
								className={cn("w-4 h-4 ml-2 opacity-0 transition-all transform group-hover/header:opacity-100", {
									"rotate-180": isSorted,
								})}
							/>
						</div>
					);
				},
				cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
			},
			{
				accessorKey: "status",
				header: ({ column }) => {
					const isSorted = column.getIsSorted() === "asc";
					return (
						<div
							className="cursor-pointer whitespace-nowrap inline-flex items-center group/header"
							onClick={() => column.getToggleSortingHandler()}>
							<span>Status</span>
							<ArrowDown
								className={cn("w-4 h-4 ml-2 opacity-0 transition-all transform group-hover/header:opacity-100", {
									"rotate-180": isSorted,
								})}
							/>
						</div>
					);
				},
				cell: ({ row }) => {
					const val = row.getValue("status") as string;
					return (
						<Label
							variant="ghost"
							color={
								(val === "active" && "success") || (val === "pending" && "warning") || (val === "banned" && "error") || "default"
							}>
							{val}
						</Label>
					);
				},
			},
			{
				id: "actions",
				enableHiding: false,
				cell: ({ row }) => {
					const user = row.original;

					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<IconButton>
									<span className="sr-only">Open menu</span>
									<DotsHorizontalIcon className="h-4 w-4" />
								</IconButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>Copy user ID</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>View customer</DropdownMenuItem>
								<DropdownMenuItem>View user details</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				},
				enableSorting: false,
			},
		],
		[],
	);
}
