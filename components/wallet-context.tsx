"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

type WalletContextType = {
  address: string | null
  isConnected: boolean
  chainId?: string
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const BASE_CHAIN_ID_HEX = "0x2105" // 8453

function shorten(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

function getDemoAddress() {
  let a = localStorage.getItem("work:demoAddress")
  if (!a) {
    // naive pseudo address for demo only
    const rnd = Array.from(crypto.getRandomValues(new Uint8Array(20)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
    a = `0x${rnd}`
    localStorage.setItem("work:demoAddress", a)
  }
  return a
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string>()
  const isConnected = !!address

  const connect = useCallback(async () => {
    const eth = (globalThis as any)?.ethereum
    try {
      if (eth && typeof eth.request === "function") {
        const accounts: string[] = await eth.request({ method: "eth_requestAccounts" })
        const cid: string = await eth.request({ method: "eth_chainId" })
        setChainId(cid)
        if (cid !== BASE_CHAIN_ID_HEX) {
          try {
            await eth.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: BASE_CHAIN_ID_HEX }],
            })
            setChainId(BASE_CHAIN_ID_HEX)
          } catch (err: any) {
            // Try adding Base if not available
            if (err?.code === 4902) {
              await eth.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: BASE_CHAIN_ID_HEX,
                    chainName: "Base",
                    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
                    rpcUrls: ["https://mainnet.base.org"],
                    blockExplorerUrls: ["https://basescan.org"],
                  },
                ],
              })
              setChainId(BASE_CHAIN_ID_HEX)
            }
          }
        }
        const addr = accounts[0]
        setAddress(addr)
        localStorage.setItem("work:currentAddress", addr)
      } else {
        // Demo fallback
        const demo = getDemoAddress()
        setAddress(demo)
        setChainId("0xDEMO")
        localStorage.setItem("work:currentAddress", demo)
      }
    } catch {
      // If anything goes wrong, fall back to demo
      const demo = getDemoAddress()
      setAddress(demo)
      setChainId("0xDEMO")
      localStorage.setItem("work:currentAddress", demo)
    }
  }, [])

  const disconnect = useCallback(() => {
    setAddress(null)
    setChainId(undefined)
    localStorage.removeItem("work:currentAddress")
  }, [])

  useEffect(() => {
    const eth = (globalThis as any)?.ethereum
    const saved = localStorage.getItem("work:currentAddress")
    if (saved) {
      setAddress(saved)
    }
    if (eth) {
      const handleAccounts = (accs: string[]) => setAddress(accs?.[0] ?? null)
      const handleChain = (cid: string) => setChainId(cid)
      eth.on?.("accountsChanged", handleAccounts)
      eth.on?.("chainChanged", handleChain)
      eth
        .request?.({ method: "eth_chainId" })
        .then((cid: string) => setChainId(cid))
        .catch(() => {})
      return () => {
        eth.removeListener?.("accountsChanged", handleAccounts)
        eth.removeListener?.("chainChanged", handleChain)
      }
    }
  }, [])

  const value = useMemo(
    () => ({ address, isConnected, chainId, connect, disconnect }),
    [address, isConnected, chainId, connect, disconnect],
  )

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error("useWallet must be used within WalletProvider")
  return ctx
}
