"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BlogClientProps {
  slug: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featuredImage?: string;
  publishDate?: string;
  published_at?: string;
  author: string;
  categoryId: string;
  status: string;
  tags: string[];
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogClient({ slug }: BlogClientProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching blog with slug:", slug);

        const res = await axios.get(`http://127.0.0.1:3001/api/front/blog/${slug}`);

        if (res.data?.success && res.data?.data) {
          setBlog(res.data.data);
        } else {
          setError("Blog data not found");
        }
      } catch (error: any) {
        console.error("Error fetching blog:", error);
        setError(
          error.response?.data?.message ||
          error.message ||
          "Failed to load blog post"
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  // Calculate read time based on content
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";

    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading State
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              {/* Breadcrumb Skeleton */}
              <div className="flex items-center space-x-2 mb-8">
                <div className="h-4 w-20 bg-blue-200 rounded"></div>
                <div className="h-4 w-4 bg-blue-200 rounded"></div>
                <div className="h-4 w-32 bg-blue-200 rounded"></div>
              </div>

              {/* Title Skeleton */}
              <div className="h-8 bg-blue-200 rounded mb-4"></div>
              <div className="h-8 bg-blue-200 rounded mb-8 w-3/4"></div>

              {/* Meta Skeleton */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="h-10 w-10 bg-blue-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-blue-200 rounded"></div>
                  <div className="h-3 w-32 bg-blue-200 rounded"></div>
                </div>
              </div>

              {/* Image Skeleton */}
              <div className="h-96 bg-blue-200 rounded-lg mb-8"></div>

              {/* Content Skeleton */}
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-blue-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error State
  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Blog Post Not Available</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => router.push("/blog")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Browse All Blogs
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="border border-blue-300 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No Blog Post Found</h2>
              <p className="text-gray-600 mb-6">The blog post you're looking for is not available.</p>
              <button
                onClick={() => router.push("/blog")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Explore Blogs
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const readTime = calculateReadTime(blog.content);
  const displayDate = blog.publishDate || blog.published_at;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={() => router.push("/")}
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </button>
            <span className="text-gray-400">›</span>
            <button
              onClick={() => router.push("/blog")}
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Blogs
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-blue-600 font-semibold truncate max-w-xs">
              {blog.title}
            </span>
          </nav>
        </div>

        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <header className="mb-8 text-center">
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {blog.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 font-serif">
              {blog.title}
            </h1>

            <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto font-light">
              {blog.summary}
            </p>

            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-6 py-6 border-t border-b border-blue-200">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{readTime} min read</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{formatDate(displayDate)}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">By {blog.author}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="mb-12">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          )}

          {/* Content Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 mb-12">
            <div
              className="prose prose-base max-w-none 
               prose-headings:font-serif prose-headings:text-gray-900 prose-headings:mb-3
               prose-p:text-gray-700 prose-p:leading-6 prose-p:my-1
               prose-strong:text-gray-700 prose-strong:font-bold
               prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
               prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-3
               prose-blockquote:rounded-r-lg prose-blockquote:italic
               prose-ul:list-disc prose-ul:pl-5 prose-ul:my-2
               prose-ol:list-decimal prose-ol:pl-5 prose-ol:my-2
               prose-li:marker:text-blue-500 prose-li:my-0.5"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Tags Section */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {/* <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 mb-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">✍️</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">About the Author</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {blog.author} is a passionate travel writer who loves sharing insights about destinations, cultures, and travel experiences. With a keen eye for detail and a love for authentic experiences, they bring you the best of travel adventures.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <span>🌍</span>
                    <span>Travel Enthusiast</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>✍️</span>
                    <span>Writer</span>
                  </span>
                </div>
              </div>
            </div>
          </div> */}

          {/* Call to Action */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-4 font-serif">Discover More Travel Articles</h3>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Explore our collection of travel guides, destination insights, and cultural experiences to plan your next adventure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => router.push("/blog")}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg text-lg"
                >
                  Read More Articles
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-colors text-lg"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-colors hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}