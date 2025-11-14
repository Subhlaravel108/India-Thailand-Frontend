import { Metadata } from "next";
import TermsOfService from "./TermsClient";
import {contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Terms of service - ${contactInfo.websiteName}`,
  description:
    `Read the Terms of service of ${contactInfo.websiteName}. Learn the rules, guidelines, and legal obligations for using our website and services.`,
};

export default function TermsPage() {
  return <TermsOfService />;
}
