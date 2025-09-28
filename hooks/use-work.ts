"use client"

import useSWR, { mutate as globalMutate } from "swr"
import { loadUser, saveUser, type WorkActionType } from "@/lib/work-storage"

export function useWork(address: string | null) {
  const key = address ? `work:user:${address}` : null

  const { data } = useSWR(
    key,
    () => {
      if (!address) return { balance: 0, history: [] }
      return loadUser(address)
    },
    { fallbackData: { balance: 0, history: [] } },
  )

  async function addAction(type: WorkActionType) {
    if (!address) return
    const current = loadUser(address)
    const amount = type === "like" ? 1 : type === "follow" ? 3 : 5
    const entry = { id: crypto.randomUUID(), type, amount, at: Date.now() }
    const next = { balance: current.balance + amount, history: [entry, ...current.history] }
    saveUser(address, next)
    await globalMutate(key, next, false)
  }

  return {
    balance: data?.balance ?? 0,
    history: data?.history ?? [],
    addAction,
  }
}
