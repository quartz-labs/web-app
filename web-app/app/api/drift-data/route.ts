// /app/api/drift-data/route.ts
import { NextResponse } from 'next/server';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { DriftClient, Wallet, loadKeypair, PerpMarkets, PerpMarketConfig, BN } from '@drift-labs/sdk';

let driftClient: DriftClient | null = null;

async function initializeDriftClient() {
  if (driftClient) return driftClient;

  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://api.mainnet.solana.com';
  console.log('RPC URL:', rpcUrl);
  const connection = new Connection(rpcUrl);

  const keypairFile = process.env.NEXT_PUBLIC_KEYPAIR_FILE || "~/.config/solana/id.json";
  console.log('Keypair file path:', keypairFile);
  if (!keypairFile) {
    throw new Error('Keypair path not found in environment variables');
  }

  console.log('Loading keypair...');
  const wallet = new Wallet(loadKeypair(keypairFile));
  console.log('Wallet created successfully with public key:', wallet.publicKey.toString());

  console.log('Initializing Drift client...');
  driftClient = new DriftClient({
    connection,
    wallet,
    env: 'devnet',
  });

  console.log('Subscribing to Drift client...');
  await driftClient.subscribe();
  console.log('Drift client subscribed successfully');

  return driftClient;
}

export async function GET(request: Request) {
  console.log('Starting GET request to /api/drift-data');
  try {
    const client = await initializeDriftClient();

    // Get address from GET params
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    if (!address) {
      return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 });
    }
    console.log('Address from params:', address);

    const emulationStatus = await client.emulateAccount(new PublicKey(address));

    if (!emulationStatus) {
      throw new Error('Failed to emulate account');
    }

    console.log('Getting drift user..');

    const user = client.getUser();

    const marketIndex = 1

    const tokenAmount = user.getTokenAmount(
      marketIndex,
    );

    const solBalance = Number(tokenAmount.toString(10)) / LAMPORTS_PER_SOL;

    console.log('Sol balance:', solBalance);

    return NextResponse.json({ tokenAmount: solBalance });
  } catch (error) {
    console.error('Error fetching Drift data:', error);
    return NextResponse.json({ error: 'Failed to fetch Drift data' }, { status: 500 });
  }
}