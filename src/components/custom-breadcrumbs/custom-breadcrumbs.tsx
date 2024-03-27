import { TPaths } from "@/theme/routes/paths";
import { Fragment, type ReactNode } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import Link from "next/link";

// ----------------------------------------------------------------------

type LeafPaths<T> = T extends string
	? T
	: {
			[K in keyof T]: LeafPaths<T[K]>;
	  }[keyof T];

type ILinks = {
	name: string;
	path?: LeafPaths<TPaths>;
};

interface CustomBreadcrumbsProps {
	action?: ReactNode;
	links: ILinks[];
	heading?: string;
	moreLink?: string[];
	activeLast?: boolean;
	className?: string;
}

export default function CustomBreadcrumbs({ heading, action, links, moreLink, activeLast = true, className }: CustomBreadcrumbsProps) {
	return (
		<div className={className}>
			<div className="flex shrink-0 items-center">
				<div className="flex-grow">
					{heading && <h4 className="text-md xl:text-2xl lg:text-lg mb-2 font-bold">{heading}</h4>}

					<Breadcrumb>
						<BreadcrumbList className="sm:gap-3.5">
							{links.map((link, idx) => (
								<Fragment key={link.name ?? ""}>
									<BreadcrumbItem className="">
										{link?.path ? (
											<BreadcrumbLink className="text-foreground font-medium hover:underline" href={link.path}>
												{link.name}
											</BreadcrumbLink>
										) : (
											<BreadcrumbPage className="cursor-default font-medium opacity-50">
												{link.name}
											</BreadcrumbPage>
										)}
									</BreadcrumbItem>
									{idx !== links.length - 1 && (
										<BreadcrumbSeparator>
											<span className="block h-1 w-1 rounded-full bg-foreground"></span>
										</BreadcrumbSeparator>
									)}
								</Fragment>
							))}
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				{action && <div className="shrink-0">{action}</div>}
			</div>
			{!!moreLink && (
				<div className="mt-4">
					{moreLink.map((href) => (
						<Link
							key={href}
							href={href}
							className="text-foreground font-medium hover:underline table"
							rel="noopener"
							target="_blank">
							{href}
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
