
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../root/CartContext'
import { api } from '../api'

export default function Checkout() {
  const nav = useNavigate()
  const { items, credits } = useCart()
  const [form, setForm] = useState({ name: '', email: '', address: '', pin: '' })
  const canPay = form.name && form.email && form.address && form.pin

  const continueToPayment = async () => {
    // Ask backend for authoritative totals (including credits discount)
    const lines = items.map(l => ({ productId: l.product.id, qty: l.qty }))
    const priced = await api('/api/cart/price', { method: 'POST', body: JSON.stringify({ lines, credits }) })
    sessionStorage.setItem('gc.totals', JSON.stringify(priced))
    sessionStorage.setItem('gc.email', form.email)
    nav('/payment')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 card p-4">
        <div className="text-lg font-semibold">Shipping Details</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input className="input" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="input" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="input sm:col-span-2" placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          <input className="input" placeholder="PIN code" value={form.pin} onChange={e => setForm({ ...form, pin: e.target.value })} />
        </div>
      </div>
      <aside className="card p-4 h-fit">
        <div className="text-lg font-semibold">Payment</div>
        <button className="mt-3 w-full btn btn-primary" disabled={!canPay} onClick={continueToPayment}>Continue to Payment</button>
        {!canPay && <div className="mt-2 text-xs text-neutral-500">Fill shipping details to continue.</div>}
      </aside>
    </div>
  )
}
