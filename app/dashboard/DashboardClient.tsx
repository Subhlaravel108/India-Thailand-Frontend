"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  MessageSquare,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Users,
  Shield,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  getDashboardSummary,
  getUserProfile,
  updateUserProfile,
  getMyBookings,
  getMyPayments,
  getMyInquiries,
  changeUserPassword,
} from "@/lib/userDashboardApi";
import {
  getStoredUser,
  getUserInitials,
  isAuthenticated,
  persistAuthSession,
  type AuthUser,
} from "@/lib/auth";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import UserDashboardShell, {
  type DashboardTab,
  NAV_ITEMS,
} from "@/components/dashboard/UserDashboardShell";
import {
  DashboardShellSkeleton,
  ListItemsSkeleton,
} from "@/components/dashboard/DashboardSkeletons";
import {
  DashboardEmptyState,
  DashboardSectionCard,
  StatusBadge,
  formatDashboardDate,
} from "@/components/dashboard/DashboardUI";
import { cn } from "@/lib/utils";

type Summary = {
  profile: { name: string; email: string };
  counts: { bookings: number; inquiries: number; payments: number };
};

type InquirySource = "booking" | "contact" | "service";
type InquirySourceFilter = InquirySource | "all";

type DashboardRecord = Record<string, unknown>;

const parseApiErrors = (err: unknown): {
  message: string;
  fieldErrors: Record<string, string>;
} => {
  const e = err as {
    response?: {
      data?: {
        message?: string;
        errors?: Record<string, string | string[]>;
      };
    };
  };
  const raw = e.response?.data?.errors || {};
  const fieldErrors: Record<string, string> = {};
  Object.entries(raw).forEach(([key, val]) => {
    fieldErrors[key] = Array.isArray(val) ? val[0] : String(val);
  });

  const firstField = Object.values(fieldErrors)[0];
  const generic = e.response?.data?.message;

  let message =
    firstField || generic || "Something went wrong. Please try again.";
  if (
    generic === "Validation Failed" &&
    Object.keys(fieldErrors).length > 0
  ) {
    message = Object.values(fieldErrors).join(" · ");
  }

  return { message, fieldErrors };
};

