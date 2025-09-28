"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from "@/components/wallet-context"
import { useWork } from "@/hooks/use-work"

export function WorkBalanceCard() {
  const { address, isConnected, connect } = useWallet()
  const { balance, history } = useWork(address)

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your WORK</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">Connect your wallet to see your WORK balance and history.</p>
          <button
            onClick={connect}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Connect Wallet
          </button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between rounded-md border p-3">
          <div className="text-sm text-muted-foreground">WORK Balance</div>
          <div className="text-xl font-semibold">{balance} WORK</div>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium">Recent activity</div>
          <ul className="space-y-2">
            {history.slice(0, 5).map((h) => (
              <li key={h.id} className="flex items-center justify-between rounded-md border p-2">
                <span className="capitalize">{h.type}</span>
                <span className="font-medium">+{h.amount}</span>
                <span className="text-xs text-muted-foreground">{new Date(h.at).toLocaleString()}</span>
              </li>
            ))}
            {history.length === 0 && <li className="text-sm text-muted-foreground">No activity yet.</li>}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
