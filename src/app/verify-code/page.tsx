"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function VerifyCode() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function verifyResetCode() {
    if (!code.trim()) {
      toast.error("Please enter the reset code")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resetCode: code,
          }),
        }
      )

      const data = await response.json()

      if (data.status === "Success") {
        toast.success("Code verified successfully ✅")
        router.push("/reset-password")
      } else {
        toast.error(data.message || "Invalid or expired code ❌")
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later 🚨")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-bold text-center">Verify Code</h1>

      <Input
        placeholder="Enter reset code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <Button
        onClick={verifyResetCode}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>
    </Card>
  )
}
