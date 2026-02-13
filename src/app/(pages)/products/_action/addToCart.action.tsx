'use server'
import { getUserToken } from "../../api/Helpers/GetUserToken"

export async function AddToCartAction(productId:string) {
 const token = await getUserToken()
     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
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



