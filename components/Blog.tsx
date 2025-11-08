"use client"
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Hidden Gems in Southeast Asia",
    excerpt: "Discover the most breathtaking and lesser-known destinations that will make your Southeast Asian adventure unforgettable.",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    category: "Travel Tips"
  },
  {
    id: 2,
    title: "Essential Travel Guide for First-Time Backpackers",
    excerpt: "Everything you need to know before embarking on your first backpacking journey, from packing tips to budget planning.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200",
    author: "Mike Chen",
    date: "March 12, 2024",
    category: "Adventure"
  },
  {
    id: 3,
    title: "Best Time to Visit European Destinations",
    excerpt: "A comprehensive guide to help you plan your European vacation during the perfect season for each destination.",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200",
    author: "Emma Wilson",
    date: "March 8, 2024",
    category: "Planning"
  }
];

const Blog = () => {
  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Travel Stories & Tips
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get inspired by our latest travel stories, tips, and guides to make your next adventure extraordinary
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.id}`}>
                  <Button variant="ghost" className="group p-0 h-auto font-semibold">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

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
