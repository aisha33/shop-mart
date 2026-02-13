'use client'
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Order } from "@/interfaces"
import { Loader } from "lucide-react"

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showItems, setShowItems] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const fetchOrders = async () => {
      if (status !== "authenticated") return

      const userId = session?.user?._id || session?.user?._id
      const token = session?.token || session?.token
      if (!userId || !token) {
        setIsLoading(false)
        return
      }

      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
          {
            headers: { token },
          }
        )
        const data = await res.json()
        console.log("Orders API Response:", data)
        setOrders(data.data || [])
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [status, session])

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-12 h-12 text-gray-500" />
      </div>
    )
  }

  
  if (!session) {
    return (
      <p className="text-center mt-10 text-xl">
        Please login to see your orders
      </p>
    )
  }

  // No orders
  if (!orders.length) {
    return (
      <p className="text-center mt-10 text-xl">
        You dont have any orders yet.
      </p>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Order #{order._id.slice(-5)}
              </h2>

              <button
                onClick={() =>
                  setShowItems((prev) => ({
                    ...prev,
                    [order._id]: !prev[order._id],
                  }))
                }
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                {showItems[order._id] ? "Hide Items" : "View Items"}
              </button>
            </div>

            <div className="space-y-1 text-sm text-gray-700">
              <p>
                Order Date: {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                Payment: {order.paymentMethodType}{" "}
                <span
                  className={`font-medium ${
                    order.isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ({order.isPaid ? "Paid" : "Unpaid"})
                </span>
              </p>
              <p>
                Delivered:{" "}
                <span
                  className={`font-medium ${
                    order.isDelivered ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {order.isDelivered ? "Yes" : "No"}
                </span>
              </p>
              <p className="font-semibold mt-1">
                Total: {order.totalOrderPrice} EGP
              </p>
            </div>

            {/* Cart Items Toggle */}
            {showItems[order._id] && (
              <div className="mt-4 border-t pt-4 space-y-2">
                <h3 className="font-semibold mb-2">Products:</h3>
                <ul className="space-y-2">
                  {order.cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center gap-4 border p-2 rounded-lg"
                    >
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="text-sm">
                        <p className="font-medium">{item.product.title}</p>
                        <p>Category: {item.product.category.name}</p>
                        <p>Brand: {item.product.brand.name}</p>
                        <p>Quantity: {item.count}</p>
                        <p>Price: {item.price} EGP</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
