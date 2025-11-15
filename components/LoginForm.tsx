"use client"

import { useState } from "react"
// import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import api from "@/lib/api"
import { toast } from "sonner"
export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
   const [errors, setErrors] = useState<Record<string, string>>({})
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      const newErrors: Record<string, string> = {};
      if(!email) newErrors.email="Email is required"
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        newErrors.email = "Invalid email format";
      }
      if(!password) newErrors.password="Password is required"
      if(Object.keys(newErrors).length>0){
        setErrors(newErrors)
        setIsLoading(false)
        return;
      }
      const res = await api.post("/auth/login", { email, password })
      if (res.data.success){
        localStorage.setItem("isAuthenticated", 'true');
        localStorage.setItem("role",res.data.data.role)
        localStorage.setItem("token",res.data.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.data));
//       Cookies.set("isAuthenticated", "true"); 
// Cookies.set("token", res.data.access_token)
// Cookies.set("role", res.data.role)
// Cookies.set("user", JSON.stringify(res.data))
        toast.success("Login successful")
       
      //   setTimeout(() => {
      //     router.push("/"); // navigate home
      //     window.location.reload(); // force full reload after navigation
      // }, 100);
      window.location.href = "/"; // Redirect to home page
    }
       else {
    toast.error("Invalid email or password.",
      )
  }
  setIsLoading(false)
 } catch (error: any) {
      console.error("Registration error:", error)

      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors
        const fieldErrors: Record<string, string> = {}
        Object.keys(validationErrors).forEach((field) => {
          fieldErrors[field] = validationErrors[field][0]
        })
        setErrors(fieldErrors)
      } else {
        toast(
            error.response?.data?.message ||
            error.message ||
            "Something went wrong, please try again later.",
         )
      }
    } finally {
      setIsLoading(false)
    }
    
  }

return (
  <Card>
    <CardHeader>
      <CardTitle className="text-center">Sign In</CardTitle>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="email"
              
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>{ setEmail(e.target.value)
                if(errors.email){
                    setErrors((prev)=>({...prev,email:""}))
                }
              }}
              className="w-full bg-white pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"

            />
          </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)
              if(errors.password){
                setErrors((prev)=>({...prev,password:""}))
              }
            }}
              className="pl-10 pr-10 w-full bg-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"

            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div className="flex justify-end">

        <Link href={"/forgot-password"} className="text-primary">Forgot Password</Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register here
          </Link>
        </div>

        {/* <div className="text-center text-xs text-muted-foreground">

          </div> */}
      </form>
    </CardContent>
  </Card>
)
}
