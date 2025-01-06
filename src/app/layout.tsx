import './global.css';
import { Inter } from 'next/font/google';
import { ReactQueryProvider } from '@/src/context/react-query-provider';
import { PostHogClient } from '@/src/context/posthog/posthog-provider';
import { SolanaProvider } from '@/src/context/solana/solana-provider';
import { ErrorProvider } from '@/src/context/error-provider';
import { TxStatusProvider } from '../context/tx-status-provider';
import ErrorPopup from '../components/Popup/ErrorPopup/ErrorPopup';
import TxStatusPopup from '../components/Popup/TransactionStatusPopup/TxStatusPopup';
import ErrorModal from '../components/Modal/Variations/Error.Modal';
import PostHogPageViewClient from '../context/posthog/PostHogPageView';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Quartz',
  description: 'Spend without selling',
  openGraph: {
    title: 'Quartz',
    description: 'Spend without selling',
    url: 'https://quartzpay.io',
    siteName: 'Quartz',
    images: [
      {
        url: 'https://cdn.prod.website-files.com/67504dd7fde047775f88c355/67504dd7fde047775f88c404_open-graph.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
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
                <TxStatusProvider>
                  <PostHogPageViewClient />
                  <ErrorPopup />
                  <ErrorModal />
                  <TxStatusPopup />
                  {children}
                </TxStatusProvider>
              </SolanaProvider>
            </PostHogClient>
          </ReactQueryProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
