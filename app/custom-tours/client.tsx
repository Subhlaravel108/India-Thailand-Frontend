"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contactInfo } from "@/lib/global_variables";
import { toast } from "sonner";
import api, { fetchDestinations } from "@/lib/api";
import { MapPin, Calendar, Users, Wallet, Hotel, FileText } from "lucide-react";

const BUDGET_OPTIONS = [
  { value: "", label: "Select your estimated budget" },
  { value: "under-50000", label: "Under ₹50,000" },
  { value: "50000-100000", label: "₹50,000 – ₹1,00,000" },
  { value: "100000-200000", label: "₹1,00,000 – ₹2,00,000" },
  { value: "200000-500000", label: "₹2,00,000 – ₹5,00,000" },
  { value: "above-500000", label: "Above ₹5,00,000" },
  { value: "flexible", label: "Flexible / Not sure yet" },
];

const HOTEL_OPTIONS = [
  { value: "", label: "Select hotel preference (optional)" },
  { value: "3-star", label: "3 Star" },
  { value: "4-star", label: "4 Star" },
  { value: "5-star", label: "5 Star" },
  { value: "luxury", label: "Luxury" },
  { value: "no-preference", label: "No preference" },
];

const FALLBACK_DESTINATIONS = [
  "Bangkok",
  "Phuket",
  "Pattaya",
  "Chiang Mai",
  "Krabi",
  "Koh Samui",
  "Ayutthaya",
  "Hua Hin",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  destinations: [] as string[],
  travelStart: "",
  travelEnd: "",
  days: "",
  travellers: "",
  budgetRange: "",
  hotelPreference: "",
  message: "",
};

