import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Providers } from './providers'
import TopProgress from '@/components/TopProgress'
import { Suspense } from 'react'
import { contactInfo } from '@/lib/global_variables'
import Script from 'next/script'

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
    description: `Discover amazing destinations and travel packages with ${contactInfo.websiteName}.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${contactInfo.websiteName} - Travel & Tourism`,
    description: `Discover amazing destinations and travel packages with ${contactInfo.websiteName}.`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VY6MHMEEDQ"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VY6MHMEEDQ');
          `}
        </Script>
      </head>

      <body className={inter.className}>
        <Providers>
          <TooltipProvider>
            <Suspense fallback={null}>
              <TopProgress />
            </Suspense>
            <Sonner />
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  )
}
