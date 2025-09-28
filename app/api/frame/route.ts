import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

function generateFrameHtml({ buttonLabel = 'Get Started', image = '/images/work-logo.png' }) {
  return `
    <!DOCTYPE html><html><head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}${image}" />
      <meta property="fc:frame:button:1" content="${buttonLabel}" />
      <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame" />
      <meta property="og:image" content="${NEXT_PUBLIC_URL}${image}" />
      <meta property="fc:frame:button:1:action" content="post" />
    </head></html>
  `.trim();
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    console.log('Frame interaction:', body);

    return new NextResponse(
      generateFrameHtml({ 
        buttonLabel: 'Keep Going!',
        image: '/images/work-logo.png'
      })
    );
  } catch (error) {
    console.error('Frame error:', error);
    return new NextResponse(
      generateFrameHtml({
        buttonLabel: 'Try Again',
        image: '/images/work-logo.png'
      })
    );
  }
}

export async function GET(req: NextRequest): Promise<Response> {
  return new NextResponse(
    generateFrameHtml({
      buttonLabel: 'Get Started',
      image: '/images/work-logo.png'
    })
  );
}