
export type Product = {
  id: string
  name: string
  brand: string
  price: number
  mrp: number
  currency: string
  image: string
  description: string
  longDescription?: string
  isRecommended: boolean
  sustainabilityScore: number
  scoreDeltaOnPurchase: number
  badges: string[]
}
