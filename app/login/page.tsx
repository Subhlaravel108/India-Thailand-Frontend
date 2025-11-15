import type { Metadata } from 'next'
import ClientLogin from './ClientLogin'
import { contactInfo } from '@/lib/global_variables'

export const metadata: Metadata = {
  title: `Login - ${contactInfo.websiteName}`,
  description: `Login to your ${contactInfo.websiteName} account to access your dashboard and manage your tours information.`,
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return (
    <ClientLogin/>
  )
}
