"use client"

import { useState } from "react"
import { Cloud, CloudRain, CloudLightning, Snowflake, Sun } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslations } from "@/hooks/use-translations"

interface WeatherControlsProps {
  onWeatherChange: (weather: string) => void
}

export function WeatherControls({ onWeatherChange }: WeatherControlsProps) {
  const [activeWeather, setActiveWeather] = useState<string>("auto")
  const { t } = useTranslations()

  const handleWeatherChange = (weather: string) => {
    setActiveWeather(weather)
    onWeatherChange(weather)
  }

  const weatherOptions = [
    { id: "auto", icon: Sun, label: t("weather.auto") },
    { id: "clear", icon: Sun, label: t("weather.clear") },
    { id: "rain", icon: CloudRain, label: t("weather.rain") },
    { id: "storm", icon: CloudLightning, label: t("weather.storm") },
    { id: "snow", icon: Snowflake, label: t("weather.snow") },
    { id: "leaves", icon: Cloud, label: t("weather.leaves") },
  ]

  return (
    <TooltipProvider>
      <div className="weather-controls">
        {weatherOptions.map((option) => (
          <Tooltip key={option.id}>
            <TooltipTrigger asChild>
              <button
                className={`weather-button ${activeWeather === option.id ? "active" : ""}`}
                onClick={() => handleWeatherChange(option.id)}
                aria-label={option.label}
              >
                <option.icon size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{option.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
