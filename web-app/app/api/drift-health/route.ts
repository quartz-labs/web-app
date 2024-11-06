import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    const error = "Missing address";
    return NextResponse.json({ error: error }, { status: 400 });
  }

  try {
    // const response = await fetch(`http://localhost:8080/drift-health?address=${address}`);
    const response = await fetch(`https://quartz-server-puoxw.ondigitalocean.app/drift-health?address=${address}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `Unable to fetch Drift health from server: ${error}` }, { status: 500 });
  }
}