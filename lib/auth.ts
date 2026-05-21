export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  token: string;
  avatar?: string | null;
  authProvider?: string;
};

export const persistAuthSession = (user: AuthUser) => {
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("token", user.token);
  localStorage.setItem("role", user.role);
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuthSession = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
};

export const getStoredUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
};

export const getUserInitials = (name?: string): string => {
  if (!name?.trim()) return "U";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};
