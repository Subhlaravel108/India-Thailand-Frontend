


"use client"
import { useEffect, useState } from "react";
import { Calendar, MapPin, Users, Phone, Mail, User, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { useToast } from "@/hooks/use-toast";
import api, { fetchDestinations,fetchTourPackages } from "@/lib/api";
import axios from "axios";
import { toast } from "sonner";

const BookNow = () => {
  // const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    packageType: "",
    travelers: "",
    travelDate: "",
    message: ""
  });
  
  const [destinations, setDestinations] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const desRes = await fetchDestinations();
      const pkgRes = await fetchTourPackages();
      setDestinations(desRes?.data || []);
      setPackages(pkgRes?.data || []);
    };
    fetchData();
  }, []);


  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.destination)
      newErrors.destination = "Please select a destination";
    if (!formData.packageType) newErrors.packageType = "Please select a package";
    if (!formData.travelers)
      newErrors.travelers = "Please select number of travelers";
    if (!formData.travelDate) newErrors.travelDate = "Please select a date";
    return newErrors;
  };

  

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("formdata=",formData)
    try {
      setLoading(true);
      const res = await api.post("/booking", formData);

      if (res.data.success) {
        setSuccessMsg("✅ Booking request submitted successfully!");
        toast.success("✅ Booking request submitted successfully!")
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          destination: "",
          packageType: "",
          travelers: "",
          travelDate: "",
          message: "",
        });
      } else {
        setSuccessMsg(res.data.message || "Failed to submit booking request.");
      }
    } catch (error: any) {
      setSuccessMsg(error.response?.data?.message || "Server error occurred.");
      toast.error(error.response?.data?.message || "Server error occurred.");

    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Book Your Dream Vacation
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Fill out the form below and our travel experts will get back to you within 24 hours
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Booking Information</CardTitle>
                <CardDescription className="text-blue-100">
                  Please provide your travel details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                      {successMsg && (
                <p
                  className={`text-center mb-4 font-medium ${
                    successMsg.startsWith("✅") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {successMsg}
                </p>
              )}
                 <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4" /> Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                      )}
                    </div>

                    {/* Destination */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="destination"
                        className="flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4" /> Destination *
                      </Label>
                      <Select
                        value={formData.destination}
                        onValueChange={(value) =>
                          handleChange("destination", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          {destinations.map((item, idx) => (
                            <SelectItem
                              key={idx}
                              value={item.title || item.name}
                            >
                              {item.title || item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.destination && (
                        <p className="text-red-500 text-sm">
                          {errors.destination}
                        </p>
                      )}
                    </div>

                    {/* Package */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="package"
                        className="flex items-center gap-2"
                      >
                        <Package2 className="w-4 h-4" /> Package Type *
                      </Label>
                      <Select
                        value={formData.packageType}
                        onValueChange={(value) =>
                          handleChange("packageType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select package" />
                        </SelectTrigger>
                        <SelectContent>
                          {packages.map((item, idx) => (
                            <SelectItem
                              key={idx}
                              value={item.title || item.name}
                            >
                              {item.title || item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.packageType && (
                        <p className="text-red-500 text-sm">{errors.packageType}</p>
                      )}
                    </div>

                    {/* Travelers */}
                    <div className="space-y-2">
                      <Label htmlFor="travelers" className="flex items-center gap-2">
                        <Users className="w-4 h-4" /> Travelers *
                      </Label>
                      <Select
                        value={formData.travelers}
                        onValueChange={(value) =>
                          handleChange("travelers", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select travelers" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <SelectItem key={n} value={n.toString()}>
                              {n} Traveler{n > 1 ? "s" : ""}
                            </SelectItem>
                          ))}
                          <SelectItem value="5+">5+ Travelers</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.travelers && (
                        <p className="text-red-500 text-sm">{errors.travelers}</p>
                      )}
                    </div>

                    {/* Date */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="date" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Preferred Travel Date *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) => handleChange("travelDate", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {errors.travelDate && (
                        <p className="text-red-500 text-sm">{errors.travelDate}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="message">Special Requests or Questions</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about any special requirements..."
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full"
                    >
                      {loading ? "Submitting..." : "Submit Booking Request"}
                    </Button>
                  </div>
                </form>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">1.</span>
                      <span>Our travel expert will review your booking request</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">2.</span>
                      <span>You'll receive a detailed itinerary and quote within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">3.</span>
                      <span>After confirmation, we'll handle all your travel arrangements</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookNow;
