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
import api, { fetchTourDetails } from "@/lib/api";
import { Skeleton } from "components/ui/skeleton"; // ✅ shadcn Skeleton component
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";

const TourDetail = () => {
  const { slug } = useParams();
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState<any>();
  const [loadingDestinations, setLoadingDestinations] = useState(false);
  const [openImage, setOpenImage] = useState(false);
const [activeImage, setActiveImage] = useState("");



  const loadTour = async () => {
    try {

      const jsonRes=await fetch("/data/all_tours.json");
      if(!jsonRes.ok) throw new Error("Tours JSON not found");
      const toursData=await jsonRes.json();
      const allTours=toursData.data || [] ;

      const matchedTour=allTours.find((t:any)=>t.slug===slug);

      if(!matchedTour){
        throw new Error("Tour not found in JSON");
      }
      setTour(matchedTour);
      setLoading(false);
      // console.log("Tour data from JSON:", matchedTour);
      return; // Stop here, no API call needed
    }
    catch (jsonError) {
      console.error("Error loading tour from JSON:", jsonError);
    }

    try{
      const res = await fetchTourDetails(String(slug));
      if (res.success) {
        setTour(res.data);
        // console.log("Tour data:", res.data);
      }
    } catch (err) {
      console.error("Error loading tour:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadDestinations = async () => {
    if (!tour?.destinationIds || tour.destinationIds.length === 0) return;

    try {
      const jsonRes=await fetch("/data/all_destinations.json");
      if(!jsonRes.ok) throw new Error("Destinations JSON not found");
      const destinationsData=await jsonRes.json();
      const allDestinations=destinationsData.data || [] ;
      const matchedDestinations=allDestinations.filter((dest:any)=>tour.destinationIds.includes(dest._id));
      setDestinations(matchedDestinations);
      // console.log("Destinations from JSON:", matchedDestinations);
      return; // Stop here, no API call needed
    }
    catch (jsonError) {
      console.error("Error loading destinations from JSON:", jsonError);
    }
    try {
      setLoadingDestinations(true);

      const res = await api.post("/front/destinations-by-ids", {
        ids: tour.destinationIds,
      });

      if (res.data.success) {
        setDestinations(res.data.data);
      }
    } catch (error) {
      console.error("Error loading destinations:", error);
    } finally {
      setLoadingDestinations(false);
    }
  };



  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  useEffect(() => {
    loadTour();
  }, []);

  useEffect(() => {
    if (tour) {
      loadDestinations();
    }
  }, [tour]);

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
        onClick={() => {
          setActiveImage(img);   
          setOpenImage(true);    
        }}
      >
        <img
          src={img}
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    ))}

  </div>
    <Dialog open={openImage} onOpenChange={setOpenImage}>
  <DialogPortal>
    <DialogContent
      className="max-w-5xl  p-0 text-red-500 font-extrabold border-none"
      style={{ maxHeight: "90vh" }}
    >

      {/* Required for accessibility (Hidden Title) */}
      <DialogHeader className="sr-only">
        <DialogTitle>Image Preview</DialogTitle>
        <DialogDescription>Large view of selected image</DialogDescription>
      </DialogHeader>

      <img
        src={activeImage}
        alt="Big preview"
        className="w-full h-auto max-h-[90vh] object-contain rounded"
      />
    </DialogContent>
  </DialogPortal>
</Dialog>

</TabsContent>


                  <TabsContent value="included">
                    {/* Included Section */}
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

                    {/* Not Included Section */}
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 mt-6">
                      <X className="w-6 h-6 text-red-600" />
                      What's Not Included
                    </h3>

                    <Card>
                      <CardContent className="p-6">
                        <ul className="space-y-2">
                          {tour.notIncluded?.map((item: string, i: number) => (
                            <li key={i} className="flex gap-3 text-sm">
                              <X className="w-5 h-5 text-red-600 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>


                  <TabsContent value="places">
                    <h3 className="text-2xl font-bold mb-6">Places Covered</h3>

                    {loadingDestinations ? (
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Skeleton key={i} className="h-56 w-full rounded-lg" />
                        ))}
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {destinations?.map((place: any) => (
                          <Card key={place._id} className="overflow-hidden shadow-md rounded-lg">

                            <div className="w-full h-40 overflow-hidden">
                              <img
                                src={place.featured_image}
                                alt={place.title}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                              />
                            </div>

                            <CardContent className="p-4">
                              <h4 className="text-xl font-semibold">{place.title}</h4>
                              <p className="text-muted-foreground mt-2 line-clamp-3">
                                {parse(place.short_description)}
                              </p>
                              <Button asChild className="w-full mt-4">
              <Link href={`/destinations/${place.slug}`}>
                View Destination
              </Link> 
                             </Button>
                            </CardContent>

                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>



                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 shadow-lg">
                  <CardContent className="p-6">
                      {tour.price>0 && (
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        
                        <span className="text-4xl font-bold text-primary">
                          {formatPrice(tour.price)}
                        </span>
                      </div>
                      {/* <p className="text-sm text-muted-foreground">
                        Per person (based on double occupancy)
                        </p> */}
                    </div>
                        )}

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
