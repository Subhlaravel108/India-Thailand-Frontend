import { contactInfo } from "@/lib/global_variables";
import DashboardClient from "./DashboardClient";

export const metadata = {
  title: `My Dashboard - ${contactInfo.websiteName}`,
  description: `Manage your bookings, inquiries, profile and payments at ${contactInfo.websiteName}.`,
};

export default function DashboardPage() {
  return <DashboardClient />;
}
