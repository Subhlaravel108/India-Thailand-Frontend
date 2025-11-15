
"use client"
import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, EyeOff, Eye, Lock, Key } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useState(180);
  const [resendTrigger, setResendTrigger] = useState(0);
  const [error, setError] = useState("");
  // const { toast } = useToast();
  const router = useRouter();

  // Clear error when user types
  const clearError = () => {
    if (error) setError("");
  };

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
  }, [showOtp, resendTrigger]);
  // 1️⃣ Send OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!email) {
        setError("Email is required");
        setIsLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      const res = await axios.post("http://127.0.0.1:3001/api/auth/forgot-password", { email });

      if (res.data.success) {
        toast.success(res.data.message ||"We've sent a  OTP to your email address."
        );
        setShowOtp(true);
        setResendTrigger(prev => prev + 1)
      } else {
        setError(res.data.message || "Failed to send OTP. Please try again.");
        toast.error(res.data.message || "Failed to send OTP",
         );
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.email[0] ||
        "Network error. Please check your connection.";
      setError(errorMessage);
      toast.error( errorMessage,
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 2️⃣ Verify OTP
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!otp || otp.length !== 6) {
        setError("Please enter a valid 6-digit OTP");
        setIsLoading(false);
        return;
      }

      const res = await api.post("/auth/verify-reset-otp", { email, otp });

      if (res.data.success) {
        toast.success( "OTP verified successfully!"
        );
        setShowPass(true);
      } else {
        setError(res.data.message || "Invalid OTP. Please try again.");
        toast.error( res.data.message || "Invalid OTP",
         );
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        "OTP verification failed. Please try again.";
      setError(errorMessage);
      toast.error( errorMessage,
       );
    } finally {
      setIsLoading(false);
    }
  };

  // 3️⃣ Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!password || !password_confirmation) {
        setError("Both password fields are required");
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        setIsLoading(false);
        return;
      }

      if (password !== password_confirmation) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      const res = await api.post("/auth/reset-password", {
        email,
        otp,
        password,
        password_confirmation,
      });

      if (res.data.success) {
        toast.success( "Your password has been reset successfully. You can now login with your new password.",
        );
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(res.data.message || "Password reset failed. Please try again.");
        toast.error( res.data.message || "Password reset failed",
         );
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        "Password reset failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
     <Header/>
      <div className="py-10 lg:min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100  px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Your Password</h1>
            <p className="text-gray-600">
              {!showOtp && !showPass && "Enter your email address to receive a verification code"}
              {showOtp && !showPass && "Enter the 6-digit code sent to your email"}
              {showPass && "Create your new password"}
            </p>
          </div>

          {/* STEP 1 - Email Form */}
          {!showOtp && !showPass && (
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>
                  We'll send you a verification code to reset your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        // type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearError();
                        }}
                        disabled={isLoading}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !email}
                  >
                    {isLoading ? (
                      <>Sending OTP...</>
                    ) : (
                      <>Send Verification Code</>
                    )}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <Button
                    variant="link" 
                    onClick={() => router.push("/login")}
                    className="text-sm"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to Login
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP 2 - OTP Form */}
          {showOtp && !showPass && (
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle>Verify Your Email</CardTitle>
                <CardDescription>
                  Enter the 6-digit code sent to {email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                          clearError();
                        }}
                        disabled={isLoading}
                        className="pl-10 text-center tracking-widest font-mono"
                        maxLength={6}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Check your email for the verification code
                    </p>
                    <span className="text-sm text-gray-600">
                      {timer > 0 ? (
                        <>Resend OTP in {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</>
                      ) : (
                        <span className="text-green-600">You can resend OTP now.</span>
                      )}
                    </span>
                  </div>

                  {error && (
                    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <Button
                    // type="submit" 
                    className="w-full"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? "Verifying..." : "Verify Code"}
                  </Button>
                </form>

                <div className="mt-4 text-center space-y-2">
                  <Button
                    variant="link"
                    onClick={() => setShowOtp(false)}
                    className="text-sm"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Change Email
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the code?{" "}
                    <Button
                      type="button"
                      variant="link"
                      onClick={handleSubmit}
                      className="p-0 h-auto text-sm font-semibold"
                      disabled={isLoading || !canResend}
                    >
                      Resend OTP
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP 3 - Password Reset Form */}
          {showPass && (
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle>Create New Password</CardTitle>
                <CardDescription>
                  Enter your new password below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          clearError();
                        }}
                        disabled={isLoading}
                        className="pl-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={password_confirmation}
                        onChange={(e) => {
                          setPasswordConfirmation(e.target.value);
                          clearError();
                        }}
                        disabled={isLoading}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !password || !password_confirmation}
                  >
                    {isLoading ? "Resetting Password..." : "Reset Password"}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <Button
                    variant="link"
                    onClick={() => setShowPass(false)}
                    className="text-sm"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to OTP Verification
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}