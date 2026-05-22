"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const formatDashboardDate = (d?: string | Date) => {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
};

export function StatusBadge({ status }: { status?: string }) {
  const s = (status || "New").toLowerCase();
  const styles: Record<string, string> = {
    new: "bg-blue-100 text-blue-800",
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-emerald-100 text-emerald-800",
    completed: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-red-100 text-red-800",
    paid: "bg-emerald-100 text-emerald-800",
    failed: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        styles[s] || "bg-gray-100 text-gray-700"
      )}
    >
      {status || "New"}
    </span>
  );
}

export function DashboardEmptyState({
  message,
  actionLabel,
  actionHref,
}: {
  message: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/80 px-6 py-14 text-center">
      <p className="max-w-sm text-sm text-gray-600">{message}</p>
      {actionLabel && actionHref ? (
        <Link href={actionHref} className="mt-4">
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
            {actionLabel}
          </Button>
        </Link>
      ) : null}
    </div>
  );
}

export function DashboardSectionCard({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {description ? (
            <p className="mt-0.5 text-sm text-gray-500">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
