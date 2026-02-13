import { NextResponse } from "next/server"

export async function GET(){
    const users= {
        message:'Sucess',

       users: [
        {
        id:111,
       name:'Ahmad',
        age:20,   
    },
    {
        id:112,
      name:'Hamada',
        age:22,
        

    }


]}
return NextResponse.json(users)
}