import { format, getTime, formatDistanceToNow } from "date-fns";

// ----------------------------------------------------------------------

type DateType = Date | number | string;

export function fDate(date: DateType, newFormat?: string) {
	const fm = newFormat || "dd MMM yyyy";

	return date ? format(new Date(date), fm) : "";
}

export function fDateTime(date: DateType, newFormat?: string) {
	const fm = newFormat || "dd MMM yyyy p";

	return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date: DateType) {
	return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: DateType) {
	return date
		? formatDistanceToNow(new Date(date), {
				addSuffix: true,
		  })
		: "";
}
