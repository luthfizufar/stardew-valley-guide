"use client"

import { useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export function PixelParticles() {
  const isMobile = useMobile()
  const [particles, setParticles] = useState<{ id: number; left: string; delay: string }[]>([])

  useEffect(() => {
    // Generate particles
    const particleCount = isMobile ? 10 : 20
    const newParticles = []

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 10}s`,
      })
    }

    setParticles(newParticles)
  }, [isMobile])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 200 }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="pixel-particle"
          style={{
            left: particle.left,
            bottom: "-10px",
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}
