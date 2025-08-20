
import React, { createContext, useContext, useMemo, useState } from 'react'
import type { Product } from '../types'

type CartLine = { product: Product, qty: number }
type CartState = {
  items: CartLine[]
  credits: number
  ecoIndex: number
  add: (p: Product, q?: number) => void
  remove: (id: string) => void
  setQty: (id: string, q: number) => void
  clear: () => void
  subtotal: number
  totalItems: number
  ecoDelta: number
  discountPct: number
  total: number
}

const Ctx = createContext<CartState | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([])
  const [credits, setCredits] = useState(860)
  const [ecoIndex] = useState(642)

  const add = (product: Product, q: number = 1) => {
    setItems(prev => {
      const i = prev.findIndex(l => l.product.id === product.id)
      if (i >= 0) {
        const next = [...prev]; next[i] = { ...next[i], qty: next[i].qty + q }
        return next
      }
      return [...prev, { product, qty: q }]
    })
  }
  const remove = (id: string) => setItems(prev => prev.filter(l => l.product.id !== id))
  const setQty = (id: string, q: number) => setItems(prev => prev.map(l => l.product.id === id ? { ...l, qty: Math.max(1, q) } : l))
  const clear = () => setItems([])

  const subtotal = useMemo(() => items.reduce((s, l) => s + l.product.price * l.qty, 0), [items])
  const totalItems = useMemo(() => items.reduce((s, l) => s + l.qty, 0), [items])
  const ecoDelta = useMemo(() => items.reduce((s, l) => s + (l.product.scoreDeltaOnPurchase || 0) * l.qty, 0), [items])

  // Server-authoritative pricing check happens on /checkout, this is optimistic UI:
  const discountPct = Math.min(20, Math.floor(860 / 100) * 2)
  const total = Math.max(0, Math.round(subtotal * (1 - discountPct/100)))

  const value: CartState = { items, credits, ecoIndex, add, remove, setQty, clear, subtotal, totalItems, ecoDelta, discountPct, total }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart outside provider')
  return ctx
}
