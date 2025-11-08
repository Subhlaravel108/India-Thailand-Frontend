"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const ContactClient = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      description: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@travelco.com", "support@travelco.com"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Travel Street", "New York, NY 10001"],
      description: "Visit us for consultation"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM"],
      description: "EST timezone"
    }
  ];

  const offices = [
    {
      city: "New York",
      address: "123 Travel Street, NY 10001",
      phone: "+1 (555) 123-4567",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      city: "Los Angeles",
      address: "456 Sunset Blvd, CA 90028",
      phone: "+1 (555) 987-6543",
      image: "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      city: "London",
      address: "789 Oxford Street, W1D 2HH",
      phone: "+44 20 1234 5678",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Ready to plan your next adventure? Get in touch with our travel experts
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input placeholder="John" className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Doe" className="w-full" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input type="email" placeholder="john@example.com" className="w-full" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <Input type="tel" placeholder="+1 (555) 123-4567" className="w-full" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Interest
                  </label>
                  <select className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Select your interest</option>
                    <option>Vacation Packages</option>
                    <option>Business Travel</option>
                    <option>Group Tours</option>
                    <option>Custom Itinerary</option>
                    <option>Destination Wedding</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea 
                    rows={5}
                    placeholder="Tell us about your dream destination..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">{detail}</p>
                      ))}
                      <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="mt-12 p-6 bg-blue-50 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Questions?</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-800">How far in advance should I book?</p>
                    <p className="text-gray-600">We recommend booking 2-3 months in advance for best availability.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Do you offer travel insurance?</p>
                    <p className="text-gray-600">Yes, we provide comprehensive travel insurance options.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Can you handle group bookings?</p>
                    <p className="text-gray-600">Absolutely! We specialize in group travel arrangements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Offices
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Visit us at any of our convenient locations around the world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={office.image} 
                  alt={office.city}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{office.city}</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{office.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="text-sm">{office.phone}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                    Get Directions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactClient;
