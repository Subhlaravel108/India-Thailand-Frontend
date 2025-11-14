import type { Metadata } from "next";
import FlightBookingClient from "./client";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Flight Booking Services | ${contactInfo.websiteName}`,
  description:
    "Book domestic and international flights from Jaipur to anywhere in the world. Fast, secure, and affordable flight booking with TravelCo.",
  keywords: [
    "Flight booking",
    "Cheap flights",
    "International travel",
    "Domestic flights",
    "TravelCo",
  ],
};

export default function FlightBookingPage() {
  return <FlightBookingClient />;
}
