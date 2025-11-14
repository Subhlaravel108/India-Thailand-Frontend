"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { toast } from "sonner";
import api from "@/lib/api";

export default function TravelInsuranceClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelStart: "",
    travelEnd: "",
    coverage: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Clear error on input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ✅ Validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    if (!formData.travelStart.trim())
      newErrors.travelStart = "Travel start date is required.";
    if (!formData.travelEnd.trim())
      newErrors.travelEnd = "Travel end date is required.";

    return newErrors;
  };

  // ✅ Handle form submit
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
        serviceType: "insurance"
      };

      const res = await api.post('/service', payload);
      
      if (res.data.success) {
        setSuccess("✅ Travel insurance request submitted successfully!");
        toast.success("Travel insurance request submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          travelStart: "",
          travelEnd: "",
          coverage: "",
          message: "",
        });
      } else {
        setSuccess("❌ Failed to submit request. Please try again.");
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setSuccess(error.response?.data?.message || "⚠️ Server error occurred. Please try again.");
      toast.error(error.response?.data?.message || "⚠️ Server error occurred. Please try again.");
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
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white text-gray-800">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-6 text-blue-700">
            🛡️ Travel Insurance
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Secure your journey with our comprehensive travel insurance. We ensure peace of mind during your trip by covering medical emergencies, trip cancellations, and lost luggage.
          </p>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 text-left mb-16">
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Medical Protection</h3>
              <p>
                Full medical coverage in case of emergencies during your trip.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg">
              <h3 className="font-semibold text-xl mb-3">
                Trip Cancellation Cover
              </h3>
              <p>
                Get your money back for unexpected cancellations or delays.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Lost Luggage Help</h3>
              <p>
                Compensation for lost or delayed baggage during your travel.
              </p>
            </div>
          </div>

          {/* Insurance Form */}
          <div className="bg-white shadow-lg rounded-2xl p-8 text-left">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              🧾 Request Travel Insurance
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
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="10-digit phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Coverage Type */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Coverage Type
                </label>
                <select
                  name="coverage"
                  value={formData.coverage}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Coverage Type</option>
                  <option value="Basic">Basic (Medical + Trip Cancellation)</option>
                  <option value="Comprehensive">Comprehensive (Full Coverage)</option>
                  <option value="Family">Family Plan</option>
                  <option value="Senior">Senior Citizen Plan</option>
                  <option value="Adventure">Adventure Sports Coverage</option>
                </select>
              </div>

              {/* Travel Start Date */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Travel Start Date *
                </label>
                <input
                  type="date"
                  name="travelStart"
                  value={formData.travelStart}
                  onChange={handleChange}
                  min={getTodayDate()}
                  className={`w-full border ${
                    errors.travelStart ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                />
                {errors.travelStart && (
                  <p className="text-red-500 text-sm mt-1">{errors.travelStart}</p>
                )}
              </div>

              {/* Travel End Date */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Travel End Date *
                </label>
                <input
                  type="date"
                  name="travelEnd"
                  value={formData.travelEnd}
                  onChange={handleChange}
                  min={formData.travelStart || getTodayDate()}
                  className={`w-full border ${
                    errors.travelEnd ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                />
                {errors.travelEnd && (
                  <p className="text-red-500 text-sm mt-1">{errors.travelEnd}</p>
                )}
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
                  placeholder="Any pre-existing medical conditions, specific requirements, or additional information..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Submit Button - Full Width */}
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </span>
                  ) : (
                    "Submit Insurance Request"
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
}