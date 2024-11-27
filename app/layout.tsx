import './global.css';
import { ClusterProvider } from '@/context/solana/cluster-data-access';
import { SolanaProvider } from '@/context/solana/solana-provider';
import { PostHogClient } from '../context/posthog/posthog-provider';


export const metadata = {
  title: 'Quartz App',
  description: 'Quartz web app built for the Colosseum Radar hackathon',
};

import { Inter } from 'next/font/google';
import ErrorPopup from '@/components/Popup/ErrorPopup/ErrorPopup';
import { ErrorProvider } from '@/context/error-provider';
import ErrorModal from '@/components/Modals/Variations/ErrorModal';
import { TxStatusProvider } from '@/context/tx-status-provider';
import TxStatusPopup from '@/components/Popup/TransactionStatusPopup/TxStatusPopup';
import { ReactQueryProvider } from '@/context/react-query-provider';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

const PostHogPageView = dynamic(() => import('@/context/posthog/PostHogPageView'), {
  ssr: false,
});

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
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <PostHogClient>
              <ClusterProvider>
                <SolanaProvider>
                  <TxStatusProvider>
                    <ErrorPopup/>
                    <ErrorModal/>
                    <TxStatusPopup/>
                    <PostHogPageView/>
                    {children}
                  </TxStatusProvider>
                </SolanaProvider>
              </ClusterProvider>
            </PostHogClient>
          </ReactQueryProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
