'use client'
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "Our trip to Santorini was absolutely magical! The team at TravelCo organized everything perfectly. The sunset views were breathtaking and the accommodations exceeded our expectations. Highly recommend!"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Toronto, Canada",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "The Japan cultural tour was incredible. Our guide was knowledgeable and friendly, showing us hidden gems we never would have found on our own. Every detail was perfectly planned. Can't wait to book another trip!"
  },
  {
    id: 3,
    name: "Emma Wilson",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "Bali was a dream come true! The luxury package was worth every penny. From the private villa to the spa treatments, everything was first-class. TravelCo made our honeymoon unforgettable."
  },
  {
    id: 4,
    name: "David Rodriguez",
    location: "Madrid, Spain",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "The Patagonia adventure was challenging but absolutely rewarding. The landscapes were stunning and our guide's expertise made all the difference. Professional service from start to finish!"
  }
];

const Testimonials = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-blue-200">{testimonial.location}</p>
                </div>
                <Quote className="w-8 h-8 text-orange-500 ml-auto flex-shrink-0" />
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-blue-100 leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-8 text-blue-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
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
              <div className="text-3xl font-bold text-white">4.9</div>
              <div>Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
