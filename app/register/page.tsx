import type { Metadata } from 'next'
// import RegisterForm from '@/components/RegisterForm'
import ClientRegister from './ClientRegister'
import { contactInfo } from '@/lib/global_variables'
export const metadata: Metadata = {
  title: `${contactInfo.websiteName} - Jaipur to Thailand Tour Packages`,
  description: `Book the best Jaipur to Thailand tour packages with ${contactInfo.websiteName}. Explore Bangkok, Pattaya, Phuket with flights, hotels, sightseeing, and custom travel plans from Jaipur.`,
  openGraph: {
    title: `${contactInfo.websiteName} - Best Jaipur to Thailand Tour Packages`,
    description: `Plan your dream Thailand trip from Jaipur with ${contactInfo.websiteName}. Get top packages for Bangkok, Pattaya, Phuket including flights, stays, transfers & more.`,
    type: 'website',
  },
}



export default function RegisterPage() {
  return (
      <ClientRegister/>
  )
}
