"use client";
import { _roles, type User } from "@/_mock";
import { SearchInput } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { splitCase } from "@/utils/change-case";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import type { Column, Table } from "@tanstack/react-table";

// ----------------------------------------------------------------------

interface UserTableToolbarProps {
	table: Table<User>;
	onSearchRole: (value: string, isSelected: boolean) => () => void;
	roles: string[];
	canHideColumns: Column<User, unknown>[];
}

export default function UserTableToolbar({ table, roles, onSearchRole, canHideColumns }: UserTableToolbarProps) {
	return (
		<div className="inline-flex items-center flex-wrap md:flex-nowrap w-full p-4 gap-2 md:gap-3">
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button
						ring
						variant="outlined"
						endIcon={<ChevronDownIcon className="h-4 w-4" />}
						data-filtered={roles.length > 0}
						className="border-input/35 w-[calc(50%_-_theme(spacing.2))] md:w-56 data-[filtered=true]:text-popover-foreground justify-between data-[state=open]:ring-2">
						{roles.length > 0 ? roles.join(", ") : "Role"}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent sideOffset={8} align="center" className="max-h-56 space-y-1.5 max-w-max w-full overflow-auto">
					{_roles.map((value) => {
						const selected = roles.some((role) => role === value);
						return (
							<div
								key={value}
								onClick={onSearchRole(value, selected)}
								className={cn(
									"flex items-center rounded-md py-2 px-1.5 cursor-pointer select-none hover:bg-accent dark:hover:bg-accent/10",
									{
										"font-medium bg-accent dark:bg-accent/10": selected,
									},
								)}>
								<Checkbox checked={selected} color="primary" onCheckedChange={onSearchRole(value, selected)} />
								<span className="text-sm ml-2 whitespace-nowrap">{value}</span>
							</div>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						ring
						variant="outlined"
						className="border-input/35 w-[calc(50%_-_theme(spacing.2))] md:w-40 data-[state=open]:ring-2"
						endIcon={<ChevronDownIcon className="h-4 w-4" />}>
						Columns
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent sideOffset={8} align="center" className="max-h-56">
					{canHideColumns.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize cursor-pointer hover:bg-common/15"
								checked={column.getIsVisible()}
								onCheckedChange={(value: any) => column.toggleVisibility(!!value)}>
								{splitCase(column.id)}
							</DropdownMenuCheckboxItem>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>

			<SearchInput
				placeholder="Search name..."
				value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
				onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
				onClear={() => {
					table.getColumn("name")?.setFilterValue("");
				}}
			/>
		</div>
	);
}
