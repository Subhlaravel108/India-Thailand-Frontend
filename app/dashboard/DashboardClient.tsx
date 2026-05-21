"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  User,
  Calendar,
  MessageSquare,
  CreditCard,
  Lock,
  Loader2,
  ChevronLeft,
  ChevronRight,
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

type Summary = {
  profile: { name: string; email: string };
  counts: { bookings: number; inquiries: number; payments: number };
};

const formatDate = (d?: string | Date) => {
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

const StatusBadge = ({ status }: { status?: string }) => {
  const s = (status || "New").toLowerCase();
  const styles: Record<string, string> = {
    new: "bg-blue-100 text-blue-800",
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    paid: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
        styles[s] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status || "New"}
    </span>
  );
};

const EmptyState = ({ message }: { message: string }) => (
  <p className="text-center text-sm text-gray-500 py-10">{message}</p>
);

/** Pull field errors + message from API error responses */
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

  let message = firstField || generic || "Something went wrong. Please try again.";
  if (
    generic === "Validation Failed" &&
    Object.keys(fieldErrors).length > 0
  ) {
    message = Object.values(fieldErrors).join(" · ");
  }

  return { message, fieldErrors };
};

const passwordInputClass = (hasError: boolean) =>
  `mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
    hasError ? "border-red-500" : "border-gray-300"
  }`;

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
    <div className="flex items-center justify-center gap-3 pt-4">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm text-gray-600">
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

  const [bookings, setBookings] = useState<unknown[]>([]);
  const [bookingsPage, setBookingsPage] = useState(1);
  const [bookingsPages, setBookingsPages] = useState(1);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  const [inquiries, setInquiries] = useState<unknown[]>([]);
  const [inquiriesPage, setInquiriesPage] = useState(1);
  const [inquiriesPages, setInquiriesPages] = useState(1);
  const [inquirySource, setInquirySource] = useState("");
  const [inquiriesLoading, setInquiriesLoading] = useState(false);

  const [payments, setPayments] = useState<unknown[]>([]);
  const [paymentsPage, setPaymentsPage] = useState(1);
  const [paymentsPages, setPaymentsPages] = useState(1);
  const [paymentsLoading, setPaymentsLoading] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm: "",
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [passwordFormError, setPasswordFormError] = useState<string | null>(null);

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
        setBookings(res.data.data || []);
        setBookingsPage(res.data.pagination?.page || 1);
        setBookingsPages(res.data.pagination?.totalPages || 1);
      }
    } finally {
      setBookingsLoading(false);
    }
  };

  const loadInquiries = async (page = 1, source = inquirySource) => {
    setInquiriesLoading(true);
    try {
      const params: { page: number; limit: number; source?: string } = {
        page,
        limit: 8,
      };
      if (source) params.source = source as "booking" | "contact" | "service";
      const res = await getMyInquiries(params);
      if (res.data?.success) {
        setInquiries(res.data.data || []);
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
        setPayments(res.data.data || []);
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
        const e = err as { response?: { status?: number; data?: { message?: string } } };
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
      const e = err as { response?: { data?: { message?: string; errors?: Record<string, string> } } };
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
      clientErrors.new_password_confirmation = "Please confirm your new password";
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
      <>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-900" />
        </div>
        <Footer />
      </>
    );
  }

  const displayUser = authUser || {
    name: profile.name,
    email: profile.email,
    avatar: profile.avatar,
    token: "",
    role: "user",
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-8 lg:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 ring-2 ring-blue-100">
                {displayUser.avatar ? (
                  <AvatarImage
                    src={displayUser.avatar}
                    alt={displayUser.name}
                    referrerPolicy="no-referrer"
                  />
                ) : null}
                <AvatarFallback className="bg-blue-900 text-white text-lg">
                  {getUserInitials(displayUser.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {summary?.profile?.name || displayUser.name}
                </h1>
                <p className="text-sm text-gray-500">{displayUser.email}</p>
              </div>
            </div>
            <Link href="/book-now">
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-full">
                Book a new trip
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-white border p-1 w-full justify-start">
              <TabsTrigger value="overview" className="gap-1.5">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-1.5">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="gap-1.5">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="inquiries" className="gap-1.5">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Inquiries</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="gap-1.5">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Payments</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-1.5">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    label: "Bookings",
                    value: summary?.counts.bookings ?? 0,
                    icon: Calendar,
                    color: "text-blue-600 bg-blue-50",
                  },
                  {
                    label: "Inquiries",
                    value: summary?.counts.inquiries ?? 0,
                    icon: MessageSquare,
                    color: "text-amber-600 bg-amber-50",
                  },
                  {
                    label: "Payments",
                    value: summary?.counts.payments ?? 0,
                    icon: CreditCard,
                    color: "text-green-600 bg-green-50",
                  },
                ].map((card) => (
                  <Card key={card.label} className="border-gray-100 shadow-sm">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${card.color}`}>
                        <card.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{card.value}</p>
                        <p className="text-sm text-gray-500">{card.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSave} className="grid gap-4 max-w-lg">
                    <div>
                      <label className="text-sm font-medium">Full name</label>
                      <input
                        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, name: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <input
                        className="mt-1 w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm"
                        value={profile.email}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <input
                        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, phone: e.target.value }))
                        }
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    <Button type="submit" disabled={profileSaving}>
                      {profileSaving ? "Saving..." : "Save changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>My bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  {bookingsLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
                    </div>
                  ) : bookings.length === 0 ? (
                    <EmptyState message="No bookings yet. Plan your trip from Book Now." />
                  ) : (
                    <div className="space-y-3">
                      {bookings.map((b: Record<string, unknown>) => (
                        <div
                          key={String(b.id)}
                          className="rounded-lg border p-4 hover:bg-gray-50/80 transition-colors"
                        >
                          <div className="flex flex-wrap justify-between gap-2 mb-2">
                            <p className="font-semibold text-gray-900">
                              {String(b.destination || b.packageType || "Tour booking")}
                            </p>
                            <StatusBadge status={String(b.status)} />
                          </div>
                          <p className="text-sm text-gray-600">
                            Travel: {formatDate(b.travelDate as string)} · Travellers:{" "}
                            {String(b.travelers ?? "—")}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Submitted {formatDate(b.createdAt as string)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  <PaginationBar
                    page={bookingsPage}
                    totalPages={bookingsPages}
                    onPage={(p) => loadBookings(p)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inquiries">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle>My inquiries</CardTitle>
                  <select
                    className="rounded-lg border px-3 py-1.5 text-sm w-full sm:w-auto"
                    value={inquirySource}
                    onChange={(e) => {
                      setInquirySource(e.target.value);
                      loadInquiries(1, e.target.value);
                    }}
                  >
                    <option value="">All types</option>
                    <option value="booking">Bookings</option>
                    <option value="contact">Contact</option>
                    <option value="service">Services</option>
                  </select>
                </CardHeader>
                <CardContent>
                  {inquiriesLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
                    </div>
                  ) : inquiries.length === 0 ? (
                    <EmptyState message="No inquiries found for your account." />
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((item: Record<string, unknown>) => (
                        <div
                          key={`${item.source}-${item.id}`}
                          className="rounded-lg border p-4"
                        >
                          <div className="flex flex-wrap justify-between gap-2 mb-1">
                            <p className="font-medium capitalize">
                              {String(item.type || item.source)}
                            </p>
                            <div className="flex gap-2">
                              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded capitalize">
                                {String(item.source)}
                              </span>
                              <StatusBadge status={String(item.status)} />
                            </div>
                          </div>
                          {item.destination ? (
                            <p className="text-sm text-gray-600">
                              {String(item.destination)}
                            </p>
                          ) : null}
                          {item.message ? (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {String(item.message)}
                            </p>
                          ) : null}
                          <p className="text-xs text-gray-400 mt-2">
                            {formatDate(item.createdAt as string)}
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment history</CardTitle>
                </CardHeader>
                <CardContent>
                  {paymentsLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
                    </div>
                  ) : payments.length === 0 ? (
                    <EmptyState message="No payment records yet." />
                  ) : (
                    <div className="space-y-3">
                      {payments.map((p: Record<string, unknown>) => (
                        <div
                          key={String(p.id)}
                          className="rounded-lg border p-4 flex flex-wrap justify-between gap-2"
                        >
                          <div>
                            <p className="font-semibold">
                              {p.currency || "INR"} {String(p.amount ?? "—")}
                            </p>
                            <p className="text-sm text-gray-500">
                              {String(p.description || p.paymentMethod || "Payment")}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatDate((p.paidAt || p.createdAt) as string)}
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Change password</CardTitle>
                </CardHeader>
                <CardContent>
                  {profile.authProvider === "google" ? (
                    <p className="text-sm text-gray-600">
                      You signed in with Google. Password change is not available for this
                      account.
                    </p>
                  ) : (
                    <form
                      onSubmit={handlePasswordSave}
                      className="grid gap-4 max-w-lg"
                    >
                      {passwordFormError && (
                        <div
                          role="alert"
                          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                        >
                          {passwordFormError}
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium">Current password</label>
                        <input
                          type="password"
                          autoComplete="current-password"
                          className={passwordInputClass(!!passwordErrors.current_password)}
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
                          <p className="text-red-500 text-sm mt-1">
                            {passwordErrors.current_password}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium">New password</label>
                        <input
                          type="password"
                          autoComplete="new-password"
                          className={passwordInputClass(!!passwordErrors.new_password)}
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
                          <p className="text-red-500 text-sm mt-1">
                            {passwordErrors.new_password}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium">Confirm new password</label>
                        <input
                          type="password"
                          autoComplete="new-password"
                          className={passwordInputClass(
                            !!passwordErrors.new_password_confirmation
                          )}
                          value={passwordForm.confirm}
                          onChange={(e) => {
                            clearPasswordFieldError("new_password_confirmation");
                            setPasswordForm((f) => ({ ...f, confirm: e.target.value }));
                          }}
                        />
                        {passwordErrors.new_password_confirmation && (
                          <p className="text-red-500 text-sm mt-1">
                            {passwordErrors.new_password_confirmation}
                          </p>
                        )}
                      </div>
                      <Button type="submit" disabled={passwordSaving}>
                        {passwordSaving ? "Updating..." : "Update password"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
