// /app/api/drift-data/route.ts
import { NextResponse } from 'next/server';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { DriftClient, User as DriftUser, Wallet } from '@drift-labs/sdk';
import { DRIFT_MARKET_INDEX_SOL, MICRO_CENTS_PER_USDC } from '@/utils/constants';
import { Keypair } from '@solana/web3.js';

let driftClient: DriftClient | null = null;

async function initializeDriftClient() {
  if (driftClient) return driftClient;

  const connection = new Connection("https://janella-g42vor-fast-mainnet.helius-rpc.com");
  const secretKeyString = process.env.NEXT_PUBLIC_DRIFT_KEYPAIR;
  if (!secretKeyString) throw new Error('Keypair path not found in environment variables');
  
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

function queryDriftBalance(user: DriftUser, marketIndex: number, decimalPlaces: number) {
  const rawBalance = user.getTokenAmount(marketIndex);
  const formattedBalance = Number(rawBalance.toString(10)) / decimalPlaces;
  return formattedBalance;
}

export async function GET(request: Request) {
  try {
    const clientPromise = initializeDriftClient();

    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const marketIndicesStr = searchParams.get('marketIndices');

    if (!address || !marketIndicesStr) {
      const error = "Missing parameter";
      console.log(error);
      return NextResponse.json({ error: error }, { status: 400 });
    }

    const marketIndices = marketIndicesStr.split(",").map(Number);

    if (marketIndices.some(isNaN)) {
      const error = "Invalid market index";
      console.log(error);
      return NextResponse.json({ error: error }, { status: 400 });
    }

    const client = await clientPromise;
    await client.emulateAccount(new PublicKey(address));
    const user = client.getUser();

    const balances = marketIndices.reduce((acc, marketIndex) => {
      const decimalPlaces = (marketIndex === DRIFT_MARKET_INDEX_SOL) ? LAMPORTS_PER_SOL : MICRO_CENTS_PER_USDC;
      acc[marketIndex] = queryDriftBalance(user, marketIndex, decimalPlaces);
      return acc;
    }, {} as { [key: number]: number });

    return NextResponse.json(balances);
  } catch (error) {
    console.error('Error fetching Drift balance:', error);
    return NextResponse.json({ error: 'Failed to fetch Drift balance' }, { status: 500 });
  }
}