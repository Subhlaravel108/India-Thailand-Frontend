

"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Eye, EyeOff, Building, Mail, Phone } from "lucide-react"
import Link from "next/link"
// import { useToast } from "@/hooks/use-toast"
import api from "@/lib/api"
import { toast } from "sonner"

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  // Timer state
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter()
  // const { toast } = useToast()

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: "" })) // clear error when typing
  }

  useEffect(() => {
    if (showOtp) {
      setTimer(180);
      setCanResend(false);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [showOtp]);

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setOtpLoading(true);
    setOtpError(null);

    const otpForm = new FormData();
    otpForm.append("email", formData.email);
    otpForm.append("otp", otp);

    try {
      const response = await api.post("/auth/verify-otp", otpForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Register Sucessfully");

      localStorage.setItem("isAuthenticated", 'true');
      localStorage.setItem("role", response.data.role)
      localStorage.setItem("user", JSON.stringify(response.data));
      // Cookies.set('user', JSON.stringify(response.data), { path: '/', sameSite: 'lax' });
      router.push("/");
    } catch (err: any) {
      console.error(' OTP verification error:', err);
      const errorData = err.response?.data;
      setOtpError(errorData?.message || "OTP verification failed. Please try again.");
      toast.error(errorData?.message || "OTP verification failed. Please try again.");
    } finally {
      setOtpLoading(false);
      console.log('🏁 OTP verification process completed');
    }
  };

  const handleResendOtp = async () => {
    setOtpLoading(true);
    setOtpError(null);
    try {
      const form = new FormData();
      form.append("email", formData.email);
      await api.post("/auth/resend-otp", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("A new OTP has been sent to your email.");
      setTimer(180);
      setCanResend(false);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      setOtpError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
      toast.error(err.response?.data?.message || "Failed to resend OTP. Please try again.",
       );
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({}) // clear old errors

    // if (formData.password !== formData.password_confirmation) {
    //   setErrors(prev => ({ ...prev, password_confirmation: "Passwords do not match" }))
    //   setIsLoading(false)
    //   return
    // }

    try {
      const newErrors: Record<string, string> = {};
      const requireFields = ["name", "last_name", "phone", "email", "password", "password_confirmation"]
      requireFields.forEach((field) => {
        const value = formData[field as keyof typeof formData];
        if (!value || value.toString().trim() === "") {
          newErrors[field] = `${field.replace("_", " ")} is required`;
        }
      });
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }

      // ✅ Phone validation (10 digits, Indian format)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (formData.phone && !phoneRegex.test(formData.phone)) {
        newErrors.phone = "Phone number must bhi 10 digits";
      }

      if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = "Password and Confirm do not match"
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      const payloads={
        name:`${formData.name} ${formData.last_name}`,
        email:formData.email,
        phone:formData.phone,
        password:formData.password
      }

      const res = await api.post("/auth/register", payloads)

      if (res.data.success) {
        toast.success( "We’ve sent an OTP to your registered email address."

        )
        setShowOtp(true)

      } else {
        toast.error(res.data?.data?.message || "Something went wrong.",
        )
      }
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
        toast.error( error.response?.data?.message ||
            // error.data.message ||
            "Something went wrong, please try again later.",
          
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        {!showOtp ? (<form onSubmit={handleSubmit} className="space-y-4">

          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="name">First Name</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="name"
                placeholder="Enter first name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="pl-10 pr-10 w-full bg-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary "
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="last_name"
                placeholder="Enter last name"
                value={formData.last_name}
                onChange={(e) => handleChange("last_name", e.target.value)}
                className="pl-10 pr-4 w-full bg-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"

                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="pl-10 pr-4 w-full bg-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="pl-10 pr-4 w-full bg-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="pl-4 pr-10 w-full bg-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <div className="relative">
                <input
                  id="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.password_confirmation}
                  onChange={(e) => handleChange("password_confirmation", e.target.value)}
                  className="pl-4 pr-10 w-full bg-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </div>
        </form>) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            {otpError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-center text-sm">
                {otpError}
              </div>
            )}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP sent to your email
              </Label>
              <Input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className=" text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                className="w-full bg-primary  text-white"
                disabled={otpLoading}
              >
                {otpLoading ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">
                {timer > 0 ? (
                  <>Resend OTP in {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</>
                ) : (
                  <span className="text-green-600">You can resend OTP now.</span>
                )}
              </span>
              <Button
                type="button"
                variant="outline"
                className="text-primary border-primary cursor-pointer hover:text-white hover:bg-red-500  ml-2"
                onClick={handleResendOtp}
                disabled={!canResend || otpLoading}
              >
                Resend OTP
              </Button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowOtp(false)}
                className="text-sm text-primary hover:text-rajasthani-maroon"
              >
                ← Back to registration
              </button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
