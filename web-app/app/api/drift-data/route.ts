import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const marketIndicesStr = searchParams.get('marketIndices');

  if (!address) {
    const error = "Missing address";
    return NextResponse.json({ error: error }, { status: 400 });
  }

  if (!marketIndicesStr) {
    const error = "Missing market index";
    return NextResponse.json({ error: error }, { status: 400 });
  }

  const marketIndices = marketIndicesStr.split(",").map(Number);

  if (marketIndices.some(isNaN)) {
    const error = "Invalid market index";
    return NextResponse.json({ error: error }, { status: 400 });
  }

  try {
    const response = await fetch(`http://localhost:8080/drift-data?address=${address}&marketIndices=${marketIndices}`);
    // const response = await fetch(`https://quartz-server-puoxw.ondigitalocean.app/drift-data?address=${address}&marketIndices=${marketIndices}`);
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `Unable to fetch Drift balance from server: ${error}` }, { status: 500 });
  }
}