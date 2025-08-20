
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Confirmation() {
  const { state } = useLocation() as any
  const pid = state?.paymentId || 'mock_payment'
  return (
    <div className="card p-6 text-center max-w-lg mx-auto">
      <div className="text-2xl">🎉 Order Confirmed</div>
      <div className="mt-2 text-sm text-neutral-600">Payment ID: <b>{pid}</b></div>
      <Link to="/products" className="mt-4 inline-block btn btn-primary">Continue Shopping</Link>
    </div>
  )
}
