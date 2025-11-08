// components/TopProgress.tsx
"use client";

import { useEffect, useRef } from "react";
import nProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import "nprogress/nprogress.css";
import "/app/globals.css";

// Configure nProgress
nProgress.configure({
  showSpinner: false,
  speed: 600,
  minimum: 0.1,
  trickleSpeed: 200,
  easing: "ease",
});

export default function TopProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigationStartRef = useRef<number>(0);
  const isNavigatingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastHrefRef = useRef<string | null>(null);

  // Cleanup function
  const cleanupNavigation = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    nProgress.done();
    isNavigatingRef.current = false;
    lastHrefRef.current = null;
  };

  useEffect(() => {
    // Route change complete - finish progress
    const completeProgress = () => {
      const navigationTime = Date.now() - navigationStartRef.current;
      
      // Ensure progress bar is visible for at least 500ms
      const minDisplayTime = 500;
      const remainingTime = Math.max(0, minDisplayTime - navigationTime);
      
      timeoutRef.current = setTimeout(() => {
        cleanupNavigation();
      }, remainingTime);
    };

    if (isNavigatingRef.current) {
      completeProgress();
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    // Start progress on internal navigation clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto/tel, anchors, and _blank
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      // ✅ FIX: Same link pe click handle karna
      if (lastHrefRef.current === href && isNavigatingRef.current) {
        // Agar same link pe click kiya aur navigation already chal raha hai
        // To existing navigation complete karo aur nayi start karo
        cleanupNavigation();
        
        // Thoda delay dekar nayi navigation start karo
        setTimeout(() => {
          startNavigation(href);
        }, 100);
      } else {
        startNavigation(href);
      }
    };

    const startNavigation = (href: string) => {
      // Clean any existing navigation
      cleanupNavigation();
      
      // Start new navigation
      isNavigatingRef.current = true;
      lastHrefRef.current = href;
      navigationStartRef.current = Date.now();
      
      // Start progress with small delay to ensure it's visible
      timeoutRef.current = setTimeout(() => {
        if (isNavigatingRef.current) {
          nProgress.start();
        }
      }, 50);

      // ✅ FIX: Safety timeout - agar navigation complete na ho to
      timeoutRef.current = setTimeout(() => {
        if (isNavigatingRef.current) {
          console.warn('Navigation timeout, forcing completion');
          cleanupNavigation();
        }
      }, 5000); // 5 seconds timeout
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      cleanupNavigation();
    };
  }, []);

  useEffect(() => {
    // Start progress on browser back/forward
    const handlePopState = () => {
      cleanupNavigation(); // Pehle existing cleanup karo
      
      isNavigatingRef.current = true;
      navigationStartRef.current = Date.now();
      
      timeoutRef.current = setTimeout(() => {
        if (isNavigatingRef.current) {
          nProgress.start();
        }
      }, 50);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      cleanupNavigation();
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupNavigation();
    };
  }, []);

  return null;
}