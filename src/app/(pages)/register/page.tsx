"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"

/* ================= Schema ================= */
const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Weak password"
    ),
  rePassword: z.string(),
  phone: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid phone"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
})

type RegisterForm = z.infer<typeof registerSchema>

/* ================= Component ================= */
export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  })

  async function onSubmit(data: RegisterForm) {
    try {
      setIsLoading(true)

      await signIn("signup", {
        name: data.name,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword,
        phone: data.phone,
        redirect: true,
        callbackUrl: "/login",
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col m-5 justify-center items-center min-h-[75vh]">
      <h1 className="my-3 text-2xl">Create Account</h1>

      <Card className="p-5 w-full sm:max-w-md">
        {searchParams.get("error") && (
          <p className="text-red-500">{searchParams.get("error")}</p>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            {["Name", "Email", "Password", "RePassword", "Phone"].map(
              (fieldName) => (
                <Controller
                  key={fieldName}
                  name={fieldName as keyof RegisterForm}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>{fieldName}</FieldLabel>
                      <Input
                        {...field}
                        type={
                          fieldName.toLowerCase().includes("password")
                            ? "password"
                            : "text"
                        }
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              )
            )}
          </FieldGroup>
            <p className="text-sm ">
            If you have an account? 
            <a className="text-blue-900 hover:underline cursor-pointer"
              onClick={() => router.push("/login")} ><strong>  Sign In </strong>
            
            </a>
            </p>
          <Button
            type="submit"
            className="flex w-full items-center justify-center cursor-pointer rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white gap-2"
            disabled={isLoading}
          >
            {isLoading && <Loader className="animate-spin" />}
            Register
          </Button>
        </form>
      </Card>
    </div>
  )
}
