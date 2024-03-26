import { type ReactNode } from "react";
import MainLayout from "@/layouts/main";

// ----------------------------------------------------------------------

interface ComponentsLayoutProps {
	children?: ReactNode;
}

export default function ComponentsLayout({ children }: ComponentsLayoutProps) {
	return <MainLayout>{children}</MainLayout>;
}
