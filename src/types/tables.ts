import type { OnChangeFn, Updater, TableOptionsResolved, Table, RowData } from "@tanstack/react-table";

export type DensityState = "sm" | "md" | "lg";

export interface DensityTableState {
	density: DensityState;
}

export interface DensityOptions {
	enableDensity?: boolean;
	onDensityChange?: OnChangeFn<DensityState>;
}

export interface DensityInstance {
	setDensity: (updater: Updater<DensityState>) => void;
	toggleDensity: (value?: DensityState) => void;
}

// declare module "@tanstack/react-table" {
// 	//merge our new feature's state with the existing table state
// 	interface TableState extends DensityTableState {}
// 	//merge our new feature's options with the existing table options
// 	interface TableOptionsResolved<TData extends RowData> extends DensityOptions {}
// 	//merge our new feature's instance APIs with the existing table instance APIs
// 	interface Table<TData extends RowData> extends DensityInstance {}
// 	// if you need to add cell instance APIs...
// 	// interface Cell<TData extends RowData, TValue> extends DensityCell
// 	// if you need to add row instance APIs...
// 	// interface Row<TData extends RowData> extends DensityRow
// 	// if you need to add column instance APIs...
// 	// interface Column<TData extends RowData, TValue> extends DensityColumn
// 	// if you need to add header instance APIs...
// 	// interface Header<TData extends RowData, TValue> extends DensityHeader

// 	// Note: declaration merging on `ColumnDef` is not possible because it is a type, not an interface.
// 	// But you can still use declaration merging on `ColumnDef.meta`
// }
