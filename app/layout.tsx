import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// import { Toaster } from "@/components/ui/toaster"
// import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'
import TopProgress from '@/components/TopProgress'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Wanderlust - Travel & Tourism',
    template: '%s | Wanderlust'
  },
  description: 'Discover amazing destinations and travel packages with Wanderlust. Your gateway to unforgettable travel experiences around the world.',
  keywords: 'travel, tourism, destinations, vacation, packages, booking, adventure',
  authors: [{ name: 'Wanderlust Team' }],
  creator: 'Wanderlust',
  publisher: 'Wanderlust',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wanderlust-travel.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wanderlust-travel.com',
    siteName: 'Wanderlust',
    title: 'Wanderlust - Travel & Tourism',
    description: 'Discover amazing destinations and travel packages with Wanderlust. Your gateway to unforgettable travel experiences around the world.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wanderlust - Travel & Tourism',
    description: 'Discover amazing destinations and travel packages with Wanderlust. Your gateway to unforgettable travel experiences around the world.',
    creator: '@wanderlust',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TooltipProvider>
            <Suspense fallback={null}>
              <TopProgress/>
            </Suspense>
            {/* <Toaster />
            <Sonner /> */}
            <Toaster/>
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  )
}