import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // const response = await fetch('http://localhost:8080/get-price?asset=solana');
    const response = await fetch('https://quartz-server-puoxw.ondigitalocean.app/get-price?asset=solana');
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `Unable to fetch Solana price: ${error}` }, { status: 500 });
  }
}
