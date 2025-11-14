"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TravelInsuranceClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelDates: "",
    travelers: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Clear error on input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    if (!formData.destination.trim())
      newErrors.destination = "Destination is required.";
    if (!formData.travelDates.trim())
      newErrors.travelDates = "Travel dates are required.";
    if (!formData.travelers.trim())
      newErrors.travelers = "Number of travelers is required.";

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
      const res = await fetch("/api/travel-insurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess("✅ Travel insurance request submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          destination: "",
          travelDates: "",
          travelers: "",
          message: "",
        });
      } else {
        setSuccess("❌ Submission failed. Please try again later.");
      }
    } catch (error) {
      setSuccess("⚠️ Server error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white text-gray-800">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-6 text-blue-700">
            Travel Insurance
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Secure your journey from Jaipur to Thailand with our all-inclusive
            travel insurance. We ensure peace of mind during your trip by
            covering medical emergencies, cancellations, and lost luggage.
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
              {[
                { name: "name", label: "Full Name", type: "text" },
                { name: "email", label: "Email Address", type: "email" },
                { name: "phone", label: "Phone Number", type: "tel" },
                { name: "destination", label: "Destination", type: "text" },
                { name: "travelDates", label: "Travel Dates", type: "text" },
                { name: "travelers", label: "No. of Travelers", type: "number" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-medium mb-1 text-gray-700">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors[field.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              <div className="md:col-span-2">
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

              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>

            {success && (
              <p className="text-center mt-6 text-green-600 font-medium">
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
