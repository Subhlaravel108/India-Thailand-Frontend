import type { Metadata } from "next";
import TourDetailClient from "./client";
import api from "@/lib/api";
import { contactInfo } from "@/lib/global_variables";

interface TourDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  try {
    const { slug } = params; 
    

    const res = await api.get(`/front/tours/${slug}`);
    const tour = res.data.data;
   

    if (!tour) {
      return {
        title: `Tour Not Found - ${contactInfo.websiteName}`,
        description: "The requested tour could not be found.",
      };
    }

    return {
      title: `${tour.meta_title} | ${contactInfo.websiteName}`,
      description: tour.meta_description,
      openGraph: {
        title: tour.meta_title,
        description: tour.meta_description,
        images: [{ url: tour?.featureImage }],
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: `Tour Not Found - ${contactInfo.websiteName}`,
      description: "The requested tour could not be found.",
    };
  }
}

export default function TourDetailPage() {
  return <TourDetailClient />;
}
