import type { Metadata } from 'next'
import DestinationsClient from './client'
import { contactInfo } from '@/lib/global_variables'

export const metadata: Metadata = {
  title: `Destinations - Explore Amazing Places |  ${contactInfo.websiteName}`,
  description: 'Discover breathtaking destinations around the world. From Paris to Tokyo, Santorini to Bali - find your perfect travel destination with our curated selection.',
  keywords: 'destinations, travel, Thailand, Bali, vacation spots',
  openGraph: {
    title: `Destinations - Explore Amazing Places |  ${contactInfo.websiteName}`,
    description: 'Discover breathtaking destinations around the world. From Jaipiur to Thailand, Jaipur to Bali - find your perfect travel destination with our curated selection.',
    type: 'website',
  },
}

export default function DestinationsPage() {
  return <DestinationsClient />
}