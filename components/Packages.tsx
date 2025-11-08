"use client";

import { Check, Users, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchTourPackages } from "@/lib/api";
import Link from "next/link";

// const packages = [
//   {
//     id: 1,
//     name: "Adventure Explorer",
//     price: "$199",
//     period: "per person",
//     image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     features: [
//       "5 Days Adventure Tour",
//       "Professional Guide",
//       "All Equipment Included",
//       "Transportation",
//       "2 Meals Daily",
//       "Group of 8-12 People"
//     ],
//     popular: false
//   },
//   {
//     id: 2,
//     name: "Luxury Escape",
//     price: "$599",
//     period: "per person",
//     image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     features: [
//       "7 Days Luxury Experience",
//       "Private Guide & Driver",
//       "5-Star Accommodations",
//       "All Meals Included",
//       "Spa & Wellness Sessions",
//       "VIP Airport Transfers",
//       "Flexible Itinerary"
//     ],
//     popular: true
//   },
//   {
//     id: 3,
//     name: "Cultural Journey",
//     price: "$349",
//     period: "per person",
//     image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     features: [
//       "8 Days Cultural Tour",
//       "Local Expert Guide",
//       "Historical Site Access",
//       "Traditional Experiences",
//       "Local Cuisine Tasting",
//       "Small Group (4-8 People)"
//     ],
//     popular: false
//   }
// ];
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
      
     
      
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-full h-8 bg-gray-300 rounded"></div>
          {/* <div className="w-16 h-4 bg-gray-300 rounded"></div> */}
        </div>
      </div>

      
      <div className="w-full h-10 bg-gray-300 rounded"></div>
    </div>
  </div>
);
const Packages = () => {
  const router = useRouter();
  const [packages,setPackages]=useState<any[]>([])
  const [loading,setLoading]=useState(true)
  const [error, setError] = useState<string | null>(null);
   const loadPackages = async (search = "", pageNum = 1) => {
      setLoading(true);
      try {
        const res = await fetchTourPackages();
        if (res.success) {
          setPackages(res.data || []);
          
         
        } else {
          setPackages([]);
          setError(res.message || "Failed to fetch packages");
        }
      } catch (e) {
        setError("Failed to load packages");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      loadPackages();
    }, []);
  
  return (
    <section id="packages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Travel Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated travel packages designed to give you the best experience
          </p>
        </div>

        {error && (
          <div className="text-center text-red-600 mb-8 bg-red-100 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PackageCardSkeleton/>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.slice(0, 3).map((item) => (
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
                    <Link href={`/package/${item.slug}`}>
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
                     <Link href={`/package/${item.slug}`}>
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
        )}

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need a custom package? We can create a personalized itinerary just for you.
          </p>
          <Button variant="outline" size="lg" className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-3 rounded-full">
            Request Custom Package
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Packages;
