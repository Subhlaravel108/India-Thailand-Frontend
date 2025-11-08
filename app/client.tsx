'use client'

import Header from "components/Header"
import Hero from "components/Hero"
import Destinations from "components/Destinations"
import Packages from "components/Packages"
import Testimonials from "components/Testimonials"
import Blog from "components/Blog"
import Footer from "components/Footer"

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Destinations />
      <Packages />
      <Testimonials />
      <Blog />
      <Footer />
    </div>
  )
}






