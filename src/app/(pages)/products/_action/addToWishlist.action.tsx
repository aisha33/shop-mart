'use server'
import { getUserToken } from "../../api/Helpers/GetUserToken"

export async function AddToWishlistAction(productId:string) {
 const token = await getUserToken()
     const response = await fetch(`${process.env.API_URL}/wishlist`, {
      method: 'POST',
      body: JSON.stringify({ productId }),
      headers: {
        token: token!,
        'content-type': 'application/json'
      }

    })
    const data = await response.json()
    return data
  
}



