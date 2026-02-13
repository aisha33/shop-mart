'use client'
import { CartResponse } from "@/interfaces"
import { createContext,ReactNode,useEffect,useState } from "react"

export const CartContext=createContext<{
cartData:CartResponse|null,
setCartData:(value:CartResponse|null)=> void,
isLoading:boolean,
setIsLoading:(value:boolean)=> void,
getCart:()=> void


}>({cartData:null,
setCartData:()=> {},
isLoading:false,
setIsLoading:()=> {},
getCart:()=>{}
})


export default function CartContextProvider({children}:{children:ReactNode}){
const [cartData, setCartData] = useState<CartResponse|null>(null)
const [isLoading, setIsLoading]= useState(false)

 async function getCart() {
  setIsLoading(true)
    const response= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-cart`)
    const data:CartResponse = await response.json()
    setCartData(data)
    console.log(data)
    setIsLoading(false)
}



useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  getCart()

 },[])


return(
    <CartContext.Provider value={{cartData,setCartData,isLoading,setIsLoading,getCart}}> 

        {children}
    </CartContext.Provider>

)


}
