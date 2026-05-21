"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { googleAuthApi } from "@/lib/api";
import { persistAuthSession, type AuthUser } from "@/lib/auth";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
const MIN_BTN_WIDTH = 200;
const MAX_BTN_WIDTH = 400;

const getErrorMessage = (error: unknown): string => {
  const err = error as {
    response?: { status?: number; data?: { message?: string; error?: string } };
    message?: string;
  };

  if (err.response?.status === 404) {
    return "Google login API not found on server. Run India-Thailand-api locally (port 3001) or deploy latest API to Render.";
  }

  return (
    err.response?.data?.message ||
    err.response?.data?.error ||
    err.message ||
    "Google sign-in failed. Please try again."
  );
};

export default function GoogleSignInButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [btnWidth, setBtnWidth] = useState(320);

  const showError = useCallback((message: string) => {
    setErrorMessage(message);
    toast.error(message);
  }, []);

  const clearError = useCallback(() => setErrorMessage(null), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      const width = el.offsetWidth;
      setBtnWidth(Math.min(MAX_BTN_WIDTH, Math.max(MIN_BTN_WIDTH, width)));
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    window.addEventListener("resize", updateWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const handleSuccess = async (response: CredentialResponse) => {
    const idToken = response.credential;
    if (!idToken) {
      showError("Could not get Google credentials. Please try again.");
      return;
    }

    clearError();
    setIsLoading(true);
    try {
      const res = await googleAuthApi(idToken);
      if (res.data?.success && res.data?.data?.token) {
        persistAuthSession(res.data.data as AuthUser);
        toast.success(res.data.message || "Signed in successfully");
        window.location.href = "/dashboard";
        return;
      }
      showError(res.data?.message || "Google sign-in failed");
    } catch (error: unknown) {
      showError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  if (!googleClientId) {
    const msg =
      "Google sign-in is not configured. Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to your environment.";
    return (
      <div className="w-full space-y-2">
        <div
          role="alert"
          className="flex gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"
        >
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>{msg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      {errorMessage && (
        <div
          role="alert"
          className="flex gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p className="break-words">{errorMessage}</p>
        </div>
      )}

      <div ref={containerRef} className="relative w-full min-w-0 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-white/80">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
        <div className="flex w-full justify-center sm:justify-stretch">
          <div
            className="w-full max-w-full overflow-hidden [&>div]:mx-auto [&>div]:max-w-full sm:[&>div]:mx-0 sm:[&>div]:w-full"
            style={{ minHeight: 44 }}
          >
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() =>
                showError("Google sign-in was cancelled or could not complete.")
              }
              useOneTap={false}
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
              width={btnWidth}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
