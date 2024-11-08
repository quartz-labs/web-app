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
import ErrorPopup from '@/components/Popup/ErrorPopup/ErrorPopup';
import { ErrorProvider } from '@/context/error-provider';
import ErrorModal from '@/components/Modals/Variations/ErrorModal';
import { TxStatusProvider } from '@/context/tx-status-provider';
import TxStatusPopup from '@/components/Popup/TransactionStatusPopup/TxStatusPopup';

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
          <TxStatusProvider>
            <CSPostHogProvider>
              <ReactQueryProvider>
                <ClusterProvider>
                  <SolanaProvider>
                    <ErrorPopup/>
                    <ErrorModal/>
                    <TxStatusPopup/>
                    {children}
                  </SolanaProvider>
                </ClusterProvider>
              </ReactQueryProvider>
            </CSPostHogProvider>
          </TxStatusProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
