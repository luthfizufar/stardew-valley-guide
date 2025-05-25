"use client"

import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { useTranslations } from "@/hooks/use-translations"
import Image from "next/image"

export function GameUIElements() {
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const { t } = useTranslations()

  useEffect(() => {
    setMounted(true)

    // Show tip randomly
    const tipTimer = setInterval(() => {
      if (Math.random() > 0.7) {
        setShowTip(true)
        setTimeout(() => setShowTip(false), 5000)
      }
    }, 30000)

    return () => clearInterval(tipTimer)
  }, [])

  if (!mounted) return null

  const tips = [
    "Talking to villagers daily increases friendship",
    "Check the TV for weather forecasts and tips",
    "Crops grow faster with quality fertilizer",
    "Golden Walnuts are hidden all over Ginger Island",
    "The Volcano Forge can enchant your tools",
  ]

  const randomTip = tips[Math.floor(Math.random() * tips.length)]

  return (
    <>
      {/* Junimo helper */}
      <div className="fixed bottom-20 right-20 cursor-pointer" onClick={() => setShowTip(!showTip)}>
        <Image
          src="/images/junimo.gif"
          alt="Junimo Helper"
          width={48}
          height={48}
          className="pixel-image"
        />
      </div>

      {/* Game tip */}
      {showTip && (
        <div className="fixed bottom-20 right-20 translate-y-[-100%] max-w-xs z-[1000] game-dialog">
          <p className="font-pixel text-xs mb-2">TIP:</p>
          <p className="text-sm">{randomTip}</p>
        </div>
      )}
    </>
  )
}
