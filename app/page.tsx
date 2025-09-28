"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-context"
import { WorkBalanceCard } from "@/components/work-balance-card"
import Link from "next/link"

export default function HomePage() {
  const { isConnected, connect } = useWallet()

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-balance">Welcome to WORK.FUN</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Earn WORK tokens by doing simple social actions. Connect your Base wallet to start.
          </p>
          {!isConnected ? (
            <Button onClick={connect} className="w-full">
              Connect Base Wallet
            </Button>
          ) : (
            <div className="flex items-center justify-between rounded-md border p-3">
              <p className="text-sm">Wallet connected</p>
              <Link href="/earn">
                <Button variant="default">Start Earning</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      <WorkBalanceCard />
    </div>
  )
}
