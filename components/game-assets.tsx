"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export function GameAssets() {
  const { theme } = useTheme()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <div className="game-assets-container">
      {/* Junimo sprites that appear occasionally */}
      {Array.from({ length: isMobile ? 2 : 4 }).map((_, index) => (
        <div
          key={index}
          className={`junimo junimo-${index % 5}`}
          style={{
            left: `${10 + index * 25}%`,
            bottom: `${Math.random() * 20}%`,
            animationDelay: `${index * 5 + Math.random() * 10}s`,
          }}
        ></div>
      ))}

      {/* Crops that grow from bottom of screen */}
      <div className="crops-container">
        {Array.from({ length: isMobile ? 4 : 8 }).map((_, index) => (
          <div
            key={index}
            className={`crop crop-${index % 3}`}
            style={{
              left: `${5 + index * 12}%`,
              animationDelay: `${index * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Seasonal decorations */}
      <div className={`seasonal-decoration ${isDark ? "night" : "day"}`}>
        <div className="sun-moon"></div>
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        {isDark &&
          Array.from({ length: isMobile ? 10 : 20 }).map((_, index) => (
            <div
              key={index}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 30}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
      </div>
    </div>
  )
}
