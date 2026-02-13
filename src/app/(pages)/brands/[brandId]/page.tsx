import { BrandI, ProductI } from "@/interfaces"
import { Params } from "next/dist/server/request/params"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"


export default async function Brand({ params }: { params: Params }) {
  const {brandId} = await params
  console.log(brandId);

  /* 🔹 Fetch Brand */
  const brandRes = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
    { cache: "no-store" }
  )

  const brandJson = await brandRes.json()
  const brand: BrandI | null = brandJson?.data ?? null

  if (!brand) return notFound()

  /* 🔹 Fetch Products by Brand */
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
    { cache: "no-store" }
  )

  const result = await response.json()
  const products: ProductI[] = result.data || []

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
    
      <div className="flex flex-col items-center text-center gap-4 mb-10">
        <h1 className="text-4xl font-bold">{brand.name}</h1>

        <p className="text-gray-600">
          Explore products of {brand.name}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mt-5 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <Image
                src={product.imageCover}
                alt={product.title}
                width={200}
                height={200}
                className="object-contain mb-2"
              />
              <h3 className="font-medium line-clamp-1">
                {product.title}
              </h3>
              <p className="text-green-600 font-bold">
                EGP {product.price}
              </p>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found for this brand
          </p>
        )}
      </div>
    </div>
  )
}
