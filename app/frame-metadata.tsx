import { Metadata } from "next";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export const frameMetadata: Metadata = {
  title: "WORK.FUN",
  description: "Earn WORK by doing social actions. Like. Follow. Repost.",
  openGraph: {
    title: 'WORK.FUN',
    description: 'Earn WORK tokens by doing simple social actions',
    images: [`${NEXT_PUBLIC_URL}/images/work-logo.png`],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${NEXT_PUBLIC_URL}/images/work-logo.png`,
    'fc:frame:button:1': 'Get Started',
    'fc:frame:post_url': `${NEXT_PUBLIC_URL}/api/frame`,
  },
}