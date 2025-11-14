import { Metadata } from "next";
import BlogPage from "./BlogClient";
import { contactInfo } from "@/lib/global_variables";
export const metadata: Metadata = {
  title: `Blog - ${contactInfo.websiteName}`,
  description: "Explore travel stories, guides, and tips from Jaipur to Thailand. Discover destinations, travel experiences, and exclusive packages with Jaipur-Thailand Tours.",
};
export default function Page() {
    return <BlogPage />;
}