'use client'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image';


export default function ProductSlider({images,altContent}:{images:string[],altContent:string}) {
  return (
    <>
     <Carousel opts={{
        loop:true

      }}    plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>

       
  <CarouselContent>
    {images.map((img,indx)=> 
    <CarouselItem key={indx}>
      
    <Image src={img} alt={altContent} className="w-full" width={300} height={300}/>
    </CarouselItem>
    
    
    )}
    
    </CarouselContent>
 
</Carousel>
    </>
  )
}
