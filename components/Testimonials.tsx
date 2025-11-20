'use client'
import api from "@/lib/api";

import { Star, Quote, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const Testimonials = () => {
    const [feedback, setFeedback] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchFeedback = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await api.get("/feedback-lists");
            
            // Filter only approved feedbacks and ensure they have required fields
            const approvedFeedbacks = (res.data.data || []).filter((item: any) => 
                item.status === "approved" && item.message && item.name
            );
            
            setFeedback(approvedFeedbacks);
        } catch (err) {
            console.error("Error fetching feedback:", err);
            setError("Failed to load testimonials");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedback();
    }, []);

    // Skeleton loader component
    const TestimonialSkeleton = () => (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-pulse">
            <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-white/20 mr-4"></div>
                <div className="flex-1">
                    <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-white/20 rounded w-1/2"></div>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded ml-auto"></div>
            </div>
            <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-white/20 rounded mr-1"></div>
                ))}
            </div>
            <div className="space-y-2">
                <div className="h-3 bg-white/20 rounded w-full"></div>
                <div className="h-3 bg-white/20 rounded w-5/6"></div>
                <div className="h-3 bg-white/20 rounded w-4/6"></div>
            </div>
        </div>
    );

    // Stats skeleton
    const StatsSkeleton = () => (
        <div className="flex items-center justify-center space-x-8 text-blue-200 animate-pulse">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                    <div className="text-3xl font-bold bg-white/20 rounded h-8 w-16 mx-auto mb-2"></div>
                    <div className="h-3 bg-white/20 rounded w-20 mx-auto"></div>
                </div>
            ))}
        </div>
    );

    // Calculate stats
    const calculateStats = () => {
        if (feedback.length === 0) return { averageRating: 0, totalTestimonials: 0 };
        
        const totalRating = feedback.reduce((sum, item) => sum + parseInt(item.rating || 0), 0);
        const averageRating = totalRating / feedback.length;
        
        return {
            averageRating: averageRating.toFixed(1),
            totalTestimonials: feedback.length
        };
    };

    const stats = calculateStats();

    return (
        <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        What Our Travelers Say
                    </h2>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Don't just take our word for it - hear from our satisfied customers about their amazing experiences
                    </p>
                </div>

                {error && (
                    <div className="text-center mb-8">
                        <p className="text-orange-300 bg-orange-900/30 inline-block px-4 py-2 rounded-lg">
                            {error}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {loading ? (
                        // Show skeleton loaders
                        [...Array(2)].map((_, index) => (
                            <TestimonialSkeleton key={index} />
                        ))
                    ) : feedback.length > 0 ? (
                        // Show actual testimonials
                        feedback.slice(0, 2).map((testimonial: any) => (
                            <div
                                key={testimonial._id}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105"
                            >
                                <div className="flex items-start mb-6">
                                    <div className="flex items-center flex-1 min-w-0">
                                        {testimonial.image ? (
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-16 h-16 rounded-full object-cover mr-4 flex-shrink-0"
                                                onError={(e) => {
                                                    // Fallback if image fails to load
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mr-4 flex-shrink-0">
                                                <span className="text-lg font-semibold">
                                                    {testimonial.name?.charAt(0)?.toUpperCase() || 'U'}
                                                </span>
                                            </div>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-semibold text-lg truncate">{testimonial.name}</h4>
                                            {/* <div className="flex items-center text-blue-200 mt-1">
                                                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                                                <span className="text-sm truncate">
                                                    {testimonial.phone || 'Jaipur-Thailand Tours'}
                                                </span>
                                            </div> */}
                                        </div>
                                    </div>
                                    <Quote className="w-8 h-8 text-orange-500 ml-4 flex-shrink-0" />
                                </div>

                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < parseInt(testimonial.rating || 0)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-400"
                                            }`}
                                        />
                                    ))}
                                    <span className="ml-2 text-sm text-blue-200">
                                        ({testimonial.rating}/5)
                                    </span>
                                </div>

                                <p className="text-blue-100 leading-relaxed line-clamp-4">
                                    "{testimonial.message}"
                                </p>

                                <div className="mt-4 pt-4 border-t border-white/20">
                                    <p className="text-sm text-blue-200">
                                        {testimonial.createdAt
                                            ? new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })
                                            : 'Recently'}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        // No testimonials message
                        <div className="col-span-2 text-center py-12">
                            <Quote className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold mb-2">No Testimonials Yet</h3>
                            <p className="text-blue-200">
                                Be the first to share your experience with Jaipur-Thailand Tours!
                            </p>
                        </div>
                    )}
                </div>

                <div className="text-center mt-12">
                    {loading ? (
                        <StatsSkeleton />
                    ) : (
                        <div className="flex flex-wrap items-center justify-center gap-8 text-blue-200">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">
                                    {stats.totalTestimonials}+
                                </div>
                                <div>Happy Customers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">50+</div>
                                <div>Destinations</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">10+</div>
                                <div>Years Experience</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">
                                    {stats.averageRating}
                                </div>
                                <div>Average Rating</div>
                            </div>
                        </div>
                    )}
                </div>

                {!loading && feedback.length > 2 && (
                    <div className="text-center mt-8">
                        <p className="text-blue-200">
                            And many more happy travelers... ✈️
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonials;