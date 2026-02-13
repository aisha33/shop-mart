
'use client'

import { useEffect, useState } from 'react'
import { getUserToken } from '../api/Helpers/GetUserToken'
import { Order } from '@/interfaces'
import { Loader } from 'lucide-react'



export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    setUserId(storedUserId)
  }, [])

  useEffect(() => {
    if (!userId) return

    const fetchOrders = async () => {
      try {
        const token = await getUserToken()
        if (!token) {
          console.log('No token found')
          setIsLoading(false)
          return
        }

        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
          {
            headers: { token },
          }
        )

        const data = await res.json()
        console.log('Data from API:', data)

        setOrders(data.data || data)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [userId])

  if (isLoading) return <h2 className="text-center mt-10 text-xl"><Loader className='animate-spin'/></h2>
  if (!orders.length) return <h2 className="text-center mt-10 text-xl">You dont have any orders yet.</h2>

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.map((order) => (
  <div
    key={order._id}
    className="bg-white border rounded-xl p-6 mb-8 shadow-sm"
  >
    {/* Order Title */}
    <h2 className="text-xl font-semibold mb-4">
      Order #{order._id.slice(-5)}
    </h2>

    {/* Order Info */}
    <div className="space-y-1 text-sm text-gray-700">
      <p>
        Order Date:{' '}
        {new Date(order.createdAt).toLocaleString()}
      </p>

      <p>
        Payment: {order.paymentMethodType}{' '}
        <span
          className={`font-medium ${
            order.isPaid ? 'text-green-600' : 'text-red-600'
          }`}
        >
          ({order.isPaid ? 'Paid' : 'Unpaid'})
        </span>
      </p>

      <p>
        Delivered:{' '}
        <span
          className={`font-medium ${
            order.isDelivered
              ? 'text-green-600'
              : 'text-yellow-600'
          }`}
        >
          {order.isDelivered ? 'Yes' : 'No'}
        </span>
      </p>

      <p className="font-semibold mt-1">
        Total: {order.totalOrderPrice} EGP
      </p>
    </div>
    {/* Button + Last Updated */}
    <div className="flex justify-between items-center mt-6">
      <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition">
        View Order Items
      </button>

      <p className="text-xs text-gray-500">
        Last updated:{' '}
        {new Date(order.updatedAt).toLocaleString()}
      </p>
    </div>
  </div>
))}

    </div>
  )
}
