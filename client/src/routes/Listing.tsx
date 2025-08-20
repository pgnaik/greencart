
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { api } from '../api'

export default function Listing() {
  const [q, setQ] = useState('')
  const [recOnly, setRecOnly] = useState(true)
  const [minScore, setMinScore] = useState(70)
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => { api('/api/products').then(d => setItems(d.items)) }, [])

  const list = useMemo(() => {
    let l = [...items]
    const qq = q.toLowerCase()
    if (q.trim()) l = l.filter(p => (p.name + p.brand + p.description).toLowerCase().includes(qq))
    if (recOnly) l = l.filter(p => p.isRecommended)
    l = l.filter(p => p.sustainabilityScore >= minScore)
    return l
  }, [items, q, recOnly, minScore])

  return (
    <div className="grid gap-4">
      <div className="card p-4 flex flex-wrap items-center gap-3">
        <input className="input w-64" placeholder="Search…" value={q} onChange={e => setQ(e.target.value)} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={recOnly} onChange={e => setRecOnly(e.target.checked)} />
          Recommended only
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span>Min Eco Score</span>
          <input type="range" min={0} max={100} value={minScore} onChange={e => setMinScore(parseInt(e.target.value))} />
          <span className="w-8 text-right">{minScore}</span>
        </label>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(p => (
          <div className="card overflow-hidden" key={p.id}>
            <Link to={`/products/${p.id}`} className="block aspect-[4/3] bg-neutral-100">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
            </Link>
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs">
                {p.isRecommended && <span className="badge border-emerald-200 text-emerald-700">Recommended</span>}
                <span className="badge border-emerald-200 text-emerald-700">Sustainable</span>
              </div>
              <h3 className="mt-1 text-lg font-semibold">
                <Link to={`/products/${p.id}`} className="hover:underline">{p.name}</Link>
              </h3>
              <div className="text-sm text-neutral-600">by {p.brand}</div>
              <div className="mt-2 text-sm text-neutral-700 line-clamp-3">{p.description}</div>
              <div className="mt-2 text-xs text-neutral-600">Eco Score: <b>{p.sustainabilityScore}/100</b> • Impact: <b>{p.scoreDeltaOnPurchase >= 0 ? '+' : ''}{p.scoreDeltaOnPurchase}</b></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
