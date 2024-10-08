// /app/api/drift-data/route.ts
import { NextResponse } from 'next/server';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { DriftClient, Wallet, loadKeypair, PerpMarkets, PerpMarketConfig, BN } from '@drift-labs/sdk';
import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC, MICRO_CENTS_PER_USDC } from '@/utils/constants';

let driftClient: DriftClient | null = null;

async function initializeDriftClient() {
  if (driftClient) return driftClient;

  const rpcUrl = "https://janella-g42vor-fast-mainnet.helius-rpc.com";
  const connection = new Connection(rpcUrl);

  const keypairFile = process.env.NEXT_PUBLIC_DRIFT_KEYPAIR;
  if (!keypairFile) {
    throw new Error('Keypair path not found in environment variables');
  }

  const driftWallet = new Wallet(loadKeypair(keypairFile));
  driftClient = new DriftClient({
    connection,
    wallet: driftWallet,
    env: 'mainnet-beta',
  });

  await driftClient.subscribe();
  return driftClient;
}

export async function GET(request: Request) {
  try {
    const client = await initializeDriftClient();

    // Get address from GET params
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const token = searchParams.get('token');

    if (!address) {
      return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 });
    }
    if (!token) {
      return NextResponse.json({ error: 'Token parameter is required' }, { status: 400 });
    }

    const emulationStatus = await client.emulateAccount(new PublicKey(address));

    if (!emulationStatus) {
      throw new Error('Failed to emulate account');
    }


    const user = client.getUser();

    let marketIndex = DRIFT_MARKET_INDEX_SOL;
    let decimalPlaces = LAMPORTS_PER_SOL;
    if (token === 'USDC') {
      marketIndex = DRIFT_MARKET_INDEX_USDC;
      decimalPlaces = MICRO_CENTS_PER_USDC;
    }

    const tokenAmount = user.getTokenAmount(marketIndex);
    const tokenBalance = Number(tokenAmount.toString(10)) / decimalPlaces;
    return NextResponse.json({ tokenAmount: tokenBalance });
  } catch (error) {
    console.error('Error fetching Drift data:', error);
    return NextResponse.json({ error: 'Failed to fetch Drift data' }, { status: 500 });
  }
}