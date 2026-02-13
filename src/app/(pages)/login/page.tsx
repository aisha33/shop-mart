"use client"
import {useState} from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {signIn} from "next-auth/react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,

} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader } from "lucide-react"
const formSchema = z.object({
  email:z.string().nonempty('email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Invalid Email'),
   password:z.string().nonempty('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'weak password'),
})
type FieldGroup = z.infer<typeof formSchema>


export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  console.log(searchParams.get('error'));
  
   const form = useForm<FieldGroup>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

   async function onSubmit(data: FieldGroup) {
    setIsLoading(true)
    const response = await signIn("credentials",{

      email:data.email,
      password:data.password,
      callbackUrl: '/',
      redirect:true
    })


     
    console.log(response);
    setIsLoading(false)
    
  }
  return (
    <>
    <div className='flex flex-col justify-center items-center min-h-[75vh] '>
      <h1 className='my-3 text-2xl'>Login</h1>
      <Card className=" p-5 w-full sm:max-w-md">
        {searchParams.get('error')&&<h2 className="text-red-500">{searchParams.get('error')}</h2>}
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="ail@example.com"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                   <FieldLabel>Password</FieldLabel>
                  <Input
                    {...field}
                      type="password"
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="your password"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                
                </Field>
              )}
            />
          
       
        
          </FieldGroup>
            <p className="text-sm">
            Do not have an account?
            <a className="text-blue-900 hover:underline cursor-pointer"
              onClick={() => router.push("/register")} ><strong>  Sign Up</strong>
            
            </a>
            </p>
          
        <Field orientation="horizontal" >  
          <Button type="submit" className="flex w-full items-center justify-center cursor-pointer rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white" form="form-rhf-demo">{isLoading&&<Loader className="animate-spin" />}
            Login
          </Button>
        </Field>
        </form>
       
        <a 
            className="text-sm text-blue-900 hover:underline mt-0"
            onClick={() => router.push("/forget-password")} ><strong>Forgot Password?</strong>
          </a>
          
        
       
    </Card>
   

    </div>
    
    </>
  )
}
