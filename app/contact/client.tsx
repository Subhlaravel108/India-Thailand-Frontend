"use client"
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { contactInfo} from "@/lib/global_variables";
import api from "@/lib/api";

const ContactClient = () => {
  const contactInformation = [
    {
      icon: Phone,
      title: "Phone",
      details: [contactInfo.phones[0],contactInfo.phones[1]],
      description: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: Mail,
      title: "Email",
      details: [contactInfo.emails[0], contactInfo.emails[1]],
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Office",
      details: [contactInfo.location],
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

  const [contact,setContact]=useState({
    name:'',
    lastname:'',
    email:"",
    phone:'',
    travelInterest:'',
    message:''
  })

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
    setErrors({ ...errors, [name]: "" }); // typing karte hi error hata do
  };

   const validateForm = () => {
    const newErrors: any = {};
    if (!contact.name.trim()) newErrors.name = "First name is required";
    if (!contact.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!contact.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email))
      newErrors.email = "Enter a valid email address";

    if (!contact.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^(\+91|91)?[6-9]\d{9}$/.test(contact.phone))
      newErrors.phone = "Enter a valid Indian phone number";

    if (!contact.travelInterest.trim())
      newErrors.travelInterest = "Please select a travel interest";
    if (!contact.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    if (!validateForm()) return;

    try {
      setLoading(true);
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      //   },
      //   body: JSON.stringify(contact),
      // });

      const res=await api.post('/contact',contact)
      // const data = await res.json();
      if (res.data.success) {
        setSuccessMsg("✅ Thank you for contacting us! Please check your email.");
        setContact({
          name: "",
          lastname: "",
          email: "",
          phone: "",
          travelInterest: "",
          message: "",
        });
      } else {
        setSuccessMsg("❌ " + (res.data.message || "Something went wrong."));
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setSuccessMsg("❌ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

 

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
             {successMsg && (
                <p
                  className={`text-center mb-4 font-medium ${
                    successMsg.startsWith("✅") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {successMsg}
                </p>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input
                      placeholder="John"
                      name="name"
                      value={contact.name}
                      onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input
                      placeholder="Doe"
                      name="lastname"
                      value={contact.lastname}
                      onChange={handleChange}
                    />
                    {errors.lastname && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={contact.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+91 9876543210"
                    value={contact.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Interest
                  </label>
                  <select
                    name="travelInterest"
                    value={contact.travelInterest}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select your interest</option>
                    <option>Vacation Packages</option>
                    <option>Business Travel</option>
                    <option>Group Tours</option>
                    <option>Custom Itinerary</option>
                    <option>Destination Wedding</option>
                  </select>
                  {errors.travelInterest && (
                    <p className="text-red-500 text-sm mt-1">{errors.travelInterest}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={contact.message}
                    onChange={handleChange}
                    placeholder="Tell us about your dream destination..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
                >
                  {loading ? "Sending..." : <><Send className="w-5 h-5 mr-2" /> Send Message</>}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Get in Touch</h2>
              <div className="space-y-6">
                {contactInformation.map((info, index) => (
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
