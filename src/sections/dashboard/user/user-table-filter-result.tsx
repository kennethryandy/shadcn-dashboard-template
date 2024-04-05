import { type User } from "@/_mock";
import Chip from "@/components/chip";
import { Button } from "@/components/ui/button";
import { paths } from "@/theme/routes/paths";
import { splitCase } from "@/utils/change-case";
import type { Column, ColumnFiltersState } from "@tanstack/react-table";
import { LucideTrash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type Dispatch, type SetStateAction, useCallback } from "react";

// ----------------------------------------------------------------------

interface UserFilterResultProps {
	result: number;
	columnFilters: ColumnFiltersState;
	roles: string[];
	setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
	canHideColumns: Column<User, unknown>[];
	status?: string;
}

export default function UserFilterResult({ result = 0, roles, status, columnFilters, setColumnFilters, canHideColumns }: UserFilterResultProps) {
	const hiddenColumns = canHideColumns.filter((column) => !column.getIsVisible());

	const nameFilterValue = columnFilters?.find((f) => f.id === "name")?.value as string;
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleRemoveRoleFilter = useCallback(
		(value: string) => () => {
			const params = new URLSearchParams(searchParams);
			let newRoles = roles.filter((role) => role !== value);
			params.set("roles", newRoles.join(","));
			if (!params.get("roles")) {
				params.delete("roles");
			}
			const newPath = paths.dashboard.user.list + "?" + params.toString();
			router.push(newPath, { scroll: false });
		},
		[searchParams, router, roles],
	);

	const handleRemoveNameFilter = () => {
		const newColumnFilters = columnFilters.filter((filter) => filter.id !== "name" && filter.value !== nameFilterValue);
		setColumnFilters(newColumnFilters);
	};

	const handleRemoveStatusFilter = () => {
		const params = new URLSearchParams(searchParams);
		params.delete("status");
		const newPath = paths.dashboard.user.list + "?" + params.toString();
		router.push(newPath, { scroll: false });
	};

	const handleClearFilter = () => {
		setColumnFilters([]);
		router.push(paths.dashboard.user.list, { scroll: false });
	};

	return (
		<div className="flex flex-col gap-2 -mt-1.5 pt-2.5 pb-4 px-4 shadow-[rgba(145,_158,_171,_0.08)_0px_2px_0px_0px_inset]">
			<div className="flex items-center justify-between w-full mb-1.5">
				<span className="text-sm text-foreground">
					<strong className="text-slate-800 dark:text-slate-200">{result}</strong> result&apos;s found
				</span>
				<Button onClick={handleClearFilter} variant="soft" size="sm" color="error" startIcon={<LucideTrash2 width={20} height={20} />}>
					Clear
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				{roles.length > 0 && (
					<div className="flex flex-wrap rounded-lg p-2 border border-dashed gap-2">
						<span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Role:</span>
						<div className="flex lg:flex-1 flex-wrap gap-2">
							{roles.map((role) => (
								<Chip key={role} label={role} onDelete={handleRemoveRoleFilter(role)} />
							))}
						</div>
					</div>
				)}
				{!!nameFilterValue && (
					<div className="flex flex-wrap rounded-lg p-2 border border-dashed gap-2">
						<span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Keyword:</span>
						<Chip label={nameFilterValue} onDelete={handleRemoveNameFilter} />
					</div>
				)}
				{hiddenColumns.length > 0 && (
					<div className="flex flex-wrap rounded-lg p-2 border border-dashed gap-2">
						<span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Hidden Columns:</span>
						<div className="flex lg:flex-1 flex-row flex-wrap gap-2">
							{hiddenColumns.map((column) => (
								<Chip
									key={column.id}
									labelProps={{ className: "capitalize" }}
									label={splitCase(column.id)}
									onDelete={() => column.toggleVisibility(true)}
								/>
							))}
						</div>
					</div>
				)}
				{!!status && status !== "all" && (
					<div className="flex flex-wrap rounded-lg p-2 border border-dashed gap-2">
						<span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Status:</span>
						<Chip className="capitalize" label={status} onDelete={handleRemoveStatusFilter} />
					</div>
				)}
			</div>
		</div>
	);
}
