import React from "react";
import ToursListingPage from "./client";
import { contactInfo } from "@/lib/global_variables";

// ✅ Static Metadata (SEO ke liye)
export const metadata = {
  title: `Explore Our Tours | ${contactInfo.websiteName} Adventures`,
  description:
    "Discover the best travel packages and tours across India and the world. Find your perfect destination today!",
  keywords: [
    "tours",
    "travel packages",
    "holiday destinations",
    `${contactInfo.websiteName} adventures`,
    "best tours in India",
  ],
  openGraph: {
    title: `Explore Our Tours | ${contactInfo.websiteName} Adventures`,
    description:
      `Find your perfect travel destination and tour package with ${contactInfo.websiteName}. Adventure awaits!`,
    siteName: `${contactInfo.websiteName} Adventures`,
    locale: "en_US",
    type: "website",
  },
};

// ✅ Page Component
export default function Page() {
  return (
    <div>
      <ToursListingPage />
    </div>
  );
}
