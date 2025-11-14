import type { Metadata } from "next";
import TravelInsuranceClient from "./client";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Travel Insurance | ${contactInfo.websiteName}`,
  description:
    "Get comprehensive travel insurance for your Thailand trips from Jaipur. Protect yourself against flight delays, lost luggage, and medical emergencies.",
};

export default function TravelInsurancePage() {
  return <TravelInsuranceClient />;
}
