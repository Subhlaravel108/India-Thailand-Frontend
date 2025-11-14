import type { Metadata } from "next";
import HotelReservationsClient from "./client";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Hotel Reservation Services | ${contactInfo.websiteName}`,
  description:
    `Book luxury, business, and budget hotels worldwide with ${contactInfo.websiteName}. Verified hotels, secure payments, and instant confirmations from Jaipur to Bali and beyond.`,
  keywords: [
    "Hotel booking",
    "Hotel reservation",
    "Luxury hotels",
    "Budget hotels",
    "TravelCo",
  ],
};

export default function HotelReservationsPage() {
  return <HotelReservationsClient />;
}
