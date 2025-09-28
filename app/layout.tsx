import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import Image from "next/image"
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster"
import { WalletProvider } from "@/components/wallet-context"
import { cn } from "@/lib/utils"
import { Suspense } from "react"
import "./globals.css"

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "WORK.FUN",
  description: "Earn WORK by doing social actions. Like. Follow. Repost.",
  generator: "v0.app",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("font-sans min-h-dvh bg-background text-foreground", GeistSans.variable, GeistMono.variable)}>
        <Suspense fallback={<div>Loading...</div>}>
          <WalletProvider>
            <header className="sticky top-0 z-30 border-b bg-card">
              <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
                <Link href="/" className="flex items-center gap-2">
                  <Image src="/images/work-logo.png" alt="WORK.FUN logo" width={28} height={28} priority />
                  <span className="text-lg font-semibold tracking-tight">WORK.FUN</span>
                </Link>
              </div>
            </header>

            <main className="mx-auto w-full max-w-5xl px-4 py-5">{children}</main>

            {/* Bottom nav for mobile */}
            <footer className="sticky bottom-0 z-30 border-t bg-card">
              <nav className="mx-auto flex max-w-5xl items-center justify-around px-4 py-2 text-sm">
                <Link href="/" className="px-3 py-1 rounded-md hover:bg-accent">
                  Home
                </Link>
                <Link href="/earn" className="px-3 py-1 rounded-md hover:bg-accent">
                  Earn
                </Link>
                <Link href="/leaderboard" className="px-3 py-1 rounded-md hover:bg-accent">
                  Leaderboard
                </Link>
              </nav>
            </footer>
            <Toaster />
          </WalletProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
