import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field" 
import { Input } from "@/components/ui/input" 
import { Label } from "@/components/ui/label"  
import { getUserToken } from '@/app/(pages)/api/Helpers/GetUserToken'
export default function CheckOut({cartId}:{cartId:string}) { 
  const detailsInput=useRef<HTMLInputElement | null>(null) 
  const cityInput=useRef<HTMLInputElement | null>(null) 
  const phoneInput=useRef<HTMLInputElement | null>(null)
   async function checkOutSession(){ 
    const shippingAddress= { 
      details:detailsInput.current?.value, 
      phone:phoneInput.current?.value, 
      city:cityInput.current?.value 
    } 
      const token = await getUserToken()
       const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: 'POST',
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token: token!,
          "Content-Type": "application/json",
        },
      }
    )
    

    const data = await response.json()
    console.log(data)
    if (data.status === 'success') {
      window.location.href = data.session.url
    }
  }
   async function createCashOrder() {
    const shippingAddress = {
      details: detailsInput.current?.value,
      phone: phoneInput.current?.value,
      city: cityInput.current?.value
    }
 const token = await getUserToken()
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: 'POST',
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token: token!,
          'Content-Type': 'application/json'
        },
      })
   const data = await response.json()
    console.log(data)
    if (data.status === 'success') {
      window.location.href = '/allorders'
    }
  }
  return (
    <>
      <Dialog >
       
        <form > 
          <DialogTrigger asChild>
             <Button className='flex w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white' variant="outline">Proceed to Checkout</Button>
              </DialogTrigger> 
              <DialogContent className="sm:max-w-sm"> 
                <DialogHeader> 
                  <DialogTitle>Add Shopping Address</DialogTitle> 
                  <DialogDescription> Make sure that you entered correct address </DialogDescription> 
                  </DialogHeader>
                   <FieldGroup> 
                    <Field> 
                      <Label htmlFor="name-1">City</Label>
                       <Input ref={cityInput} id="name-1" /> 
                       </Field> <Field> <Label htmlFor="name-1">Details</Label>
                        <Input ref={detailsInput} id="name-1" />
                         </Field> 
                         <Field>
                           <Label htmlFor="username-1">Phone</Label>
                           <Input ref={phoneInput} id="username-1" />
                            </Field> 
                            </FieldGroup>
                             <DialogFooter> 
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button> 
                                </DialogClose>
                                 <Button className='bg-black text-white' type="button" onClick={() => checkOutSession()}>Visa</Button>
                                  <Button className='bg-black text-white' type="submit" onClick={()=>createCashOrder()}>Cash</Button> </DialogFooter> </DialogContent> 
                                  </form> 
                                 
              </Dialog>                    
                                   </>
  )
}