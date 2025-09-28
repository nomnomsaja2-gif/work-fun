import { NextResponse } from 'next/server';

const WARPCAST_API_BASE = 'https://api.farcaster.xyz/v2';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');

    if (!fid) {
      return NextResponse.json(
        { error: 'FID parameter is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${WARPCAST_API_BASE}/casts?query=from:${fid}`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Warpcast API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Farcaster casts:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch Farcaster casts';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}