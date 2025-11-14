"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contactInfo } from "@/lib/global_variables";

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

  const validate = () => {
    let newErrors : any = {};;

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter valid email";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (form.phone.length < 10)
      newErrors.phone = "Phone must be 10 digits";
    if (!form.days.trim()) newErrors.days = "Total days required";
    if (!form.travellers.trim()) newErrors.travellers = "Travellers required";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    alert("Form submitted successfully!");
  };

  return (
    <>
      <Header />

      {/* Top Section */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white text-gray-800">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-6 text-yellow-700">
            Custom Tours
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
              <label className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-semibold">Phone</label>
              <input
                type="number"
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Total Days */}
            <div>
              <label className="block mb-1 font-semibold">Total Days</label>
              <input
                type="number"
                name="days"
                placeholder="How many days?"
                value={form.days}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              {errors.days && (
                <p className="text-red-500 text-sm">{errors.days}</p>
              )}
            </div>

            {/* Travellers */}
            <div>
              <label className="block mb-1 font-semibold">Travellers</label>
              <input
                type="number"
                name="travellers"
                placeholder="No. of travellers"
                value={form.travellers}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              {errors.travellers && (
                <p className="text-red-500 text-sm">{errors.travellers}</p>
              )}
            </div>

            {/* Message (Full Width) */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold">Tour Requirements</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Describe your custom travel plan..."
                value={form.message}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="md:col-span-2 text-center">
              <button className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
