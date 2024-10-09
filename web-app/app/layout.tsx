import './global.css';
import { ClusterProvider } from '@/components/solana/cluster-data-access';
import { SolanaProvider, WalletButton } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';
import Image from 'next/image';

export const metadata = {
  title: 'Quartz',
  description: 'Quartz MVP built for the Colosseum Radar hackathon',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              {children}
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
