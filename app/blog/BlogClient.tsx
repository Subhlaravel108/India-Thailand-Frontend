"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, X, Calendar, User, Tag, ArrowRight } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/api";

// 🧱 Skeleton Loader Component
const BlogSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 p-4 shadow-sm bg-white">
      <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-3 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
};

// 📦 Blog Interface (based on your backend response)
interface Blog {
  _id: string;
  title: string;
  slug: string;
  author: string;
  summary: string;
  featuredImage: string;
  publishDate: string;
  categoryId: string;
  tags: string[];
  status: string;
  category?: {
    name: string;
  };
}

const BlogPage = () => {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔁 Debounce Search Input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 800);
    return () => clearTimeout(handler);
  }, [search]);

  // 📡 Fetch Blogs
  useEffect(() => {
    fetchBlogs();
  }, [page, debouncedSearch]);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await api.get(`/front/blog`, {
        params: {
          page,
          limit: perPage,
          search: debouncedSearch,
        },
      });

      if (res.data.success) {
        setBlogs(res.data.data);
        setTotalPages(res.data.pagination?.totalPages || 1);
        setTotalCount(res.data.pagination?.total || 0);
      } else {
        setBlogs([]);
        setError("Failed to fetch blogs. Please try again.");
      }
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
      if (err.response?.status === 404) {
        setError("No blogs found.");
      } else if (err.code === "ERR_NETWORK") {
        setError("Network error. Please check your connection.");
      } else {
        setError("Something went wrong while fetching blogs.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 📜 Pagination Range Helper
  const getPaginationRange = (current: number, total: number, delta = 2) => {
    const range: (number | string)[] = [];
    
    if (total <= 1) return [1];
    
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);
    
    if (left > 2) range.push("...");
    
    for (let i = left; i <= right; i++) {
      range.push(i);
    }
    
    if (right < total - 1) range.push("...");
    if (total > 1) range.push(total);
    
    return range;
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Clear search
  const handleClearSearch = () => {
    setSearch("");
  };

  // Empty State Component with Card Design
  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
        <Search className="w-12 h-12 text-blue-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">
        {debouncedSearch ? "No matching blogs found" : "No blogs available yet"}
      </h3>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        {debouncedSearch 
          ? `We couldn't find any blogs matching "${debouncedSearch}". Try different keywords or browse our popular topics.`
          : "Check back soon for amazing travel stories and tips from our community."
        }
      </p>
      
      {debouncedSearch && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button onClick={handleClearSearch} className="bg-blue-600 hover:bg-blue-700">
            Clear Search
          </Button>
         
        </div>
      )}

    </div>
  );

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gray-50">
        {/* 🌅 Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-900 to-purple-800 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Travel <span className="text-orange-400">Blog</span>
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover amazing travel stories, expert guides, and insider tips for your next adventure
            </p>
          </div>
        </section>

        {/* 🔍 Search Section */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search blogs by title, tags, or author..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-9 h-11"
                  />
                  {search && (
                    <X
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 cursor-pointer hover:text-gray-600 transition-colors"
                      onClick={handleClearSearch}
                    />
                  )}
                </div>
              </div>
              
              {/* Results Info */}
              {!isLoading && blogs.length > 0 && (
                <div className="text-sm text-gray-600">
                  Showing {blogs.length} of {totalCount} blog{totalCount !== 1 ? 's' : ''}
                  {debouncedSearch && ` for "${debouncedSearch}"`}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 📰 Blog Grid Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 8 }).map((_, i) => <BlogSkeleton key={i} />)}
              </div>
            ) : blogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog) => (
                    <Card key={blog._id} className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-md h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={blog.featuredImage || "/api/placeholder/400/250"}
                          alt={blog.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = "/api/placeholder/400/250";
                          }}
                        />
                        {/* Status Badge */}
                        {blog.status && (
                          <div className="absolute top-3 left-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              blog.status === 'Published' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-500 text-white'
                            }`}>
                              {blog.status}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog.publishDate)}</span>
                          </div>
                          {blog.author && (
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{blog.author}</span>
                            </div>
                          )}
                        </div>
                        
                       <Link href={`/blog/${blog.slug || blog._id}`}>
                          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {blog.title}
                        </h3>
                       </Link>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                          {(blog.summary.slice(0,80))+'...' || "Discover amazing travel insights and stories..."}
                        </p>
                        
                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex items-center flex-wrap gap-1 mb-4">
                            {blog.tags.slice(0, 2).map((tag, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700"
                              >
                                <Tag className="w-2 h-2 mr-1" />
                                {tag}
                              </span>
                            ))}
                            {blog.tags.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{blog.tags.length - 2} more
                              </span>
                            )}
                          </div>
                        )}
                        
                        <Link href={`/blog/${blog.slug || blog._id}`}>
                          <Button variant="ghost" className="group p-0 h-auto font-semibold hover:bg-transparent justify-start w-fit">
                            Read More
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* 🔢 Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Page {page} of {totalPages} • {totalCount} total blog{totalCount !== 1 ? 's' : ''}
                    </p>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1 || isLoading}
                        className="flex items-center gap-1"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>

                      {getPaginationRange(page, totalPages).map((p, i) => (
                        <Button
                          key={i}
                          variant={p === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => typeof p === "number" && setPage(p)}
                          disabled={p === "..." || isLoading}
                          className={`min-w-[40px] ${
                            p === page 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {p}
                        </Button>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages || isLoading}
                        className="flex items-center gap-1"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default BlogPage;