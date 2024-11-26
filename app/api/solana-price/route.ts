import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.quartzpay.io/data/price?asset=solana');
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "An unknown error occurred");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `Unable to fetch Solana price: ${error}` }, { status: 500 });
  }
}
