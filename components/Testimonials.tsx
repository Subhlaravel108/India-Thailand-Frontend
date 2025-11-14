'use client'
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ravi Sharma",
    location: "Jaipur, India",
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "Our trip from Jaipur to Thailand was perfectly organized by Jaipur-Thailand. Everything from hotels to sightseeing was smooth and well-planned. Bangkok and Phuket experiences were truly unforgettable!"
  },
  {
    id: 2,
    name: "Priya Verma",
    location: "Mumbai, India",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "We booked a Bali package from Jaipur with Jaipur-Thailand, and it was a dream vacation! The private villa, spa sessions, and local culture — everything was top-notch. Highly professional and friendly team!"
  },
  {
    id: 3,
    name: "Aman Singh",
    location: "Delhi, India",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "We booked our honeymoon package from Jaipur to Thailand, and Jaipur-Thailand made it special in every way. Phuket beaches and Bangkok nightlife were absolutely amazing!"
  },
  {
    id: 4,
    name: "Neha Patel",
    location: "Ahmedabad, India",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "Booked a Bali tour from Jaipur for my parents, and they loved every moment. From comfortable flights to luxury stays — Jaipur-Thailand made their journey memorable and stress-free!"
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
