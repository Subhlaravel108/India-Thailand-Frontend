import type { Metadata } from 'next'
import HomeClient from './client'
import { contactInfo } from '@/lib/global_variables'

export const metadata: Metadata = {
  title: `${contactInfo.websiteName} - Your Gateway to Amazing Travel Experiences`,
  description: `Discover breathtaking destinations, curated travel packages, and unforgettable adventures with ${contactInfo.websiteName}. Book your dream vacation today!`,
  keywords: 'travel, vacation, destinations, packages, adventure, tourism, booking',
  openGraph: {
    title: `${contactInfo.websiteName} - Your Gateway to Amazing Travel Experiences`,
    description:  `Discover breathtaking destinations, curated travel packages, and unforgettable adventures with ${contactInfo.websiteName}. Book your dream vacation today!`,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${contactInfo.websiteName} - Your Gateway to Amazing Travel Experiences`,
    description: `Discover breathtaking destinations, curated travel packages, and unforgettable adventures with ${contactInfo.websiteName}. Book your dream vacation today!`,
  },
}

export default function Home() {
  return <HomeClient />
}
