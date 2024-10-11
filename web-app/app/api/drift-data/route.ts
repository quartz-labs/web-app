// /app/api/drift-data/route.ts
import { NextResponse } from 'next/server';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { DriftClient, Wallet } from '@drift-labs/sdk';
import { DRIFT_MARKET_INDEX_SOL, MICRO_CENTS_PER_USDC } from '@/utils/constants';
import { Keypair } from '@solana/web3.js';

let driftClient: DriftClient | null = null;

async function initializeDriftClient() {
  if (driftClient) return driftClient;

  const rpcUrl = "https://janella-g42vor-fast-mainnet.helius-rpc.com";
  const connection = new Connection(rpcUrl);

  const secretKeyString = process.env.NEXT_PUBLIC_DRIFT_KEYPAIR;
  if (!secretKeyString) {
    throw new Error('Keypair path not found in environment variables');
  }

  const secretKey = new Uint8Array(JSON.parse(secretKeyString));
  const driftWallet = new Wallet(Keypair.fromSecretKey(secretKey));
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
    const marketIndexStr = searchParams.get('marketIndex');
    const marketIndex = Number(marketIndexStr);

    if (!address || !marketIndexStr) {
      return NextResponse.json({ error: 'Missing parameter' }, { status: 400 });
    }
    if (isNaN(marketIndex)) {
      return NextResponse.json({ error: 'Invalid market index' }, { status: 400 });
    }

    const emulationStatus = await client.emulateAccount(new PublicKey(address));
    if (!emulationStatus) throw new Error('Failed to emulate account');
    const user = client.getUser();

    const decimalPlaces = (marketIndex == DRIFT_MARKET_INDEX_SOL)
      ? LAMPORTS_PER_SOL
      : MICRO_CENTS_PER_USDC;

    const tokenAmount = user.getTokenAmount(marketIndex);
    const tokenBalance = Number(tokenAmount.toString(10)) / decimalPlaces;
    return NextResponse.json({ tokenAmount: tokenBalance });
  } catch (error) {
    console.error('Error fetching Drift balance:', error);
    return NextResponse.json({ error: 'Failed to fetch Drift balance' }, { status: 500 });
  }
}