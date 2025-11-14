"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contactInfo } from "@/lib/global_variables";
import axios from "axios";
import { toast } from "sonner";
import api from "@/lib/api";

export default function CustomToursClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    days: "",
    travellers: "",
    message: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const validate = () => {
    let newErrors: any = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter valid email";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!form.days.trim()) newErrors.days = "Total days required";
    else if (isNaN(Number(form.days)) || Number(form.days) < 1)
      newErrors.days = "Days must be at least 1";
    if (!form.travellers.trim()) newErrors.travellers = "Travellers required";
    else if (isNaN(Number(form.travellers)) || Number(form.travellers) < 1)
      newErrors.travellers = "Travellers must be at least 1";
    if (!form.message.trim())
      newErrors.message = "Please describe your custom trip";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        ...form,
        serviceType: "custom",
        days: parseInt(form.days),
        travellers: parseInt(form.travellers)
      };

      const res = await api.post('/service', payload);
      
      if (res.data.success) {
        setSuccess("✅ Custom tour request submitted successfully!");
        toast.success("Custom tour request submitted successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          days: "",
          travellers: "",
          message: "",
        });
      } else {
        setSuccess("❌ Failed to submit request. Please try again.");
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setSuccess(error.response?.data?.message || "⚠️ Server error occurred. Please try again.");
      toast.error(error.response?.data?.message || "Server error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      {/* Top Section */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white text-gray-800">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-6 text-yellow-700">
            🎯 Custom Tours
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Want a tailor-made travel experience? {contactInfo.websiteName} offers custom
            tours designed according to your interests, schedule, and budget.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Personal Itineraries</h3>
              <p>
                Choose where you want to go, how long to stay, and what to explore.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Private Transportation</h3>
              <p>
                Enjoy the comfort of private cabs and flexible travel timing.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Local Experiences</h3>
              <p>
                Dive into authentic Thai culture, food, and attractions like a local.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Plan Your Custom Tour
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div>
              <label className="block mb-1 font-semibold">Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-semibold">Email *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-semibold">Phone *</label>
              <input
                type="tel"
                name="phone"
                placeholder="10-digit phone number"
                value={form.phone}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Total Days */}
            <div>
              <label className="block mb-1 font-semibold">Total Days *</label>
              <input
                type="number"
                name="days"
                placeholder="How many days?"
                value={form.days}
                onChange={handleChange}
                min="1"
                max="90"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.days ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.days && (
                <p className="text-red-500 text-sm mt-1">{errors.days}</p>
              )}
            </div>

            {/* Travellers */}
            <div>
              <label className="block mb-1 font-semibold">Travellers *</label>
              <input
                type="number"
                name="travellers"
                placeholder="No. of travellers"
                value={form.travellers}
                onChange={handleChange}
                min="1"
                max="50"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.travellers ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.travellers && (
                <p className="text-red-500 text-sm mt-1">{errors.travellers}</p>
              )}
            </div>

            {/* Message (Full Width) */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold">Tour Requirements *</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Describe your custom travel plan, preferred destinations, activities, budget, special requirements..."
                value={form.message}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="md:col-span-2 text-center">
              <button 
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition disabled:bg-yellow-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </span>
                ) : (
                  "Submit Custom Tour Request"
                )}
              </button>
              <p className="text-sm text-gray-500 mt-2">
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
      </section>

      <Footer />
    </>
  );
}