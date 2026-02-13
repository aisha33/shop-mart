'use client'
import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
 
} from "@/components/ui/navigation-menu"

// import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { HeartIcon, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { CartContext } from '@/components/context/CartContext'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const {cartData,isLoading} = useContext(CartContext)
  const session=useSession()
  console.log(session);
  
  return (
    <>
    <nav className='bg-gray-200 p-5 sticky top-0'>
     <div className='container mx-auto'>     
        <div className='flex items-center justify-between'>
                <h1><Link href={'/'}>ShopMart</Link></h1>
<NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
<NavigationMenuLink  asChild >
        <Link href="/products">Products</Link>
      </NavigationMenuLink>
      </NavigationMenuItem>
       <NavigationMenuItem>
<NavigationMenuLink  asChild >
        <Link href="/brands">Brands</Link>
      </NavigationMenuLink>
      </NavigationMenuItem>
       <NavigationMenuItem>
<NavigationMenuLink asChild >
        <Link href="/categories">Categories</Link>
      </NavigationMenuLink>
      </NavigationMenuItem>

    
      </NavigationMenuList>
      

  
</NavigationMenu>
<div className='flex items-center gap-2'>
  {session.status=='authenticated'&& <h1>Hi {session.data.user.name}</h1>}
<DropdownMenu>
  <DropdownMenuTrigger asChild>
   <UserIcon/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      {session.status =='authenticated'?
      <>
      <Link href={'/profile'}> 
     <DropdownMenuItem>
      Profile
      </DropdownMenuItem>
      </Link>
      <Link  href={'/allorders'}> <DropdownMenuItem>My Orders</DropdownMenuItem></Link>
       
       <DropdownMenuItem onClick={()=>signOut({
        callbackUrl:'/'
       })}>Logout</DropdownMenuItem>
       
      </>:
      <>
     
      <Link href={'/login'}>      <DropdownMenuItem>Login</DropdownMenuItem>
</Link>
<Link href={'/register'}>      <DropdownMenuItem>Register</DropdownMenuItem>
</Link>
</>
}

    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
{session.status =='authenticated'&& <div className='relative'>
     <div className='flex justify-center items-center gap-3'>
      <Link href={'/wishlist'}>
      <HeartIcon />
      <Badge className='h-5 min-w-5 rounded-full px-1 font-mono  absolute -top-3 -end-3' variant="outline"></Badge>

      </Link>
      <Link href={'/cart'}>
      <ShoppingCartIcon />
      <Badge className='h-5 min-w-5 rounded-full px-1 font-mono  absolute -top-3 -end-3' variant="outline">{cartData?.numOfCartItems}</Badge>

      </Link>
      </div>
</div>}
</div>

    </div>
</div>
</nav>
          </>
  )
}
