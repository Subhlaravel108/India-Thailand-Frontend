"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Bed, MapPin, ShieldCheck, Stars } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface FormData {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  roomType: string;
  message:string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  roomType?: string;
  message?:string;
}

const HotelReservationsClient: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    roomType: "",
    message:""
  });

  const [errors, setErrors] = useState<FormErrors>({});

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
    if (!formData.guests.trim()) newErrors.guests = "Number of guests is required.";
    if (!formData.roomType.trim()) newErrors.roomType = "Select a room type.";

    return newErrors;
  };

  // Handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("✅ Hotel Reservation Data:", formData);
    alert("Your hotel reservation request has been submitted successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: "",
      roomType: "",
      message:""
    });
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
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              🧾 Hotel Booking Form
            </h2>

            <form onSubmit={handleSubmit} className=" text-left grid grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Check-in */}
              <div>
                <label className="block text-gray-700 mb-1">Check-In Date</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.checkIn ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.checkIn && (
                  <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>
                )}
              </div>

              {/* Check-out */}
              <div>
                <label className="block text-gray-700 mb-1">Check-Out Date</label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.checkOut ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.checkOut && (
                  <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>
                )}
              </div>

              {/* Guests */}
              <div>
                <label className="block text-gray-700 mb-1">Number of Guests</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.guests ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.guests && (
                  <p className="text-red-500 text-sm mt-1">{errors.guests}</p>
                )}
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-gray-700 mb-1">Room Type</label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.roomType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a room type</option>
                  <option value="Standard">Standard Room</option>
                  <option value="Deluxe">Deluxe Room</option>
                  <option value="Suite">Suite</option>
                </select>
                {errors.roomType && (
                  <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>
                )}
              </div>

                 <div className="mb-5 grid col-span-2">
                <label className="block font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              {/* Submit */}
              <div className="col-span-2">
                <button
                type="submit"
                className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-xl hover:bg-yellow-600 transition"
              >
                Submit Reservation
              </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HotelReservationsClient;
