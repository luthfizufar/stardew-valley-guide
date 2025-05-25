"use client"

import { useCallback, useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export function PixelBackground() {
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<any>(null)

  useEffect(() => {
    setMounted(true)

    // Dynamically import tsparticles to avoid SSR issues
    const loadParticles = async () => {
      try {
        const Particles = (await import("react-particles")).default
        const { loadSlim } = await import("tsparticles-slim")

        setParticles({
          Particles,
          loadSlim,
        })
      } catch (error) {
        console.error("Failed to load particles:", error)
      }
    }

    loadParticles()
  }, [])

  const particlesInit = useCallback(
    async (engine: any) => {
      if (particles?.loadSlim) {
        await particles.loadSlim(engine)
      }
    },
    [particles],
  )

  if (!mounted || !particles?.Particles) return null

  const { Particles } = particles

  // Stardew Valley themed colors
  const particleColors = ["#8bc34a", "#f8d878", "#4caf50", "#ffeb3b"]

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0"
      options={{
        fullScreen: {
          enable: false,
        },
        fpsLimit: isMobile ? 30 : 60,
        particles: {
          number: {
            value: isMobile ? 10 : 25,
            density: {
              enable: true,
              value_area: isMobile ? 600 : 800,
            },
          },
          color: {
            value: particleColors,
          },
          shape: {
            type: "square",
          },
          opacity: {
            value: 0.5,
            random: false,
          },
          size: {
            value: isMobile ? 3 : 4,
            random: true,
          },
          move: {
            enable: true,
            speed: isMobile ? 0.8 : 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: !isMobile,
              mode: "repulse",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: isMobile ? 50 : 100,
              duration: 0.4,
            },
            push: {
              particles_nb: isMobile ? 2 : 4,
            },
          },
        },
        retina_detect: !isMobile,
      }}
    />
  )
}
