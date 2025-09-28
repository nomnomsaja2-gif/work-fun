import type { Metadata } from 'next';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'WORK.FUN',
  description: 'Earn WORK tokens by doing simple social actions',
  openGraph: {
    title: 'WORK.FUN',
    description: 'Earn WORK tokens by doing simple social actions',
    images: ['/images/work-logo.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${NEXT_PUBLIC_URL}/images/work-logo.png`,
    'fc:frame:button:1': 'Get Started',
    'fc:frame:post_url': `${NEXT_PUBLIC_URL}/api/frame`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}