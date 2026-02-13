/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function ForgetPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleForgetPassword() {
    if (!email) {
      toast.error("Please enter your email ❌")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      )

      const data = await response.json()

      if (data.status === "Success") {
        toast.success("Reset code sent to your email 📧")

        // تحويل لصفحة التحقق
        setTimeout(() => {
          router.push("/verify-code")
        }, 1500)
      } else {
        toast.error(data.message || "Email not found ❌")
      }
    } catch (error) {
      toast.error("Something went wrong ❌")
    }

    setLoading(false)
  }

  return (
    <Card className="p-6 max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-bold text-center">Forget Password</h1>

      <Input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        onClick={handleForgetPassword}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Sending..." : "Send Reset Code"}
      </Button>
    </Card>
  )
}
