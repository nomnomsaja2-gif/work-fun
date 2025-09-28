import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export async function POST(req: NextRequest): Promise<Response> {
  const body = await req.json();

  // For now, just return the next frame
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/images/work-logo.png" />
        <meta property="fc:frame:button:1" content="Keep Going!" />
        <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame" />
      </head>
    </html>`
  );
}

export async function GET(req: NextRequest): Promise<Response> {
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/images/work-logo.png" />
        <meta property="fc:frame:button:1" content="Get Started" />
        <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame" />
      </head>
    </html>`
  );
}