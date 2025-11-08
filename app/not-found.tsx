import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: '404 - Page Not Found | Wanderlust',
  description: 'Sorry, the page you are looking for could not be found. Return to our homepage to continue exploring amazing travel destinations.',
  robots: 'noindex, nofollow',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 text-lg mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          
          {/* <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button> */}
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? <Link href="/contact" className="text-orange-500 hover:underline">Contact us</Link></p>
        </div>
      </div>
    </div>
  )
}
