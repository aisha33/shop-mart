/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { WishlistResponse } from "@/interfaces/wishlist"
import { createContext, ReactNode, useEffect, useState } from "react"

interface WishlistContextType {
  wishlistData: WishlistResponse | null
  setwishlistData: (value: WishlistResponse | null) => void
  isLoading: boolean
  setIsLoading: (value: boolean) => void
  getWishlist: () => Promise<void>
}

export const WishlistContext = createContext<WishlistContextType>({
  wishlistData: null,
  setwishlistData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getWishlist: async () => {}
})

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
  const [wishlistData, setwishlistData] = useState<WishlistResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  
  
   
  
   async function getWishlist() {
     setIsLoading(true)
       const response= await fetch("http://localhost:3000/api/get-wishlist")
       const data:WishlistResponse = await response.json()
       setwishlistData(data)
       setIsLoading(false)
   }
       
  useEffect(() => {
    getWishlist()
  }, [])

  return (
    <WishlistContext.Provider value={{ wishlistData, setwishlistData, isLoading, setIsLoading, getWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}
