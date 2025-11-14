"use client";

import React, { useState } from "react";
import { Car, Clock, MapPin, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CarRentalsClient = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    carType: "",
    date: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ handle change (clear error on typing)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
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
    if (!formData.dropLocation.trim())
      newErrors.dropLocation = "Drop location is required.";
    if (!formData.carType.trim()) newErrors.carType = "Car type is required.";
    if (!formData.date.trim()) newErrors.date = "Pickup date is required.";

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
      const res = await fetch("/api/car-rental", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess("✅ Car rental booking request submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          pickupLocation: "",
          dropLocation: "",
          carType: "",
          date: "",
          message: "",
        });
      } else {
        setSuccess("❌ Failed to submit booking request. Try again.");
      }
    } catch (error) {
      setSuccess("⚠️ Server error occurred. Please try later.");
    } finally {
      setLoading(false);
    }
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
              {[
                { name: "name", label: "Full Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "phone", label: "Phone", type: "tel" },
                { name: "pickupLocation", label: "Pickup Location", type: "text" },
                { name: "dropLocation", label: "Drop Location", type: "text" },
                { name: "date", label: "Pickup Date", type: "date" },
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
                    } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Car Type
                </label>
                <select
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.carType ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                >
                  <option value="">Select Car Type</option>
                  <option value="Economy">Economy</option>
                  <option value="SUV">SUV</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Tempo Traveler">Tempo Traveler</option>
                </select>
                {errors.carType && (
                  <p className="text-red-500 text-sm mt-1">{errors.carType}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block font-medium mb-1 text-gray-700">
                  Additional Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Any special requirements or notes..."
                />
              </div>

              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
                >
                  {loading ? "Submitting..." : "Submit Booking"}
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
};

export default CarRentalsClient;
