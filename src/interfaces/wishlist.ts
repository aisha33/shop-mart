// src/interfaces/index.ts
export interface WishlistItem {
  _id: string
  title: string
  price: number
  imageCover: string
  brand?: {
    _id: string
    name: string
  }
  category?: {
    _id: string
    name: string
  }
}

export interface WishlistResponse {
  status: string
  count: number
  data: WishlistItem[]
}
