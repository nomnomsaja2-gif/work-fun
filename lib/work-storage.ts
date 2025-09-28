"use client"

export type WorkActionType = "like" | "follow" | "repost"
export type WorkEntry = { id: string; type: WorkActionType; amount: number; at: number }
export type WorkUser = { balance: number; history: WorkEntry[] }

const USERS_KEY = "work:users"

const isBrowser = typeof window !== 'undefined'

function readAll(): Record<string, WorkUser> {
  if (!isBrowser) return {}
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeAll(map: Record<string, WorkUser>) {
  if (!isBrowser) return
  localStorage.setItem(USERS_KEY, JSON.stringify(map))
}

export function loadUser(address: string): WorkUser {
  const all = readAll()
  if (!all[address]) {
    all[address] = { balance: 0, history: [] }
    writeAll(all)
  }
  return all[address]
}

export function saveUser(address: string, data: WorkUser) {
  const all = readAll()
  all[address] = data
  writeAll(all)
}

export function getLeaderboard(current?: string) {
  const all = readAll()
  // Seed a few demo users for context
  if (isBrowser) {
    const seedKey = "work:seeded"
    if (!localStorage.getItem(seedKey)) {
      const demo = {
        "0x1111111111111111111111111111111111111111": { balance: 42, history: [] },
        "0x2222222222222222222222222222222222222222": { balance: 28, history: [] },
        "0x3333333333333333333333333333333333333333": { balance: 17, history: [] },
      } as Record<string, WorkUser>
      writeAll({ ...demo, ...all })
      localStorage.setItem(seedKey, "1")
    }
  }

  const merged = readAll()
  const rows = Object.entries(merged).map(([addr, u]) => ({
    address: addr,
    display: addr === current ? "You" : `${addr.slice(0, 6)}…${addr.slice(-4)}`,
    balance: u.balance ?? 0,
  }))
  rows.sort((a, b) => b.balance - a.balance)
  return rows
}
