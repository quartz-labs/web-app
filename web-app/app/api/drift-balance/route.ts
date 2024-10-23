import { NextResponse } from 'next/server';

export async function GET(request: Request) {
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

  try {
    const response = await fetch(`https://quartz-server-puoxw.ondigitalocean.app/drift-balance?address=${address  }&marketIndices=${marketIndices}`)
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `Unable to fetch Solana price: ${error}` }, { status: 500 });
  }
}