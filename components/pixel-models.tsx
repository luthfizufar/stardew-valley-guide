"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function PixelModels() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <>
      {/* Chicken on the left side */}
      <div className="fixed left-4 bottom-4 md:left-8 md:bottom-8 z-10 pointer-events-none">
        <div className="pixel-model-container">
          <div className={`pixel-chicken ${isDark ? "dark" : ""}`}>
            <div className="chicken-body"></div>
            <div className="chicken-head"></div>
            <div className="chicken-beak"></div>
            <div className="chicken-comb"></div>
            <div className="chicken-eye"></div>
            <div className="chicken-leg left"></div>
            <div className="chicken-leg right"></div>
            <div className="chicken-wing"></div>
          </div>
        </div>
      </div>

      {/* Stardrop on the right side */}
      <div className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-10 pointer-events-none">
        <div className="pixel-model-container">
          <div className={`pixel-stardrop ${isDark ? "dark" : ""}`}>
            <div className="stardrop-center"></div>
            <div className="stardrop-point point-1"></div>
            <div className="stardrop-point point-2"></div>
            <div className="stardrop-point point-3"></div>
            <div className="stardrop-point point-4"></div>
            <div className="stardrop-point point-5"></div>
            <div className="stardrop-point point-6"></div>
            <div className="stardrop-glow"></div>
          </div>
        </div>
      </div>
    </>
  )
}
