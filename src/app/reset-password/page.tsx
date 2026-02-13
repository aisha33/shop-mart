"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"

export default function ResetPassword() {
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function resetPassword() {
    setLoading(true)
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      )

      const data = await response.json()
    if (data.status === "Success") {
      toast.success("Password changed successfully")
         await signIn("credentials", {
          email,
          password: newPassword,
          callbackUrl: "/products",
        })
       
     
    } else {
      toast.error(data.message || "Failed to change password")
    }
  
    setLoading(false)
    }

  return (
    <Card className="p-6 max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-bold">Reset Password</h1>

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <Button onClick={resetPassword} disabled={loading}>
        {loading ? "Changing..." : "Change Password"}
      </Button>
    </Card>
  )
}
