import './global.css';
import { ClusterProvider } from '@/components/solana/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './providers/react-query-provider';
import { CSPostHogProvider } from './providers/posthog-provider'

export const metadata = {
  title: 'Quartz App',
  description: 'Quartz web app built for the Colosseum Radar hackathon',
};

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <CSPostHogProvider>
          <ReactQueryProvider>
            <ClusterProvider>
              <SolanaProvider>
                {children}
              </SolanaProvider>
            </ClusterProvider>
          </ReactQueryProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
