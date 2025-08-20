
import React from 'react'

export default function Profile() {
  return (
    <div className="grid gap-6">
      <div className="card p-5">
        <div className="text-lg font-semibold">Your Profile</div>
        <div className="mt-2 text-sm text-neutral-700">Orders, addresses, and Eco Index history will appear here.</div>
      </div>
      <div className="card p-5">
        <div className="text-lg font-semibold">Green Credits</div>
        <div className="mt-2 text-sm text-neutral-700">Every 100 GC unlocks +2% extra discount (max 20%).</div>
      </div>
    </div>
  )
}
