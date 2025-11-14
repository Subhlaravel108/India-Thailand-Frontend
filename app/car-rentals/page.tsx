import type { Metadata } from "next";
import CarRentalsClient from "./client";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Car Rental Services | ${contactInfo.websiteName}`,
  description:
    `Rent cars in Jaipur and Thailand easily with ${contactInfo.websiteName}. Choose from sedans, SUVs, and luxury vehicles with professional drivers and flexible rental plans.`,
  keywords: [
    "Car rental Jaipur",
    "Car rental Thailand",
    "Luxury cars",
    "SUV rental",
    `${contactInfo.websiteName}`,
  ],
};

export default function CarRentalsPage() {
  return <CarRentalsClient />;
}
