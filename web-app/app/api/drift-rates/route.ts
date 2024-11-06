import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const marketIndicesStr = searchParams.get('marketIndices');

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
    // const response = await fetch(`http://localhost:8080/drift-rates?marketIndices=${marketIndices}`);
    const response = await fetch(`https://quartz-server-puoxw.ondigitalocean.app/drift-rates?marketIndices=${marketIndices}`);
    if (!response.ok) {
      const errorResponse = await response.json();
      return NextResponse.json({ error: `Unable to fetch Drift rates from server: ${errorResponse}` }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `Unable to fetch Drift rates from server: ${error}` }, { status: 500 });
  }
}