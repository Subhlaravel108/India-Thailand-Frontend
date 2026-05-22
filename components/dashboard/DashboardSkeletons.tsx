import { Skeleton } from "@/components/ui/skeleton";

export function StatCardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <Skeleton className="h-11 w-11 rounded-xl" />
          <Skeleton className="mt-4 h-8 w-12" />
          <Skeleton className="mt-2 h-4 w-20" />
          <Skeleton className="mt-3 h-1 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function ProfileFormSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-2 h-4 w-56" />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
    </div>
  );
}

export function ListItemsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3 p-4">
          <div className="flex justify-between gap-2">
            <Skeleton className="h-5 w-2/5 max-w-[200px]" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-3/4 max-w-[280px]" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  );
}

export function DashboardShellSkeleton() {
  return (
    <div className="flex min-h-[calc(100dvh-var(--dashboard-header-h,4rem))] w-full">
      <aside
        className="hidden lg:fixed lg:left-0 lg:z-40 lg:flex lg:w-[17.5rem] lg:flex-col lg:top-[var(--dashboard-header-h,4rem)] lg:h-[calc(100dvh-var(--dashboard-header-h,4rem))] bg-gradient-to-b from-blue-950 to-blue-900 p-4"
        aria-hidden
      >
        <Skeleton className="mb-6 h-10 w-full rounded-xl bg-white/10" />
        <div className="flex-1 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg bg-white/10" />
          ))}
        </div>
        <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
          <Skeleton className="h-16 w-full rounded-xl bg-white/10" />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-[17.5rem]">
        <div className="border-b border-gray-200 p-4 lg:hidden">
          <Skeleton className="h-8 w-40" />
        </div>
        <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
          <div className="hidden lg:block space-y-2">
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-32 w-full rounded-2xl" />
          <StatCardsSkeleton />
        </main>
      </div>
    </div>
  );
}
