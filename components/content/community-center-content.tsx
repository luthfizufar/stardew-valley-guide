"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from "@/hooks/use-translations"
import { useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function CommunityCenterContent() {
  const { t } = useTranslations()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)
  const [bundleProgress, setBundleProgress] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bundleProgress")
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error("Failed to parse saved bundle progress", e)
        }
      }
    }

    // Default empty progress object
    return {}
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Save to localStorage whenever bundleProgress changes
    if (mounted) {
      localStorage.setItem("bundleProgress", JSON.stringify(bundleProgress))
    }
  }, [bundleProgress, mounted])

  const toggleItem = (roomId: string, bundleId: string, itemId: string) => {
    setBundleProgress((prev) => {
      const key = `${roomId}-${bundleId}-${itemId}`
      const newProgress = { ...prev }
      newProgress[key] = !prev[key]
      return newProgress
    })
  }

  const calculateRoomProgress = (roomId: string) => {
    const roomBundles = rooms.find((room) => room.id === roomId)?.bundles || []
    let totalItems = 0
    let completedItems = 0

    roomBundles.forEach((bundle) => {
      const items = bundle.items.split(", ")
      totalItems += items.length

      items.forEach((item, index) => {
        const key = `${roomId}-${bundle.name}-${index}`
        if (bundleProgress[key]) {
          completedItems++
        }
      })
    })

    return totalItems > 0 ? (completedItems / totalItems) * 100 : 0
  }

  const calculateTotalProgress = () => {
    let totalItems = 0
    let completedItems = 0

    rooms.forEach((room) => {
      room.bundles.forEach((bundle) => {
        const items = bundle.items.split(", ")
        totalItems += items.length

        items.forEach((item, index) => {
          const key = `${room.id}-${bundle.name}-${index}`
          if (bundleProgress[key]) {
            completedItems++
          }
        })
      })
    })

    return totalItems > 0 ? (completedItems / totalItems) * 100 : 0
  }

  const resetProgress = () => {
    if (confirm("Are you sure you want to reset all bundle progress?")) {
      setBundleProgress({})
    }
  }

  const rooms = [
    {
      id: "crafts",
      name: t("community.rooms.crafts.title"),
      description: t("community.rooms.crafts.description"),
      reward: t("community.rooms.crafts.reward"),
      image: "/images/community/crafts-room.png",
      bundles: [
        {
          name: t("community.bundles.spring"),
          items: "Wild Horseradish, Daffodil, Leek, Dandelion",
        },
        {
          name: t("community.bundles.summer"),
          items: "Grape, Spice Berry, Sweet Pea",
        },
        {
          name: t("community.bundles.fall"),
          items: "Common Mushroom, Wild Plum, Hazelnut, Blackberry",
        },
        {
          name: t("community.bundles.winter"),
          items: "Winter Root, Crystal Fruit, Snow Yam, Crocus",
        },
        {
          name: t("community.bundles.construction"),
          items: "Wood (99), Stone (99), Hardwood (10), Fiber (10)",
        },
        {
          name: t("community.bundles.exotic"),
          items: "Coconut, Cactus Fruit, Cave Carrot, Red Mushroom, Purple Mushroom, Maple Syrup, Oak Resin, Pine Tar",
        },
      ],
    },
    {
      id: "pantry",
      name: t("community.rooms.pantry.title"),
      description: t("community.rooms.pantry.description"),
      reward: t("community.rooms.pantry.reward"),
      image: "/images/community/pantry.png",
      bundles: [
        {
          name: t("community.bundles.quality"),
          items: "Gold Star Parsnip, Gold Star Melon, Gold Star Pumpkin, Gold Star Corn",
        },
        {
          name: t("community.bundles.animal"),
          items: "Large Milk, Large Egg (Brown), Large Egg, Wool, Duck Egg, Duck Feather",
        },
        {
          name: t("community.bundles.artisan"),
          items: "Truffle Oil, Cloth, Goat Cheese, Cheese, Honey, Jelly, Apple, Apricot",
        },
      ],
    },
    {
      id: "fish",
      name: t("community.rooms.fish.title"),
      description: t("community.rooms.fish.description"),
      reward: t("community.rooms.fish.reward"),
      image: "/images/community/fish-tank.png",
      bundles: [
        {
          name: t("community.bundles.river"),
          items: "Sunfish, Catfish, Shad, Tiger Trout",
        },
        {
          name: t("community.bundles.lake"),
          items: "Largemouth Bass, Carp, Bullhead, Sturgeon",
        },
        {
          name: t("community.bundles.ocean"),
          items: "Sardine, Tuna, Red Snapper, Tilapia",
        },
        {
          name: t("community.bundles.night"),
          items: "Walleye, Bream, Eel",
        },
        {
          name: t("community.bundles.specialty"),
          items: "Pufferfish, Ghostfish, Sandfish, Woodskip",
        },
        {
          name: t("community.bundles.crab"),
          items: "Lobster, Crayfish, Crab, Cockle, Mussel, Shrimp, Snail, Periwinkle, Oyster, Clam",
        },
      ],
    },
    {
      id: "boiler",
      name: t("community.rooms.boiler.title"),
      description: t("community.rooms.boiler.description"),
      reward: t("community.rooms.boiler.reward"),
      image: "/images/community/boiler-room.png",
      bundles: [
        {
          name: t("community.bundles.blacksmith"),
          items: "Copper Bar, Iron Bar, Gold Bar",
        },
        {
          name: t("community.bundles.geologist"),
          items: "Quartz, Earth Crystal, Frozen Tear, Fire Quartz",
        },
        {
          name: t("community.bundles.adventurer"),
          items: "Slime (99), Bat Wing (10), Solar Essence, Void Essence",
        },
      ],
    },
    {
      id: "bulletin",
      name: t("community.rooms.bulletin.title"),
      description: t("community.rooms.bulletin.description"),
      reward: t("community.rooms.bulletin.reward"),
      image: "/images/community/bulletin-board.png",
      bundles: [
        {
          name: t("community.bundles.chef"),
          items: "Maple Syrup, Fiddlehead Fern, Truffle, Poppy, Maki Roll, Fried Egg",
        },
        {
          name: t("community.bundles.dye"),
          items: "Red Mushroom, Sea Urchin, Sunflower, Duck Feather, Aquamarine, Red Cabbage",
        },
        {
          name: t("community.bundles.field"),
          items: "Purple Mushroom, Nautilus Shell, Chub, Frozen Geode",
        },
        {
          name: t("community.bundles.fodder"),
          items: "Wheat (10), Hay (10), Apple (3)",
        },
        {
          name: t("community.bundles.enchanter"),
          items: "Oak Resin, Wine, Rabbit's Foot, Pomegranate",
        },
      ],
    },
    {
      id: "vault",
      name: t("community.rooms.vault.title"),
      description: t("community.rooms.vault.description"),
      reward: t("community.rooms.vault.reward"),
      image: "/images/community/vault.png",
      bundles: [
        {
          name: t("community.bundles.vault2500"),
          items: "2,500g",
        },
        {
          name: t("community.bundles.vault5000"),
          items: "5,000g",
        },
        {
          name: t("community.bundles.vault10000"),
          items: "10,000g",
        },
        {
          name: t("community.bundles.vault25000"),
          items: "25,000g",
        },
      ],
    },
  ]

  const completionTips = [
    {
      title: t("community.strategy.yearOne"),
      description: "Focus on the Pantry room first to unlock the Greenhouse, which allows year-round crop growing.",
    },
    {
      title: t("community.strategy.seasonal"),
      description:
        "Keep one of each seasonal item. Some items are only available in specific seasons or weather conditions.",
    },
    {
      title: t("community.strategy.difficult"),
      description:
        "Red Cabbage (Summer Year 2), Truffle (requires Deluxe Barn), and Rabbit's Foot are among the most challenging items.",
    },
    {
      title: t("community.strategy.planning"),
      description:
        "Check the Community Center bundles before selling rare items. The bundle preview menu (in your inventory) helps track progress.",
    },
  ]

  return (
    <div className="space-y-8 community-section">
      {/* Community Center section decorations with high z-index */}
      {mounted && !isMobile && (
        <>
          <div className="section-element character-element character-element-1"></div>
          <div className="section-element character-element character-element-2"></div>

          {/* Additional community center decorations */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`cc-deco-${index}`}
              className="section-decoration"
              style={{
                top: `${20 + index * 15}%`,
                left: `${5 + (index % 3) * 30}%`,
                width: "20px",
                height: "20px",
                backgroundColor:
                  index % 5 === 0
                    ? "#ff5252"
                    : index % 5 === 1
                      ? "#4caf50"
                      : index % 5 === 2
                        ? "#2196f3"
                        : index % 5 === 3
                          ? "#ffeb3b"
                          : "#9c27b0",
                borderRadius: "50%",
                animationDelay: `${index * 0.5}s`,
                animation: "junimo-hop 3s infinite ease-in-out",
              }}
            />
          ))}
        </>
      )}

      <Card className="pixel-border stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-xl text-stardew-green">{t("community.title")}</CardTitle>
          <CardDescription className="font-pixel text-xs">{t("community.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tracker">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="tracker" className="font-pixel text-xs">
                Bundle Tracker
              </TabsTrigger>
              <TabsTrigger value="rooms" className="font-pixel text-xs">
                {t("community.rooms.title")}
              </TabsTrigger>
              <TabsTrigger value="strategy" className="font-pixel text-xs">
                {t("community.strategy.title")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tracker">
              <div className="space-y-6">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h3 className="font-pixel text-sm">Community Center Progress</h3>
                      <p className="text-xs mt-1">Track your progress on completing the Community Center bundles</p>
                    </div>
                    <button
                      onClick={resetProgress}
                      className="mt-2 md:mt-0 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded text-xs font-pixel transition-colors"
                    >
                      Reset Progress
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Total Progress:</span>
                      <span className="text-xs">{Math.round(calculateTotalProgress())}%</span>
                    </div>
                    <Progress value={calculateTotalProgress()} className="h-2" />

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-4">
                      {rooms.map((room) => (
                        <div key={room.id} className="bg-white p-2 rounded border border-amber-200">
                          <div className="text-xs font-bold mb-1">{room.name}</div>
                          <Progress value={calculateRoomProgress(room.id)} className="h-1.5" />
                          <div className="text-[10px] mt-1 text-right">
                            {Math.round(calculateRoomProgress(room.id))}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Tabs defaultValue={rooms[0].id}>
                  <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
                    {rooms.map((room) => (
                      <TabsTrigger key={room.id} value={room.id} className="font-pixel text-xs">
                        {room.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {rooms.map((room) => (
                    <TabsContent key={room.id} value={room.id}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="aspect-video relative bg-amber-100 rounded-lg overflow-hidden mb-4">
                            <Image
                              src={room.image || "/placeholder.svg?height=200&width=400"}
                              alt={room.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <Card className="stardew-card">
                            <CardHeader className="p-3">
                              <CardTitle className="font-pixel text-sm">{room.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <p className="text-xs mb-2">{room.description}</p>
                              <div className="bg-amber-50 p-2 rounded">
                                <p className="text-xs font-bold">Reward: {room.reward}</p>
                              </div>
                              <div className="mt-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold">Room Progress:</span>
                                  <span className="text-xs">{Math.round(calculateRoomProgress(room.id))}%</span>
                                </div>
                                <Progress value={calculateRoomProgress(room.id)} className="h-2 mt-1" />
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="space-y-4">
                          {room.bundles.map((bundle) => {
                            const items = bundle.items.split(", ")
                            const bundleCompleted = items.every(
                              (_, index) => bundleProgress[`${room.id}-${bundle.name}-${index}`],
                            )

                            return (
                              <Card
                                key={bundle.name}
                                className={`stardew-card ${bundleCompleted ? "border-green-500 bg-green-50" : ""}`}
                              >
                                <CardHeader className="p-3">
                                  <div className="flex justify-between items-center">
                                    <CardTitle className="font-pixel text-sm">{bundle.name}</CardTitle>
                                    {bundleCompleted && <Badge className="bg-green-500">Completed</Badge>}
                                  </div>
                                </CardHeader>
                                <CardContent className="p-3 pt-0">
                                  <div className="space-y-2">
                                    {items.map((item, index) => (
                                      <div key={index} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`${room.id}-${bundle.name}-${index}`}
                                          checked={bundleProgress[`${room.id}-${bundle.name}-${index}`] || false}
                                          onCheckedChange={() => toggleItem(room.id, bundle.name, index.toString())}
                                        />
                                        <label
                                          htmlFor={`${room.id}-${bundle.name}-${index}`}
                                          className={`text-sm ${bundleProgress[`${room.id}-${bundle.name}-${index}`] ? "line-through text-gray-500" : ""}`}
                                        >
                                          {item}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          })}
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </TabsContent>

            <TabsContent value="rooms">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.map((room) => (
                  <Card key={room.id} className="overflow-hidden stardew-card">
                    <div className="aspect-video relative bg-amber-100">
                      <Image
                        src={room.image || "/placeholder.svg?height=200&width=400"}
                        alt={room.name}
                        fill
                        className="object-cover pixel-image"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="font-pixel text-sm">{room.name}</CardTitle>
                      <CardDescription>{room.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="mb-2">
                        <span className="font-bold text-sm">Reward:</span> {room.reward}
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-bold text-sm">Bundles:</h4>
                        {room.bundles.map((bundle, index) => (
                          <div key={index} className="bg-amber-50 p-2 rounded text-xs">
                            <div className="font-bold">{bundle.name}</div>
                            <div>{bundle.items}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="strategy">
              <div className="space-y-4">
                {completionTips.map((tip, index) => (
                  <Card key={index} className="stardew-card">
                    <CardHeader className="p-4">
                      <CardTitle className="font-pixel text-sm">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}

                <Card className="stardew-card">
                  <CardHeader className="p-4">
                    <CardTitle className="font-pixel text-sm">{t("community.joja.title")}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm mb-2">{t("community.joja.description")}</p>
                    <div className="bg-amber-50 p-3 rounded-md">
                      <p className="text-xs font-bold">{t("community.joja.membership")}:</p>
                      <p className="text-xs mt-1">
                        Purchase a Joja Membership for 5,000g to unlock development projects.
                      </p>
                      <p className="text-xs font-bold mt-2">{t("community.joja.projects")}:</p>
                      <p className="text-xs mt-1">
                        Bridge Repair (10,000g), Greenhouse (35,000g), Minecarts (15,000g), Bus (40,000g), Theater
                        (500,000g)
                      </p>
                      <p className="text-xs font-bold mt-2">{t("community.joja.pros")}:</p>
                      <p className="text-xs mt-1">
                        Joja is simpler but more expensive. Community Center is more rewarding but requires specific
                        items.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
