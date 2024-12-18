import './global.css';
import { Inter } from 'next/font/google';
import { ReactQueryProvider } from '@/context/react-query-provider';
import dynamic from 'next/dynamic';
import { PostHogClient } from '@/context/posthog-provider';
import { SolanaProvider } from '@/context/solana/solana-provider';
import { ClusterProvider } from '@/context/solana/cluster-data-access';
import { ErrorProvider } from '@/context/error-provider';

const inter = Inter({ subsets: ['latin'] });

const PostHogPageView = dynamic(() => import('@/context/posthog-provider').then(mod => ({
  default: mod.PostHogPageView,
})), {
  ssr: false,
});

export const metadata = {
  title: 'Quartz',
  description: 'Quartz beta web app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ErrorProvider>
          <ReactQueryProvider>
            <PostHogClient>
              <SolanaProvider>
                <PostHogPageView />
                {children}
              </SolanaProvider>
            </PostHogClient>
          </ReactQueryProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
