"use client";

import React, { useState } from "react";
import { Car, Clock, MapPin, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { toast } from "sonner";
import api from "@/lib/api";

const CarRentalsClient = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    pickupDate: "",
    returnDate: "",
    carType: "",
    driversRequired: false,
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ handle change (clear error on typing)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    });
    setErrors({ ...errors, [name]: "" });
  };

  // ✅ basic validation  
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    if (!formData.pickupLocation.trim())
      newErrors.pickupLocation = "Pickup location is required.";
    if (!formData.pickupDate.trim())
      newErrors.pickupDate = "Pickup date is required.";

    return newErrors;
  };

  // ✅ handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        serviceType: "car"
      };

      const res = await api.post('/service', payload);
      
      if (res.data.success) {
        setSuccess("✅ Car rental booking request submitted successfully!");
        toast.success("Car rental booking request submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          pickupLocation: "",
          pickupDate: "",
          returnDate: "",
          carType: "",
          driversRequired: false,
          message: "",
        });
      } else {
        setSuccess("❌ Failed to submit booking request. Try again.");
        toast.error("Failed to submit booking request. Try again.");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setSuccess(error.response?.data?.message || "⚠️ Server error occurred. Please try later.");
      toast.error(error.response?.data?.message || "⚠️ Server error occurred. Please try later.");
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

      <section className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🚗 Car Rental Services
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            Explore Jaipur and Thailand in comfort and style. Choose from our
            wide range of cars — from economy to luxury — with flexible rental
            plans and professional drivers.
          </p>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <Car className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Wide Range of Cars
              </h3>
              <p className="text-gray-600">
                Choose from sedans, SUVs, luxury cars, and tempo travelers for
                every travel need.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <Clock className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Flexible Rentals
              </h3>
              <p className="text-gray-600">
                Rent for a few hours, a full day, or long-term — we offer
                flexible rental durations to match your trip.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <MapPin className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Doorstep Pickup
              </h3>
              <p className="text-gray-600">
                Enjoy pickup and drop services from your hotel, airport, or any
                preferred location.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <ShieldCheck className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Safe & Reliable
              </h3>
              <p className="text-gray-600">
                All vehicles are sanitized, GPS-enabled, and driven by
                professional, licensed chauffeurs.
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white shadow-lg rounded-2xl p-8 text-left">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              🚘 Book Your Car Rental
            </h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                  placeholder="10-digit phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Pickup Location */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Pickup Location *
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.pickupLocation ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                  placeholder="Where should we pick you up?"
                />
                {errors.pickupLocation && (
                  <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>
                )}
              </div>

              {/* Pickup Date */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Pickup Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  min={getTodayDate() + "T00:00"}
                  className={`w-full border ${
                    errors.pickupDate ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                />
                {errors.pickupDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>
                )}
              </div>

              {/* Return Date */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Return Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  min={formData.pickupDate || getTodayDate() + "T00:00"}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Car Type */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Car Type
                </label>
                <select
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Select Car Type</option>
                  <option value="Economy">Economy (Maruti Swift, Hyundai i10)</option>
                  <option value="Sedan">Sedan (Honda City, Toyota Corolla)</option>
                  <option value="SUV">SUV (Toyota Fortuner, Hyundai Creta)</option>
                  <option value="Luxury">Luxury (Mercedes, BMW, Audi)</option>
                  <option value="Tempo Traveler">Tempo Traveler (12-15 seater)</option>
                </select>
              </div>

              {/* Drivers Required */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="driversRequired"
                  checked={formData.driversRequired}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <label className="ml-2 block font-medium text-gray-700">
                  I need a professional driver
                </label>
              </div>

              {/* Message - Full Width */}
              <div className="md:col-span-2">
                <label className="block font-medium mb-1 text-gray-700">
                  Additional Requirements
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Any special requirements, luggage details, child seats, or additional notes..."
                />
              </div>

              {/* Submit Button - Full Width */}
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition disabled:bg-orange-400 disabled:cursor-not-allowed"
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
                <p className="text-sm text-gray-500 mt-2">
                  * Required fields
                </p>
              </div>
            </form>

            {success && (
              <p className={`text-center mt-6 font-medium ${
                success.includes("✅") ? "text-green-600" : 
                success.includes("❌") ? "text-red-600" : "text-yellow-600"
              }`}>
                {success}
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CarRentalsClient;