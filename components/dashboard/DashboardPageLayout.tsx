"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Header from "@/components/Header";

export default function DashboardPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--dashboard-header-h",
        `${el.offsetHeight}px`
      );
    };

    syncHeaderHeight();

    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(el);
    window.addEventListener("resize", syncHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeaderHeight);
      document.documentElement.style.removeProperty("--dashboard-header-h");
    };
  }, []);

  return (
    <div className="dashboard-page flex min-h-dvh flex-col bg-gray-50">
      <div ref={headerRef} className="shrink-0">
        <Header compact />
      </div>
      <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
