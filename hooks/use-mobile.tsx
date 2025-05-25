"use client"

import { useState, useEffect } from "react"

export function useMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Initial check
    setIsMobile(window.innerWidth < breakpoint)

    // Add event listener for window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    window.addEventListener("resize", handleResize)

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [breakpoint])

  return isMobile
}
