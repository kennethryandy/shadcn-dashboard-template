import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------

interface IProps {
  className?: string;
  navExpanded: boolean;
  offset: boolean;
}

export default function Header({ className, navExpanded, offset }: IProps) {
  return (
    <header
      className={cn(
        "rounded-b-md fixed right-0 top-0 left-auto backdrop-blur-sm transition-all z-20 bg-red-300",
        className,
        navExpanded
          ? "w-[calc(100%_-_theme(spacing.72)_-_1px)]"
          : "w-[calc(100%_-_theme(spacing.24)_-_1px)]",
        navExpanded ? (offset ? "h-16" : "h-20") : "h-16"
      )}
    ></header>
  );
}
