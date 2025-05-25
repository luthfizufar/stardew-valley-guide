"use client"

import { useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface SeasonalAnimationsProps {
  season: string
}

export function SeasonalAnimations({ season }: SeasonalAnimationsProps) {
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Determine number of elements based on device
  const elementCount = isMobile ? 5 : 12

  // Spring animations
  const renderSpringAnimations = () => (
    <>
      {/* Flowers */}
      {Array.from({ length: elementCount }).map((_, index) => (
        <div
          key={`spring-flower-${index}`}
          className={`spring-animation spring-flower spring-flower-${
            index % 3 === 0 ? "pink" : index % 3 === 1 ? "blue" : "yellow"
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${15 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Butterflies */}
      {Array.from({ length: Math.floor(elementCount / 3) }).map((_, index) => (
        <div
          key={`spring-butterfly-${index}`}
          className={`spring-animation spring-butterfly spring-butterfly-${
            index % 3 === 0 ? "pink" : index % 3 === 1 ? "blue" : "purple"
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${20 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </>
  )

  // Summer animations
  const renderSummerAnimations = () => (
    <>
      {/* Sun */}
      <div className="summer-animation summer-sun" />

      {/* Heat wave */}
      <div className="summer-animation summer-heatwave" />

      {/* Fish */}
      {Array.from({ length: Math.floor(elementCount / 3) }).map((_, index) => (
        <div
          key={`summer-fish-${index}`}
          className="summer-animation summer-fish"
          style={{
            top: `${30 + Math.random() * 50}%`,
            animationDuration: `${15 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </>
  )

  // Fall animations
  const renderFallAnimations = () => (
    <>
      {/* Falling leaves */}
      {Array.from({ length: elementCount }).map((_, index) => (
        <div
          key={`fall-leaf-${index}`}
          className={`fall-animation fall-leaf fall-leaf-${
            index % 4 === 0 ? "orange" : index % 4 === 1 ? "red" : index % 4 === 2 ? "brown" : "yellow"
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 10}%`,
            animationDuration: `${8 + Math.random() * 7}s`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}

      {/* Wind effect */}
      <div className="fall-animation fall-wind" />
    </>
  )

  // Winter animations
  const renderWinterAnimations = () => (
    <>
      {/* Snowflakes */}
      {Array.from({ length: elementCount }).map((_, index) => (
        <div
          key={`winter-snow-${index}`}
          className="winter-animation winter-snow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 10}%`,
            width: `${3 + Math.random() * 3}px`,
            height: `${3 + Math.random() * 3}px`,
            animationDuration: `${10 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Frost effect */}
      <div className="winter-animation winter-frost" />

      {/* Icicles */}
      {Array.from({ length: Math.floor(elementCount / 2) }).map((_, index) => (
        <div
          key={`winter-icicle-${index}`}
          className="winter-animation winter-icicle"
          style={{
            left: `${5 + (index * 100) / (elementCount / 2)}%`,
            height: `${10 + Math.random() * 15}px`,
          }}
        />
      ))}
    </>
  )

  return (
    <div className={`seasonal-container ${season}-active`} aria-hidden="true" data-testid={`${season}-animations`}>
      {renderSpringAnimations()}
      {renderSummerAnimations()}
      {renderFallAnimations()}
      {renderWinterAnimations()}
    </div>
  )
}
