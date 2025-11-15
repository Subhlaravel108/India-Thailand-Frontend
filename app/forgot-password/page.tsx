import { contactInfo } from "@/lib/global_variables"
import ClientForgotPass from "./ClientForgotPass"

import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: `Forgot Password - ${contactInfo.websiteName}`,
  description: `Forgot Password to your ${contactInfo.websiteName} account to access your dashboard and manage your tour information.`,
  robots: {
    index: false,
    follow: false,
  },
}
export default function forgotPassword(){
    return(
        <ClientForgotPass/>
    )
}