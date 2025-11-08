"use client"
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { fetchDestinations } from "@/lib/api";
import Link from "next/link";

// Type definition
interface Destination {
  _id: string;
  title: string;
  featured_image: string;
  short_description: string;
  slug: string;
  status?: string;
}

const Destinations = () => {
  const [destination, setDestination] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load Destinations
  const loadDestination = async () => {
    try {
      const res = await fetchDestinations();
      const activeDestinations = res.data.filter(
        (item: Destination) => item.status === "Active"
      );
      setDestination(activeDestinations);
      setError(null);
    } catch (err) {
      setError("Failed to load destinations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDestination();
  }, []);

  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing places around the world that will create unforgettable memories
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center text-red-600 mb-8 bg-red-100 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden h-80"
              >
                <div className="bg-gray-200 h-48 w-full"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-10 bg-gray-200 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.slice(0, 6).map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative overflow-hidden flex-shrink-0">
                  <img
                    src={item.featured_image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="mb-3 flex-grow">
                    <Link href={`/destinations/${item.slug}`}>
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-orange-500 transition-colors mb-2">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                      {item.short_description ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              item.short_description.length > 100
                                ? item.short_description.substring(0, 100) + "..."
                                : item.short_description,
                          }}
                        />
                      ) : (
                        "Explore this amazing destination and create unforgettable memories."
                      )}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Link href={`/destinations/${item.slug}`}>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 transition-colors duration-200">
                        <span>Explore Destination</span>
                        <MapPin className="w-3 h-3 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && !error && (
          <div className="text-center mt-12">
            <Link href={"/destinations"}>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-3 rounded-full"
              >
                View All Destinations
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Destinations;
