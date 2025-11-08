import type { Metadata } from 'next'
import AboutClient from './client'

export const metadata: Metadata = {
  title: 'About Us - TravelCo | Your Trusted Travel Partner',
  description: 'Learn about TravelCo - creating unforgettable travel experiences for over 25 years. Meet our team, discover our values, and see why 50,000+ travelers trust us.',
  keywords: 'about us, travel company, team, values, experience, customer satisfaction, travel experts',
  openGraph: {
    title: 'About Us - TravelCo | Your Trusted Travel Partner',
    description: 'Learn about TravelCo - creating unforgettable travel experiences for over 25 years. Meet our team, discover our values, and see why 50,000+ travelers trust us.',
    type: 'website',
  },
}

export default function AboutPage() {
  return <AboutClient />
}