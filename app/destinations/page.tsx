import type { Metadata } from 'next'
import DestinationsClient from './client'

export const metadata: Metadata = {
  title: 'Destinations - Explore Amazing Places | Wanderlust',
  description: 'Discover breathtaking destinations around the world. From Paris to Tokyo, Santorini to Bali - find your perfect travel destination with our curated selection.',
  keywords: 'destinations, travel, Paris, Tokyo, Santorini, Bali, Dubai, New York, vacation spots',
  openGraph: {
    title: 'Destinations - Explore Amazing Places | Wanderlust',
    description: 'Discover breathtaking destinations around the world. From Paris to Tokyo, Santorini to Bali - find your perfect travel destination with our curated selection.',
    type: 'website',
  },
}

export default function DestinationsPage() {
  return <DestinationsClient />
}