export interface CartItem {
  _id: string
  product: {
    _id: string
    title: string
    imageCover: string
    price: number
  }
  quantity: number
  price: number
}
