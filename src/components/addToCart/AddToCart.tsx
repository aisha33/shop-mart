'use client'
import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Loader, ShoppingCartIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { CartContext } from '../context/CartContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AddToCartAction } from '@/app/(pages)/products/_action/addToCart.action copy'


export default function AddToCart({ productId }: { productId: string }) {
  const {setCartData} = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(false)
  const session =useSession()
  const router=useRouter()
  async function Addproducttocart() {
    
    if (session.status =='authenticated'){
       setIsLoading(true)
   const data = await AddToCartAction(productId)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    data.status == 'success' && toast.success('product add successfully')
    setCartData(data)
  //  await getCart()
    setIsLoading(false)
    }else{
        router.push('/login')
    }

   

  }
  return <>
    <CardFooter className="gap-2 mt-3">
      <Button onClick={Addproducttocart} className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-black w-40 transition-colors duration-200 " >{isLoading ? <Loader className='animate-spin' /> : <ShoppingCartIcon />}Add To Cart</Button>
    </CardFooter>


  </>

}
