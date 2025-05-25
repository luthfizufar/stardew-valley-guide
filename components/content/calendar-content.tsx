"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "@/hooks/use-translations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { SeasonalAnimations } from "@/components/seasonal-animations"
import Image from "next/image"

export function CalendarContent() {
  const { t } = useTranslations()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)
  const [currentSeason, setCurrentSeason] = useState("spring")

  useEffect(() => {
    setMounted(true)
  }, [])

  const seasons = ["spring", "summer", "fall", "winter"]

  const events: {
    [key: string]: Array<{
      day: number
      name: string
      icon: string
      type: "birthday" | "festival"
      description?: string
    }>
  } = {
    spring: [
      {
        day: 4,
        name: "Kent's Birthday",
        icon: "/images/characters/kent_icon.png",
        type: "birthday"
      },
      {
        day: 7,
        name: "Lewis's Birthday",
        icon: "/images/characters/lewis_icon.png",
        type: "birthday"
      },
      {
        day: 10,
        name: "Vincent's Birthday",
        icon: "/images/characters/vincent_icon.png",
        type: "birthday"
      },
      {
        day: 13,
        name: "Egg Festival",
        icon: "/images/events/flag.gif",
        type: "festival"
      },
      {
        day: 14,
        name: "Haley's Birthday",
        icon: "/images/characters/haley_icon.png",
        type: "birthday"
      },
      {
        day: 15,
        name: "Desert Festival",
        icon: "/images/events/starr.png",
        type: "festival"
      },
      {
        day: 16,
        name: "Desert Festival",
        icon: "/images/events/starr.png",
        type: "festival"
      },
      {
        day: 17,
        name: "Desert Festival",
        icon: "/images/events/starr.png",
        type: "festival"
      },
      {
        day: 18,
        name: "Pam's Birthday",
        icon: "/images/characters/pam_icon.png",
        type: "birthday"
      },
      {
        day: 20,
        name: "Shane's Birthday",
        icon: "/images/characters/shane_icon.png",
        type: "birthday"
      },
      {
        day: 24,
        name: "Flower Dance",
        icon: "/images/events/flag.gif",
        type: "festival"
      },
      {
        day: 26,
        name: "Pierre's Birthday",
        icon: "/images/characters/pierre_icon.png",
        type: "birthday"
      },
      {
        day: 27,
        name: "Emily's Birthday",
        icon: "/images/characters/emily_icon.png",
        type: "birthday"
      }
    ],
    summer: [
      {
        day: 4,
        name: "Jas's Birthday",
        icon: "/images/characters/jas_icon.png",
        type: "birthday"
      },
      {
        day: 8,
        name: "Gus's Birthday",
        icon: "/images/characters/gus_icon.png",
        type: "birthday"
      },
      {
        day: 10,
        name: "Maru's Birthday",
        icon: "/images/characters/maru_icon.png",
        type: "birthday"
      },
      {
        day: 11,
        name: "Luau",
        icon: "/images/events/flag.gif",
        type: "festival",
        description: "Luau is a Festival that takes place on the 11th of every Summer. The player attends the Luau by entering The Beach between 9am and 2pm. The beach cannot be entered before 9am. When the Luau ends, the player will be returned to The Farm at 10pm."
      },
      {
        day: 13,
        name: "Alex's Birthday",
        icon: "/images/characters/alex_icon.png",
        type: "birthday"
      },
      {
        day: 17,
        name: "Sam's Birthday",
        icon: "/images/characters/sam_icon.png",
        type: "birthday"
      },
      {
        day: 19,
        name: "Demetrius's Birthday",
        icon: "/images/characters/demetrius_icon.png",
        type: "birthday"
      },
      {
        day: 20,
        name: "Trout Derby",
        icon: "/images/events/hook.png",
        type: "festival",
        description: "The Trout Derby is a fishing mini festival that occurs on the 20th and 21st of Summer. The festival begins at 6:10am and ends at 2:00am on both days. The festival takes place in Cindersap Forest by the river near Marnie's Ranch. During the festival, players can fish in the river to catch Rainbow Trout, which can be caught all day long and regardless of weather."
      },
      {
        day: 21,
        name: "Trout Derby",
        icon: "/images/events/hook.png",
        type: "festival",
        description: "The Trout Derby is a fishing mini festival that occurs on the 20th and 21st of Summer. The festival begins at 6:10am and ends at 2:00am on both days. The festival takes place in Cindersap Forest by the river near Marnie's Ranch. During the festival, players can fish in the river to catch Rainbow Trout, which can be caught all day long and regardless of weather."
      },
      {
        day: 22,
        name: "Dwarf's Birthday",
        icon: "/images/characters/dwarf_icon.png",
        type: "birthday"
      },
      {
        day: 24,
        name: "Willy's Birthday",
        icon: "/images/characters/willy_icon.png",
        type: "birthday"
      },
      {
        day: 26,
        name: "Leo's Birthday",
        icon: "/images/characters/leo_icon.png",
        type: "birthday"
      },
      {
        day: 28,
        name: "Dance of the Moonlight Jellies",
        icon: "/images/events/flag.gif",
        type: "festival",
        description: "The Dance of the Moonlight Jellies is a Festival that takes place at night on the 28th of every Summer at The Beach. The player can choose to attend the festival by entering the area between 10 pm and 12 am. When the festival ends, they will be returned to The Farm at midnight."
      }
    ],
    fall: [
      {
        day: 2,
        name: "Penny's Birthday",
        icon: "/images/characters/penny_icon.png",
        type: "birthday"
      },
      {
        day: 5,
        name: "Elliott's Birthday",
        icon: "/images/characters/elliott_icon.png",
        type: "birthday"
      },
      {
        day: 11,
        name: "Jodi's Birthday",
        icon: "/images/characters/jodi_icon.png",
        type: "birthday"
      },
      {
        day: 13,
        name: "Abigail's Birthday",
        icon: "/images/characters/abigail_icon.png",
        type: "birthday"
      },
      {
        day: 15,
        name: "Sandy's Birthday",
        icon: "/images/characters/sandy_icon.png",
        type: "birthday"
      },
      {
        day: 16,
        name: "Stardew Valley Fair",
        icon: "/images/events/flag.gif",
        type: "festival",
        description: "The Stardew Valley Fair is a festival that takes place on Tuesday, the 16th of Fall every year. The player attends the fair by entering Pelican Town between 9am and 3pm. When the player leaves the festival, they will be returned to The Farm at 10pm."
      },
      {
        day: 18,
        name: "Marnie's Birthday",
        icon: "/images/characters/marnie_icon.png",
        type: "birthday"
      },
      {
        day: 21,
        name: "Robin's Birthday",
        icon: "/images/characters/robin_icon.png",
        type: "birthday"
      },
      {
        day: 24,
        name: "George's Birthday",
        icon: "/images/characters/george_icon.png",
        type: "birthday"
      },
      {
        day: 27,
        name: "Spirit's Eve",
        icon: "/images/events/flag.gif",
        type: "festival",
        description: "Spirit's Eve is a festival that takes place on the 27th of Fall. The festival begins at 10pm when the player enters Pelican Town. The festival features a haunted maze in which players can find rare items. When the festival ends at midnight, the player will be returned to The Farm."
      }
    ],
    winter: [
      {
        day: 1,
        name: "Krobus's Birthday",
        icon: "/images/characters/krobus_icon.png",
        type: "birthday"
      },
      {
        day: 3,
        name: "Linus's Birthday",
        icon: "/images/characters/linus_icon.png",
        type: "birthday"
      },
      {
        day: 7,
        name: "Caroline's Birthday",
        icon: "/images/characters/caroline_icon.png",
        type: "birthday"
      },
      {
        day: 8,
        name: "Festival of Ice",
        icon: "/images/events/flag.gif",
        type: "festival",
        description: "The Festival of Ice is a winter celebration where villagers gather to participate in ice fishing competitions and snow sculptures."
      },
      {
        day: 10,
        name: "Sebastian's Birthday",
        icon: "/images/characters/sebastian_icon.png",
        type: "birthday"
      },
      {
        day: 12,
        name: "SquidFest",
        icon: "/images/events/hook.png",
        type: "festival",
        description: "SquidFest is a two-day fishing festival where rare squids can be caught in abundance."
      },
      {
        day: 13,
        name: "SquidFest",
        icon: "/images/events/hook.png",
        type: "festival",
        description: "SquidFest is a two-day fishing festival where rare squids can be caught in abundance."
      },
      {
        day: 14,
        name: "Harvey's Birthday",
        icon: "/images/characters/harvey_icon.png",
        type: "birthday"
      },
      {
        day: 15,
        name: "Night Market",
        icon: "/images/events/starr.png",
        type: "festival",
        description: "The Night Market is a special three-day festival featuring traveling merchants, submarine rides, and magical boat rides."
      },
      {
        day: 16,
        name: "Night Market",
        icon: "/images/events/starr.png",
        type: "festival",
        description: "The Night Market is a special three-day festival featuring traveling merchants, submarine rides, and magical boat rides."
      },
      {
        day: 17,
        name: "Night Market",
        icon: "/images/events/starr.png",
        type: "festival",
        description: "The Night Market is a special three-day festival featuring traveling merchants, submarine rides, and magical boat rides."
      },
      {
        day: 17,
        name: "Wizard's Birthday",
        icon: "/images/characters/wizard_icon.png",
        type: "birthday"
      },
      {
        day: 20,
        name: "Evelyn's Birthday",
        icon: "/images/characters/evelyn_icon.png",
        type: "birthday"
      },
      {
        day: 23,
        name: "Leah's Birthday",
        icon: "/images/characters/leah_icon.png",
        type: "birthday"
      },
      {
        day: 25,
        name: "Feast of the Winter Star",
        icon: "/images/events/flag.gif",
        type: "festival",
        description: "The Feast of the Winter Star is a celebration where villagers exchange gifts and enjoy a festive meal together."
      },
      {
        day: 26,
        name: "Clint's Birthday",
        icon: "/images/characters/clint_icon.png",
        type: "birthday"
      }
    ]
  }

  const handleSeasonChange = (season: string) => {
    setCurrentSeason(season)
  }

  return (
    <div className="space-y-8 calendar-section">
      {/* Calendar section decorations with high z-index */}
      {mounted && !isMobile && (
        <>
          <div className="section-element calendar-element calendar-element-1"></div>
          <div className="section-element calendar-element calendar-element-2"></div>

          {/* Season-specific decorations */}
          <div
            className="section-decoration"
            style={{
              top: "5%",
              right: "5%",
              width: "30px",
              height: "30px",
              backgroundColor:
                currentSeason === "spring"
                  ? "#ff9ff3"
                  : currentSeason === "summer"
                    ? "#fffa65"
                    : currentSeason === "fall"
                      ? "#e17055"
                      : "#dff9fb",
              borderRadius: currentSeason === "fall" ? "0" : "50%",
              clipPath:
                currentSeason === "fall"
                  ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                  : currentSeason === "winter"
                    ? "polygon(50% 0%, 50% 100%, 100% 50%)"
                    : "",
              zIndex: 150,
              animation:
                currentSeason === "fall"
                  ? "rotate-decoration 4s infinite linear"
                  : "pulse-decoration 3s infinite ease-in-out",
              boxShadow: currentSeason === "summer" ? "0 0 15px #fffa65" : "none",
            }}
          ></div>
        </>
      )}

      {/* Seasonal animations */}
      <SeasonalAnimations season={currentSeason} />

      <Card className="pixel-border stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-xl text-stardew-green">{t("calendar.title")}</CardTitle>
          <CardDescription className="font-pixel text-xs">{t("calendar.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="spring" onValueChange={handleSeasonChange}>
            <TabsList className="grid grid-cols-4 mb-6">
              {seasons.map((season) => (
                <TabsTrigger key={season} value={season} className="font-pixel text-xs">
                  {t(`calendar.seasons.${season}`)}
                </TabsTrigger>
              ))}
            </TabsList>

            {seasons.map((season) => (
              <TabsContent key={season} value={season}>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
                    const dayEvents = events[season].filter((event) => event.day === day)
                    return (
                      <Card
                        key={day}
                        className={`p-2 min-h-[100px] stardew-card ${dayEvents.length > 0 ? "border-2 border-green-500" : ""}`}
                      >
                        <div className="font-pixel text-xs mb-2">{day}</div>
                        {dayEvents.map((event, index) => (
                          <div key={index} className="flex flex-col items-center gap-1">
                            <div className="relative w-8 h-8">
                              <Image
                                src={event.icon}
                                alt={event.name}
                                width={32}
                                height={32}
                                className="pixel-image"
                              />
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-[10px] font-pixel whitespace-nowrap overflow-hidden text-ellipsis ${
                                event.type === "festival" ? "bg-amber-100" : "bg-blue-100"
                              }`}
                            >
                              {event.name}
                            </Badge>
                          </div>
                        ))}
                      </Card>
                    )
                  })}
                </div>

                <div className="mt-8 space-y-4">
                  <h3 className="font-pixel text-sm">Events</h3>
                  {events[season].map((event, index) => (
                    <Card key={index} className="p-4 stardew-card">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-pixel shrink-0">
                          {event.day}
                        </div>
                        <div className="relative w-8 h-8 shrink-0">
                          <Image
                            src={event.icon}
                            alt={event.name}
                            width={32}
                            height={32}
                            className="pixel-image"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-pixel text-sm">{event.name}</h4>
                          {event.description && (
                            <p className="text-xs mt-2 text-gray-600">{event.description}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}