"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useMobile } from "@/hooks/use-mobile"

type WeatherType = "clear" | "rain" | "storm" | "snow" | "leaves"

interface WeatherEffectsProps {
  season?: string
}

export function WeatherEffects({ season = "spring" }: WeatherEffectsProps) {
  const { theme } = useTheme()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)
  const [weather, setWeather] = useState<WeatherType>("clear")
  const [intensity, setIntensity] = useState<"light" | "medium" | "heavy">("medium")

  // Set weather based on season
  useEffect(() => {
    if (!mounted) return

    // Randomize weather with season-appropriate probabilities
    const rand = Math.random()

    switch (season) {
      case "spring":
        if (rand < 0.6) setWeather("rain")
        else setWeather("clear")
        setIntensity(rand < 0.3 ? "heavy" : rand < 0.7 ? "medium" : "light")
        break
      case "summer":
        if (rand < 0.3) setWeather("storm")
        else setWeather("clear")
        setIntensity(rand < 0.4 ? "heavy" : rand < 0.7 ? "medium" : "light")
        break
      case "fall":
        if (rand < 0.7) setWeather("leaves")
        else if (rand < 0.9) setWeather("rain")
        else setWeather("clear")
        setIntensity(rand < 0.3 ? "heavy" : rand < 0.7 ? "medium" : "light")
        break
      case "winter":
        if (rand < 0.8) setWeather("snow")
        else setWeather("clear")
        setIntensity(rand < 0.4 ? "heavy" : rand < 0.7 ? "medium" : "light")
        break
      default:
        setWeather("clear")
    }
  }, [season, mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  // Calculate number of particles based on intensity and device
  const getParticleCount = () => {
    const baseCount = isMobile ? 30 : 70

    switch (intensity) {
      case "light":
        return Math.floor(baseCount * 0.5)
      case "heavy":
        return Math.floor(baseCount * 1.5)
      default:
        return baseCount
    }
  }

  const particleCount = getParticleCount()

  // Render different weather effects
  const renderWeatherEffect = () => {
    switch (weather) {
      case "rain":
        return (
          <div className={`weather-container rain ${intensity} ${isDark ? "dark" : ""}`}>
            {Array.from({ length: particleCount }).map((_, i) => (
              <div
                key={`rain-${i}`}
                className="rain-drop"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${0.7 + Math.random() * 0.3}s`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
            {intensity === "heavy" && (
              <div className="puddles">
                {Array.from({ length: isMobile ? 3 : 6 }).map((_, i) => (
                  <div
                    key={`puddle-${i}`}
                    className="puddle"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      bottom: `${Math.random() * 40}%`,
                      width: `${30 + Math.random() * 40}px`,
                      opacity: 0.1 + Math.random() * 0.2,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )

      case "storm":
        return (
          <div className={`weather-container storm ${intensity} ${isDark ? "dark" : ""}`}>
            {Array.from({ length: particleCount }).map((_, i) => (
              <div
                key={`rain-${i}`}
                className="rain-drop storm"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${0.5 + Math.random() * 0.3}s`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}

            {/* Lightning flashes */}
            <div className="lightning-container">
              <div className="lightning flash-1" />
              <div className="lightning flash-2" />
            </div>

            {/* Storm clouds */}
            <div className="storm-clouds">
              {Array.from({ length: isMobile ? 2 : 4 }).map((_, i) => (
                <div
                  key={`cloud-${i}`}
                  className="storm-cloud"
                  style={{
                    top: `${5 + Math.random() * 15}%`,
                    left: `${i * 25 + Math.random() * 10}%`,
                    opacity: 0.7 + Math.random() * 0.3,
                    animationDuration: `${60 + Math.random() * 40}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )

      case "snow":
        return (
          <div className={`weather-container snow ${intensity} ${isDark ? "dark" : ""}`}>
            {Array.from({ length: particleCount }).map((_, i) => (
              <div
                key={`snow-${i}`}
                className="snow-flake"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${3 + Math.random() * 7}s`,
                  animationDelay: `${Math.random() * 5}s`,
                  width: `${3 + Math.random() * 4}px`,
                  height: `${3 + Math.random() * 4}px`,
                }}
              />
            ))}

            {/* Snow on ground */}
            {intensity !== "light" && (
              <div className="snow-ground">
                <div className="snow-pile pile-1" />
                <div className="snow-pile pile-2" />
                <div className="snow-pile pile-3" />
              </div>
            )}
          </div>
        )

      case "leaves":
        return (
          <div className={`weather-container leaves ${intensity} ${isDark ? "dark" : ""}`}>
            {Array.from({ length: particleCount / 2 }).map((_, i) => (
              <div
                key={`leaf-${i}`}
                className={`falling-leaf leaf-${i % 4}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${5 + Math.random() * 10}s`,
                  animationDelay: `${Math.random() * 10}s`,
                }}
              />
            ))}

            {/* Wind effect */}
            <div className="wind-effect" />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      {renderWeatherEffect()}
      <div className="weather-overlay" data-weather={weather} data-intensity={intensity} />
    </>
  )
}
