"use client";

import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { format, parseISO } from "date-fns";
interface BlogType {
  _id: string;
  title: string;
  summary: string;
  published_at: string;
  featuredImage: string;
  slug: string;
  author?: string;
}

const BlogSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="animate-pulse">
        <div className="h-48 bg-gray-300" />

        <div className="p-6 space-y-3">
          <div className="h-4 bg-gray-300 rounded w-32" />
          <div className="h-6 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
        </div>
      </div>
    </Card>
  );
};

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      // const res = await api.get(`/front/blog`);

      const res= await fetch("/data/blogs.json")
      if(!res.ok) throw new Error("Failed to fetch blogs.");
       const data:BlogType[]=await res.json();
            
        setBlogs(data);
        setError(null);
      
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);

      if (err.response?.status === 404) {
        setError("No blogs found.");
      } else if (err.code === "ERR_NETWORK") {
        setError("Network error.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Travel Stories & Tips
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get inspired by our latest travel stories, tips, and guides to make your next adventure extraordinary.
          </p>
        </div>

        {/* Skeleton Loader Grid */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}

        {/* Blog Cards */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogs.map((post) => (
              <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-3 flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{format(parseISO(post.published_at), 'dd MMM YYY')}</span>
                    </div>

                    {post.author && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    )}
                  </div>
                    <Link href={`/blog/${post.slug}`}>
                    
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                    </Link>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.summary}
                  </p>

                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="group p-0 h-auto font-semibold">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button size="lg" variant="outline">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
