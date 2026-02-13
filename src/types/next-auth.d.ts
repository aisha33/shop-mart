
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
       user: UserResponse
    token?: string
    userId?: string
  }

  interface User {
    user: UserResponse
    token: string
   
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserResponse
    token: string
    userId?: string  
  }}