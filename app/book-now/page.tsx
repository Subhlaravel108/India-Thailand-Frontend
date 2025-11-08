import type { Metadata } from 'next'
import BookNowClient from './client'

export const metadata: Metadata = {
  title: 'Book Now - Reserve Your Dream Vacation | Wanderlust',
  description: 'Book your dream vacation with our easy online booking system. Fill out the form and our travel experts will get back to you within 24 hours.',
  keywords: 'book now, vacation booking, travel reservation, online booking, travel form, dream vacation',
  openGraph: {
    title: 'Book Now - Reserve Your Dream Vacation | Wanderlust',
    description: 'Book your dream vacation with our easy online booking system. Fill out the form and our travel experts will get back to you within 24 hours.',
    type: 'website',
  },
}

export default function BookNowPage() {
  return <BookNowClient />
}