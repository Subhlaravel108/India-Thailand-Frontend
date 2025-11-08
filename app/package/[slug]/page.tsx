import React from "react";
import ToursListingPage from "./client";

// ✅ Static Metadata (SEO ke liye)
export const metadata = {
  title: "Explore Our Tours | Wanderlust Adventures",
  description:
    "Discover the best travel packages and tours across India and the world. Find your perfect destination today!",
  keywords: [
    "tours",
    "travel packages",
    "holiday destinations",
    "wanderlust adventures",
    "best tours in India",
  ],
  openGraph: {
    title: "Explore Our Tours | Wanderlust Adventures",
    description:
      "Find your perfect travel destination and tour package with Wanderlust. Adventure awaits!",
    siteName: "Wanderlust Adventures",
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
