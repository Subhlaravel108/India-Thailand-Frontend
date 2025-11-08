"use client"
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              Travel<span className="text-orange-500">Co</span>
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
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</a></li>
              <li><a href="#packages" className="text-gray-400 hover:text-white transition-colors">Travel Packages</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tours</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Flight Booking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hotel Reservations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Car Rentals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Travel Insurance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Visa Assistance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Custom Tours</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get In Touch</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">123 Travel Street, New York, NY 10001</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">info@travelco.com</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers and travel tips</p>
              <div className="flex">
                <Input 
                  placeholder="Your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-r-none"
                />
                <Button className="bg-orange-500 hover:bg-orange-600 rounded-l-none">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; 2024 TravelCo. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
