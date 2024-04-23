import { type User } from "@/_mock";
import IconButton from "@/components/icon-button/icon-button";
import { type ITabsOption, Tabs } from "@/components/tabs";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { splitCase } from "@/utils/change-case";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import type { Column } from "@tanstack/react-table";
import { ChevronDownIcon } from "lucide-react";
import { type ReactNode } from "react";

// ----------------------------------------------------------------------

interface UserTableTabsProps<T extends ITabsOption[]> {
	children?: ReactNode;
	value: string;
	options: T;
	onChange: (value: T[number]["value"]) => any;
	canHideColumns: Column<User, unknown>[];
}

export default function UserTableTabs<T extends ITabsOption[]>({ value, options, onChange, canHideColumns }: UserTableTabsProps<T>) {
	return (
		<div className="flex w-full items-center justify-between">
			<Tabs value={value} onChange={onChange} options={options} />
			<div className="transition-all px-4 group-data-[dense=sm]:px-2.5 group-data-[dense=md]:px-3">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<IconButton transitionOff>
							<DotsVerticalIcon />
						</IconButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent sideOffset={8} align="center" className="max-h-56">
						<DropdownMenuLabel>Visible Columns:</DropdownMenuLabel>
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
			</div>
		</div>
	);
}
