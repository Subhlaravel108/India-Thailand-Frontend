'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { useState } from "react"

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  const app = (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  if (!googleClientId) {
    return app
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>{app}</GoogleOAuthProvider>
  )
}

