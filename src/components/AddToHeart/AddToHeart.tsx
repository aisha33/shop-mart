'use client'
import React, { useContext, useMemo, useState } from 'react'
import { Heart } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { WishlistContext } from '../context/WishlistContext'
import { AddToWishlistAction } from '@/app/(pages)/products/_action/addToWishlist.action'

export default function AddToHeart({ productId }: { productId: string }) {
  const { wishlistData, setwishlistData } = useContext(WishlistContext)
  const [isLoading, setIsLoading] = useState(false)
  const session = useSession()
  const router = useRouter()

  const isInWishlist = useMemo(() => {
    return wishlistData?.data?.some(item => item._id === productId)
  }, [wishlistData, productId])

  async function handleWishlist() {
    if (session.status !== 'authenticated') {
      router.push('/login')
      return
    }

    setIsLoading(true)
    try {
      const data = await AddToWishlistAction(productId)
      if (data.status === 'success') {
        setwishlistData(data)
        toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Heart
      onClick={handleWishlist}
      size={22}
      className={`cursor-pointer transition-all duration-300 ${
        isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'
      } ${isLoading ? 'animate-pulse' : ''}`}
    />
  )
}
