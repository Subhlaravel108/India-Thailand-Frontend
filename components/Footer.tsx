"use client"
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contactInfo} from "@/lib/global_variables";
import { useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    
    try {
      const res = await api.post("/newsletter/subscribe", { email });
      
      if (res.data.success) {
        toast.success("Thank you for subscribing to our newsletter!");
        setEmail(""); // Clear the input after successful submission
      } else {
        toast.error(res.data.message || "Failed to subscribe. Please try again.");
      }
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      
      // Handle different types of errors
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Failed to subscribe. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              {contactInfo.websiteName}<span className="text-orange-500"></span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted travel partner for over 10 years. We create unforgettable experiences and memories that last a lifetime.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                <Youtube className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</a></li>
              <li><a href="/packages" className="text-gray-400 hover:text-white transition-colors">Travel Packages</a></li>
              {/* <li><a href="/tour" className="text-gray-400 hover:text-white transition-colors">Tours</a></li> */}
              <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="/flight-booking" className="text-gray-400 hover:text-white transition-colors">Flight Booking</a></li>
              <li><a href="/hotel-reservations" className="text-gray-400 hover:text-white transition-colors">Hotel Reservations</a></li>
              <li><a href="/car-rentals" className="text-gray-400 hover:text-white transition-colors">Car Rentals</a></li>
              <li><a href="/travel-insurance" className="text-gray-400 hover:text-white transition-colors">Travel Insurance</a></li>
              <li><a href="/visa-assistance" className="text-gray-400 hover:text-white transition-colors">Visa Assistance</a></li>
              <li><a href="/custom-tours" className="text-gray-400 hover:text-white transition-colors">Custom Tours</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get In Touch</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">{contactInfo.location}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">{contactInfo.phones[0]}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">{contactInfo.emails[0]}</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers and travel tips</p>
              <form onSubmit={handleSubmit} className="flex">
                <Input 
                  type="email"
                  placeholder="Your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-r-none flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
                  disabled={loading}
                />
                <Button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 rounded-l-none"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; 2025 Jaipur-Thailand. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="/Cookie-Policy" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;