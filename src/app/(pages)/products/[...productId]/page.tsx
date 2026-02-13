import { ProductI } from '@/interfaces';
import { Params } from 'next/dist/server/request/params';
import {
  Card,
  
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import RatingIcon from '@/components/RatingIcon/RatingIcon';
import ProductSlider from '@/components/productSlider/ProductSlider';
import AddToCart from '@/components/addToCart/AddToCart';
import AddToHeart from '@/components/AddToHeart/AddToHeart';

export default async function ProductDetails({params}:{params:Params}) {
  const {productId} = await params
  console.log(productId);
  
   const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/'+ productId)
   
     const {data:product}:{data:ProductI} = await response.json()
     console.log(product);
     
   

  console.log(productId);
  
  return( <>
 <div className="container mx-auto py-10"></div>
  <Card className='grid md:grid-cols-2 items-center w-3/4 mx-auto '>
    <div className='p-3'>
   <ProductSlider images={product.images} altContent={product.title}/>
         
     
      </div>
       <div>
  <CardHeader>
     <CardDescription>{product.brand.name}</CardDescription>
    <CardTitle>{product.title}</CardTitle>
    <CardDescription>{product.description}</CardDescription>
  </CardHeader>
  <CardContent>
    <CardDescription>{product.category.name}</CardDescription>
    <div className="flex gap-2">
          
         <RatingIcon />
          <RatingIcon />
         <RatingIcon />
         <RatingIcon />
    
          
          <p>{product.ratingsAverage}</p>
        
        </div>
        <div className='flex justify-between mt-5'>   <p className="">Price:<span className="font-bold">{product.price}</span>EGP</p>
        <p className="">Quantity:<span className="font-bold">{product.quantity}</span>EGP</p>
        
        </div>
  </CardContent>
    <div className="flex items-center justify-center">


      <AddToCart  productId={product._id} />

 <AddToHeart productId={product._id} />
    </div>
 
  </div>
</Card>
    


   </>)
 

}
