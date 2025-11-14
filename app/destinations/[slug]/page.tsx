import type { Metadata } from "next";
import React from "react";
import ToursListingPage from "./client";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Tours - Best Travel Packages & Adventure Trips | ${contactInfo.websiteName}`,
  description:
    "Explore exciting tour packages from Jaipur to Thailand and beyond. Discover romantic getaways, adventure tours, family vacations, and group trips — all with Jaipur to Thailand.",
  keywords:
    "Jaipur to Thailand, Thailand tours, travel packages, adventure trips, honeymoon tours, family vacations, international travel, best Thailand packages",
  openGraph: {
    title: "Tours - Best Travel Packages & Adventure Trips | Jaipur to Thailand",
    description:
      "Explore exciting tour packages from Jaipur to Thailand and beyond. Discover romantic getaways, adventure tours, family vacations, and group trips — all with Jaipur to Thailand.",
    type: "website",
    siteName: "Jaipur to Thailand",
  },
};

export default function Page() {
  return <ToursListingPage />;
}
