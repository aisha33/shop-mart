/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
'use client'

import Loading from '@/app/loading'
import CheckOut from '@/components/CheckOut/CheckOut'
import { CartContext } from '@/components/context/CartContext'
import { Button } from '@/components/ui/button'
import { CartResponse } from '@/interfaces'
import {  Loader, Trash } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { getUserToken } from '../api/Helpers/GetUserToken'
import Link from 'next/link'

export default function Cart() {
  const {cartData,isLoading,getCart,setCartData} = useContext(CartContext)
    const [removingId, setRemovingId] = useState<null| string>(null)
     const [updateingId, setUpdateingId] = useState<null| string>(null)
     const [isClear, setIsClear] = useState<boolean>(false)
 if (typeof cartData?.data.products[0]?.product==='string'|| cartData==null){
    getCart()
 }
//  Delete Item
 
 async function removeCartItem(productId:string){
  const token = await getUserToken()
     setRemovingId(productId)
     const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productId,{
        method: 'DELETE',
        headers: {
        token: token!
       
      }
     }

      )
    
     const data:CartResponse = await response.json()
    if(data.status=='success'){
       
        toast.success('product delete successfully')
        setCartData(data)
    }
       setRemovingId(null)
    }
    // update Item
    async function updateCartitem(productId:string,count:number) {
      const token = await getUserToken()
      setUpdateingId(productId)
     const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productId,{
        method: 'PUT',
        body:JSON.stringify({ count }),
        headers: {
        token:token!,
         'content-type': 'application/json'
       
      }
     }

      )
    
     const data:CartResponse = await response.json()
    if(data.status=='success'){
        toast.success('product quantity update successfully')
         setCartData(data)
    }
       setUpdateingId(null)
    }
     // clear Cart
    async function clearCart(){
        const token = await getUserToken()

     setIsClear(true)
     const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
        method: 'DELETE',
        headers: {
        token: token!
       
      }
     }

      )
    
     const data:CartResponse = await response.json()
    if(data.message=='success'){
        setCartData(null)
    }
       setIsClear(false)
    }



   
  return (
    <>
   
    {isLoading || typeof cartData?.data.products[0]?.product=='string' ?<Loading/>:cartData?.numOfCartItems! > 0?
     <section className="bg-white py-8 antialiased  md:py-16">
  <div className="mx-auto max-w-7xl px-4 2xl:px-0">
    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>
    <p>{cartData?.numOfCartItems} items in your cart</p>

    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
        <div className="space-y-6">     
           {cartData?.data.products.map((item)=>  
          <div key={item._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700  md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <a href="#" className="w-20 shrink-0 md:order-1">
                  <Image
         src={item.product.imageCover}
      alt={item.product.title}
      width={80}
      height={50}
    />
              </a>
              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                  <button type="button" disabled={item.count==1} onClick={()=>updateCartitem(item.product.id,item.count-1)} id="decrement-button-5" data-input-counter-decrement="counter-input-5" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600   ">
                    <svg className="h-2.5 w-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                    </svg>
                  </button>
                  
                  <span  className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 " > {updateingId == item.product.id?<Loader className='animate-spin'/>:item.count} </span> 
                  
                  <button type="button" onClick={()=>updateCartitem(item.product.id,item.count+1)} id="increment-button-5" data-input-counter-increment="counter-input-5" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600   ">
                    <svg className="h-2.5 w-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                  <p className="text-base font-bold text-gray-900 ">EGP{item.price}</p>
                </div>
              </div>

              <div className="w-full min-w-0 flex-1 space-y-2z md:order-2 md:max-w-md">
                <h2 className="text-base font-medium text-gray-900 hover:underline ">{item.product.title}</h2>
                <p>{item.product.brand.name}.{item.product.category.name}</p>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={()=>removeCartItem(item.product.id)}   className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                             {removingId == item.product.id &&<Loader className='animate-spin'/>}        Remove
                  </button>
                </div>
              </div>
            </div>
          </div>)}
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p className="text-xl font-semibold text-white ">Order summary</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-300 dark:text-gray-400">Subtotal : {cartData?.numOfCartItems}items</dt>
                <dd className="text-base font-medium text-gray-300 "> {cartData?.data.totalCartPrice} EGP</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-300 dark:text-gray-400">Shipping</dt>
                <dd className="text-base font-medium text-green-600">Free</dd>
              </dl>

            
            </div>

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt className="text-base font-bold text-gray-300 ">Total</dt>
              <dd className="text-base font-bold text-gray-300 "> {cartData?.data.totalCartPrice} EGP</dd>
            </dl>
          </div>

        <CheckOut cartId={cartData?.cartId!} />

          <div className="flex items-center justify-center gap-2">
            <Link href={'/products'} className='text-white ml-3 cursor-pointer'>
            <span className="text-sm font-normal  text-white"> or </span>
              Continue Shopping
             
            </Link>
             <svg className="h-5 w-5 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
              </svg>
          </div>
        </div>
        <Button onClick={clearCart} className='ms-auto mt-2 text-destructive bg-gray-200 hover:text-destructive flex cursor-pointer'>{isClear?<Loader  className='annimate-spin'/>:<Trash/>}Clear cart</Button>
      </div>
          
    </div>
  </div>
</section>:<div className='flex items-center min-h-[75vh] justify-center flex-col'>
<h2 className='text-2xl my-4'>Your Cart Item Is Empty</h2>

<Link href={'/products'} className="flex w-50 items-center justify-center bg-primary rounded-lg bg-primary-700 px-5 py-2.5 border border-black text-sm font-medium text-black ">Go to Products</Link>

 
  

</div>
   
}
    </>
  )
}
