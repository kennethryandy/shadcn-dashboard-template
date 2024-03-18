import type { ReactNode } from "react";
import DashboardLayout from "@/layouts/dashboard";

// ----------------------------------------------------------------------
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
