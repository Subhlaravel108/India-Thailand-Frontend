"use client";
import { useParams } from "next/navigation";
import Header from "components/Header";
import parse from "html-react-parser";
import Footer from "components/Footer";
import { Button } from "components/ui/button";
import { Card, CardContent } from "components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import {
  MapPin,
  Calendar,
  Users,
  Check,
  X,
  Clock,
  Plane,
  Hotel,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchTourDetails } from "@/lib/api";
import { Skeleton } from "components/ui/skeleton"; // ✅ shadcn Skeleton component

const TourDetail = () => {
  const { slug } = useParams();
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadTour = async () => {
    try {
      const res = await fetchTourDetails(String(slug));
      if (res.success) {
        setTour(res.data);
      }
    } catch (err) {
      console.error("Error loading tour:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTour();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {loading ? (
        <>
          {/* Hero Skeleton */}
          <section className="relative h-[60vh] overflow-hidden">
            <Skeleton className="w-full h-full rounded-none" />
            <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
              <div className="max-w-4xl">
                <Skeleton className="h-10 w-2/3 mb-4" />
                <div className="flex flex-wrap gap-6">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Skeleton */}
          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-8 w-1/3 mt-6" />
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card className="shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-4 w-40" />
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                    <Skeleton className="h-10 w-full mt-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* ✅ Original Page Content */}
          <section className="relative h-[60vh] overflow-hidden">
            <img
              src={tour.featureImage}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {tour.title}
                </h1>
                <div className="flex flex-wrap gap-6 text-white/90 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{tour.tour_duration} Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{tour.people} People</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{tour.countries}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Content */}
              <div className="lg:col-span-2">
                <section className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">Tour Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {parse(tour.description)}
                  </p>
                </section>

                <Tabs defaultValue="itinerary" className="mb-8">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    <TabsTrigger value="included">Included</TabsTrigger>
                    <TabsTrigger value="places">Places</TabsTrigger>
                  </TabsList>

                  <TabsContent value="itinerary">
                    <h3 className="text-2xl font-bold mb-6">
                      Day by Day Itinerary
                    </h3>
                    {tour.itinerary?.map((day: any, idx: number) => (
                      <Card key={idx}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                              {day.title}
                            </div>
                            <div className="flex-1">
                              <p className="text-muted-foreground mb-4">
                                {parse(day.detail)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="gallery">
                    <h3 className="text-2xl font-bold mb-6">Photo Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {tour.gallery?.map((img: string, i: number) => (
                        <div
                          key={i}
                          className="aspect-square overflow-hidden rounded-lg group cursor-pointer"
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="included">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Check className="w-6 h-6 text-green-600" />
                      What's Included
                    </h3>
                    <Card>
                      <CardContent className="p-6">
                        <ul className="space-y-2">
                          {tour.included?.map((item: string, i: number) => (
                            <li key={i} className="flex gap-3 text-sm">
                              <Check className="w-5 h-5 text-green-600 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-primary">
                          ${tour.price}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Per person (based on double occupancy)
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span>{tour.tour_duration} Days</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Users className="w-5 h-5 text-primary" />
                        <span>{tour.people} People</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Plane className="w-5 h-5 text-primary" />
                        <span>{tour.countries}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Hotel className="w-5 h-5 text-primary" />
                        <span>{tour.hotelType}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Shield className="w-5 h-5 text-primary" />
                        <span>
                          {tour.travelInsuranceIncluded
                            ? "Travel Insurance Included"
                            : "Travel Insurance Not Included"}
                        </span>
                      </div>
                    </div>

                    <Link href="/book-now">
                      <Button className="w-full mb-3">Book This Tour Now</Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full">
                        Contact for Custom Package
                      </Button>
                    </Link>

                    <div className="mt-6 pt-6 border-t text-center text-xs text-muted-foreground">
                      💯 Best price guaranteed
                      <br />
                      🔒 Secure booking
                      <br />
                      📞 24/7 customer support
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default TourDetail;
