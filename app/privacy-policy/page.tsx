import { Metadata } from "next"
import PrivacyPolicy from "./PrivacyClient";
import { contactInfo } from "@/lib/global_variables";
export const metadata: Metadata = {
    title: `Privacy & Policy - ${contactInfo.websiteName}`,
  description:
    `Read the Privacy Policy of ${contactInfo.websiteName}. Learn how we collect, use, and protect your personal information when you use our website or services.`,
};

export default function PrivacyPage(){
    return(
        <PrivacyPolicy/>
    )
}