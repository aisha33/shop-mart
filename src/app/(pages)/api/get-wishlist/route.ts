import { WishlistResponse } from "@/interfaces"
import { NextResponse } from "next/server"
import { getUserToken } from "../Helpers/GetUserToken"

export async function GET(){
  const token = await getUserToken()
   const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
         headers: {
           token: token!
         }
   
       })
       const data:WishlistResponse = await response.json()
return NextResponse.json(data)
}