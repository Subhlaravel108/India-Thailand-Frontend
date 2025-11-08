"use client"
import { Search, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Discover Your Next
            <span className="block text-orange-500">Adventure</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
            Explore breathtaking destinations around the world with our expertly crafted travel experiences
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto mb-8 animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input 
                  placeholder="Where to?" 
                  className="pl-10 h-12 border-0 text-gray-700 placeholder-gray-500"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input 
                  type="date" 
                  className="pl-10 h-12 border-0 text-gray-700"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select className="w-full h-12 pl-10 pr-4 rounded-md border-0 text-gray-700 bg-transparent">
                  <option>2 Guests</option>
                  <option>1 Guest</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>
              <Button className="h-12 bg-blue-900 hover:bg-blue-800 text-white rounded-md">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-full">
              Explore Destinations
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg rounded-full">
              Watch Video
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
