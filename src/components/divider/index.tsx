import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

export default function Divider({ className }: { className?: string }) {
	return <hr className={cn("m-0 flex-shrink-0 border-solid border-foreground/10 border", className)} />;
}
