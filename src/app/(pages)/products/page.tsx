import { ProductI } from "@/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import RatingIcon from "@/components/RatingIcon/RatingIcon";

import AddToCart from "@/components/addToCart/AddToCart";
import AddToHeart from "@/components/AddToHeart/AddToHeart";
import Link from "next/link";





export default async function Products() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products')
  const {data:products}:{data:ProductI[]} = await response.json()
console.log(products);

  return (
    <>
    <div>
       <h1 className="text-center text-5xl mt-5 p-5">Products</h1></div>
 <div className="container mx-auto py-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
 
    {products?.map((product) => (
      <Card
        key={product._id}
        className="group hover:shadow-xl mt-5  rounded-2xl "
      >

        {/* Image + Link */}
        <Link href={`/products/${product._id}`}>
          <CardHeader className="p-2">

            <div className=" object-contan ">
              <img
                src={product.imageCover}
                alt={product.title}
                
                className=" "
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
          <div className="flex items-center gap-3">
            <AddToCart productId={product._id} />
            <AddToHeart productId={product._id} />
          </div>

        </CardContent>
      </Card>
    ))}

  </div>
</div>
    </>
  );
}
