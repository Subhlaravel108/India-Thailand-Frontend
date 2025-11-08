
"use client";

import { useState } from "react";
import { Menu, X, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-sm relative z-50">
      {/* Top contact bar */}
      <div className="bg-blue-900 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@travelco.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>New York, USA</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-900">
            Travel<span className="text-orange-500">Co</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition-colors font-medium ${
                isActive('/') ? 'text-blue-900' : 'text-gray-700 hover:text-blue-900'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/destinations" 
              className={`transition-colors font-medium ${
                isActive('/destinations') ? 'text-blue-900' : 'text-gray-700 hover:text-blue-900'
              }`}
            >
              Destinations
            </Link>
            <Link 
              href="/packages" 
              className={`transition-colors font-medium ${
                isActive('/packages') ? 'text-blue-900' : 'text-gray-700 hover:text-blue-900'
              }`}
            >
              Packages
            </Link>
            <Link 
              href="/about" 
              className={`transition-colors font-medium ${
                isActive('/about') ? 'text-blue-900' : 'text-gray-700 hover:text-blue-900'
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`transition-colors font-medium ${
                isActive('/contact') ? 'text-blue-900' : 'text-gray-700 hover:text-blue-900'
              }`}
            >
              Contact
            </Link>
            <Link href="/book-now">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                href="/" 
                className={`transition-colors font-medium ${
                  isActive('/') ? 'text-blue-900' : 'text-gray-700 hover:text-blue-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/destinations" 
                className={`transition-colors font-medium ${
                  isActive('/destinations') ? 'text-blue-900' : 'text-gray-700 hover:text-blue-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link 
                href="/packages" 
                className={`transition-colors font-medium ${
                  isActive('/packages') ? 'text-blue-900' : 'text-gray-700 hover:text-blue-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Packages
              </Link>
              <Link 
                href="/about" 
                className={`transition-colors font-medium ${
                  isActive('/about') ? 'text-blue-900' : 'text-gray-700 hover:text-blue-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`transition-colors font-medium ${
                  isActive('/contact') ? 'text-blue-900' : 'text-gray-700 hover:text-blue-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link href="/book-now" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full w-fit">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
