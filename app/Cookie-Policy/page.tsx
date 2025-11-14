import { Metadata } from "next"
import CookiePolicy from "./client";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
    title: `Cookie Policy - ${contactInfo.websiteName}`,
    description: `Learn about how ${contactInfo.websiteName} uses cookies and similar technologies to enhance your travel booking experience. Manage your cookie preferences and understand our data practices.`,
    keywords: "cookie policy, cookies, privacy, data collection, website tracking, user preferences",
};

export default function CookiePolicyPage(){
    return(
        <CookiePolicy/>
    )
}