'use client';

import dynamic from 'next/dynamic';

const PostHogPageView = dynamic(
  () => import('@/src/context/posthog/posthog-provider').then(mod => ({
    default: mod.PostHogPageView,
  })),
  {
    ssr: false,
  }
);

export default function PostHogPageViewClient() {
  return <PostHogPageView />;
}