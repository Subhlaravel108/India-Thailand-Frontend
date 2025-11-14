import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Providers } from './providers'
// import { Toaster } from '@/components/ui/toaster'
import TopProgress from '@/components/TopProgress'
import { Suspense } from 'react'
import { contactInfo } from '@/lib/global_variables'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: `${contactInfo.websiteName} - Travel & Tourism`,
    template: `%s | ${contactInfo.websiteName}`
  },
  description: `Discover amazing destinations and travel packages with ${contactInfo.websiteName}. Your gateway to unforgettable travel experiences around the world.`,
  keywords: 'travel, tourism, destinations, vacation, packages, booking, adventure',
  authors: [{ name: `${contactInfo.websiteName} Team` }],
  creator: `${contactInfo.websiteName}`,
  publisher: `${contactInfo.websiteName}`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jaipur-thailand.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jaipur-thailand.com',
    siteName: `${contactInfo.websiteName}`,
    title: `${contactInfo.websiteName} - Travel & Tourism`,
    description: `Discover amazing destinations and travel packages with ${contactInfo.websiteName}. Your gateway to unforgettable travel experiences around the world.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${contactInfo.websiteName} - Travel & Tourism`,
    description: `Discover amazing destinations and travel packages with ${contactInfo.websiteName}. Your gateway to unforgettable travel experiences around the world.`,
    creator: `@${contactInfo.websiteName}`,
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
            {/* <Toaster /> */}
            <Sonner />
            {/* <Toaster/> */}
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  )
}