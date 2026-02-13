import CredentialsProvider from "next-auth/providers/credentials"
import { FaildLoginResponse, SuccessLoginResponse } from "@/interfaces"
import { AuthOptions } from "next-auth"
export const authOptions : AuthOptions={  providers:[
   CredentialsProvider({

    name:'credentials',
    credentials: {
      email: { },
      password: {}
    },
    authorize:async( credentials)=>{
         const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{
            method:"POST",
            body:JSON.stringify({
                  email:credentials?.email,
                   password:credentials?.password,

            }),
           headers:{ 'Content-Type': 'application/json' }


         })
         const payload:SuccessLoginResponse|FaildLoginResponse = await response.json()
         console.log(payload);
         if ('token' in payload ){
 return {
            id:payload.user.email,
            user:payload.user,
            token:payload.token
         }
         }else{
            throw new Error(payload.message)
         }
        
         
    },
    }),

     //  SIGN UP
    CredentialsProvider({
      id: "signup",
      name: "signup",
      credentials: {
        name: {},
        email: {},
        password: {},
        rePassword: {},
        phone: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: credentials?.name,
              email: credentials?.email,
              password: credentials?.password,
              rePassword: credentials?.rePassword,
              phone: credentials?.phone,
            }),
          }
        )

        const payload: SuccessSignupResponse | FailedSignupResponse =
          await response.json()

        if ("token" in payload) {
          return {
            id: payload.user.email,
            user: payload.user,
            token: payload.token,
          }
        }

        throw new Error(payload.message)
      },
    }), 
  ],
   callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user
        token.token = user.token
         token.userId = user.user._id
      }
      return token
    },

    session: ({ session, token }) => {
      session.user = token.user
       session.userId = token.userId
      return session
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
}
  