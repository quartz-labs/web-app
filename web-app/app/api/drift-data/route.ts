// /app/api/drift-data/route.ts
import { NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js'
import { DriftClient, Wallet, loadKeypair, PerpMarkets, PerpMarketConfig, BN } from '@drift-labs/sdk';

// Interface for the enhanced market data
interface EnhancedMarketData {
  symbol: string;
  price: number;
  volume24h: number;
  openInterest: number;
}

// Start of Selection
export async function GET(request: Request) {
  console.log('Starting GET request to /api/drift-data');
  try {
    // Initialize connection to Solana devnet
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://api.mainnet.solana.com';
    console.log('RPC URL:', rpcUrl);
    const connection = new Connection(rpcUrl);

    // Get address from GET params
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    if (!address) {
      return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 });
    }
    console.log('Address from params:', address);
    console.log(`Solana ${connection.rpcEndpoint} connection established successfully`);

    // Load the keypair from the environment variable
    const keypairFile = process.env.NEXT_PUBLIC_KEYPAIR_FILE || "~/.config/solana/id.json";
    console.log('Keypair file path:', keypairFile);
    if (!keypairFile) {
      throw new Error('Keypair path not found in environment variables');
    }

    // Create wallet instance
    console.log('Loading keypair...');
    const wallet = new Wallet(loadKeypair(keypairFile));
    console.log('Wallet created successfully with public key:', wallet.publicKey.toString());

    // Initialize Drift client
    console.log('Initializing Drift client...');
    const driftClient = new DriftClient({
      connection,
      wallet,
      env: 'devnet',
    });
    console.log('Drift client initialized successfully');

    // Initialize the Drift client
    console.log('Subscribing to Drift client...');
    await driftClient.subscribe();
    console.log('Drift client subscribed successfully');

    const emulationStatus = await driftClient.emulateAccount(new PublicKey(address));

    if (!emulationStatus) {
      throw new Error('Failed to emulate account');
    }

    console.log('Getting drift user..');

    const user = driftClient.getUser();
    console.log(user);

    const marketIndex = 1

    const tokenAmount = user.getTokenAmount(
      marketIndex,
    );

    const solBalance = tokenAmount.div(new BN(10).pow(new BN(6)));
    console.log("sol balance", solBalance.toString(10));

    console.log("drift token amount for market index 1", tokenAmount.toString(10));

    return NextResponse.json({ tokenAmount: tokenAmount });
  } catch (error) {
    console.error('Error fetching Drift data:', error);
    return NextResponse.json({ error: 'Failed to fetch Drift data' }, { status: 500 });
  }
}