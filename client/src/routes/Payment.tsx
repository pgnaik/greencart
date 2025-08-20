
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../root/CartContext'
import { api } from '../api'

declare global { interface Window { Razorpay?: any } }

function loadScript(src: string) {
  return new Promise<boolean>((resolve) => {
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

export default function Payment() {
  const nav = useNavigate()
  const { clear } = useCart()
  const totals = JSON.parse(sessionStorage.getItem('gc.totals') || '{"total":0}')
  const email = sessionStorage.getItem('gc.email') || 'demo@example.com'
  const [ready, setReady] = useState(false)
  const [usingRzp, setUsingRzp] = useState(false)

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js').then(ok => setReady(ok))
  }, [])

  const payRazorpay = async () => {
    try {
      setUsingRzp(true)
      const r = await api('/api/payments/razorpay/create-order', { method: 'POST', body: JSON.stringify({ amount: totals.total * 100 }) })
      const options = {
        key: r.keyId,
        amount: r.amount,
        currency: r.currency,
        name: 'GreenCart',
        description: 'Prototype payment',
        handler: function (response: any) {
          setUsingRzp(false); clear(); nav('/confirmation', { state: { paymentId: response.razorpay_payment_id || 'test_payment' } })
        },
        prefill: { name: 'Demo User', email }
      }
      const rz = new (window as any).Razorpay(options); rz.open()
    } catch (e) {
      setUsingRzp(false)
      alert('Razorpay not configured on server. Using mock payment.')
    }
  }

  const mockPay = async () => {
    const r = await api('/api/payments/mock', { method: 'POST', body: JSON.stringify({ amount: totals.total }) })
    clear(); nav('/confirmation', { state: { paymentId: r.paymentId } })
  }

  return (
    <div className="card p-6 max-w-lg mx-auto text-center">
      <div className="text-lg font-semibold">Payment</div>
      <div className="mt-2 text-sm">Amount payable</div>
      <div className="text-2xl font-extrabold">₹{totals.total?.toLocaleString('en-IN')}</div>
      <div className="mt-4 grid gap-3">
        <button className="btn btn-primary" onClick={payRazorpay} disabled={!ready || usingRzp}>{usingRzp ? 'Opening Razorpay…' : 'Pay with Razorpay (test)'}</button>
        <button className="btn btn-ghost" onClick={mockPay}>Mock Pay (no gateway)</button>
      </div>
    </div>
  )
}
