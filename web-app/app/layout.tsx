import './global.css';
import { ClusterProvider } from '@/context/solana/cluster-data-access';
import { SolanaProvider } from '@/context/solana/solana-provider';
import { ReactQueryProvider } from '../context/react-query-provider';
import { CSPostHogProvider } from '../context/posthog-provider'

export const metadata = {
  title: 'Quartz App',
  description: 'Quartz web app built for the Colosseum Radar hackathon',
};

import { Inter } from 'next/font/google';
import ErrorPopup from '@/components/ErrorPopup/ErrorPopup';
import { ErrorProvider } from '@/context/error-provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <html lang="en" className={inter.className}>
      <body>
        <ErrorProvider>
          <CSPostHogProvider>
            <ReactQueryProvider>
              <ClusterProvider>
                <SolanaProvider>
                  <ErrorPopup/>
                  {children}
                </SolanaProvider>
              </ClusterProvider>
            </ReactQueryProvider>
          </CSPostHogProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
