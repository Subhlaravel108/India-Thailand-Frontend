import api from "@/lib/api";

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const getDashboardSummary = () =>
  api.get<{
    success: boolean;
    data: {
      profile: { name: string; email: string };
      counts: { bookings: number; inquiries: number; payments: number };
    };
  }>("/user/dashboard/summary");

export const getUserProfile = () =>
  api.get<{ success: boolean; data: Record<string, unknown> }>("/user/profile");

export const updateUserProfile = (data: {
  name?: string;
  phone?: string;
  avatar?: string;
}) => api.put("/user/profile", data);

export const getMyBookings = (params?: { page?: number; limit?: number }) =>
  api.get("/user/bookings", { params });

export const getMyPayments = (params?: { page?: number; limit?: number }) =>
  api.get("/user/payments", { params });

export const getMyInquiries = (params?: {
  page?: number;
  limit?: number;
  source?: "booking" | "contact" | "service";
}) => api.get("/user/inquiries", { params });

export const changeUserPassword = (data: {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}) => api.post("/user/change-password", data);