const PaginationBar = ({
  page,
  totalPages,
  onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-3 border-t border-gray-100 pt-5">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </span>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPage(page + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default function DashboardClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    authProvider: "email",
  });
  const [profileSaving, setProfileSaving] = useState(false);

  const [bookings, setBookings] = useState<DashboardRecord[]>([]);
  const [bookingsPage, setBookingsPage] = useState(1);
  const [bookingsPages, setBookingsPages] = useState(1);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  const [inquiries, setInquiries] = useState<DashboardRecord[]>([]);
  const [inquiriesPage, setInquiriesPage] = useState(1);
  const [inquiriesPages, setInquiriesPages] = useState(1);
  const [inquirySource, setInquirySource] = useState<InquirySourceFilter>("all");
  const [inquiriesLoading, setInquiriesLoading] = useState(false);

  const [payments, setPayments] = useState<DashboardRecord[]>([]);
  const [paymentsPage, setPaymentsPage] = useState(1);
  const [paymentsPages, setPaymentsPages] = useState(1);
  const [paymentsLoading, setPaymentsLoading] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm: "",
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>(
    {}
  );
  const [passwordFormError, setPasswordFormError] = useState<string | null>(
    null
  );

  const guard = useCallback(() => {
    if (!isAuthenticated()) {
      router.replace("/login?redirect=/dashboard");
      return false;
    }
    const role = localStorage.getItem("role");
    if (role && role !== "user") {
      toast.error("Please use the admin panel to access your account.");
      router.replace("/");
      return false;
    }
    return true;
  }, [router]);

  const loadSummary = async () => {
    const res = await getDashboardSummary();
    if (res.data?.success) setSummary(res.data.data);
  };

  const loadProfile = async () => {
    const res = await getUserProfile();
    if (res.data?.success && res.data.data) {
      const d = res.data.data as Record<string, string>;
      setProfile({
        name: d.name || "",
        email: d.email || "",
        phone: d.phone || "",
        avatar: d.avatar || "",
        authProvider: d.authProvider || "email",
      });
    }
  };

  const loadBookings = async (page = 1) => {
    setBookingsLoading(true);
    try {
      const res = await getMyBookings({ page, limit: 8 });
      if (res.data?.success) {
        setBookings((res.data.data as DashboardRecord[]) || []);
        setBookingsPage(res.data.pagination?.page || 1);
        setBookingsPages(res.data.pagination?.totalPages || 1);
      }
    } finally {
      setBookingsLoading(false);
    }
  };

  const loadInquiries = async (
    page = 1,
    source: InquirySourceFilter = inquirySource
  ) => {
    setInquiriesLoading(true);
    try {
      const apiSource = source === "all" ? "" : source;
      const res = await getMyInquiries({
        page,
        limit: 8,
        ...(apiSource ? { source: apiSource } : {}),
      });
      if (res.data?.success) {
        setInquiries((res.data.data as DashboardRecord[]) || []);
        setInquiriesPage(res.data.pagination?.page || 1);
        setInquiriesPages(res.data.pagination?.totalPages || 1);
      }
    } finally {
      setInquiriesLoading(false);
    }
  };

  const loadPayments = async (page = 1) => {
    setPaymentsLoading(true);
    try {
      const res = await getMyPayments({ page, limit: 8 });
      if (res.data?.success) {
        setPayments((res.data.data as DashboardRecord[]) || []);
        setPaymentsPage(res.data.pagination?.page || 1);
        setPaymentsPages(res.data.pagination?.totalPages || 1);
      }
    } finally {
      setPaymentsLoading(false);
    }
  };

  useEffect(() => {
    if (!guard()) return;
    const stored = getStoredUser();
    setAuthUser(stored);

    (async () => {
      try {
        await Promise.all([
          loadSummary(),
          loadProfile(),
          loadBookings(1),
          loadInquiries(1),
          loadPayments(1),
        ]);
      } catch (err: unknown) {
        const e = err as {
          response?: { status?: number; data?: { message?: string } };
        };
        if (e.response?.status === 401 || e.response?.status === 403) {
          router.replace("/login?redirect=/dashboard");
          return;
        }
        toast.error(e.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, [guard, router]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      const res = await updateUserProfile({
        name: profile.name.trim(),
        phone: profile.phone.trim(),
      });
      if (res.data?.success) {
        toast.success("Profile updated");
        const updated = res.data.data as AuthUser;
        if (authUser?.token) {
          persistAuthSession({
            ...authUser,
            name: updated.name || profile.name,
            phone: updated.phone || profile.phone,
            avatar: updated.avatar ?? authUser.avatar,
          });
          setAuthUser(getStoredUser());
        }
        await loadProfile();
      }
    } catch (err: unknown) {
      const e = err as {
        response?: {
          data?: { message?: string; errors?: Record<string, string> };
        };
      };
      const msg =
        e.response?.data?.errors?.phone ||
        e.response?.data?.errors?.name ||
        e.response?.data?.message ||
        "Update failed";
      toast.error(msg);
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrors({});
    setPasswordFormError(null);

    const clientErrors: Record<string, string> = {};
    if (!passwordForm.current_password.trim()) {
      clientErrors.current_password = "Current password is required";
    }
    if (!passwordForm.new_password.trim()) {
      clientErrors.new_password = "New password is required";
    } else if (passwordForm.new_password.length < 6) {
      clientErrors.new_password = "New password must be at least 6 characters";
    }
    if (!passwordForm.confirm.trim()) {
      clientErrors.new_password_confirmation =
        "Please confirm your new password";
    } else if (passwordForm.new_password !== passwordForm.confirm) {
      clientErrors.new_password_confirmation = "Passwords must match";
    }

    if (Object.keys(clientErrors).length > 0) {
      setPasswordErrors(clientErrors);
      setPasswordFormError(Object.values(clientErrors).join(" · "));
      toast.error(Object.values(clientErrors)[0]);
      return;
    }

    setPasswordSaving(true);
    try {
      const res = await changeUserPassword({
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
        new_password_confirmation: passwordForm.confirm,
      });
      if (res.data?.success) {
        toast.success(res.data.message || "Password changed successfully");
        setPasswordForm({ current_password: "", new_password: "", confirm: "" });
        setPasswordErrors({});
        setPasswordFormError(null);
      } else {
        const msg = res.data?.message || "Could not change password";
        setPasswordFormError(msg);
        toast.error(msg);
      }
    } catch (err: unknown) {
      const { message, fieldErrors } = parseApiErrors(err);
      setPasswordErrors(fieldErrors);
      setPasswordFormError(message);
      toast.error(message);
    } finally {
      setPasswordSaving(false);
    }
  };

  const clearPasswordFieldError = (field: string) => {
    setPasswordErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    if (Object.keys(passwordErrors).length <= 1) setPasswordFormError(null);
  };

  if (loading) {
    return (
      <DashboardPageLayout>
        <DashboardShellSkeleton />
      </DashboardPageLayout>
    );
  }

  const displayUser: AuthUser = authUser || {
    id: "",
    name: profile.name,
    email: profile.email,
    avatar: profile.avatar,
    token: "",
    role: "user",
  };

  const activeLabel =
    NAV_ITEMS.find((n) => n.id === activeTab)?.label ?? "Dashboard";

  const displayName =
    summary?.profile?.name || displayUser.name || "Traveller";

  const dashboardHeader = (
    <>
      <div className="hidden lg:block">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {activeLabel}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your trips, profile, and account settings
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 p-5 text-white shadow-lg sm:p-6">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-orange-500/20 blur-2xl"
          aria-hidden
        />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-orange-400/60 ring-offset-2 ring-offset-blue-900">
              {displayUser.avatar ? (
                <AvatarImage
                  src={displayUser.avatar}
                  alt={displayUser.name}
                  referrerPolicy="no-referrer"
                />
              ) : null}
              <AvatarFallback className="bg-blue-700 text-lg font-semibold text-white">
                {getUserInitials(displayUser.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="flex items-center gap-1.5 text-sm text-blue-200">
                <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                Welcome back
              </p>
              <p className="text-xl font-bold sm:text-2xl">{displayName}</p>
              <p className="text-sm text-blue-200/90">{displayUser.email}</p>
            </div>
          </div>
          <Link href="/book-now" className="shrink-0">
            <Button className="w-full rounded-full bg-orange-500 px-6 text-white shadow-md hover:bg-orange-600 sm:w-auto">
              Book a new trip
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );

  const statCards = [
    {
      tab: "bookings" as DashboardTab,
      label: "Bookings",
      value: summary?.counts.bookings ?? 0,
      icon: Calendar,
      accent: "from-blue-500 to-blue-600",
      bg: "bg-blue-50 text-blue-700",
    },
    {
      tab: "inquiries" as DashboardTab,
      label: "Inquiries",
      value: summary?.counts.inquiries ?? 0,
      icon: MessageSquare,
      accent: "from-amber-500 to-orange-500",
      bg: "bg-amber-50 text-amber-700",
    },
    {
      tab: "payments" as DashboardTab,
      label: "Payments",
      value: summary?.counts.payments ?? 0,
      icon: CreditCard,
      accent: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50 text-emerald-700",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {statCards.map((card) => {
                const Icon = card.icon;
                return (
                  <button
                    key={card.label}
                    type="button"
                    onClick={() => setActiveTab(card.tab)}
                    className="group rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-xl",
                          card.bg
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-orange-500" />
                    </div>
                    <p className="mt-4 text-3xl font-bold text-gray-900">
                      {card.value}
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      {card.label}
                    </p>
                    <div
                      className={cn(
                        "mt-3 h-1 w-full rounded-full bg-gradient-to-r opacity-60",
                        card.accent
                      )}
                    />
                  </button>
                );
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/book-now"
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50/30"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900 text-white">
                  <Calendar className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Plan a trip</p>
                  <p className="text-sm text-gray-500">
                    Start a new booking inquiry
                  </p>
                </div>
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-orange-200 hover:bg-orange-50/30"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white">
                  <MessageSquare className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Need help?</p>
                  <p className="text-sm text-gray-500">Contact our travel team</p>
                </div>
              </Link>
            </div>
          </div>
        );

      case "profile":
        return (
          <DashboardSectionCard
            title="Profile settings"
            description="Update your name and contact number"
          >
            <div className="mb-6 flex items-center gap-4 rounded-xl bg-gray-50 p-4">
              <Avatar className="h-16 w-16 ring-2 ring-blue-900/20">
                {profile.avatar ? (
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                ) : null}
                <AvatarFallback className="bg-blue-900 text-lg font-semibold text-white">
                  {getUserInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">{profile.name}</p>
                <p className="text-sm text-gray-500">{profile.email}</p>
                {profile.authProvider === "google" && (
                  <p className="mt-1 text-xs text-gray-400">
                    Signed in with Google
                  </p>
                )}
              </div>
            </div>
            <form onSubmit={handleProfileSave} className="grid max-w-lg gap-5">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Full name</Label>
                <Input
                  id="profile-name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  value={profile.email}
                  disabled
                  className="bg-gray-50 text-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-phone">Phone</Label>
                <Input
                  id="profile-phone"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="10-digit mobile number"
                />
              </div>
              <Button
                type="submit"
                disabled={profileSaving}
                className="w-fit rounded-full bg-blue-900 hover:bg-blue-800"
              >
                {profileSaving ? "Saving..." : "Save changes"}
              </Button>
            </form>
          </DashboardSectionCard>
        );

      case "bookings":
        return (
          <DashboardSectionCard
            title="My bookings"
            description="Tour and package requests you have submitted"
          >
            {bookingsLoading ? (
              <ListItemsSkeleton />
            ) : bookings.length === 0 ? (
              <DashboardEmptyState
                message="No bookings yet. Start planning your Jaipur–Thailand adventure."
                actionLabel="Book now"
                actionHref="/book-now"
              />
            ) : (
              <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
                {bookings.map((b) => (
                  <div
                    key={String(b.id)}
                    className="flex flex-col gap-3 p-4 transition-colors hover:bg-gray-50/80 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-gray-900">
                          {String(
                            b.destination || b.packageType || "Tour booking"
                          )}
                        </p>
                        <StatusBadge status={String(b.status)} />
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDashboardDate(b.travelDate as string)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {String(b.travelers ?? "—")} travellers
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-400">
                        Submitted {formatDashboardDate(b.createdAt as string)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <PaginationBar
              page={bookingsPage}
              totalPages={bookingsPages}
              onPage={(p) => loadBookings(p)}
            />
          </DashboardSectionCard>
        );

      case "inquiries":
        return (
          <DashboardSectionCard
            title="My inquiries"
            description="Contact, booking and service messages"
            action={
              <Select
                value={inquirySource}
                onValueChange={(value: InquirySourceFilter) => {
                  setInquirySource(value);
                  loadInquiries(1, value);
                }}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="booking">Bookings</SelectItem>
                  <SelectItem value="contact">Contact</SelectItem>
                  <SelectItem value="service">Services</SelectItem>
                </SelectContent>
              </Select>
            }
          >
            {inquiriesLoading ? (
              <ListItemsSkeleton />
            ) : inquiries.length === 0 ? (
              <DashboardEmptyState message="No inquiries found for your account." />
            ) : (
              <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
                {inquiries.map((item) => (
                  <div key={`${item.source}-${item.id}`} className="p-4">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold capitalize text-gray-900">
                        {String(item.type || item.source)}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium capitalize text-gray-600">
                          {String(item.source)}
                        </span>
                        <StatusBadge status={String(item.status)} />
                      </div>
                    </div>
                    {item.destination != null && String(item.destination) ? (
                      <p className="inline-flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        {String(item.destination)}
                      </p>
                    ) : null}
                    {item.message != null && String(item.message) ? (
                      <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {String(item.message)}
                      </p>
                    ) : null}
                    <p className="mt-2 text-xs text-gray-400">
                      {formatDashboardDate(item.createdAt as string)}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <PaginationBar
              page={inquiriesPage}
              totalPages={inquiriesPages}
              onPage={(p) => loadInquiries(p)}
            />
          </DashboardSectionCard>
        );

      case "payments":
        return (
          <DashboardSectionCard
            title="Payment history"
            description="Transactions linked to your account"
          >
            {paymentsLoading ? (
              <ListItemsSkeleton />
            ) : payments.length === 0 ? (
              <DashboardEmptyState message="No payment records yet." />
            ) : (
              <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
                {payments.map((p) => (
                  <div
                    key={String(p.id)}
                    className="flex flex-wrap items-center justify-between gap-3 p-4"
                  >
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {String(p.currency || "INR")}{" "}
                        {String(p.amount ?? "—")}
                      </p>
                      <p className="text-sm text-gray-600">
                        {String(
                          p.description || p.paymentMethod || "Payment"
                        )}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {formatDashboardDate(
                          (p.paidAt || p.createdAt) as string
                        )}
                      </p>
                    </div>
                    <StatusBadge status={String(p.status)} />
                  </div>
                ))}
              </div>
            )}
            <PaginationBar
              page={paymentsPage}
              totalPages={paymentsPages}
              onPage={(p) => loadPayments(p)}
            />
          </DashboardSectionCard>
        );

      case "security":
        return (
          <DashboardSectionCard
            title="Security"
            description="Keep your account protected"
          >
            {profile.authProvider === "google" ? (
              <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/80 p-4 text-sm text-blue-900">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                <p>
                  You signed in with Google. Password change is not available
                  for this account.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handlePasswordSave}
                className="grid max-w-lg gap-5"
              >
                {passwordFormError && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {passwordFormError}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    autoComplete="current-password"
                    className={cn(
                      passwordErrors.current_password &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    value={passwordForm.current_password}
                    onChange={(e) => {
                      clearPasswordFieldError("current_password");
                      setPasswordForm((f) => ({
                        ...f,
                        current_password: e.target.value,
                      }));
                    }}
                  />
                  {passwordErrors.current_password && (
                    <p className="text-sm text-red-600">
                      {passwordErrors.current_password}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    className={cn(
                      passwordErrors.new_password &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    value={passwordForm.new_password}
                    onChange={(e) => {
                      clearPasswordFieldError("new_password");
                      setPasswordForm((f) => ({
                        ...f,
                        new_password: e.target.value,
                      }));
                    }}
                  />
                  {passwordErrors.new_password ? (
                    <p className="text-sm text-red-600">
                      {passwordErrors.new_password}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Minimum 6 characters
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm new password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    className={cn(
                      passwordErrors.new_password_confirmation &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    value={passwordForm.confirm}
                    onChange={(e) => {
                      clearPasswordFieldError("new_password_confirmation");
                      setPasswordForm((f) => ({
                        ...f,
                        confirm: e.target.value,
                      }));
                    }}
                  />
                  {passwordErrors.new_password_confirmation && (
                    <p className="text-sm text-red-600">
                      {passwordErrors.new_password_confirmation}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={passwordSaving}
                  className="w-fit rounded-full bg-blue-900 hover:bg-blue-800"
                >
                  {passwordSaving ? "Updating..." : "Update password"}
                </Button>
              </form>
            )}
          </DashboardSectionCard>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardPageLayout>
      <UserDashboardShell
        user={displayUser}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        header={dashboardHeader}
      >
        {renderContent()}
      </UserDashboardShell>
    </DashboardPageLayout>
  );
}
