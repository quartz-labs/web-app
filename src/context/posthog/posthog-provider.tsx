"use client";

import config from '@/src/config/config';
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider, usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

if (typeof window !== 'undefined') {
  posthog.init(config.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: config.NEXT_PUBLIC_POSTHOG_HOST,
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

export function PostHogPageView() : null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  // Track page views
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture(
        '$pageview',
        {
          '$current_url': url,
        }
      )
    }
  }, [pathname, searchParams, posthog]);
  
  return null;
}