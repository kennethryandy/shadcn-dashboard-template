"use client";
import IconButton from "@/components/icon-button/icon-button";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { useBoolean, useEventListener } from "@/hooks";
import { Search } from "lucide-react";
import { memo } from "react";

// ----------------------------------------------------------------------

function Searchbar() {
	const openSearch = useBoolean(false);

	const handleKeyDown = (event: KeyboardEvent) => {
		const key = event.key.toLocaleLowerCase();
		if ((event.metaKey && key === "k") || (key === "k" && event.ctrlKey)) {
			event.preventDefault();
			openSearch.onToggle();
		}
	};

	useEventListener("keydown", handleKeyDown);

	return (
		<>
			<div className="flex items-center">
				<IconButton onClick={openSearch.onTrue}>
					<Search />
				</IconButton>
				<div className="group">
					<div className="h-full w-9 transition-all group-hover:w-full">
						<Button
							onClick={openSearch.onTrue}
							size="sm"
							variant="outlined"
							className="w-1 h-7 hover:shadow-none hover:bg-accent dark:hover:bg-accent/10 focus-visible::ring-0 focus-visible::ring-offset-0 justify-start pl-1.5 pr-1 border-0 transition-all group-hover:w-full">
							<span className="text-[10px] font-bold bg-accent dark:bg-accent/10 flex items-center rounded-[0.5rem] h-5 px-1.5 mr-1 group-hover:bg-transparent transition-colors duration-75">
								⌘K
							</span>
							<span className="text-xs transition-opacity opacity-0 group-hover:opacity-100">Search...</span>
						</Button>
					</div>
				</div>
			</div>
			<CommandDialog
				dialogContentProps={{ className: "max-w-[600px] w-11/12 sm:w-full rounded-md" }}
				closeIcon={false}
				open={openSearch.value}
				onOpenChange={openSearch.setValue}>
				<CommandInput autoFocus placeholder="Search..." />
				<CommandList>
					<CommandEmpty className="text-sm">No results found.</CommandEmpty>

					<CommandGroup heading="Letters">
						<CommandItem>a</CommandItem>
						<CommandItem>b</CommandItem>
						<CommandSeparator />
						<CommandItem>c</CommandItem>
					</CommandGroup>

					<CommandItem>Apple</CommandItem>
				</CommandList>
			</CommandDialog>
		</>
	);
}

export default memo(Searchbar);
