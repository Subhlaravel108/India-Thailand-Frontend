import type { Metadata } from "next";
import React from "react";
import ToursListingPage from "./client";

export const metadata: Metadata = {
  title: "Tours - Best Travel Packages & Adventure Trips | India to Thailand",
  description:
    "Explore exciting tour packages from India to Thailand and beyond. Discover romantic getaways, adventure tours, family vacations, and group trips — all with India to Thailand.",
  keywords:
    "India to Thailand, Thailand tours, travel packages, adventure trips, honeymoon tours, family vacations, international travel, best Thailand packages",
  openGraph: {
    title: "Tours - Best Travel Packages & Adventure Trips | India to Thailand",
    description:
      "Explore exciting tour packages from India to Thailand and beyond. Discover romantic getaways, adventure tours, family vacations, and group trips — all with India to Thailand.",
    type: "website",
    siteName: "India to Thailand",
  },
};

export default function Page() {
  return <ToursListingPage />;
}
