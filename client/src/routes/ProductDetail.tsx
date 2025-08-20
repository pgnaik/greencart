
import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import type { Product } from '../types'
import { api } from '../api'
import { useCart } from '../root/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const [item, setItem] = useState<Product | null>(null)
  const [qty, setQty] = useState(1)
  const { add } = useCart()

  useEffect(() => { api('/api/products/' + id).then(setItem) }, [id])
  if (!item) return <div>Loading…</div>

  const subtotal = item.price * qty
  const ecoDelta = (item.scoreDeltaOnPurchase || 0) * qty

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-3">
        <div className="aspect-[4/3] rounded-2xl bg-neutral-100 overflow-hidden">
          <img src={item.image} className="w-full h-full object-cover" />
        </div>
      </div>

      <div>
        <div className="text-sm text-neutral-600 mb-2"><Link to="/products" className="hover:underline">← Back to products</Link></div>
        <div className="flex items-center gap-2 text-xs">
          {item.isRecommended && <span className="badge border-emerald-200 text-emerald-700">Recommended</span>}
          <span className="badge border-emerald-200 text-emerald-700">Sustainable</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold">{item.name}</h1>
        <div className="text-sm text-neutral-600">Brand: <b>{item.brand}</b></div>

        <p className="mt-3 text-sm text-neutral-700">{item.longDescription || item.description}</p>

        <div className="mt-4 card p-4">
          <div className="flex items-center justify-between text-sm">
            <span>Sustainability Score</span>
            <b>{item.sustainabilityScore}/100</b>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded bg-neutral-100">
            <div className="h-full bg-emerald-500" style={{ width: `${item.sustainabilityScore}%` }} />
          </div>
          <div className="mt-2 text-sm text-emerald-700">Buying impact: {item.scoreDeltaOnPurchase >= 0 ? '+' : ''}{item.scoreDeltaOnPurchase}</div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm">Qty</span>
          <div className="flex items-center rounded-xl border bg-white">
            <button className="btn btn-ghost" onClick={() => setQty(q => Math.max(1, q-1))}>−</button>
            <div className="w-10 text-center text-sm">{qty}</div>
            <button className="btn btn-ghost" onClick={() => setQty(q => q+1)}>+</button>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => { if (item) { add(item, qty); nav('/cart') } }}
          >Add to Cart</button>
        </div>

        <div className="mt-3 text-sm text-neutral-700">
          Subtotal: <b>₹{subtotal.toLocaleString('en-IN')}</b> • Eco Index change: <b className="text-emerald-700">{ecoDelta >= 0 ? `+${ecoDelta}` : ecoDelta}</b>
        </div>
      </div>
    </div>
  )
}