type FormState = typeof initialForm;
type FormErrors = Partial<Record<keyof FormState | "destinations", string>>;

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
    hasError ? "border-red-500" : "border-gray-300"
  }`;

export default function CustomToursClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [destinationOptions, setDestinationOptions] = useState<string[]>(FALLBACK_DESTINATIONS);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const res = await fetchDestinations({ limit: 50 });
        const list = res?.data?.destinations || res?.data || res?.destinations || [];
        if (Array.isArray(list) && list.length > 0) {
          const names = list
            .map((d: { name?: string; title?: string }) => d.name || d.title)
            .filter(Boolean) as string[];
          if (names.length) setDestinationOptions(Array.from(new Set(names)));
        }
      } catch {
        setDestinationOptions(FALLBACK_DESTINATIONS);
      }
    };
    loadDestinations();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleDestination = (dest: string) => {
    setForm((prev) => {
      const selected = prev.destinations.includes(dest)
        ? prev.destinations.filter((d) => d !== dest)
        : [...prev.destinations, dest];
      return { ...prev, destinations: selected };
    });
    setErrors((prev) => ({ ...prev, destinations: "" }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter a valid email address";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (form.destinations.length === 0)
      newErrors.destinations = "Select at least one destination";
    if (!form.travelStart) newErrors.travelStart = "Travel start date is required";
    if (!form.travelEnd) newErrors.travelEnd = "Travel end date is required";
    if (form.travelStart && form.travelEnd && form.travelEnd < form.travelStart)
      newErrors.travelEnd = "End date cannot be before start date";
    if (!form.days.trim()) newErrors.days = "Total days is required";
    else if (isNaN(Number(form.days)) || Number(form.days) < 1)
      newErrors.days = "Enter at least 1 day";
    if (!form.travellers.trim())
      newErrors.travellers = "Number of travellers is required";
    if (!form.budgetRange) newErrors.budgetRange = "Budget range is required";
    if (!form.message.trim())
      newErrors.message = "Please describe your tour requirements";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccess("");
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        destinations: form.destinations.join(", "),
        travelStart: form.travelStart,
        travelEnd: form.travelEnd,
        days: parseInt(form.days, 10),
        travellers: form.travellers.trim(),
        budgetRange: form.budgetRange,
        hotelPreference: form.hotelPreference || undefined,
        message: form.message.trim(),
        serviceType: "Custom Tours",
      };

      const res = await api.post("/service", payload);

      if (res.data.success) {
        setSuccess("✅ Custom tour request submitted successfully!");
        toast.success("Custom tour request submitted successfully!");
        setForm(initialForm);
      } else {
        const msg = res.data?.message || "Failed to submit request. Please try again.";
        setSuccess(`❌ ${msg}`);
        toast.error(msg);
      }
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { message?: string; errors?: Record<string, string> } };
      };
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
      const msg =
        err.response?.data?.message ||
        "Server error occurred. Please try again.";
      setSuccess(`⚠️ ${msg}`);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const FieldError = ({ name }: { name: keyof FormErrors }) =>
    errors[name] ? (
      <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
    ) : null;

  return (
    <>
      <Header />

      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white text-gray-800">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-6 text-yellow-700">Custom Tours</h1>
          <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
            Want a tailor-made travel experience? {contactInfo.websiteName} designs
            custom tours around your interests, schedule, and budget.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Personal Itineraries",
                text: "Choose where you want to go, how long to stay, and what to explore.",
              },
              {
                title: "Private Transportation",
                text: "Comfortable private transfers and flexible travel timing.",
              },
              {
                title: "Local Experiences",
                text: "Authentic Thai culture, food, and attractions like a local.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg border border-yellow-100"
              >
                <h3 className="font-semibold text-xl mb-2 text-yellow-800">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
            Plan Your Custom Tour
          </h2>
          <p className="text-center text-gray-500 mb-10 text-sm">
            Fill in the details below and our team will get back to you shortly.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/80 border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm"
          >
            {/* Name */}
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-gray-800">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className={inputClass(!!errors.name)}
              />
              <FieldError name="name" />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-gray-800">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
                className={inputClass(!!errors.email)}
              />
              <FieldError name="email" />
            </div>

            {/* Phone */}
            <div className="md:col-span-2">
              <label className="block mb-1.5 text-sm font-semibold text-gray-800">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your 10-digit phone number"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
                className={inputClass(!!errors.phone)}
              />
              <FieldError name="phone" />
            </div>

            {/* Destinations */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-1.5 mb-2 text-sm font-semibold text-gray-800">
                <MapPin className="h-4 w-4 text-yellow-600" />
                Preferred Destinations <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Select destinations you want to visit
              </p>
              <div
                className={`grid grid-cols-2 sm:grid-cols-3 gap-2 rounded-lg border p-3 bg-white max-h-48 overflow-y-auto ${
                  errors.destinations ? "border-red-500" : "border-gray-300"
                }`}
              >
                {destinationOptions.map((dest) => (
                  <label
                    key={dest}
                    className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer transition-colors ${
                      form.destinations.includes(dest)
                        ? "bg-yellow-100 text-yellow-900 border border-yellow-300"
                        : "hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.destinations.includes(dest)}
                      onChange={() => toggleDestination(dest)}
                      className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-400"
                    />
                    <span className="truncate">{dest}</span>
                  </label>
                ))}
              </div>
              <FieldError name="destinations" />
            </div>

            {/* Travel dates — side by side */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-1.5 mb-3 text-sm font-semibold text-gray-800">
                <Calendar className="h-4 w-4 text-yellow-600 shrink-0" />
                Travel Dates <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3 -mt-2">
                Choose your preferred travel dates
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="travelStart"
                    className="block text-xs font-medium text-gray-600 mb-1.5"
                  >
                    Start date
                  </label>
                  <input
                    id="travelStart"
                    type="date"
                    name="travelStart"
                    value={form.travelStart}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={inputClass(!!errors.travelStart)}
                  />
                  <FieldError name="travelStart" />
                </div>
                <div>
                  <label
                    htmlFor="travelEnd"
                    className="block text-xs font-medium text-gray-600 mb-1.5"
                  >
                    End date
                  </label>
                  <input
                    id="travelEnd"
                    type="date"
                    name="travelEnd"
                    value={form.travelEnd}
                    onChange={handleChange}
                    min={form.travelStart || new Date().toISOString().split("T")[0]}
                    className={inputClass(!!errors.travelEnd)}
                  />
                  <FieldError name="travelEnd" />
                </div>
              </div>
            </div>

            {/* Total days */}
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-gray-800">
                Total Days <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">
                How many days are you planning for?
              </p>
              <input
                type="number"
                name="days"
                placeholder="e.g. 7"
                value={form.days}
                onChange={handleChange}
                min={1}
                max={90}
                className={inputClass(!!errors.days)}
              />
              <FieldError name="days" />
            </div>

            {/* Travellers */}
            <div>
              <label className="flex items-center gap-1.5 mb-1.5 text-sm font-semibold text-gray-800">
                <Users className="h-4 w-4 text-yellow-600" />
                Number of Travellers <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Adults, children, couples, group, etc.
              </p>
              <input
                type="text"
                name="travellers"
                placeholder="e.g. 2 adults, 1 child"
                value={form.travellers}
                onChange={handleChange}
                className={inputClass(!!errors.travellers)}
              />
              <FieldError name="travellers" />
            </div>

            {/* Budget */}
            <div>
              <label className="flex items-center gap-1.5 mb-1.5 text-sm font-semibold text-gray-800">
                <Wallet className="h-4 w-4 text-yellow-600" />
                Budget Range <span className="text-red-500">*</span>
              </label>
              <select
                name="budgetRange"
                value={form.budgetRange}
                onChange={handleChange}
                className={inputClass(!!errors.budgetRange)}
              >
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt.value || "empty"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <FieldError name="budgetRange" />
            </div>

            {/* Hotel preference */}
            <div>
              <label className="flex items-center gap-1.5 mb-1.5 text-sm font-semibold text-gray-800">
                <Hotel className="h-4 w-4 text-yellow-600" />
                Hotel Preference
              </label>
              <select
                name="hotelPreference"
                value={form.hotelPreference}
                onChange={handleChange}
                className={inputClass(false)}
              >
                {HOTEL_OPTIONS.map((opt) => (
                  <option key={opt.value || "empty"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tour requirements */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-1.5 mb-1.5 text-sm font-semibold text-gray-800">
                <FileText className="h-4 w-4 text-yellow-600" />
                Tour Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Describe your travel plan, preferred destinations, sightseeing, activities, budget, and any special requirements."
                value={form.message}
                onChange={handleChange}
                className={inputClass(!!errors.message)}
              />
              <FieldError name="message" />
            </div>

            <div className="md:col-span-2 text-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto min-w-[240px] px-8 py-3.5 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition disabled:bg-yellow-400 disabled:cursor-not-allowed shadow-md"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Custom Tour Request"
                )}
              </button>
              <p className="text-xs text-gray-500 mt-3">* Required fields</p>
            </div>
          </form>

          {success && (
            <div
              className={`mt-6 rounded-lg border p-4 text-center text-sm font-medium ${
                success.includes("✅")
                  ? "bg-green-50 border-green-200 text-green-700"
                  : success.includes("❌")
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-amber-50 border-amber-200 text-amber-800"
              }`}
            >
              {success}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
