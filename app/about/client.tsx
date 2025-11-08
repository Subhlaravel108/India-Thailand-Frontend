// 'use client'

// import Header from "@/components/Header"
// import Footer from "@/components/Footer"
// import { Button } from "@/components/ui/button"
// import { Users, Award, Globe, Heart, Shield, Clock } from "lucide-react"

// export default function AboutClient() {
//   const stats = [
//     { icon: Users, number: "50,000+", label: "Happy Travelers" },
//     { icon: Globe, number: "150+", label: "Destinations" },
//     { icon: Award, number: "25+", label: "Years Experience" },
//     { icon: Heart, number: "98%", label: "Customer Satisfaction" }
//   ]

//   const values = [
//     {
//       icon: Heart,
//       title: "Passion for Travel",
//       description: "We believe travel has the power to transform lives and create lasting memories that enrich our understanding of the world."
//     },
//     {
//       icon: Shield,
//       title: "Trust & Safety",
//       description: "Your safety and security are our top priorities. We work with trusted partners and maintain the highest safety standards."
//     },
//     {
//       icon: Globe,
//       title: "Sustainable Tourism",
//       description: "We're committed to responsible travel that benefits local communities and preserves the beauty of our planet."
//     },
//     {
//       icon: Award,
//       title: "Excellence",
//       description: "We strive for excellence in every aspect of our service, from planning to execution, ensuring unforgettable experiences."
//     }
//   ]

//   const team = [
//     {
//       name: "Sarah Johnson",
//       role: "CEO & Founder",
//       image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//       bio: "With over 20 years in the travel industry, Sarah founded Wanderlust with a vision to make extraordinary travel accessible to everyone."
//     },
//     {
//       name: "Michael Chen",
//       role: "Head of Operations",
//       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//       bio: "Michael ensures every trip runs smoothly, coordinating with our global network of partners to deliver seamless experiences."
//     },
//     {
//       name: "Emily Rodriguez",
//       role: "Travel Specialist",
//       image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//       bio: "Emily's expertise in cultural tourism helps create authentic experiences that connect travelers with local communities."
//     },
//     {
//       name: "David Thompson",
//       role: "Customer Experience",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//       bio: "David leads our customer service team, ensuring every traveler feels supported throughout their journey."
//     }
//   ]

//   return (
//     <div className="min-h-screen bg-white">
//       <Header />
      
//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//               About Wanderlust
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Creating unforgettable travel experiences for over 25 years. We believe every journey should be extraordinary.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <stat.icon className="w-8 h-8 text-orange-500" />
//                 </div>
//                 <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
//                 <div className="text-gray-600">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Story Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
//               <div className="space-y-4 text-lg text-gray-600">
//                 <p>
//                   Founded in 1998, Wanderlust began as a small family business with a simple mission: 
//                   to make extraordinary travel experiences accessible to everyone. What started as 
//                   a passion project has grown into one of the world's most trusted travel companies.
//                 </p>
//                 <p>
//                   Over the years, we've helped over 50,000 travelers discover the world, from the 
//                   romantic streets of Paris to the pristine beaches of Bali. Our commitment to 
//                   excellence and personalized service has earned us recognition as a leader in 
//                   the travel industry.
//                 </p>
//                 <p>
//                   Today, we continue to innovate and expand our offerings, always staying true 
//                   to our core values of authenticity, sustainability, and creating meaningful 
//                   connections between travelers and the places they visit.
//                 </p>
//               </div>
//             </div>
//             <div className="relative">
//               <img
//                 src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                 alt="Our team"
//                 className="rounded-2xl shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               The principles that guide everything we do
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((value, index) => (
//               <div key={index} className="text-center">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <value.icon className="w-8 h-8 text-blue-500" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
//                 <p className="text-gray-600">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               The passionate people behind your perfect vacation
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {team.map((member, index) => (
//               <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                 <img
//                   src={member.image}
//                   alt={member.name}
//                   className="w-full h-64 object-cover"
//                 />
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
//                   <p className="text-orange-500 font-semibold mb-3">{member.role}</p>
//                   <p className="text-gray-600 text-sm">{member.bio}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-4xl font-bold text-white mb-6">
//             Ready to Start Your Journey?
//           </h2>
//           <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             Let us help you create the perfect travel experience. Our team of experts is here to make your dreams come true.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
//               Get Started Today
//             </Button>
//             <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3">
//               Contact Us
//             </Button>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   )
// }


'use client'


import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, Award, Globe, Heart, Shield, Clock } from "lucide-react";

const AboutPage = () => {
  const stats = [
    { icon: Users, number: "50,000+", label: "Happy Travelers" },
    { icon: Globe, number: "150+", label: "Destinations" },
    { icon: Award, number: "25+", label: "Years Experience" },
    { icon: Heart, number: "98%", label: "Customer Satisfaction" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Your safety and security are our top priorities. We maintain the highest standards of safety protocols."
    },
    {
      icon: Heart,
      title: "Personalized Service",
      description: "Every journey is unique. We customize each experience to match your preferences and dreams."
    },
    {
      icon: Globe,
      title: "Global Expertise",
      description: "With local partners worldwide, we provide authentic experiences and insider knowledge."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our dedicated team is available around the clock to ensure your peace of mind while traveling."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      experience: "15+ years in travel industry"
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      experience: "12+ years in hospitality"
    },
    {
      name: "Emily Rodriguez",
      role: "Travel Experience Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      experience: "10+ years creating unique journeys"
    },
    {
      name: "David Kumar",
      role: "Customer Relations Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      experience: "8+ years in customer service"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About TravelCo
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Creating unforgettable travel experiences for over 25 years
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 1998, TravelCo began as a small family business with a simple mission: 
                to make travel accessible, safe, and extraordinary for everyone. What started as a 
                local travel agency has grown into a globally recognized brand.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We believe that travel has the power to transform lives, build bridges between 
                cultures, and create memories that last a lifetime. Our passionate team of travel 
                experts works tirelessly to curate experiences that go beyond typical tourism.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Today, we're proud to have helped over 50,000 travelers discover the world's 
                most incredible destinations while maintaining our commitment to personalized 
                service and attention to detail.
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                Start Your Journey
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Travel Adventure"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These numbers represent the trust our customers place in us and the experiences we've crafted together.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 text-white rounded-full mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape every experience we create.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced team of travel professionals is dedicated to making your dreams come true.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-2xl shadow-lg">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-orange-500 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;

