"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from "@/components/wallet-context"
import { useWork } from "@/hooks/use-work"
import { useToast } from "@/hooks/use-toast"
import { WorkBalanceCard } from "@/components/work-balance-card"
import Link from "next/link"

export default function EarnPage() {
  const { address, isConnected, connect } = useWallet()
  const { addAction } = useWork(address)
  const { toast } = useToast()

  const handle = async (type: "like" | "follow" | "repost") => {
    if (!isConnected) {
      await connect()
      return
    }
    const amount = type === "like" ? 1 : type === "follow" ? 3 : 5
    await addAction(type)
    toast({ title: `+${amount} WORK`, description: `Action recorded: ${type}` })
  }

  return (
    <div className="space-y-4">
      <WorkBalanceCard />

      <Card>
        <CardHeader>
          <CardTitle>Earn WORK</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Button onClick={() => handle("like")} className="w-full">
            Like (+1)
          </Button>
          <Button onClick={() => handle("follow")} className="w-full">
            Follow (+3)
          </Button>
          <Button onClick={() => handle("repost")} className="w-full">
            Repost (+5)
          </Button>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        View the{" "}
        <Link className="underline" href="/leaderboard">
          leaderboard
        </Link>
        .
      </div>
    </div>
  )
}
