'use client'

import React, { useContext } from 'react'
import { WishlistContext } from '@/components/context/WishlistContext'
import { Loader } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import RatingIcon from '@/components/RatingIcon/RatingIcon'
import Image from 'next/image'
import AddToCart from '@/components/addToCart/AddToCart'
import Link from 'next/link'

export default function WishlistPage() {
  const { wishlistData, isLoading } = useContext(WishlistContext)

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    )
  }

  if (!wishlistData?.data || wishlistData.data.length === 0) {
    return <p className="text-center py-20 text-gray-500">Your wishlist is empty</p>
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Wishlist</h1>
      <div className="grid grid-cols-1  gap-4  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
       
        {wishlistData.data.map(product => (
          <div
            key={product._id}
            className="border rounded-xl   overflow-hidden shadow hover:shadow-lg transition relative" >
            <div className="relative w-full ">
            
  <Card >
  
    <Link href={'/products/'+product._id}>
    <CardHeader>
      <Image src={product.imageCover} alt="product" className="w-full" width={300} height={300}/>
          <CardDescription>{product.brand?.name}</CardDescription>

    <CardTitle>{product.title.split(' ',2).join('')}</CardTitle>
    <CardDescription>{product.category?.name}</CardDescription>
    
  </CardHeader>
  </Link>
  <CardContent>
    <div className="flex gap-2">
      
     <RatingIcon />
      <RatingIcon />
     <RatingIcon />
     <RatingIcon />

      
      
    
    </div>
    <p className="pt-5">Price:<span className="font-bold">{product.price}</span>EGP</p>
  </CardContent>
  <div className="flex items-center justify-center"><AddToCart   productId={product._id}/>
</div>


</Card>
</div>
</div>




















        ))}
      </div>
    </div>
  )
}
