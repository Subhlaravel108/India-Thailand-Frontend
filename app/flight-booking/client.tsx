"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Plane, MapPin, Clock, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 👇 Step 1: Define form data & error types
interface FormData {
  name: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  date: string;
  message:string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  from?: string;
  to?: string;
  date?: string;
  message?:string;
}

const FlightBookingClient: React.FC = () => {
  // 👇 Step 2: Use typed state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    date: "",
    message:""
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // 👇 Step 3: Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!formData.from.trim()) newErrors.from = "From location is required";
    if (!formData.to.trim()) newErrors.to = "Destination is required";
    if (!formData.date.trim()) newErrors.date = "Date is required";
    // if (!formData.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  // 👇 Step 5: Handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("✅ Form Submitted:", formData);
    alert("Your flight booking request has been sent successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      from: "",
      to: "",
      date: "",
      message:""
    });
  };

  // 👇 Step 6: UI
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

            <form onSubmit={handleSubmit} className="text-left grid grid-cols-2 gap-4">
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

              {/* From */}
              <div>
                <label className="block text-gray-700 mb-1">From</label>
                <input
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.from ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.from && (
                  <p className="text-red-500 text-sm mt-1">{errors.from}</p>
                )}
              </div>

              {/* To */}
              <div>
                <label className="block text-gray-700 mb-1">To</label>
                <input
                  type="text"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.to ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.to && (
                  <p className="text-red-500 text-sm mt-1">{errors.to}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-gray-700 mb-1">Travel Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

                  <div className="col-span-2">
                <label className="block font-medium mb-1 text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any specific requirements or details..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Submit */}
              <div className="col-span-2">
                <button
                type="submit"
                className=" w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Submit Booking Request
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

export default FlightBookingClient;
