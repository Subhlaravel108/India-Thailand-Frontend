'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Star, Clock, Users, Search, ChevronLeft, ChevronRight, MapPin, Shield, Hotel, Plane, Calendar } from "lucide-react";
import { fetchTourByDestination } from "@/lib/api";
import { toast } from "sonner";
import { useParams } from 'next/navigation';

// Skeleton Loading Component
const TourCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse flex flex-col h-full">
    <div className="w-full h-48 bg-gray-300 relative">
      <div className="absolute top-4 left-4 w-20 h-6 bg-gray-400 rounded-full"></div>
      <div className="absolute top-4 right-4 w-16 h-6 bg-gray-400 rounded-full"></div>
    </div>
    
    <div className="p-6 flex flex-col flex-grow">
      <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
      
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <div className="w-12 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      
      <div className="h-4 bg-gray-300 rounded mb-3 w-full"></div>
      <div className="h-4 bg-gray-300 rounded mb-3 w-2/3"></div>
      
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-24 h-8 bg-gray-300 rounded"></div>
          <div className="w-16 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
      
      <div className="mb-4 flex-grow">
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/3"></div>
        <div className="space-y-1">
          <div className="w-full h-4 bg-gray-300 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="w-full h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

// Skeleton Grid for Loading State
const ToursSkeletonGrid = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
    {Array.from({ length: 6 }).map((_, index) => (
      <TourCardSkeleton key={index} />
    ))}
  </div>
);

const ToursListingPage = () => {
  const { slug } = useParams();
  const [tours, setTours] = useState<any[]>([]);
  const [packageName, setPackageName] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  console.log("slug=", slug);

  const loadTours = async (search = "", pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetchTourByDestination({ SlugOrId: slug, search, page: pageNum });
      if (res.success) {
        setTours(res.data || []);

        setPackageName(res.package || "Tour Package");
        setTotalPages(res.totalPages || 1);
        setTotal(res.total || 0);
      } else {
        setTours([]);
        toast.error(res.message || "Failed to fetch tours");
      }
    } catch (e) {
      toast.error("Failed to load tours");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      loadTours();
    }
  }, [slug]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (slug) {
      loadTours(debouncedSearch, 1);
      setPage(1);
    }
  }, [debouncedSearch, slug]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadTours(searchQuery, 1);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      loadTours(debouncedSearch, newPage);
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
    return html?.replace(/<[^>]*>/g, '') || 'Explore this amazing tour and create unforgettable memories.';
  };

  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Helper to check if field has value and should be shown
  const shouldShowField = (value: any) => {
    return value && value !== '' && value !== ' ' && value !== 'N/A';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {packageName}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Choose from our carefully curated tours for the perfect travel experience
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            {/* <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg text-black border-0 rounded-full shadow-lg focus:ring-2 focus:ring-blue-400"
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
                    {total} Available Tours
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

      {/* Tours Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <ToursSkeletonGrid />
          ) : tours.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <MapPin className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No tours found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery ? `No results found for "${searchQuery}". Try different keywords.` : 'No tours available for this package.'}
              </p>
              {searchQuery && (
                <Button onClick={() => setSearchQuery('')} className="bg-blue-600 hover:bg-blue-700">
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {tours.map((tour) => (
                  <div key={tour._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col h-full">
                    <div className="relative">
                      <img 
                        src={tour.featureImage || "/placeholder-image.jpg"} 
                        alt={tour.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Status Badge */}
                      {shouldShowField(tour.status) && (
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(tour.status)}`}>
                            {tour.status}
                          </span>
                        </div>
                      )}
                      {/* Insurance Badge */}
                      {tour.travelInsuranceIncluded && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <Shield className="w-3 h-3" />
                          <span>Insurance</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      {/* <Link href={`/tour/${tour.slug}`}> */}

                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {tour.title}
                      </h3>
                      {/* </Link> */}
                      
                      {/* Tour Info - Only show if values exist */}
                      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                        {shouldShowField(tour.tour_duration) && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{tour.tour_duration}</span>
                          </div>
                        )}
                        {shouldShowField(tour.people) && (
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{tour.people} People</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Short Description - Only show if exists */}
                      {shouldShowField(tour.shortDescription) && (
                        <div className="mb-4">
                          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                            {stripHtml(tour.shortDescription)}
                          </p>
                        </div>
                      )}
                      
                      {/* Price - Only show if exists */}
                      {shouldShowField(tour.price) && tour.price > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-blue-600">
                              {formatPrice(tour.price)}
                            </span>
                            <span className="text-sm text-gray-500">per person</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Countries - Only show if exists */}
                      {shouldShowField(tour.countries) && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Countries:</h4>
                          <div className="flex flex-wrap gap-1">
                            {tour.countries.split(',').map((country: string, index: number) => (
                              shouldShowField(country.trim()) && (
                                <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                                  {country.trim()}
                                </span>
                              )
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Hotel Type - Only show if exists */}
                      {shouldShowField(tour.hotelType) && (
                        <div className="mb-4 flex items-center space-x-2 text-sm text-gray-600">
                          <Hotel className="w-4 h-4" />
                          <span>{tour.hotelType} Hotel</span>
                        </div>
                      )}
                      
                      {/* Included Items Preview - Only show if exists */}
                      {tour.included && tour.included.length > 0 && tour.included.some(shouldShowField) && (
                        <div className="mb-4 flex-grow">
                          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Includes:</h4>
                          <div className="space-y-1">
                            {tour.included.filter(shouldShowField).slice(0, 3).map((item: string, index: number) => (
                              <div key={index} className="flex items-center text-sm text-gray-600">
                                <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                <span className="line-clamp-1">{item}</span>
                              </div>
                            ))}
                            {tour.included.filter(shouldShowField).length > 3 && (
                              <div className="text-xs text-gray-500">
                                +{tour.included.filter(shouldShowField).length - 3} more inclusions
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* CTA Button */}
                      {/* <div className="mt-auto">
                        <Link href={`/tour/${tour.slug}`} className="block">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">
                            View Tour Details
                          </Button>
                        </Link>
                      </div> */}
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
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
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
                  Page {page} of {totalPages} • Showing {tours.length} of {total} tours
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

export default ToursListingPage;