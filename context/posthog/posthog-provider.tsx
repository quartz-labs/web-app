'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false
  })
}

export function PostHogClient({ children }: { children: React.ReactNode }) {
    return (
      <PostHogProvider client={posthog}>
        {children}
      </PostHogProvider>
    );
}