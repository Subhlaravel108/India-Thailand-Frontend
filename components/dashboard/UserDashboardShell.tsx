"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Calendar,
  MessageSquare,
  CreditCard,
  Lock,
  LogOut,
  Menu,
  Plane,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  clearAuthSession,
  getUserInitials,
  type AuthUser,
} from "@/lib/auth";
import { contactInfo } from "@/lib/global_variables";

export type DashboardTab =
  | "overview"
  | "profile"
  | "bookings"
  | "inquiries"
  | "payments"
  | "security";

const NAV_ITEMS: {
  id: DashboardTab;
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: User },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "inquiries", label: "Inquiries", icon: MessageSquare },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "security", label: "Security", icon: Lock },
];

type UserDashboardShellProps = {
  user: AuthUser;
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  children: ReactNode;
  header?: ReactNode;
};

function SidebarNav({
  activeTab,
  onTabChange,
  onNavigate,
}: {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto py-1">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              onTabChange(item.id);
              onNavigate?.();
            }}
            className={cn(
              "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              active
                ? "bg-white text-blue-900 shadow-sm ring-1 ring-gray-200/80"
                : "text-blue-100/90 hover:bg-white/10 hover:text-white"
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 shrink-0",
                active ? "text-orange-500" : "text-blue-200"
              )}
            />
            <span className="flex-1 text-left">{item.label}</span>
            {active ? (
              <ChevronRight className="h-4 w-4 shrink-0 text-orange-500 opacity-80" />
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}

function SidebarPanel({
  user,
  activeTab,
  onTabChange,
  onNavigate,
}: {
  user: AuthUser;
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onNavigate?: () => void;
}) {
  const handleLogout = () => {
    clearAuthSession();
    window.location.href = "/";
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-white/10 px-4 pb-4 pt-5">
        <Link
          href="/"
          className="flex items-center gap-3 text-white transition-opacity hover:opacity-90"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 shadow-md shadow-orange-900/30">
            <Plane className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-tight">
              {contactInfo.websiteName}
            </p>
            <p className="text-xs text-blue-200/90">My Account</p>
          </div>
        </Link>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-3 py-3">
        <SidebarNav
          activeTab={activeTab}
          onTabChange={onTabChange}
          onNavigate={onNavigate}
        />
      </div>

      <div className="shrink-0 border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3 backdrop-blur-sm">
          <Avatar className="h-10 w-10 ring-2 ring-orange-400/50">
            {user.avatar ? (
              <AvatarImage
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
              />
            ) : null}
            <AvatarFallback className="bg-blue-800 text-white text-sm font-semibold">
              {getUserInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {user.name}
            </p>
            <p className="truncate text-xs text-blue-200/80">{user.email}</p>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="mt-2 w-full justify-start text-blue-100 hover:bg-red-500/20 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  );
}

export default function UserDashboardShell({
  user,
  activeTab,
  onTabChange,
  children,
  header,
}: UserDashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeLabel =
    NAV_ITEMS.find((n) => n.id === activeTab)?.label ?? "Dashboard";

  return (
    <div className="flex min-h-[calc(100dvh-var(--dashboard-header-h,4rem))] w-full">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:fixed lg:left-0 lg:z-40 lg:flex lg:w-[17.5rem] lg:flex-col",
          "lg:top-[var(--dashboard-header-h,4rem)]",
          "lg:h-[calc(100dvh-var(--dashboard-header-h,4rem))]",
          "bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950"
        )}
        aria-label="Dashboard navigation"
      >
        <SidebarPanel
          user={user}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </aside>

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-[min(18rem,85vw)] border-0 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 p-0 text-white"
        >
          <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Account sections and sign out
          </SheetDescription>
          <SidebarPanel
            user={user}
            activeTab={activeTab}
            onTabChange={onTabChange}
            onNavigate={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-[17.5rem]">
        <header className="sticky top-[var(--dashboard-header-h,4rem)] z-30 flex items-center gap-3 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/80 lg:hidden">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="shrink-0 border-gray-200"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold text-gray-900">
              {activeLabel}
            </h1>
            <p className="truncate text-xs text-gray-500">Account dashboard</p>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
            {header}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export { NAV_ITEMS };
