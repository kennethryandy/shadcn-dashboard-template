import { _mock } from "@/_mock";
import Avatar from "@/components/avatar";
import IconButton from "@/components/icon-button/icon-button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { paths } from "@/theme/routes/paths";
import { DropdownMenuGroup, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

// ----------------------------------------------------------------------

const OPTIONS = [
	{
		label: "Home",
		linkTo: "/",
	},
	{
		label: "Profile",
		linkTo: paths.dashboard.user.profile,
	},
	{
		label: "Settings",
		linkTo: paths.dashboard.user.account,
	},
];

const mockUser = {
	id: "8864c717-587d-472a-929a-8e5f298024da-0",
	displayName: "Jaydon Frankie",
	email: "demo@minimals.cc",
	password: "demo1234",
	photoURL: _mock.image.avatar(24),
	phoneNumber: "+40 777666555",
	country: "United States",
	address: "90210 Broadway Blvd",
	state: "California",
	city: "San Francisco",
	zipCode: "94116",
	about: "Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.",
	role: "admin",
	isPublic: true,
};

// ----------------------------------------------------------------------

export default function AccountMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<IconButton className="dark:bg-slate-50 dark:hover:bg-slate-50 hover:bg-gray-100 bg-gray-100 rounded-full [&[data-state=open]>div]:border-primary data-[state=open]:scale-105 data-[state=open]:translate-z-[0px]">
					<div className="border-solid border-2 flex items-center justify-center border-white h-9 w-9 rounded-full">
						<Avatar src={mockUser.photoURL} alt={mockUser.displayName}>
							{mockUser.displayName}
						</Avatar>
					</div>
				</IconButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="bottom" align="end" className="bg-popover/70 backdrop-blur-sm">
				<DropdownMenuLabel className="px-2 py-4">
					<h6 className="text-sm font-semibold">{mockUser.displayName}</h6>
					<p className="text-xs text-gray-400">{mockUser.email}</p>
				</DropdownMenuLabel>
				<DropdownMenuSeparator className="bg-transparent border-b border-dashed border-muted" />
				<DropdownMenuGroup>
					{OPTIONS.map((opt) => (
						<DropdownMenuItem key={opt.label} asChild>
							<Link
								href={opt.linkTo}
								className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent/10 focus:text-accent-foreground cursor-pointer hover:bg-accent/10">
								{opt.label}
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator className="bg-transparent border-b border-dashed border-muted" />
				<DropdownMenuItem asChild>
					<Link href="#" className="!text-destructive font-semibold cursor-pointer hover:bg-accent/10">
						Logout
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
