
export async function api(path: string, init?: RequestInit) {
  const res = await fetch(path, { headers: { 'Content-Type': 'application/json' }, ...init })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
