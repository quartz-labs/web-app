import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch Solana price' }, { status: 500 });
  }
}