"use client";

import { useState, useRef } from "react";
import {
  Mail,
  User,
  Phone,
  Star,
  Image as ImageIcon,
  FileText,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api, { uploadImage } from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    message: "",
    phone: "",
    image: "" as string, // Changed to string for URL
  });

  

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG, PNG, GIF, WebP)");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploading(true);
    setUploadSuccess(false);
    
    try {
      // Upload image to get URL
      const url = await uploadImage(file);
      setFormData(prev => ({ ...prev, image: url }));
      setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
      setUploadSuccess(true);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed");
      setFormData(prev => ({ ...prev, image: "" }));
      setUploadSuccess(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!formData.rating) newErrors.rating = "Rating is required";
    else if (+formData.rating < 1 || +formData.rating > 5)
      newErrors.rating = "Rating must be between 1–5";

    if (!formData.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      // Send data as JSON instead of FormData since image is now a URL
      const submitData = {
        name: formData.name,
        email: formData.email,
        rating: formData.rating,
        message: formData.message,
        phone: formData.phone || undefined,
        image: formData.image || undefined,
      };

      const res = await api.post("/feedback", submitData);

      if (res.data.success) {
        setSuccessMsg("Feedback submitted successfully!");
        toast.success("Feedback submitted successfully!");

        // Reset form
        setFormData({
          name: "",
          email: "",
          rating: "",
          message: "",
          phone: "",
          image: "",
        });
        setUploadSuccess(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Header />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Share Your Experience
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Your feedback helps us improve our services and create better travel experiences for everyone.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-8">
                <CardTitle className="text-3xl font-bold">Feedback Form</CardTitle>
                <CardDescription className="text-blue-100 text-lg mt-2">
                  We value your honest opinion
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 md:p-8">
                {successMsg && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-700 text-center font-semibold">
                      {successMsg}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" /> 
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="h-12 text-base"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        • {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> 
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="h-12 text-base"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        • {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="space-y-2">
                    <Label htmlFor="rating" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Star className="w-4 h-4" /> 
                      Rating (1–5) *
                    </Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="rating"
                        type="number"
                        min={1}
                        max={5}
                        placeholder="5"
                        value={formData.rating}
                        onChange={(e) => handleChange("rating", e.target.value)}
                        className="h-12 text-base w-24"
                      />
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              formData.rating && star <= +formData.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {errors.rating && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        • {errors.rating}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> 
                      Your Feedback *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your experience with Jaipur-Thailand Tours..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={5}
                      className="resize-none text-base"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        • {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Phone - Optional */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> 
                      Phone Number (Optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> 
                      Upload Image (Optional)
                    </Label>
                    
                    <div className="space-y-4">
                      {/* File Input */}
                      <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                        uploading 
                          ? "border-blue-400 bg-blue-50" 
                          : uploadSuccess
                          ? "border-green-400 bg-green-50"
                          : "border-gray-300 hover:border-blue-400"
                      }`}>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="image-upload"
                          disabled={uploading}
                        />
                        <label
                          htmlFor="image-upload"
                          className={`cursor-pointer flex flex-col items-center justify-center gap-3 ${
                            uploading ? "opacity-70" : ""
                          }`}
                        >
                          {uploading ? (
                            <>
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                              </div>
                              <div>
                                <p className="text-gray-700 font-medium">
                                  Uploading Image...
                                </p>
                                <p className="text-gray-500 text-sm mt-1">
                                  Please wait
                                </p>
                              </div>
                            </>
                          ) : uploadSuccess ? (
                            <>
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-green-600" />
                              </div>
                              <div>
                                <p className="text-green-700 font-medium">
                                  Image Uploaded Successfully!
                                </p>
                                <p className="text-green-600 text-sm mt-1">
                                  Ready to submit with your feedback
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Upload className="w-6 h-6 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-gray-700 font-medium">
                                  Click to upload an image
                                </p>
                                <p className="text-gray-500 text-sm mt-1">
                                  PNG, JPG, GIF, WebP (Max 5MB)
                                </p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                className="mt-2"
                                disabled={uploading}
                              >
                                Choose File
                              </Button>
                            </>
                          )}
                        </label>
                      </div>

                      {/* Image Preview - Only show when upload is successful */}
                      {uploadSuccess && formData.image && (
                        <div className="relative inline-block">
                          <div className="relative group">
                            <img
                              src={formData.image}
                              alt="Uploaded preview"
                              className="h-32 w-32 object-cover rounded-lg border shadow-sm"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                              disabled={uploading}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <Button
                      type="submit"
                      disabled={loading || uploading}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-48 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </div>
                      ) : (
                        "Submit Feedback"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeedbackForm;