import type { Metadata } from 'next'
import HomeClient from './client'

export const metadata: Metadata = {
  title: 'Wanderlust - Your Gateway to Amazing Travel Experiences',
  description: 'Discover breathtaking destinations, curated travel packages, and unforgettable adventures with Wanderlust. Book your dream vacation today!',
  keywords: 'travel, vacation, destinations, packages, adventure, tourism, booking',
  openGraph: {
    title: 'Wanderlust - Your Gateway to Amazing Travel Experiences',
    description: 'Discover breathtaking destinations, curated travel packages, and unforgettable adventures with Wanderlust. Book your dream vacation today!',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wanderlust - Your Gateway to Amazing Travel Experiences',
    description: 'Discover breathtaking destinations, curated travel packages, and unforgettable adventures with Wanderlust. Book your dream vacation today!',
  },
}

export default function Home() {
  return <HomeClient />
}
