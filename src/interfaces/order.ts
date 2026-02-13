export interface Order {
  _id: string
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  createdAt: string
  updatedAt: string
  shippingAddress: {
    details: string
    phone: string
    city: string
  }
  cartItems: {
    _id: string
    count: number
    price: number
    product: {
      title: string
      imageCover: string
      category: { name: string }
      brand: { name: string }
    }
  }[]
}
