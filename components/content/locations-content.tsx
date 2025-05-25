"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "@/hooks/use-translations"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export function LocationsContent() {
  const { t } = useTranslations()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const secretLocations = [
    {
      id: "secret-woods",
      name: "locations.secret.woods.name",
      image: "/images/locations/secret-woods.png",
      description: "locations.secret.woods.description",
      howToAccess: "locations.secret.woods.access",
    },
    {
      id: "witch-hut",
      name: "locations.secret.witch.name",
      image: "/images/locations/witch-hut.png",
      description: "locations.secret.witch.description",
      howToAccess: "locations.secret.witch.access",
    },
    {
      id: "quarry",
      name: "locations.secret.quarry.name",
      image: "/images/locations/quarry.png",
      description: "locations.secret.quarry.description",
      howToAccess: "locations.secret.quarry.access",
    },
    {
      id: "sewers",
      name: "locations.secret.sewers.name",
      image: "/images/locations/sewers.png",
      description: "locations.secret.sewers.description",
      howToAccess: "locations.secret.sewers.access",
    },
  ]

  const mainLocations = [
    {
      id: "pelican-town",
      name: "locations.main.town.name",
      image: "/images/locations/pelican-town.png",
      description: "locations.main.town.description",
    },
    {
      id: "beach",
      name: "locations.main.beach.name",
      image: "/images/locations/beach.png",
      description: "locations.main.beach.description",
    },
    {
      id: "mountains",
      name: "locations.main.mountains.name",
      image: "/images/locations/mountains.png",
      description: "locations.main.mountains.description",
    },
    {
      id: "forest",
      name: "locations.main.forest.name",
      image: "/images/locations/forest.png",
      description: "locations.main.forest.description",
    },
  ]

  const gingerIslandLocations = [
    {
      id: "ginger-island-north",
      name: "locations.ginger.north.name",
      image: "/images/locations/ginger-island-north.png",
      description: "locations.ginger.north.description",
      features: "locations.ginger.north.features",
    },
    {
      id: "ginger-island-west",
      name: "locations.ginger.west.name",
      image: "/images/locations/ginger-island-west.png",
      description: "locations.ginger.west.description",
      features: "locations.ginger.west.features",
    },
    {
      id: "ginger-island-south",
      name: "locations.ginger.south.name",
      image: "/images/locations/ginger-island-south.png",
      description: "locations.ginger.south.description",
      features: "locations.ginger.south.features",
    },
    {
      id: "ginger-island-volcano",
      name: "locations.ginger.volcano.name",
      image: "/images/locations/ginger-island-volcano.png",
      description: "locations.ginger.volcano.description",
      features: "locations.ginger.volcano.features",
    },
  ]

  return (
    <div className="space-y-8 locations-section">
      {/* Location section decorations with high z-index */}
      {mounted && !isMobile && (
        <>
          <div className="section-element location-element location-element-1"></div>
          <div className="section-element location-element location-element-2"></div>

          {/* Additional location decorations */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`loc-deco-${index}`}
              className="section-decoration location-decoration"
              style={{
                top: `${15 + index * 20}%`,
                left: index % 2 === 0 ? `${70 + (index % 3) * 10}%` : `${5 + (index % 3) * 10}%`,
                animationDelay: `${index * 0.8}s`,
              }}
            />
          ))}
        </>
      )}

      <Card className="pixel-border stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-xl text-stardew-green">
            {typeof t("locations.title") === "object" ? JSON.stringify(t("locations.title")) : t("locations.title")}
          </CardTitle>
          <CardDescription className="font-pixel text-xs">
            {typeof t("locations.description") === "object"
              ? JSON.stringify(t("locations.description"))
              : t("locations.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="main">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="main" className="font-pixel text-xs">
                {typeof t("locations.main.title") === "object"
                  ? JSON.stringify(t("locations.main.title"))
                  : t("locations.main.title")}
              </TabsTrigger>
              <TabsTrigger value="secret" className="font-pixel text-xs">
                {typeof t("locations.secret.title") === "object"
                  ? JSON.stringify(t("locations.secret.title"))
                  : t("locations.secret.title")}
              </TabsTrigger>
              <TabsTrigger value="ginger" className="font-pixel text-xs">
                {typeof t("locations.ginger.title") === "object"
                  ? JSON.stringify(t("locations.ginger.title"))
                  : t("locations.ginger.title")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="main">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mainLocations.map((location) => (
                  <Card
                    key={location.id}
                    className="overflow-hidden stardew-card hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-video relative bg-amber-100">
                      <Image
                        src={location.image || "/placeholder.svg?height=200&width=400"}
                        alt={typeof t(location.name) === "object" ? JSON.stringify(t(location.name)) : t(location.name)}
                        fill
                        className="object-cover pixel-image"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="font-pixel text-sm">
                        {typeof t(location.name) === "object" ? JSON.stringify(t(location.name)) : t(location.name)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        {typeof t(location.description) === "object"
                          ? JSON.stringify(t(location.description))
                          : t(location.description)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="secret">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {secretLocations.map((location) => (
                  <Card
                    key={location.id}
                    className="overflow-hidden stardew-card hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-video relative bg-amber-100">
                      <Image
                        src={location.image || "/placeholder.svg?height=200&width=400"}
                        alt={typeof t(location.name) === "object" ? JSON.stringify(t(location.name)) : t(location.name)}
                        fill
                        className="object-cover pixel-image"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="font-pixel text-sm">
                        {typeof t(location.name) === "object" ? JSON.stringify(t(location.name)) : t(location.name)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm mb-2">
                        {typeof t(location.description) === "object"
                          ? JSON.stringify(t(location.description))
                          : t(location.description)}
                      </p>
                      <div className="bg-amber-100 p-3 rounded-md">
                        <p className="text-xs font-bold">
                          {typeof t("locations.howToAccess") === "object"
                            ? JSON.stringify(t("locations.howToAccess"))
                            : t("locations.howToAccess")}
                          :
                        </p>
                        <p className="text-xs mt-1">
                          {typeof t(location.howToAccess) === "object"
                            ? JSON.stringify(t(location.howToAccess))
                            : t(location.howToAccess)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ginger">
              <div className="mb-6">
                <Card className="p-4 stardew-card bg-amber-50">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="w-full md:w-1/3 relative h-40">
                      <Image
                        src="/images/locations/ginger-island-map.png"
                        alt="Ginger Island Map"
                        fill
                        className="object-contain pixel-image"
                      />
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="font-pixel text-sm mb-2">{t("locations.ginger.overview.title")}</h3>
                      <p className="text-sm mb-2">{t("locations.ginger.overview.description")}</p>
                      <div className="bg-amber-100 p-3 rounded-md mt-2">
                        <p className="text-xs font-bold">{t("locations.ginger.overview.access.title")}:</p>
                        <p className="text-xs mt-1">{t("locations.ginger.overview.access.description")}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gingerIslandLocations.map((location) => (
                  <Card
                    key={location.id}
                    className="overflow-hidden stardew-card hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-video relative bg-amber-100">
                      <Image
                        src={location.image || "/placeholder.svg?height=200&width=400"}
                        alt={typeof t(location.name) === "object" ? JSON.stringify(t(location.name)) : t(location.name)}
                        fill
                        className="object-cover pixel-image"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="font-pixel text-sm">
                        {typeof t(location.name) === "object" ? JSON.stringify(t(location.name)) : t(location.name)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm mb-2">
                        {typeof t(location.description) === "object"
                          ? JSON.stringify(t(location.description))
                          : t(location.description)}
                      </p>
                      <div className="bg-amber-100 p-3 rounded-md">
                        <p className="text-xs font-bold">{t("locations.ginger.features")}:</p>
                        <p className="text-xs mt-1">
                          {typeof t(location.features) === "object"
                            ? JSON.stringify(t(location.features))
                            : t(location.features)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
