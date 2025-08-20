
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../root/CartContext'

export default function Cart() {
  const nav = useNavigate()
  const { items, remove, setQty, subtotal, ecoDelta, discountPct, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="card p-6 text-center">
        <div className="text-lg font-semibold">Your cart is empty</div>
        <Link to="/products" className="mt-2 inline-block btn btn-primary">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 card p-4">
        {items.map(l => (
          <div key={l.product.id} className="flex items-center gap-3 border-b py-3 last:border-b-0">
            <img src={l.product.image} className="h-16 w-16 rounded-xl object-cover" />
            <div className="flex-1">
              <div className="text-sm font-medium">{l.product.name}</div>
              <div className="text-xs text-neutral-600">{l.product.brand}</div>
              <div className="text-xs text-emerald-700">Impact: {l.product.scoreDeltaOnPurchase >= 0 ? '+' : ''}{l.product.scoreDeltaOnPurchase} • Score {l.product.sustainabilityScore}</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-ghost" onClick={() => setQty(l.product.id, l.qty-1)}>−</button>
              <div className="w-8 text-center text-sm">{l.qty}</div>
              <button className="btn btn-ghost" onClick={() => setQty(l.product.id, l.qty+1)}>+</button>
            </div>
            <div className="w-24 text-right text-sm">₹{(l.product.price * l.qty).toLocaleString('en-IN')}</div>
            <button className="btn btn-ghost" onClick={() => remove(l.product.id)}>Remove</button>
          </div>
        ))}
      </div>

      <aside className="card p-4 h-fit">
        <div className="text-lg font-semibold">Order Summary</div>
        <div className="mt-2 flex justify-between text-sm"><span>Subtotal</span><b>₹{subtotal.toLocaleString('en-IN')}</b></div>
        <div className="flex justify-between text-sm"><span>Eco Index change</span><b className="text-emerald-700">{ecoDelta >= 0 ? `+${ecoDelta}` : ecoDelta}</b></div>
        <div className="flex justify-between text-sm"><span>Credits discount</span><b>{discountPct}%</b></div>
        <div className="mt-2 border-t pt-2 flex justify-between"><span>Total</span><b>₹{total.toLocaleString('en-IN')}</b></div>
        <button className="mt-3 w-full btn btn-primary" onClick={() => nav('/checkout')}>Proceed to Checkout</button>
      </aside>
    </div>
  )
}
