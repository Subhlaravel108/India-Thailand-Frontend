"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function VisaAssistanceClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    passport: "",
    passportExpiry: "",
    dob: "",
    travelDate: "",
    returnDate: "",
    purpose: "",
    travelers: "",
    message: "",
  });

  const [errors, setErrors] = useState<any>({});

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
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";

    if (!form.passport.trim()) newErrors.passport = "Passport number is required";
    if (!form.passportExpiry.trim())
      newErrors.passportExpiry = "Passport expiry date is required";

    if (!form.dob.trim()) newErrors.dob = "Date of birth is required";

    if (!form.travelDate.trim()) newErrors.travelDate = "Travel date is required";
    if (!form.returnDate.trim()) newErrors.returnDate = "Return date is required";

    if (!form.purpose.trim()) newErrors.purpose = "Purpose of visit is required";

    if (!form.travelers.trim())
      newErrors.travelers = "Number of travelers is required";

    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Visa Assistance Form Submitted Successfully!");
    }
  };

  return (
    <>
      <Header />

      <section className="py-16 bg-gradient-to-b from-pink-50 to-white text-gray-800">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-6 text-pink-700">
            Visa Assistance
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Planning your Thailand trip from Jaipur? Our visa experts provide
            end-to-end support — from documentation to appointment scheduling
            and final approval.
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
            <h2 className="text-2xl font-bold text-pink-700 mb-6">
              Visa Assistance Inquiry Form
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

              {/* Full Name */}
              <div className="mb-5">
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="mb-5">
                <label className="block font-medium mb-1">Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              {/* Passport */}
              <div className="mb-5">
                <label className="block font-medium mb-1">Passport Number</label>
                <input
                  type="text"
                  name="passport"
                  value={form.passport}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                {errors.passport && <p className="text-red-500 text-sm">{errors.passport}</p>}
              </div>

              {/* Passport Expiry */}
              <div className="mb-5">
                <label className="block font-medium mb-1">Passport Expiry Date</label>
                <input
                  type="date"
                  name="passportExpiry"
                  value={form.passportExpiry}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                {errors.passportExpiry && (
                  <p className="text-red-500 text-sm">{errors.passportExpiry}</p>
                )}
              </div>

              {/* DOB */}
              <div className="mb-5">
                <label className="block font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
              </div>

              {/* Travel Date */}
              <div className="mb-5">
                <label className="block font-medium mb-1">Travel Date</label>
                <input
                  type="date"
                  name="travelDate"
                  value={form.travelDate}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                {errors.travelDate && <p className="text-red-500 text-sm">{errors.travelDate}</p>}
              </div>

              {/* Return Date */}
              <div className="mb-5">
                <label className="block font-medium mb-1">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={form.returnDate}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                {errors.returnDate && (
                  <p className="text-red-500 text-sm">{errors.returnDate}</p>
                )}
              </div>

              {/* Purpose */}
              <div className="mb-5">
                <label className="block font-medium mb-1">Purpose of Visit</label>
                <select
                  name="purpose"
                  value={form.purpose}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                >
                  <option value="">Select</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Business">Business</option>
                  <option value="Family Visit">Family Visit</option>
                </select>
                {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose}</p>}
              </div>

              {/* Travelers */}
              <div className="mb-5">
                <label className="block font-medium mb-1">Number of Travelers</label>
                <input
                  type="number"
                  name="travelers"
                  value={form.travelers}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                {errors.travelers && (
                  <p className="text-red-500 text-sm">{errors.travelers}</p>
                )}
              </div>

              {/* Message */}
              <div className="mb-5 grid col-span-2">
                <label className="block font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              <div className="w-full flex justify-center border col-span-2">
                  <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 rounded-md font-semibold hover:bg-pink-700 transition"
              >
                Submit Visa Inquiry
              </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
