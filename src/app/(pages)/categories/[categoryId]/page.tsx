import AddToCart from "@/components/addToCart/AddToCart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryI, ProductI } from "@/interfaces"
import Link from "next/link"
import { Params } from "next/dist/server/request/params"
import AddToHeart from "@/components/AddToHeart/AddToHeart"
import RatingIcon from "@/components/RatingIcon/RatingIcon"
import { notFound } from "next/navigation"

export default async function CategoryProducts({params}:{params:Params}) {
  const {categoryId} = await params
  console.log(categoryId);

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
    { cache: "no-store" }
  )

  const result = await response.json()
  const products: ProductI[] = result.data || []

  if (products.length === 0) {
    return <p className="text-center py-10">No products found</p>
  }
const respones = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`, { cache: "no-store" })
const categoryRes = await respones.json()
  const category: CategoryI | null = categoryRes?.data ?? null

  if (!category) return notFound()


  return (
    <>
    <div>
       <h1 className="text-center text-5xl mt-5 p-5">{category?.name}</h1></div>
    
     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mt-5 lg:grid-cols-3 xl:grid-cols-4 gap-2">
       {products.map((product) => (
        <Card
        key={product._id}
        className="group hover:shadow-xl mb-5   rounded-2xl "
      >

        {/* Image + Link */}
        <Link href={`/products/${product._id}`}>
          <CardHeader className="p-1">

            <div className="  ">
              <img
                src={product.imageCover}
                alt={product.title}
                
                className=" object-cover "
              />
            </div>

            <div className="p-4 space-y-1">
              <CardDescription className="text-indigo-600 font-medium text-sm">
                {product.brand?.name}
              </CardDescription>

              <CardTitle className="text-lg font-semibold line-clamp-1">
                {product.title?.split(' ', 2).join(' ') || 'No Title'}
              </CardTitle>

              <CardDescription className="text-gray-500 text-sm">
                {product.category?.name}
              </CardDescription>
            </div>

          </CardHeader>
        </Link>

        {/* Content */}
        <CardContent className="px-4 pb-4 space-y-4">

          {/* Rating */}
          <div className="flex items-center gap-2 text-yellow-500">
            <RatingIcon />
            <RatingIcon />
            <RatingIcon />
            <RatingIcon />
            <span className="text-sm text-gray-600 ml-1">
              {product.ratingsAverage}
            </span>
          </div>

          {/* Price */}
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-gray-800">
              {product.price} <span className="text-sm font-normal">EGP</span>
            </p>
          </div>

          {/* Buttons */}
             <div className="flex items-center justify-center">
         
         
               <AddToCart  productId={product._id} />
         
          <AddToHeart productId={product._id} />
             </div>

        </CardContent>
      </Card>
    ))}
     </div>
   

 
</>
  )
}
