"use client";
import { useCallback, useEffect, type ReactNode } from "react";
import Header from "./header";
import { useBoolean } from "@/hooks";
import NavVertical from "./nav-vertical";

// ----------------------------------------------------------------------

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const exapandNav = useBoolean(true);

  const offset = useBoolean(false);

  const onScroll = useCallback(() => {
    if (window.scrollY > 100) {
      offset.onTrue();
    } else {
      offset.onFalse();
    }
  }, [offset]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const renderNavVertical = (
    <NavVertical
      navExpanded={exapandNav.value}
      onNavToggle={exapandNav.onToggle}
      offset={offset.value}
    />
  );

  return (
    <div className="h-full flex">
      <Header navExpanded={exapandNav.value} offset={offset.value} />
      <div className="min-h-full w-full flex flex-col sm:flex-row h-[200vh]">
        {renderNavVertical}
        {children}
      </div>
    </div>
  );
}
