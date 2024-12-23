import './global.css';
import { Inter } from 'next/font/google';
import { ReactQueryProvider } from '@/src/context/react-query-provider';
import dynamic from 'next/dynamic';
import { PostHogClient } from '@/src/context/posthog-provider';
import { SolanaProvider } from '@/src/context/solana/solana-provider';
import { ClusterProvider } from '@/src/context/solana/cluster-data-access';
import { ErrorProvider } from '@/src/context/error-provider';
import { TxStatusProvider } from '../context/tx-status-provider';
import ErrorPopup from '../components/Popup/ErrorPopup/ErrorPopup';
import TxStatusPopup from '../components/Popup/TransactionStatusPopup/TxStatusPopup';
import ErrorModal from '../components/Modal/Variations/Error.Modal';

const inter = Inter({ subsets: ['latin'] });

const PostHogPageView = dynamic(() => import('@/src/context/posthog-provider').then(mod => ({
  default: mod.PostHogPageView,
})), {
  ssr: false,
});

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
              <ClusterProvider>
                <SolanaProvider>
                  <TxStatusProvider>
                    <PostHogPageView />
                    <ErrorPopup />
                    <ErrorModal />
                    <TxStatusPopup />
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
