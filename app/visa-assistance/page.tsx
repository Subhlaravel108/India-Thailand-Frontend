import type { Metadata } from "next";
import VisaAssistanceClient from "./client";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Visa Assistance | ${contactInfo.websiteName}`,
  description:
    "Hassle-free visa assistance for Thailand travel from Jaipur. Our experts help with documents, applications, and approvals.",
};

export default function VisaAssistancePage() {
  return <VisaAssistanceClient />;
}
