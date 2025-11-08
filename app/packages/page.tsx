import type { Metadata } from 'next'
import PackagesClient from './client'

export const metadata: Metadata = {
  title: 'Travel Packages - All-Inclusive Deals | Wanderlust',
  description: 'Choose from our carefully curated travel packages with everything included. European tours, Asian adventures, Mediterranean escapes, and more!',
  keywords: 'travel packages, all-inclusive, European tours, Asian adventures, Mediterranean, vacation deals',
  openGraph: {
    title: 'Travel Packages - All-Inclusive Deals | Wanderlust',
    description: 'Choose from our carefully curated travel packages with everything included. European tours, Asian adventures, Mediterranean escapes, and more!',
    type: 'website',
  },
}

export default function PackagesPage() {
  return <PackagesClient />
}