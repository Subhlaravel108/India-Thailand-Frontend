import type { Metadata } from "next";
import CustomToursClient from "./client";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Custom Tours | ${contactInfo.websiteName}`,
  description:
    "Design your dream Thailand tour from Jaipur with personalized itineraries, private guides, and flexible travel options.",
};

export default function CustomToursPage() {
  return <CustomToursClient />;
}
