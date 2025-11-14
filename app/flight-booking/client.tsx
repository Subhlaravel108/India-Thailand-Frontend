"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Plane, MapPin, Clock, ShieldCheck, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { toast } from "sonner";
import api from "@/lib/api";

// 👇 Step 1: Define form data & error types
interface FormData {
  name: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  travellers: string;
  class: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  travellers?: string;
  class?: string;
  message?: string;
}

const FlightBookingClient: React.FC = () => {
  // 👇 Step 2: Use typed state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    travellers: "",
    class: "",
    message: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

  // 👇 Step 3: Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // 👇 Step 4: Validation function
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";
    
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    
    if (!formData.from.trim()) newErrors.from = "Departure city is required";
    if (!formData.to.trim()) newErrors.to = "Destination is required";
    if (!formData.departureDate.trim()) newErrors.departureDate = "Departure date is required";
    
    if (!formData.travellers.trim()) newErrors.travellers = "Number of travellers is required";
    else if (isNaN(Number(formData.travellers)) || Number(formData.travellers) < 1)
      newErrors.travellers = "At least 1 traveller is required";

    return newErrors;
  };

  // 👇 Step 5: Handle form submit
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
        serviceType: "flight",
        travellers: parseInt(formData.travellers)
      };

      const res = await api.post('/service', payload);
      
      if (res.data.success) {
        // console.log("✅ Form Submitted:", formData);
        toast.success("Your flight booking request has been sent successfully!");
        setSuccess("✅ Your flight booking request has been sent successfully!");

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          from: "",
          to: "",
          departureDate: "",
          returnDate: "",
          travellers: "",
          class: "",
          message: ""
        });
      } else {
        toast.error("Failed to submit booking. Please try again.");
        setSuccess("❌ Failed to submit booking. Please try again.")
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Failed to submit booking. Please try again.");
      setSuccess(error.response?.data?.message || "⚠️ Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for date input min attribute
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <>
      <Header />
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ✈️ Flight Booking Services
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            Book domestic and international flights at the best prices. Enjoy a
            seamless booking experience with instant confirmation and 24×7
            support.
          </p>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <Plane className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Fast Booking
              </h3>
              <p className="text-gray-600">
                Book your flights within minutes using our easy interface.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <MapPin className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Global Destinations
              </h3>
              <p className="text-gray-600">
                Choose from 100+ destinations worldwide with trusted airlines.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <Clock className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Instant Confirmation
              </h3>
              <p className="text-gray-600">
                Get your e-tickets instantly after booking — no waiting time!
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <ShieldCheck className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Safe & Secure
              </h3>
              <p className="text-gray-600">
                Your data and payments are encrypted with top-level security.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              🧾 Flight Booking Form
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
                    errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
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
                    errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
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
                    errors.phone ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                  }`}
                  placeholder="10-digit phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Travellers */}
              <div>
                <label className="block text-gray-700 mb-1">Number of Travellers *</label>
                <input
                  type="number"
                  name="travellers"
                  value={formData.travellers}
                  onChange={handleChange}
                  min="1"
                  max="20"
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.travellers ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                  }`}
                  placeholder="Number of passengers"
                />
                {errors.travellers && (
                  <p className="text-red-500 text-sm mt-1">{errors.travellers}</p>
                )}
              </div>

              {/* From */}
              <div>
                <label className="block text-gray-700 mb-1">Departure City *</label>
                <input
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.from ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                  }`}
                  placeholder="e.g., Delhi"
                />
                {errors.from && (
                  <p className="text-red-500 text-sm mt-1">{errors.from}</p>
                )}
              </div>

              {/* To */}
              <div>
                <label className="block text-gray-700 mb-1">Destination *</label>
                <input
                  type="text"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.to ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                  }`}
                  placeholder="e.g., Bangkok"
                />
                {errors.to && (
                  <p className="text-red-500 text-sm mt-1">{errors.to}</p>
                )}
              </div>

              {/* Departure Date */}
              <div>
                <label className="block text-gray-700 mb-1">Departure Date *</label>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  min={getTodayDate()}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.departureDate ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                  }`}
                />
                {errors.departureDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.departureDate}</p>
                )}
              </div>

              {/* Return Date */}
              <div>
                <label className="block text-gray-700 mb-1">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  min={formData.departureDate || getTodayDate()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Flight Class */}
              <div>
                <label className="block text-gray-700 mb-1">Flight Class</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select Class</option>
                  <option value="economy">Economy</option>
                  <option value="premium_economy">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>

              {/* Additional Notes - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any specific requirements, preferences, or details about your flight booking..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Submit Button - Full Width */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </span>
                  ) : (
                    "Submit Booking Request"
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

export default FlightBookingClient;