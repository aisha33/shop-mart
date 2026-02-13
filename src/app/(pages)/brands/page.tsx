// src/app/(pages)/brands/page.tsx
import { BrandI } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"

export default async function brands() {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands",
    {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    }
  )

  const { data: brands }: { data: BrandI[] } = await res.json()

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8">All Brands</h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="flex flex-col items-center bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
          >
            {brand.image ? (
              <Image
                src={brand.image}
                alt={brand.name}
                width={120}
                height={120}
                className="object-contain"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center text-gray-500">
              <Image src={brand.image}  alt= {brand.name} />
              </div>
            )}
            <span className="mt-2 text-center font-medium text-base">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}

