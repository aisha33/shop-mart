/* eslint-disable @next/next/no-img-element */
import { CategoryI } from "@/interfaces"
import Image from "next/image";
import Link from "next/link"



export default async function CategoriesPage() {
   const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
  const {data:categories}:{data:CategoryI[]} = await response.json()
   console.log(categories);

  return (
   
<>
  
   <div>
       <h1 className="text-center text-5xl mt-5 p-5">Shop by Category</h1></div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="flex flex-col items-center bg-white shadow rounded-lg p-4  mb-5  hover:shadow-lg "
          >
            {category.image ? (
              
              
              <div className=" w-full "> <Image
                src={category.image}
                alt={category.name}
                
                width={200}
                height={200}
                className="object-cover w-full"
              /></div>
             
            ) : (
              <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center text-gray-500">
              <Image src={category.image}  alt= {category.name} />
              </div>
            )}
            <span className="mt-2 text-center font-medium text-base">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}
