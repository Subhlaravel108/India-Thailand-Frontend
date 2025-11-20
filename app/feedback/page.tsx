import type { Metadata } from 'next'

import { contactInfo } from '@/lib/global_variables'
import FeedbackForm from './client'

export const metadata: Metadata = {
  title: `Feedback - Share Your Experience | ${contactInfo.websiteName}`,
  description:
    'Share your experience about your Jaipur–Thailand tour. Submit your feedback and help us improve our travel services.',
  keywords:
    'feedback, customer review, travel feedback, tour experience, jaipur thailand tour review, share experience',
  openGraph: {
    title: `Feedback - Share Your Experience | ${contactInfo.websiteName}`,
    description:
      'Share your experience about your Jaipur–Thailand tour. Submit your feedback and help us improve our travel services.',
    type: 'website',
  },
}

export default function FeedbackPage() {
  return <FeedbackForm />
}
