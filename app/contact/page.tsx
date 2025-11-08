import type { Metadata } from 'next'
import ContactClient from './client'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch | Wanderlust',
  description: 'Ready to plan your next adventure? Contact our travel experts for personalized assistance. Call, email, or visit our offices worldwide.',
  keywords: 'contact us, travel experts, customer service, phone, email, office locations, travel consultation',
  openGraph: {
    title: 'Contact Us - Get in Touch | Wanderlust',
    description: 'Ready to plan your next adventure? Contact our travel experts for personalized assistance. Call, email, or visit our offices worldwide.',
    type: 'website',
  },
}

export default function ContactPage() {
  return <ContactClient />
}