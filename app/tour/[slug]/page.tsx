import type { Metadata } from "next";
import TourDetailClient from "./client";
import api from "@/lib/api";

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
        title: "Tour Not Found - India to Thailand",
        description: "The requested tour could not be found.",
      };
    }

    return {
      title: `${tour.meta_title} | India to Thailand`,
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
      title: "Tour Not Found - India to Thailand",
      description: "The requested tour could not be found.",
    };
  }
}

export default function TourDetailPage() {
  return <TourDetailClient />;
}
