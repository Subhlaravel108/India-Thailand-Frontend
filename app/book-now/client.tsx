// 'use client'

// import { useState } from "react"
// import { Calendar, MapPin, Users, Phone, Mail, User } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import Header from "@/components/Header"
// import Footer from "@/components/Footer"
// import { useToast } from "@/hooks/use-toast"

// export default function BookNowClient() {
//   const { toast } = useToast()
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     destination: "",
//     package: "",
//     travelers: "",
//     date: "",
//     message: ""
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     toast({
//       title: "Booking Request Submitted!",
//       description: "We'll contact you shortly to confirm your travel plans.",
//     })
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       destination: "",
//       package: "",
//       travelers: "",
//       date: "",
//       message: ""
//     })
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <Header />
      
//       <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//               Book Your Dream Vacation
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Fill out the form below and our travel experts will get back to you within 24 hours
//             </p>
//           </div>

//           <div className="max-w-4xl mx-auto">
//             <Card className="shadow-xl">
//               <CardHeader className="text-center">
//                 <CardTitle className="text-3xl font-bold text-gray-900">
//                   Travel Booking Form
//                 </CardTitle>
//                 <CardDescription className="text-lg text-gray-600">
//                   Tell us about your dream destination and we'll make it happen
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="p-8">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="name" className="text-sm font-medium text-gray-700">
//                         Full Name *
//                       </Label>
//                       <div className="relative">
//                         <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <Input
//                           id="name"
//                           name="name"
//                           type="text"
//                           required
//                           value={formData.name}
//                           onChange={handleChange}
//                           className="pl-10"
//                           placeholder="Enter your full name"
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="email" className="text-sm font-medium text-gray-700">
//                         Email Address *
//                       </Label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <Input
//                           id="email"
//                           name="email"
//                           type="email"
//                           required
//                           value={formData.email}
//                           onChange={handleChange}
//                           className="pl-10"
//                           placeholder="Enter your email"
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
//                         Phone Number *
//                       </Label>
//                       <div className="relative">
//                         <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <Input
//                           id="phone"
//                           name="phone"
//                           type="tel"
//                           required
//                           value={formData.phone}
//                           onChange={handleChange}
//                           className="pl-10"
//                           placeholder="Enter your phone number"
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="destination" className="text-sm font-medium text-gray-700">
//                         Preferred Destination *
//                       </Label>
//                       <div className="relative">
//                         <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <Select name="destination" value={formData.destination} onValueChange={(value) => setFormData({...formData, destination: value})}>
//                           <SelectTrigger className="pl-10">
//                             <SelectValue placeholder="Select destination" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="europe">Europe</SelectItem>
//                             <SelectItem value="asia">Asia</SelectItem>
//                             <SelectItem value="americas">Americas</SelectItem>
//                             <SelectItem value="africa">Africa</SelectItem>
//                             <SelectItem value="oceania">Oceania</SelectItem>
//                             <SelectItem value="other">Other</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="package" className="text-sm font-medium text-gray-700">
//                         Package Type
//                       </Label>
//                       <Select name="package" value={formData.package} onValueChange={(value) => setFormData({...formData, package: value})}>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select package type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="luxury">Luxury</SelectItem>
//                           <SelectItem value="premium">Premium</SelectItem>
//                           <SelectItem value="standard">Standard</SelectItem>
//                           <SelectItem value="budget">Budget</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="travelers" className="text-sm font-medium text-gray-700">
//                         Number of Travelers *
//                       </Label>
//                       <div className="relative">
//                         <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <Select name="travelers" value={formData.travelers} onValueChange={(value) => setFormData({...formData, travelers: value})}>
//                           <SelectTrigger className="pl-10">
//                             <SelectValue placeholder="Select number" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="1">1 Person</SelectItem>
//                             <SelectItem value="2">2 People</SelectItem>
//                             <SelectItem value="3-4">3-4 People</SelectItem>
//                             <SelectItem value="5-6">5-6 People</SelectItem>
//                             <SelectItem value="7+">7+ People</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="date" className="text-sm font-medium text-gray-700">
//                         Preferred Travel Date *
//                       </Label>
//                       <div className="relative">
//                         <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <Input
//                           id="date"
//                           name="date"
//                           type="date"
//                           required
//                           value={formData.date}
//                           onChange={handleChange}
//                           className="pl-10"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="message" className="text-sm font-medium text-gray-700">
//                       Special Requests or Additional Information
//                     </Label>
//                     <Textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       placeholder="Tell us about any special requirements, dietary restrictions, or specific activities you'd like to include..."
//                       className="min-h-[120px]"
//                     />
//                   </div>

//                   <div className="text-center pt-6">
//                     <Button 
//                       type="submit" 
//                       size="lg" 
//                       className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 text-lg font-semibold"
//                     >
//                       Submit Booking Request
//                     </Button>
//                     <p className="text-sm text-gray-500 mt-4">
//                       * Required fields. We'll contact you within 24 hours to confirm your booking.
//                     </p>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   )
// }




"use client"
import { useState } from "react";
import { Calendar, MapPin, Users, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { useToast } from "@/hooks/use-toast";

const BookNow = () => {
  // const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    package: "",
    travelers: "",
    date: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // toast({
    //   title: "Booking Request Submitted!",
    //   description: "We'll contact you shortly to confirm your travel plans.",
    // });
    alert("Booking request submitted! We'll contact you shortly.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      destination: "",
      package: "",
      travelers: "",
      date: "",
      message: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destination" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Destination *
                      </Label>
                      <Select value={formData.destination} onValueChange={(value) => handleChange("destination", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paris">Paris, France</SelectItem>
                          <SelectItem value="bali">Bali, Indonesia</SelectItem>
                          <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
                          <SelectItem value="santorini">Santorini, Greece</SelectItem>
                          <SelectItem value="maldives">Maldives</SelectItem>
                          <SelectItem value="dubai">Dubai, UAE</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="package" className="flex items-center gap-2">
                        Package Type *
                      </Label>
                      <Select value={formData.package} onValueChange={(value) => handleChange("package", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select package" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic Package</SelectItem>
                          <SelectItem value="standard">Standard Package</SelectItem>
                          <SelectItem value="premium">Premium Package</SelectItem>
                          <SelectItem value="custom">Custom Package</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="travelers" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Number of Travelers *
                      </Label>
                      <Select value={formData.travelers} onValueChange={(value) => handleChange("travelers", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select travelers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Traveler</SelectItem>
                          <SelectItem value="2">2 Travelers</SelectItem>
                          <SelectItem value="3">3 Travelers</SelectItem>
                          <SelectItem value="4">4 Travelers</SelectItem>
                          <SelectItem value="5+">5+ Travelers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="date" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Preferred Travel Date *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="message">Special Requests or Questions</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about any special requirements, dietary restrictions, or questions you may have..."
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button 
                      type="submit" 
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full"
                    >
                      Submit Booking Request
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
