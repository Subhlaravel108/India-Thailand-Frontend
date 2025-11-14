import type { Metadata } from "next";
import BlogClient from "./BlogDetail";
import api from "@/lib/api";
import { contactInfo } from "@/lib/global_variables";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

// 👇 SEO ke liye metadata generate karenge
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const res = await api.get(`/front/blog/${slug}`);
    const blog = res.data.data;
  console.log("blog=",blog)
    if (!blog) {
      return {
        title: `Blog Not Found - ${contactInfo.websiteName}`,
        description: "The requested blog could not be found.",
      };
    }

    return {
      title: `${blog.meta_title} | ${contactInfo.websiteName}`,
      description: blog.meta_description,
      openGraph: {
        title: blog.meta_title,
        description: blog.meta_description,
        images: [{ url: blog.thumbnail_image }],
      },
    };
  } catch {
    return {
      title: `Blog Not Found - ${contactInfo.websiteName}`,
      description: "The requested blog could not be found.",
    };
  }
}

// 👇 Server component slug ko client component me bhejega
export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  return <BlogClient slug={slug} />;
}
