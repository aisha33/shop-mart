import { useSession } from "next-auth/react"
import Link from "next/link"

export default function HomePage() {

  return (
     
    <div className="container ">
      <div className=" text-black space-x-6 py-20">
    
        <div className=" flex flex-col gap-4 justify-center items-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to ShopMart</h1>
          <p className="text-lg mb-6">
            Discover the latest technology, fashion, and lifestyle products.
            Quality guaranteed with fast shipping and excellent customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">  <Link
            href="/products"
            className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-black transition-colors duration-200 "
          >
            Shop Now
          </Link>
          <Link
            href="/categories"
            className="bg-white text-black border-2 border-b-black  px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Browse Categories
          </Link></div>
        
        </div>
      </div>

      
     
    </div>
  )
}
