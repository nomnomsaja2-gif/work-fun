"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from "@/components/wallet-context"
import { getLeaderboard } from "@/lib/work-storage"

export default function LeaderboardPage() {
  const { address } = useWallet()
  const rows = getLeaderboard(address || undefined).slice(0, 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-2">
          {rows?.map((r, idx) => (
            <li
              key={r.address}
              className={`flex items-center justify-between rounded-md border p-2 ${r.address === address ? "bg-accent" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-center">{idx + 1}</span>
                <span className="font-mono text-sm">{r.display}</span>
              </div>
              <span className="font-semibold">{r.balance} WORK</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-muted-foreground">
          Prototype leaderboard: local to your browser. Connect your wallet and earn to climb.
        </p>
      </CardContent>
    </Card>
  )
}
