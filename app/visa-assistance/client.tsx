"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { toast } from "sonner";
import api from "@/lib/api";

export default function VisaAssistanceClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    passportNumber: "",
    travelDate: "",
    message: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors: any = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email address";
    
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    
    if (!form.nationality.trim()) newErrors.nationality = "Nationality is required";
    if (!form.passportNumber.trim()) newErrors.passportNumber = "Passport number is required";
    if (!form.travelDate.trim()) newErrors.travelDate = "Travel date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        ...form,
        serviceType: "visa"
      };

      const res = await api.post('/service', payload);
      
      if (res.data.success) {
        setSuccess("✅ Visa assistance request submitted successfully!");
        toast.success("Visa assistance request submitted successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          nationality: "",
          passportNumber: "",
          travelDate: "",
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

      <section className="py-16 bg-gradient-to-b from-pink-50 to-white text-gray-800">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-6 text-pink-700">
            🛂 Visa Assistance
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Get expert visa assistance for your international travels. Our team provides end-to-end support — from documentation to appointment scheduling and final approval.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 text-left mb-16">
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Document Check</h3>
              <p>We verify and prepare all necessary documents for a smooth visa process.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Quick Processing</h3>
              <p>Our team ensures faster and stress-free visa approvals every time.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Personal Guidance</h3>
              <p>Get one-on-one guidance for interviews and document submission.</p>
            </div>
          </div>

          {/* FORM */}
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 text-left">
            <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
              Visa Assistance Inquiry Form
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-medium mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="10-digit phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Nationality */}
              <div>
                <label className="block font-medium mb-1">Nationality *</label>
                <select
                  name="nationality"
                  value={form.nationality}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                    errors.nationality ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Nationality</option>
                  <option value="Indian">Indian</option>
                  <option value="American">American</option>
                  <option value="British">British</option>
                  <option value="Canadian">Canadian</option>
                  <option value="Australian">Australian</option>
                  <option value="German">German</option>
                  <option value="French">French</option>
                  <option value="Other">Other</option>
                </select>
                {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
              </div>

              {/* Passport Number */}
              <div>
                <label className="block font-medium mb-1">Passport Number *</label>
                <input
                  type="text"
                  name="passportNumber"
                  value={form.passportNumber}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                    errors.passportNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter passport number"
                />
                {errors.passportNumber && <p className="text-red-500 text-sm mt-1">{errors.passportNumber}</p>}
              </div>

              {/* Travel Date */}
              <div>
                <label className="block font-medium mb-1">Travel Date *</label>
                <input
                  type="date"
                  name="travelDate"
                  value={form.travelDate}
                  onChange={handleChange}
                  min={getTodayDate()}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                    errors.travelDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.travelDate && <p className="text-red-500 text-sm mt-1">{errors.travelDate}</p>}
              </div>

              {/* Message - Full Width */}
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Additional Information</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Any specific visa requirements, previous visa history, or additional information..."
                />
              </div>

              {/* Submit Button - Full Width */}
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition disabled:bg-pink-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </span>
                  ) : (
                    "Submit Visa Assistance Request"
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