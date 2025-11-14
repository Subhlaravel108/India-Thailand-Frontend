"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Bed, MapPin, ShieldCheck, Stars } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { toast } from "sonner";
import api from "@/lib/api";
interface FormData {
  name: string;
  email: string;
  phone: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  rooms: string;
  travellers: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  hotelName?: string;
  checkIn?: string;
  checkOut?: string;
  rooms?: string;
  travellers?: string;
  message?: string;
}

const HotelReservationsClient: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    hotelName: "",
    checkIn: "",
    checkOut: "",
    rooms: "",
    travellers: "",
    message: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success,setSuccess]=useState("")
  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    if (!formData.checkIn.trim()) newErrors.checkIn = "Check-in date is required.";
    if (!formData.checkOut.trim()) newErrors.checkOut = "Check-out date is required.";
    if (!formData.rooms.trim()) newErrors.rooms = "Number of rooms is required.";
    else if (isNaN(Number(formData.rooms)) || Number(formData.rooms) < 1)
      newErrors.rooms = "At least 1 room is required.";
    if (!formData.travellers.trim()) newErrors.travellers = "Number of travellers is required.";
    else if (isNaN(Number(formData.travellers)) || Number(formData.travellers) < 1)
      newErrors.travellers = "At least 1 traveller is required.";

    return newErrors;
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      const payload = {
        ...formData,
        serviceType: "hotel",
        rooms: parseInt(formData.rooms),
        travellers: parseInt(formData.travellers)
      };

      const res = await api.post('/service', payload);
      
      if (res.data.success) {
        // console.log("✅ Hotel Reservation Data:", formData);
        toast.success("Your hotel reservation request has been submitted successfully!");
        setSuccess("✅ Your hotel reservation request has been submitted successfully!");

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          hotelName: "",
          checkIn: "",
          checkOut: "",
          rooms: "",
          travellers: "",
          message: ""
        });
      } else {
        toast.error("Failed to submit reservation. Please try again.");
        setSuccess("❌ Failed to submit reservation. Please try again.");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Failed to submit reservation. Please try again.");
      setSuccess(error.response?.data?.message || "❌ Failed to submit reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get today's date for date input min attribute
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <>
      <Header />
      <section className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🏨 Hotel Reservation Services
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            Book luxury and budget hotels across the world with ease. Enjoy
            secure bookings, exclusive discounts, and the best hospitality
            experiences wherever you go.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <Bed className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Comfortable Stays
              </h3>
              <p className="text-gray-600">
                Choose from 500+ hotels, resorts, and villas suited to your
                style and budget.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <MapPin className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Prime Locations
              </h3>
              <p className="text-gray-600">
                Stay at the best-rated hotels near major attractions and business
                hubs.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <Stars className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Verified Reviews
              </h3>
              <p className="text-gray-600">
                Every hotel is verified and reviewed by thousands of travelers
                like you.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <ShieldCheck className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Safe & Secure Booking
              </h3>
              <p className="text-gray-600">
                Enjoy encrypted payments and instant confirmation on every
                reservation.
              </p>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              🧾 Hotel Booking Form
            </h2>

            <form onSubmit={handleSubmit} className="text-left grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-yellow-200"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-yellow-200"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 mb-1">Phone *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.phone ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-yellow-200"
                  }`}
                  placeholder="10-digit phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Hotel Name */}
              <div>
                <label className="block text-gray-700 mb-1">Hotel Name (Optional)</label>
                <input
                  type="text"
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-yellow-200"
                  placeholder="Specific hotel preference"
                />
              </div>

              {/* Check-in Date */}
              <div>
                <label className="block text-gray-700 mb-1">Check-In Date *</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={getTodayDate()}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.checkIn ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-yellow-200"
                  }`}
                />
                {errors.checkIn && (
                  <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>
                )}
              </div>

              {/* Check-out Date */}
              <div>
                <label className="block text-gray-700 mb-1">Check-Out Date *</label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={formData.checkIn || getTodayDate()}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.checkOut ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-yellow-200"
                  }`}
                />
                {errors.checkOut && (
                  <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>
                )}
              </div>

              {/* Number of Rooms */}
              <div>
                <label className="block text-gray-700 mb-1">Number of Rooms *</label>
                <input
                  type="number"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.rooms ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-yellow-200"
                  }`}
                  placeholder="Number of rooms needed"
                />
                {errors.rooms && (
                  <p className="text-red-500 text-sm mt-1">{errors.rooms}</p>
                )}
              </div>

              {/* Number of Travellers */}
              <div>
                <label className="block text-gray-700 mb-1">Number of Travellers *</label>
                <input
                  type="number"
                  name="travellers"
                  value={formData.travellers}
                  onChange={handleChange}
                  min="1"
                  max="50"
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.travellers ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-yellow-200"
                  }`}
                  placeholder="Total number of guests"
                />
                {errors.travellers && (
                  <p className="text-red-500 text-sm mt-1">{errors.travellers}</p>
                )}
              </div>

              {/* Message - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">
                  Additional Requirements
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-yellow-200"
                  placeholder="Any specific requirements, room preferences, special requests, or additional information..."
                />
              </div>

              {/* Submit Button - Full Width */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-xl hover:bg-yellow-600 transition disabled:bg-yellow-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </span>
                  ) : (
                    "Submit Reservation Request"
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  * Required fields
                </p>
              </div>
            </form>
             {success && (
            <div className="mt-6 text-center">
              <p className={`font-medium ${
                success.includes("✅") ? "text-green-600" : 
                success.includes("❌") ? "text-red-600" : "text-yellow-600"
              }`}>
                {success}
              </p>
            </div>
          )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HotelReservationsClient;