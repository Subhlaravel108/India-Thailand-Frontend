'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Star, Clock, Users, Search, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { fetchTourPackages } from "@/lib/api";
import { toast } from "sonner";

// Skeleton Loading Component
const PackageCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
    {/* Image Skeleton */}
    <div className="w-full h-48 bg-gray-300 relative">
      <div className="absolute top-4 left-4 w-16 h-6 bg-gray-400 rounded-full"></div>
      {/* <div className="absolute top-4 right-4 w-16 h-6 bg-gray-400 rounded-full"></div> */}
    </div>
    
    {/* Content Skeleton */}
    <div className="p-6">
      <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
      
      {/* <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
        </div>
      </div> */}
      
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-full h-8 bg-gray-300 rounded"></div>
          {/* <div className="w-16 h-4 bg-gray-300 rounded"></div> */}
        </div>
      </div>
{/*       
      <div className="mb-4">
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/3"></div>
        <div className="flex flex-wrap gap-2">
          <div className="w-16 h-6 bg-gray-300 rounded"></div>
          <div className="w-12 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
        <div className="space-y-1">
          <div className="w-full h-4 bg-gray-300 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
        </div>
      </div> */}
      
      <div className="w-full h-10 bg-gray-300 rounded"></div>
    </div>
  </div>
);

// Skeleton Grid for Loading State
const PackagesSkeletonGrid = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
    {Array.from({ length: 6 }).map((_, index) => (
      <PackageCardSkeleton key={index} />
    ))}
  </div>
);

const PackagesPage = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const loadPackages = async (search = "", pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetchTourPackages({ page: pageNum, search });
      if (res.success) {
        setPackages(res.data || []);
        console.log(res.data)
        setTotalPages(res.totalPages || 1);
        setTotal(res.total || 0);
      } else {
        setPackages([]);
        toast.error(res.message || "Failed to fetch packages");
      }
    } catch (e) {
      toast.error("Failed to load packages");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    loadPackages(debouncedSearch, 1);
    setPage(1);
  }, [debouncedSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadPackages(searchQuery, 1);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      loadPackages(debouncedSearch, newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate pagination numbers with ellipsis
  const getPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);
      
      if (page <= 3) {
        end = 4;
      }
      
      if (page >= totalPages - 2) {
        start = totalPages - 3;
      }
      
      if (start > 2) {
        pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Inactive': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  // Helper function to strip HTML tags for description
  const stripHtml = (html: string) => {
    return html?.replace(/<[^>]*>/g, '') || 'Explore this amazing tour package and create unforgettable memories.';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Travel Packages
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Carefully curated travel experiences with everything included for your perfect getaway
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            {/* <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search packages... "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg text-black border-0 rounded-full shadow-lg focus:ring-2 focus:ring-orange-400"
              />
            </div> */}
          </form>
        </div>
      </section>

      {/* Results Info */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 w-32 bg-gray-300 rounded mb-1"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-800">
                    {total} Amazing Packages
                  </h2>
                  {searchQuery && (
                    <p className="text-gray-600 text-sm mt-1">
                      Search results for "{searchQuery}"
                    </p>
                  )}
                </>
              )}
            </div>
            {searchQuery && !loading && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSearchQuery('')}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear Search
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <PackagesSkeletonGrid />
          ) : packages.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <MapPin className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No packages found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery ? `No results found for "${searchQuery}". Try different keywords.` : 'No packages available at the moment.'}
              </p>
              {searchQuery && (
                <Button onClick={() => setSearchQuery('')} className="bg-orange-500 hover:bg-orange-600">
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                  <div key={pkg._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group flex flex-col h-full">
                     <div className="relative overflow-hidden flex-shrink-0">
                      <img 
                        src={pkg.imageUrl} 
                        alt={pkg.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pkg.status === 'Active' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-500 text-white'
                        }`}>
                          {pkg.status}
                        </span>
                      </div>
                    </div>
                    
                     <div className="p-4 flex flex-col flex-grow">
                      <div className="mb-3 flex-grow">
                        <Link href={`/package/${pkg.slug}`}>
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-orange-500 transition-colors mb-2">
                          {pkg.title}
                        </h3>
                        </Link>
                        
                        {/* Short Description */}
                        <div className="mb-3">
                          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                            {pkg.shortDescription ? (
                              <span dangerouslySetInnerHTML={{ 
                                __html: pkg.shortDescription.length > 100 
                                  ? pkg.shortDescription.substring(0, 100) + '...' 
                                  : pkg.shortDescription 
                              }} />
                            ) : 'Explore this amazing packages and create unforgettable memories.'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Meta Info */}
                      {/* <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>Popular</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>3-7 days</span>
                        </div>
                      </div> */}
                      
                      {/* CTA Button - Always at bottom */}
                      <div className="mt-auto">
                        <Link href={`/package/${pkg.slug}`}>
                        
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 transition-colors duration-200">
                          <span>Explore Package</span>
                          <MapPin className="w-3 h-3 ml-2" />
                        </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Numbered Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-12">
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="flex items-center space-x-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {getPaginationNumbers().map((pageNum, index) => (
                      pageNum === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                          ...
                        </span>
                      ) : (
                        <Button
                          key={pageNum}
                          variant={page === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(pageNum as number)}
                          className={`min-w-[40px] ${
                            page === pageNum 
                              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </Button>
                      )
                    ))}
                  </div>

                  {/* Next Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="flex items-center space-x-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Page Info */}
              <div className="text-center mt-4">
                <p className="text-gray-500 text-sm">
                  Page {page} of {totalPages} • Showing {packages.length} of {total} packages
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PackagesPage;