"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from "@/hooks/use-translations"
import { useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import Image from "next/image"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Calendar, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"

function CropProfitCalculator({ crops }: { crops: any }) {
  const [selectedSeason, setSelectedSeason] = useState("spring")
  const [daysInSeason, setDaysInSeason] = useState(28)
  const [includeProcessing, setIncludeProcessing] = useState(false)
  const [artisanProfession, setArtisanProfession] = useState(false)
  const [qualityLevel, setQualityLevel] = useState("normal")
  const [sortBy, setSortBy] = useState("profitPerDay")

  const qualityMultipliers = {
    normal: 1,
    silver: 1.25,
    gold: 1.5,
    iridium: 2,
  }

  const processingValues = {
    // Fruits -> Wine
    strawberry: { machine: "Keg", output: "Wine", baseValue: 360, time: 7 },
    blueberry: { machine: "Keg", output: "Wine", baseValue: 150, time: 7 },
    cranberry: { machine: "Keg", output: "Wine", baseValue: 225, time: 7 },
    starfruit: { machine: "Keg", output: "Wine", baseValue: 2250, time: 7 },
    "ancient-fruit": { machine: "Keg", output: "Wine", baseValue: 1650, time: 7 },
    grape: { machine: "Keg", output: "Wine", baseValue: 240, time: 7 },
    pineapple: { machine: "Keg", output: "Wine", baseValue: 900, time: 7 },

    // Vegetables -> Juice
    tomato: { machine: "Keg", output: "Juice", baseValue: 135, time: 6 },
    potato: { machine: "Keg", output: "Juice", baseValue: 180, time: 6 },
    cauliflower: { machine: "Keg", output: "Juice", baseValue: 393.75, time: 6 },
    pumpkin: { machine: "Keg", output: "Juice", baseValue: 720, time: 6 },

    // Special cases
    hops: { machine: "Keg", output: "Pale Ale", baseValue: 300, time: 1.6 },
    wheat: { machine: "Keg", output: "Beer", baseValue: 200, time: 1.2 },

    // Preserves (lower value crops)
    parsnip: { machine: "Preserves Jar", output: "Pickles", baseValue: 120, time: 4 },
    kale: { machine: "Preserves Jar", output: "Pickles", baseValue: 270, time: 4 },
  }

  const calculateCropProfit = (crop: any) => {
    const seedPrice = typeof crop.seedPrice === "number" ? crop.seedPrice : 0
    const baseValue = crop.sellPrice * qualityMultipliers[qualityLevel]

    // Calculate harvests per season
    const timeToFirstHarvest = crop.growthTime
    const remainingDays = daysInSeason - timeToFirstHarvest
    const additionalHarvests = crop.regrowth > 0 ? Math.floor(remainingDays / crop.regrowth) : 0
    const totalHarvests = remainingDays >= 0 ? 1 + additionalHarvests : 0

    // Calculate processing value if enabled
    let finalValue = baseValue
    if (includeProcessing && processingValues[crop.name.toLowerCase().replace(/\s+/g, "-")]) {
      const processing = processingValues[crop.name.toLowerCase().replace(/\s+/g, "-")]
      finalValue = processing.baseValue
      if (artisanProfession) {
        finalValue *= 1.4 // Artisan profession bonus
      }
    }

    const totalRevenue = finalValue * totalHarvests
    const totalCost = seedPrice + (crop.regrowth === 0 ? seedPrice * (totalHarvests - 1) : 0)
    const totalProfit = totalRevenue - totalCost
    const profitPerDay = totalProfit / daysInSeason
    const profitPerSeed = totalProfit / (totalCost || 1)
    const roi = (totalProfit / (totalCost || 1)) * 100

    return {
      ...crop,
      totalHarvests,
      totalRevenue,
      totalCost,
      totalProfit,
      profitPerDay,
      profitPerSeed,
      roi,
      finalValue,
      processingInfo: includeProcessing ? processingValues[crop.name.toLowerCase().replace(/\s+/g, "-")] : null,
    }
  }

  const calculatedCrops = crops[selectedSeason]
    .map(calculateCropProfit)
    .filter((crop) => crop.totalHarvests > 0)
    .sort((a, b) => {
      switch (sortBy) {
        case "profitPerDay":
          return b.profitPerDay - a.profitPerDay
        case "totalProfit":
          return b.totalProfit - a.totalProfit
        case "roi":
          return b.roi - a.roi
        case "profitPerSeed":
          return b.profitPerSeed - a.profitPerSeed
        default:
          return b.profitPerDay - a.profitPerDay
      }
    })

  return (
    <div className="space-y-6">
      <Card className="stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-lg">Crop Profit Calculator</CardTitle>
          <CardDescription>Calculate and compare crop profitability with various factors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Season</label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="fall">Fall</option>
                <option value="special">Special</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Days in Season</label>
              <input
                type="number"
                value={daysInSeason}
                onChange={(e) => setDaysInSeason(Number(e.target.value))}
                min="1"
                max="112"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Quality Level</label>
              <select
                value={qualityLevel}
                onChange={(e) => setQualityLevel(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="normal">Normal (1x)</option>
                <option value="silver">Silver (1.25x)</option>
                <option value="gold">Gold (1.5x)</option>
                <option value="iridium">Iridium (2x)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full p-2 border rounded">
                <option value="profitPerDay">Profit per Day</option>
                <option value="totalProfit">Total Profit</option>
                <option value="roi">ROI %</option>
                <option value="profitPerSeed">Profit per Seed</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includeProcessing}
                onChange={(e) => setIncludeProcessing(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Include Processing</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={artisanProfession}
                onChange={(e) => setArtisanProfession(e.target.checked)}
                disabled={!includeProcessing}
                className="rounded"
              />
              <span className="text-sm">Artisan Profession (+40%)</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card className="stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-lg">Profitability Rankings</CardTitle>
          <CardDescription>
            {selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)} crops ranked by{" "}
            {sortBy.replace(/([A-Z])/g, " $1").toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-amber-50">
                  <th className="border border-amber-200 p-2 text-left font-pixel text-xs">Rank</th>
                  <th className="border border-amber-200 p-2 text-left font-pixel text-xs">Crop</th>
                  <th className="border border-amber-200 p-2 text-left font-pixel text-xs">Harvests</th>
                  <th className="border border-amber-200 p-2 text-left font-pixel text-xs">Total Profit</th>
                  <th className="border border-amber-200 p-2 text-left font-pixel text-xs">Profit/Day</th>
                  <th className="border border-amber-200 p-2 text-left font-pixel text-xs">ROI %</th>
                  <th className="border border-amber-200 p-2 text-left font-pixel text-xs">Processing</th>
                </tr>
              </thead>
              <tbody>
                {calculatedCrops.map((crop, index) => (
                  <tr key={crop.name} className={index % 2 === 0 ? "bg-white" : "bg-amber-50"}>
                    <td className="border border-amber-200 p-2 text-xs font-bold">#{index + 1}</td>
                    <td className="border border-amber-200 p-2 text-xs font-medium">{crop.name}</td>
                    <td className="border border-amber-200 p-2 text-xs">{crop.totalHarvests}</td>
                    <td className="border border-amber-200 p-2 text-xs font-bold text-green-600">
                      {crop.totalProfit.toLocaleString()}g
                    </td>
                    <td className="border border-amber-200 p-2 text-xs font-bold text-blue-600">
                      {crop.profitPerDay.toFixed(1)}g
                    </td>
                    <td className="border border-amber-200 p-2 text-xs">{crop.roi.toFixed(1)}%</td>
                    <td className="border border-amber-200 p-2 text-xs">
                      {crop.processingInfo ? (
                        <span className="text-purple-600">{crop.processingInfo.output}</span>
                      ) : (
                        <span className="text-gray-400">Raw</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculatedCrops.slice(0, 6).map((crop, index) => (
          <Card key={crop.name} className="stardew-card">
            <CardHeader className="p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="font-pixel text-sm">{crop.name}</CardTitle>
                <Badge variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}>#{index + 1}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Growth Time:</span>
                  <span>{crop.growthTime} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Regrowth:</span>
                  <span>{crop.regrowth > 0 ? `${crop.regrowth} days` : "None"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Harvests:</span>
                  <span className="font-bold">{crop.totalHarvests}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Cost:</span>
                  <span className="text-red-600">{crop.totalCost.toLocaleString()}g</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Revenue:</span>
                  <span className="text-blue-600">{crop.totalRevenue.toLocaleString()}g</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total Profit:</span>
                  <span className="text-green-600">{crop.totalProfit.toLocaleString()}g</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Profit per Day:</span>
                  <span className="text-green-600">{crop.profitPerDay.toFixed(1)}g</span>
                </div>
                <div className="flex justify-between">
                  <span>ROI:</span>
                  <span className="text-purple-600">{crop.roi.toFixed(1)}%</span>
                </div>
                {crop.processingInfo && (
                  <div className="mt-2 p-2 bg-purple-50 rounded">
                    <div className="text-xs">
                      <div className="font-bold">Processing: {crop.processingInfo.output}</div>
                      <div>Machine: {crop.processingInfo.machine}</div>
                      <div>Value: {crop.finalValue.toLocaleString()}g</div>
                      <div>Time: {crop.processingInfo.time} days</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-lg">Calculator Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-bold mb-2">Profit Optimization Tips:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Multi-harvest crops (like Strawberries) become more profitable over time</li>
                <li>Processing high-value fruits into wine dramatically increases profits</li>
                <li>Quality fertilizer increases crop value through better star ratings</li>
                <li>Artisan profession provides 40% bonus to processed goods</li>
                <li>Consider growth time vs. profit when planning seasonal rotations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Advanced Strategies:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Plant Ancient Fruit in greenhouse for year-round wine production</li>
                <li>Use Speed-Gro to fit extra harvests into seasons</li>
                <li>Combine high-profit crops with preserves jars for steady income</li>
                <li>Factor in processing time when calculating true profitability</li>
                <li>Consider crop diversity for Community Center bundles</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function FarmingContent() {
  const { t } = useTranslations()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const crops = {
    spring: [
      {
        name: "Strawberry",
        image: "/images/crops/strawberry.png",
        growthTime: 8,
        regrowth: 4,
        sellPrice: 120,
        seedPrice: 100,
      },
      {
        name: "Cauliflower",
        image: "/images/crops/cauliflower.png",
        growthTime: 12,
        regrowth: 0,
        sellPrice: 175,
        seedPrice: 80,
      },
      {
        name: "Potato",
        image: "/images/crops/potato.png",
        growthTime: 6,
        regrowth: 0,
        sellPrice: 80,
        seedPrice: 50,
      },
      {
        name: "Kale",
        image: "/images/crops/kale.png",
        growthTime: 6,
        regrowth: 0,
        sellPrice: 110,
        seedPrice: 70,
      },
      {
        name: "Garlic",
        image: "/images/crops/garlic.png",
        growthTime: 4,
        regrowth: 0,
        sellPrice: 60,
        seedPrice: 40,
      },
      {
        name: "Rhubarb",
        image: "/images/crops/rhubarb.png",
        growthTime: 13,
        regrowth: 0,
        sellPrice: 220,
        seedPrice: 100,
      },
      {
        name: "Coffee Bean",
        image: "/images/crops/coffee-bean.png",
        growthTime: 10,
        regrowth: 2,
        sellPrice: 15,
        seedPrice: "Dust Sprite Drop",
      },
      {
        name: "Parsnip",
        image: "/images/crops/parsnip.png",
        growthTime: 4,
        regrowth: 0,
        sellPrice: 35,
        seedPrice: 20,
      },
      {
        name: "Green Bean",
        image: "/images/crops/green-bean.png",
        growthTime: 10,
        regrowth: 3,
        sellPrice: 40,
        seedPrice: 60,
      },
      {
        name: "Tulip Bulb",
        image: "/images/crops/tulip.png",
        growthTime: 6,
        regrowth: 0,
        sellPrice: 30,
        seedPrice: 20,
      },
      {
        name: "Jazz Blue",
        image: "/images/crops/jazz-blue.png",
        growthTime: 7,
        regrowth: 0,
        sellPrice: 50,
        seedPrice: 30,
      },
      {
        name: "Blue Jazz",
        image: "/images/crops/blue-jazz.png",
        growthTime: 7,
        regrowth: 0,
        sellPrice: 50,
        seedPrice: 30,
      },
    ],
    summer: [
      {
        name: "Blueberry",
        image: "/images/crops/blueberry.png",
        growthTime: 13,
        regrowth: 4,
        sellPrice: 50,
        seedPrice: 80,
      },
      {
        name: "Melon",
        image: "/images/crops/melon.png",
        growthTime: 12,
        regrowth: 0,
        sellPrice: 250,
        seedPrice: 80,
      },
      {
        name: "Starfruit",
        image: "/images/crops/starfruit.png",
        growthTime: 13,
        regrowth: 0,
        sellPrice: 750,
        seedPrice: 400,
      },
      {
        name: "Red Cabbage",
        image: "/images/crops/red-cabbage.png",
        growthTime: 9,
        regrowth: 0,
        sellPrice: 260,
        seedPrice: 100,
      },
      {
        name: "Corn",
        image: "/images/crops/corn.png",
        growthTime: 14,
        regrowth: 4,
        sellPrice: 50,
        seedPrice: 150,
      },
      {
        name: "Hops",
        image: "/images/crops/hops.png",
        growthTime: 11,
        regrowth: 1,
        sellPrice: 25,
        seedPrice: 60,
      },
      {
        name: "Hot Pepper",
        image: "/images/crops/hot-pepper.png",
        growthTime: 5,
        regrowth: 3,
        sellPrice: 40,
        seedPrice: 40,
      },
      {
        name: "Poppy",
        image: "/images/crops/poppy.png",
        growthTime: 7,
        regrowth: 0,
        sellPrice: 140,
        seedPrice: 100,
      },
      {
        name: "Sunflower",
        image: "/images/crops/sunflower.png",
        growthTime: 8,
        regrowth: 0,
        sellPrice: 80,
        seedPrice: 200,
      },
      {
        name: "Tomato",
        image: "/images/crops/tomato.png",
        growthTime: 11,
        regrowth: 4,
        sellPrice: 60,
        seedPrice: 50,
      },
      {
        name: "Radish",
        image: "/images/crops/radish.png",
        growthTime: 6,
        regrowth: 0,
        sellPrice: 90,
        seedPrice: 40,
      },
      {
        name: "Wheat",
        image: "/images/crops/wheat.png",
        growthTime: 4,
        regrowth: 0,
        sellPrice: 25,
        seedPrice: 10,
      },
      {
        name: "Summer Spangle",
        image: "/images/crops/summer-spangle.png",
        growthTime: 8,
        regrowth: 0,
        sellPrice: 90,
        seedPrice: 50,
      },
      {
        name: "Spice Berry",
        image: "/images/crops/spice-berry.png",
        growthTime: 5,
        regrowth: 3,
        sellPrice: 80,
        seedPrice: 80,
      },
    ],
    fall: [
      {
        name: "Cranberry",
        image: "/images/crops/cranberry.png",
        growthTime: 7,
        regrowth: 5,
        sellPrice: 75,
        seedPrice: 240,
      },
      {
        name: "Pumpkin",
        image: "/images/crops/pumpkin.png",
        growthTime: 13,
        regrowth: 0,
        sellPrice: 320,
        seedPrice: 100,
      },
      {
        name: "Sweet Gem Berry",
        image: "/images/crops/sweet-gem-berry.png",
        growthTime: 24,
        regrowth: 0,
        sellPrice: 3000,
        seedPrice: 1000,
      },
      {
        name: "Grape",
        image: "/images/crops/grape.png",
        growthTime: 10,
        regrowth: 3,
        sellPrice: 80,
        seedPrice: 60,
      },
      {
        name: "Eggplant",
        image: "/images/crops/eggplant.png",
        growthTime: 5,
        regrowth: 5,
        sellPrice: 60,
        seedPrice: 20,
      },
      {
        name: "Yam",
        image: "/images/crops/yam.png",
        growthTime: 10,
        regrowth: 0,
        sellPrice: 160,
        seedPrice: 60,
      },
      {
        name: "Artichoke",
        image: "/images/crops/artichoke.png",
        growthTime: 8,
        regrowth: 0,
        sellPrice: 160,
        seedPrice: 30,
      },
      {
        name: "Fairy Rose",
        image: "/images/crops/fairy-rose.png",
        growthTime: 12,
        regrowth: 0,
        sellPrice: 290,
        seedPrice: 200,
      },
      {
        name: "Amaranth",
        image: "/images/crops/amaranth.png",
        growthTime: 7,
        regrowth: 0,
        sellPrice: 150,
        seedPrice: 70,
      },
      {
        name: "Beet",
        image: "/images/crops/beet.png",
        growthTime: 6,
        regrowth: 0,
        sellPrice: 100,
        seedPrice: 20,
      },
      {
        name: "Bok Choy",
        image: "/images/crops/bok-choy.png",
        growthTime: 4,
        regrowth: 0,
        sellPrice: 80,
        seedPrice: 50,
      },
      {
        name: "Sunflower",
        image: "/images/crops/sunflower-fall.png",
        growthTime: 8,
        regrowth: 0,
        sellPrice: 80,
        seedPrice: 200,
      },
      {
        name: "Wheat",
        image: "/images/crops/wheat-fall.png",
        growthTime: 4,
        regrowth: 0,
        sellPrice: 25,
        seedPrice: 10,
      },
    ],
    special: [
      {
        name: "Ancient Fruit",
        image: "/images/crops/ancient-fruit.png",
        growthTime: 28,
        regrowth: 7,
        sellPrice: 550,
        seedPrice: "Artifact/Seed Maker",
      },
      {
        name: "Coffee Bean",
        image: "/images/crops/coffee-bean.png",
        growthTime: 10,
        regrowth: 2,
        sellPrice: 15,
        seedPrice: "Drop from Dust Sprite",
      },
      {
        name: "Cactus Fruit",
        image: "/images/crops/cactus-fruit.png",
        growthTime: 12,
        regrowth: 3,
        sellPrice: 75,
        seedPrice: 150,
      },
      {
        name: "Pineapple",
        image: "/images/crops/pineapple.png",
        growthTime: 14,
        regrowth: 7,
        sellPrice: 300,
        seedPrice: "Ginger Island",
      },
      {
        name: "Taro Root",
        image: "/images/crops/taro-root.png",
        growthTime: 7,
        regrowth: 0,
        sellPrice: 100,
        seedPrice: "Ginger Island",
      },
      {
        name: "Tea Leaves",
        image: "/images/crops/tea-leaves.png",
        growthTime: 20,
        regrowth: 1,
        sellPrice: 50,
        seedPrice: "Caroline's Event",
      },
      {
        name: "Fiber",
        image: "/images/crops/fiber.png",
        growthTime: 7,
        regrowth: 0,
        sellPrice: 1,
        seedPrice: "Special Recipe",
      },
      {
        name: "Ginger",
        image: "/images/crops/ginger.png",
        growthTime: 3,
        regrowth: 0,
        sellPrice: 60,
        seedPrice: "Ginger Island Forage",
      },
      {
        name: "Magma Cap",
        image: "/images/crops/magma-cap.png",
        growthTime: 7,
        regrowth: 0,
        sellPrice: 400,
        seedPrice: "Volcano Dungeon",
      },
      {
        name: "Banana",
        image: "/images/crops/banana.png",
        growthTime: 28,
        regrowth: 3,
        sellPrice: 150,
        seedPrice: "Ginger Island Tree",
      },
      {
        name: "Mango",
        image: "/images/crops/mango.png",
        growthTime: 28,
        regrowth: 3,
        sellPrice: 130,
        seedPrice: "Ginger Island Tree",
      },
      {
        name: "Qi Fruit",
        image: "/images/crops/qi-fruit.png",
        growthTime: 4,
        regrowth: 0,
        sellPrice: 1,
        seedPrice: "Qi's Challenge",
      },
      {
        name: "Mushroom Tree",
        image: "/images/crops/mushroom-tree.png",
        growthTime: 10,
        regrowth: 1,
        sellPrice: 100,
        seedPrice: "Special Event",
      },
    ],
  }

  const animals = [
    {
      name: "Chicken",
      image: "/images/animals/chicken.png",
      cost: 800,
      building: "Coop",
      product: "Egg",
      productValue: 50,
      productionRate: "Daily",
      feed: "Hay or Grass",
      maturityTime: "3 days",
    },
    {
      name: "Duck",
      image: "/images/animals/duck.png",
      cost: 1200,
      building: "Coop",
      product: "Duck Egg",
      productValue: 95,
      productionRate: "Every 2 days",
      feed: "Hay or Grass",
      maturityTime: "5 days",
    },
    {
      name: "Rabbit",
      image: "/images/animals/rabbit.png",
      cost: 8000,
      building: "Deluxe Coop",
      product: "Wool",
      productValue: 340,
      productionRate: "Every 4 days",
      feed: "Hay or Grass",
      maturityTime: "6 days",
    },
    {
      name: "Cow",
      image: "/images/animals/cow.png",
      cost: 1500,
      building: "Barn",
      product: "Milk",
      productValue: 125,
      productionRate: "Daily",
      feed: "Hay or Grass",
      maturityTime: "5 days",
    },
    {
      name: "Goat",
      image: "/images/animals/goat.png",
      cost: 4000,
      building: "Big Barn",
      product: "Goat Milk",
      productValue: 225,
      productionRate: "Every 2 days",
      feed: "Hay or Grass",
      maturityTime: "5 days",
    },
    {
      name: "Sheep",
      image: "/images/animals/sheep.png",
      cost: 8000,
      building: "Deluxe Barn",
      product: "Wool",
      productValue: 340,
      productionRate: "Every 3 days",
      feed: "Hay or Grass",
      maturityTime: "6 days",
    },
    {
      name: "Pig",
      image: "/images/animals/pig.png",
      cost: 16000,
      building: "Deluxe Barn",
      product: "Truffle",
      productValue: 625,
      productionRate: "Daily (outside)",
      feed: "Hay or Grass",
      maturityTime: "10 days",
    },
    {
      name: "Void Chicken",
      image: "/images/animals/void-chicken.png",
      cost: "Void Egg + Incubator",
      building: "Big Coop",
      product: "Void Egg",
      productValue: 65,
      productionRate: "Daily",
      feed: "Hay or Grass",
      maturityTime: "3 days",
    },
    {
      name: "Dinosaur",
      image: "/images/animals/dinosaur.png",
      cost: "Dinosaur Egg + Incubator",
      building: "Deluxe Coop",
      product: "Dinosaur Egg",
      productValue: 350,
      productionRate: "Weekly",
      feed: "Hay or Grass",
      maturityTime: "12 days",
    },
    {
      name: "Golden Chicken",
      image: "/images/animals/golden-chicken.png",
      cost: "Golden Egg + Incubator",
      building: "Big Coop",
      product: "Golden Egg",
      productValue: 500,
      productionRate: "Daily",
      feed: "Hay or Grass",
      maturityTime: "3 days",
    },
    {
      name: "Ostrich",
      image: "/images/animals/ostrich.png",
      cost: "Ostrich Egg + Incubator",
      building: "Barn",
      product: "Ostrich Egg",
      productValue: 600,
      productionRate: "Weekly",
      feed: "Hay or Grass",
      maturityTime: "15 days",
    },
    {
      name: "Blue Chicken",
      image: "/images/animals/blue-chicken.png",
      cost: "800g (after Shane 8-heart event)",
      building: "Coop",
      product: "Egg",
      productValue: 50,
      productionRate: "Daily",
      feed: "Hay or Grass",
      maturityTime: "3 days",
    },
    {
      name: "Horse",
      image: "/images/animals/horse.png",
      cost: "Free (Robin builds stable)",
      building: "Stable",
      product: "Transportation",
      productValue: "N/A",
      productionRate: "N/A",
      feed: "Hay or Grass (optional)",
      maturityTime: "Instant",
    },
    {
      name: "Cat/Dog",
      image: "/images/animals/pet.png",
      cost: "Free (choose at start)",
      building: "Farmhouse",
      product: "Friendship",
      productValue: "N/A",
      productionRate: "N/A",
      feed: "Water bowl",
      maturityTime: "Instant",
    },
  ]

  const animalBuildings = [
    {
      name: "Coop",
      cost: "4,000g + 300 Wood + 100 Stone",
      capacity: 4,
      animals: ["Chicken", "Duck"],
      upgrade: "Big Coop",
      features: "Basic animal housing",
    },
    {
      name: "Big Coop",
      cost: "10,000g + 400 Wood + 150 Stone",
      capacity: 8,
      animals: ["Chicken", "Duck", "Void Chicken", "Golden Chicken"],
      upgrade: "Deluxe Coop",
      features: "Incubator for hatching eggs",
    },
    {
      name: "Deluxe Coop",
      cost: "20,000g + 500 Wood + 200 Stone",
      capacity: 12,
      animals: ["Chicken", "Duck", "Void Chicken", "Golden Chicken", "Rabbit", "Dinosaur"],
      upgrade: "None",
      features: "Auto-feed system",
    },
    {
      name: "Barn",
      cost: "6,000g + 350 Wood + 150 Stone",
      capacity: 4,
      animals: ["Cow", "Ostrich"],
      upgrade: "Big Barn",
      features: "Basic animal housing",
    },
    {
      name: "Big Barn",
      cost: "12,000g + 450 Wood + 200 Stone",
      capacity: 8,
      animals: ["Cow", "Goat", "Ostrich"],
      upgrade: "Deluxe Barn",
      features: "Pregnancy system for cows and goats",
    },
    {
      name: "Deluxe Barn",
      cost: "25,000g + 550 Wood + 300 Stone",
      capacity: 12,
      animals: ["Cow", "Goat", "Sheep", "Pig", "Ostrich"],
      upgrade: "None",
      features: "Auto-feed system",
    },
  ]

  const animalCare = [
    {
      title: "Daily Care",
      description:
        "Pet your animals daily to increase happiness and friendship. Happy animals produce higher quality products.",
      tips: [
        "Pet each animal once per day for +15 friendship",
        "Animals left outside in rain lose happiness",
        "Close barn/coop doors at night to prevent predator attacks",
        "Ensure animals have access to grass or hay for food",
      ],
    },
    {
      title: "Feeding",
      description: "Animals need to eat every day to produce products and maintain happiness.",
      tips: [
        "Grass is free food - plant grass starters in spring",
        "Hay costs 50g per piece from Marnie or can be cut from grass",
        "Silo stores up to 240 hay pieces",
        "Deluxe buildings auto-feed animals from silos",
      ],
    },
    {
      title: "Happiness Factors",
      description: "Animal happiness affects product quality and production frequency.",
      tips: [
        "Petting: +15 friendship daily",
        "Feeding: Required for happiness maintenance",
        "Milking/Shearing on time: Prevents happiness loss",
        "Heater in winter: Prevents happiness loss in cold",
      ],
    },
  ]

  const animalProducts = [
    {
      animal: "Chicken",
      product: "Egg",
      baseValue: 50,
      qualityValues: { normal: 50, silver: 62, gold: 75, iridium: 100 },
      processingOptions: [
        { machine: "Mayonnaise Machine", output: "Mayonnaise", value: 190, time: "3 hours" },
        { machine: "Incubator", output: "Baby Chicken", value: "New Animal", time: "3 days" },
      ],
      productionRate: "Daily (if happy)",
      notes: "Brown and White chickens produce the same eggs",
    },
    {
      animal: "Duck",
      product: "Duck Egg",
      baseValue: 95,
      qualityValues: { normal: 95, silver: 118, gold: 142, iridium: 190 },
      processingOptions: [
        { machine: "Mayonnaise Machine", output: "Duck Mayonnaise", value: 375, time: "3 hours" },
        { machine: "Incubator", output: "Baby Duck", value: "New Animal", time: "3 days" },
      ],
      productionRate: "Every 2 days",
      notes: "Also produces Duck Feathers occasionally",
    },
    {
      animal: "Rabbit",
      product: "Wool",
      baseValue: 340,
      qualityValues: { normal: 340, silver: 425, gold: 510, iridium: 680 },
      processingOptions: [{ machine: "Loom", output: "Cloth", value: 470, time: "4 hours" }],
      productionRate: "Every 4 days",
      notes: "Also produces Rabbit's Foot occasionally (very rare)",
    },
    {
      animal: "Cow",
      product: "Milk",
      baseValue: 125,
      qualityValues: { normal: 125, silver: 156, gold: 187, iridium: 250 },
      processingOptions: [
        { machine: "Cheese Press", output: "Cheese", value: 250, time: "3.3 hours" },
        { machine: "Cask (Cheese)", output: "Aged Cheese", value: "Up to 500g", time: "14-56 days" },
      ],
      productionRate: "Daily (if happy)",
      notes: "Large Milk worth 190g from high-friendship cows",
    },
    {
      animal: "Goat",
      product: "Goat Milk",
      baseValue: 225,
      qualityValues: { normal: 225, silver: 281, gold: 337, iridium: 450 },
      processingOptions: [
        { machine: "Cheese Press", output: "Goat Cheese", value: 450, time: "3.3 hours" },
        { machine: "Cask (Goat Cheese)", output: "Aged Goat Cheese", value: "Up to 900g", time: "14-56 days" },
      ],
      productionRate: "Every 2 days",
      notes: "Large Goat Milk worth 345g from high-friendship goats",
    },
    {
      animal: "Sheep",
      product: "Wool",
      baseValue: 340,
      qualityValues: { normal: 340, silver: 425, gold: 510, iridium: 680 },
      processingOptions: [{ machine: "Loom", output: "Cloth", value: 470, time: "4 hours" }],
      productionRate: "Every 3 days",
      notes: "Must be sheared with shears - wool doesn't drop automatically",
    },
    {
      animal: "Pig",
      product: "Truffle",
      baseValue: 625,
      qualityValues: { normal: 625, silver: 781, gold: 937, iridium: 1250 },
      processingOptions: [
        { machine: "Oil Maker", output: "Truffle Oil", value: 1065, time: "6 hours" },
        { machine: "Oil Maker (Artisan)", output: "Truffle Oil", value: 1491, time: "6 hours" },
      ],
      productionRate: "Daily (when outside)",
      notes: "Pigs find truffles outside - most profitable animal product",
    },
    {
      animal: "Golden Chicken",
      product: "Golden Egg",
      baseValue: 500,
      qualityValues: { normal: 500, silver: 625, gold: 750, iridium: 1000 },
      processingOptions: [
        { machine: "Mayonnaise Machine", output: "Gold Star Mayonnaise", value: 385, time: "3 hours" },
        { machine: "Incubator", output: "Baby Golden Chicken", value: "New Animal", time: "3 days" },
      ],
      productionRate: "Daily (if happy)",
      notes: "Rare golden variant of regular chickens",
    },
    {
      animal: "Ostrich",
      product: "Ostrich Egg",
      baseValue: 600,
      qualityValues: { normal: 600, silver: 750, gold: 900, iridium: 1200 },
      processingOptions: [
        { machine: "Mayonnaise Machine", output: "Ostrich Mayonnaise", value: 800, time: "3 hours" },
        { machine: "Incubator", output: "Baby Ostrich", value: "New Animal", time: "15 days" },
      ],
      productionRate: "Weekly",
      notes: "Large eggs from Ginger Island. Takes 15 days to incubate.",
    },
    {
      animal: "Void Chicken",
      product: "Void Egg",
      baseValue: 65,
      qualityValues: { normal: 65, silver: 81, gold: 97, iridium: 130 },
      processingOptions: [
        { machine: "Mayonnaise Machine", output: "Void Mayonnaise", value: 275, time: "3 hours" },
        { machine: "Incubator", output: "Baby Void Chicken", value: "New Animal", time: "3 days" },
      ],
      productionRate: "Daily (if happy)",
      notes: "Dark variant that produces void eggs. Void Mayonnaise is loved by Krobus.",
    },
    {
      animal: "Dinosaur",
      product: "Dinosaur Egg",
      baseValue: 350,
      qualityValues: { normal: 350, silver: 437, gold: 525, iridium: 700 },
      processingOptions: [
        { machine: "Mayonnaise Machine", output: "Dinosaur Mayonnaise", value: 800, time: "3 hours" },
        { machine: "Incubator", output: "Baby Dinosaur", value: "New Animal", time: "12 days" },
      ],
      productionRate: "Weekly",
      notes: "Prehistoric animals that lay valuable eggs. Very rare to obtain initially.",
    },
  ]

  const farmingTips = [
    {
      title: t("farming.tips.sprinklers"),
      description:
        "Quality Sprinklers water 8 adjacent tiles, and Iridium Sprinklers water 24 tiles. Plan your farm layout accordingly.",
    },
    {
      title: t("farming.tips.scarecrows"),
      description:
        "Each scarecrow protects crops within an 8-tile radius. Place them strategically to cover your entire farm.",
    },
    {
      title: t("farming.tips.fertilizer"),
      description:
        "Quality Fertilizer increases the chance of higher quality crops, which sell for more. Speed-Gro reduces growth time.",
    },
    {
      title: t("farming.tips.planning"),
      description:
        "Group crops by watering needs and harvest times. Consider using paths to organize your farm and increase movement speed.",
    },
    {
      title: t("farming.tips.rotation"),
      description:
        "Plan crop rotations to maximize profits. Focus on high-value crops that regrow, like Blueberries, Cranberries, and Ancient Fruit.",
    },
  ]

  const seasonalCropGuides = {
    spring: {
      title: "Spring Crop Guide",
      description: "Spring is the start of your farming journey. Focus on quick-growing crops to establish income.",
      plantingDates: [
        {
          day: "Day 1",
          crops: "Parsnip, Potato, Kale",
          notes: "Plant these immediately to get early harvests and income.",
        },
        {
          day: "Day 13 (Egg Festival)",
          crops: "Strawberry",
          notes: "Buy as many strawberry seeds as possible at the Egg Festival and plant immediately after.",
        },
        {
          day: "Day 15-20",
          crops: "Cauliflower",
          notes: "Only plant if you have sprinklers, as they won't mature before season end otherwise.",
        },
      ],
      strategy:
        "Strawberries are the most profitable spring crop but are only available at the Egg Festival. Save some strawberries to make seeds for next year. For first-year players, focus on Potatoes and Kale for reliable income.",
    },
    summer: {
      title: "Summer Crop Guide",
      description: "Summer offers the most profitable regular crops. Plan carefully to maximize your earnings.",
      plantingDates: [
        {
          day: "Day 1",
          crops: "Blueberry, Melon, Hops",
          notes: "Plant these immediately. Blueberries and Hops are excellent for recurring harvests.",
        },
        {
          day: "Day 1-8",
          crops: "Starfruit (if available)",
          notes: "Plant early to get multiple harvests. Requires Desert access.",
        },
        {
          day: "Day 1-17",
          crops: "Red Cabbage",
          notes: "Important for Community Center bundles in Year 2.",
        },
      ],
      strategy:
        "Blueberries offer the best return on investment for beginners. If you have access to the Desert, Starfruit is the most profitable crop, especially when processed into wine. Hops are extremely profitable when turned into Pale Ale.",
    },
    fall: {
      title: "Fall Crop Guide",
      description: "Fall is your last chance to earn crop income before winter. Focus on recurring harvests.",
      plantingDates: [
        {
          day: "Day 1",
          crops: "Cranberry, Grape, Eggplant",
          notes: "Plant these immediately for multiple harvests throughout the season.",
        },
        {
          day: "Day 1-13",
          crops: "Pumpkin",
          notes: "Great for profit and needed for bundles and village requests.",
        },
        {
          day: "Day 1",
          crops: "Rare Seed (Sweet Gem Berry)",
          notes: "Plant immediately with Speed-Gro to ensure harvest before winter.",
        },
      ],
      strategy:
        "Cranberries are the most profitable regular crop. Sweet Gem Berries take a long time to grow but are extremely valuable. Save one to give to the Old Master Cannoli statue in the Secret Woods for a Stardrop.",
    },
    special: {
      title: "Year-Round Crop Guide",
      description: "These special crops can be grown in the Greenhouse or on Ginger Island for year-round profits.",
      plantingDates: [
        {
          day: "Greenhouse",
          crops: "Ancient Fruit",
          notes: "The most profitable greenhouse crop. Harvest every 7 days after maturity.",
        },
        {
          day: "Greenhouse",
          crops: "Starfruit",
          notes: "High value but requires replanting. Best when processed into wine.",
        },
        {
          day: "Ginger Island",
          crops: "Pineapple, Taro Root",
          notes: "Tropical crops that can be grown year-round on Ginger Island.",
        },
      ],
      strategy:
        "Fill your greenhouse with Ancient Fruit for the best passive income. Coffee Beans are also excellent for greenhouse growing, providing Coffee which increases movement speed. For Ginger Island farming, focus on Pineapples for high value recurring harvests.",
    },
  }

  const artisanGoods = [
    {
      machine: "Preserves Jar",
      input: "Any Vegetable",
      output: "Pickles",
      formula: "2 × Base Value + 50g",
      processingTime: "4,000 minutes (2.8 days)",
      notes: "Good for low-value vegetables",
    },
    {
      machine: "Preserves Jar",
      input: "Any Fruit",
      output: "Jelly",
      formula: "2 × Base Value + 50g",
      processingTime: "4,000 minutes (2.8 days)",
      notes: "Good for low-value fruits",
    },
    {
      machine: "Keg",
      input: "Any Vegetable",
      output: "Juice",
      formula: "2.25 × Base Value",
      processingTime: "6,000 minutes (4.2 days)",
      notes: "Good for high-value vegetables",
    },
    {
      machine: "Keg",
      input: "Any Fruit",
      output: "Wine",
      formula: "3 × Base Value",
      processingTime: "10,000 minutes (7 days)",
      notes: "Best for high-value fruits",
    },
    {
      machine: "Keg",
      input: "Wheat",
      output: "Beer",
      formula: "200g",
      processingTime: "1,750 minutes (1.2 days)",
      notes: "Fast processing time",
    },
    {
      machine: "Keg",
      input: "Hops",
      output: "Pale Ale",
      formula: "300g",
      processingTime: "2,250 minutes (1.6 days)",
      notes: "Very profitable for daily Hops harvests",
    },
    {
      machine: "Keg",
      input: "Honey",
      output: "Mead",
      formula: "2 × Honey Value",
      processingTime: "10,000 minutes (7 days)",
      notes: "Best with Fairy Rose Honey",
    },
    {
      machine: "Cask",
      input: "Wine, Cheese, etc.",
      output: "Aged Product",
      formula: "Up to 2× value (Iridium quality)",
      processingTime: "56 days for Iridium quality",
      notes: "Only works in Cellar",
    },
    {
      machine: "Oil Maker",
      input: "Corn",
      output: "Oil",
      formula: "100g",
      processingTime: "1,000 minutes (0.7 days)",
      notes: "Used in cooking",
    },
    {
      machine: "Oil Maker",
      input: "Truffle",
      output: "Truffle Oil",
      formula: "1,065g (1,491g with Artisan)",
      processingTime: "6,000 minutes (4.2 days)",
      notes: "One of the most valuable artisan goods",
    },
    {
      machine: "Cheese Press",
      input: "Milk",
      output: "Cheese",
      formula: "2 × Milk Value",
      processingTime: "200 minutes",
      notes: "Can be aged in casks",
    },
    {
      machine: "Loom",
      input: "Wool",
      output: "Cloth",
      formula: "470g",
      processingTime: "240 minutes",
      notes: "Used in tailoring and bundles",
    },
  ]

  return (
    <div className="space-y-8 farming-section">
      {/* Farming section decorations with high z-index */}
      {mounted && !isMobile && (
        <>
          <div className="section-element character-element character-element-1"></div>
          <div className="section-element character-element character-element-2"></div>

          {/* Additional farming decorations */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`farm-deco-${index}`}
              className="section-decoration"
              style={{
                top: `${20 + index * 15}%`,
                left: `${5 + (index % 3) * 30}%`,
                width: "20px",
                height: "20px",
                backgroundColor: "var(--stardew-green)",
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                animationDelay: `${index * 0.5}s`,
                animation: "float-decoration 4s infinite ease-in-out",
              }}
            />
          ))}
        </>
      )}

      <Card className="pixel-border stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-xl text-stardew-green">{t("farming.title")}</CardTitle>
          <CardDescription className="font-pixel text-xs">{t("farming.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="crops">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="crops" className="font-pixel text-xs">
                {t("farming.crops.title")}
              </TabsTrigger>
              <TabsTrigger value="seasonal" className="font-pixel text-xs">
                Seasonal Guides
              </TabsTrigger>
              <TabsTrigger value="animals" className="font-pixel text-xs">
                {t("farming.animals.title")}
              </TabsTrigger>
              <TabsTrigger value="artisan" className="font-pixel text-xs">
                Artisan Goods
              </TabsTrigger>
              <TabsTrigger value="tips" className="font-pixel text-xs">
                {t("farming.tips.title")}
              </TabsTrigger>
              <TabsTrigger value="profit-calculator" className="font-pixel text-xs">
                Profit Calculator
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crops">
              <Tabs defaultValue="spring">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="spring" className="font-pixel text-xs">
                    {t("calendar.seasons.spring")}
                  </TabsTrigger>
                  <TabsTrigger value="summer" className="font-pixel text-xs">
                    {t("calendar.seasons.summer")}
                  </TabsTrigger>
                  <TabsTrigger value="fall" className="font-pixel text-xs">
                    {t("calendar.seasons.fall")}
                  </TabsTrigger>
                  <TabsTrigger value="special" className="font-pixel text-xs">
                    {t("farming.crops.special")}
                  </TabsTrigger>
                </TabsList>

                {Object.entries(crops).map(([season, seasonCrops]) => (
                  <TabsContent key={season} value={season}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {seasonCrops.map((crop) => (
                        <Card key={crop.name} className="overflow-hidden stardew-card">
                          <div className="aspect-square relative bg-amber-100 p-4 flex items-center justify-center">
                            <Image
                              src={crop.image || "/placeholder.svg"}
                              alt={crop.name}
                              width={80}
                              height={80}
                              className="object-contain pixel-image"
                            />
                          </div>
                          <CardHeader className="p-4">
                            <CardTitle className="font-pixel text-sm">{crop.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="font-bold">{t("farming.cropDetails.growthTime")}:</span>{" "}
                                {crop.growthTime} {t("farming.cropDetails.days")}
                              </div>
                              <div>
                                <span className="font-bold">{t("farming.cropDetails.regrowth")}:</span>{" "}
                                {crop.regrowth > 0 ? `${crop.regrowth} ${t("farming.cropDetails.days")}` : "No"}
                              </div>
                              <div>
                                <span className="font-bold">{t("farming.cropDetails.sellPrice")}:</span>{" "}
                                {crop.sellPrice}g
                              </div>
                              <div>
                                <span className="font-bold">{t("farming.cropDetails.seedPrice")}:</span>{" "}
                                {typeof crop.seedPrice === "number" ? `${crop.seedPrice}g` : crop.seedPrice}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            <TabsContent value="seasonal">
              <Tabs defaultValue="spring">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="spring" className="font-pixel text-xs">
                    {t("calendar.seasons.spring")}
                  </TabsTrigger>
                  <TabsTrigger value="summer" className="font-pixel text-xs">
                    {t("calendar.seasons.summer")}
                  </TabsTrigger>
                  <TabsTrigger value="fall" className="font-pixel text-xs">
                    {t("calendar.seasons.fall")}
                  </TabsTrigger>
                  <TabsTrigger value="special" className="font-pixel text-xs">
                    Year-Round
                  </TabsTrigger>
                </TabsList>

                {Object.entries(seasonalCropGuides).map(([season, guide]) => (
                  <TabsContent key={season} value={season}>
                    <Card className="stardew-card mb-6">
                      <CardHeader>
                        <CardTitle className="font-pixel text-lg">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Alert className="bg-amber-50 mb-4">
                          <Info className="h-4 w-4" />
                          <AlertTitle className="font-pixel text-sm">Strategy</AlertTitle>
                          <AlertDescription>{guide.strategy}</AlertDescription>
                        </Alert>

                        <div className="space-y-4">
                          <h3 className="font-pixel text-sm">Planting Schedule</h3>
                          {guide.plantingDates.map((date, index) => (
                            <Card key={index} className="stardew-card">
                              <CardHeader className="p-3">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <CardTitle className="font-pixel text-sm">{date.day}</CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent className="p-3 pt-0">
                                <div className="text-sm font-bold">Crops to Plant: {date.crops}</div>
                                <div className="text-xs mt-1">{date.notes}</div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {crops[season].map((crop) => (
                        <Card key={crop.name} className="overflow-hidden stardew-card">
                          <div className="aspect-square relative bg-amber-100 p-4 flex items-center justify-center">
                            <Image
                              src={crop.image || "/placeholder.svg"}
                              alt={crop.name}
                              width={80}
                              height={80}
                              className="object-contain pixel-image"
                            />
                          </div>
                          <CardHeader className="p-4">
                            <CardTitle className="font-pixel text-sm">{crop.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="font-bold">{t("farming.cropDetails.growthTime")}:</span>{" "}
                                {crop.growthTime} {t("farming.cropDetails.days")}
                              </div>
                              <div>
                                <span className="font-bold">{t("farming.cropDetails.regrowth")}:</span>{" "}
                                {crop.regrowth > 0 ? `${crop.regrowth} ${t("farming.cropDetails.days")}` : "No"}
                              </div>
                              <div>
                                <span className="font-bold">{t("farming.cropDetails.sellPrice")}:</span>{" "}
                                {crop.sellPrice}g
                              </div>
                              <div>
                                <span className="font-bold">{t("farming.cropDetails.seedPrice")}:</span>{" "}
                                {typeof crop.seedPrice === "number" ? `${crop.seedPrice}g` : crop.seedPrice}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            <TabsContent value="animals">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="overview" className="font-pixel text-xs">
                    Animal Overview
                  </TabsTrigger>
                  <TabsTrigger value="buildings" className="font-pixel text-xs">
                    Buildings
                  </TabsTrigger>
                  <TabsTrigger value="products" className="font-pixel text-xs">
                    Products
                  </TabsTrigger>
                  <TabsTrigger value="care" className="font-pixel text-xs">
                    Animal Care
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {animals.map((animal) => (
                      <Card key={animal.name} className="overflow-hidden stardew-card">
                        <div className="aspect-square relative bg-amber-100 p-4 flex items-center justify-center">
                          <Image
                            src={animal.image || "/placeholder.svg"}
                            alt={animal.name}
                            width={80}
                            height={80}
                            className="object-contain pixel-image"
                          />
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className="font-pixel text-sm">{animal.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="font-bold">Cost:</span> {animal.cost}g
                            </div>
                            <div>
                              <span className="font-bold">Building:</span> {animal.building}
                            </div>
                            <div>
                              <span className="font-bold">Product:</span> {animal.product}
                            </div>
                            <div>
                              <span className="font-bold">Base Value:</span> {animal.productValue}g
                            </div>
                            <div>
                              <span className="font-bold">Production:</span> {animal.productionRate}
                            </div>
                            <div>
                              <span className="font-bold">Feed:</span> {animal.feed}
                            </div>
                            <div>
                              <span className="font-bold">Maturity:</span> {animal.maturityTime}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="buildings">
                  <div className="space-y-4">
                    {animalBuildings.map((building) => (
                      <Card key={building.name} className="stardew-card">
                        <CardHeader>
                          <CardTitle className="font-pixel text-lg">{building.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-bold">Cost:</span> {building.cost}
                              </div>
                              <div>
                                <span className="font-bold">Capacity:</span> {building.capacity} animals
                              </div>
                              <div>
                                <span className="font-bold">Upgrade to:</span> {building.upgrade}
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-bold">Animals:</span> {building.animals.join(", ")}
                              </div>
                              <div>
                                <span className="font-bold">Features:</span> {building.features}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="products">
                  <div className="space-y-4">
                    {animalProducts.map((product) => (
                      <Card key={product.animal} className="stardew-card">
                        <CardHeader>
                          <CardTitle className="font-pixel text-lg">
                            {product.animal} - {product.product}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-bold text-sm mb-2">Product Values</h4>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>Normal: {product.qualityValues.normal}g</div>
                                  <div>Silver: {product.qualityValues.silver}g</div>
                                  <div>Gold: {product.qualityValues.gold}g</div>
                                  <div>Iridium: {product.qualityValues.iridium}g</div>
                                </div>
                              </div>
                              <div>
                                <span className="font-bold text-sm">Production Rate:</span>
                                <p className="text-xs">{product.productionRate}</p>
                              </div>
                              <div>
                                <span className="font-bold text-sm">Notes:</span>
                                <p className="text-xs">{product.notes}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-bold text-sm mb-2">Processing Options</h4>
                              <div className="space-y-2">
                                {product.processingOptions.map((option, index) => (
                                  <div key={index} className="bg-amber-50 p-2 rounded text-xs">
                                    <div className="font-bold">{option.machine}</div>
                                    <div>Output: {option.output}</div>
                                    <div>Value: {option.value}</div>
                                    <div>Time: {option.time}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="care">
                  <div className="space-y-4">
                    {animalCare.map((care, index) => (
                      <Card key={index} className="stardew-card">
                        <CardHeader>
                          <CardTitle className="font-pixel text-lg">{care.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm mb-3">{care.description}</p>
                          <ul className="list-disc pl-5 space-y-1">
                            {care.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-xs">
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}

                    <Card className="stardew-card">
                      <CardHeader>
                        <CardTitle className="font-pixel text-lg">Profitability Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-sm mb-2">Most Profitable Animals</h4>
                            <div className="space-y-2 text-xs">
                              <div className="bg-green-50 p-2 rounded">
                                <div className="font-bold">1. Pig (with Artisan profession)</div>
                                <div>Truffle Oil: 1,491g daily (when outside)</div>
                                <div>ROI: ~93 days</div>
                              </div>
                              <div className="bg-blue-50 p-2 rounded">
                                <div className="font-bold">2. Goat (with Artisan profession)</div>
                                <div>Aged Goat Cheese: 900g every 2 days</div>
                                <div>ROI: ~18 days</div>
                              </div>
                              <div className="bg-yellow-50 p-2 rounded">
                                <div className="font-bold">3. Cow (with Artisan profession)</div>
                                <div>Aged Cheese: 500g daily</div>
                                <div>ROI: ~6 days</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-sm mb-2">Quick Profit Animals</h4>
                            <div className="space-y-2 text-xs">
                              <div className="bg-purple-50 p-2 rounded">
                                <div className="font-bold">Chicken</div>
                                <div>Mayonnaise: 190g daily</div>
                                <div>Low cost, fast ROI</div>
                              </div>
                              <div className="bg-orange-50 p-2 rounded">
                                <div className="font-bold">Duck</div>
                                <div>Duck Mayonnaise: 375g every 2 days</div>
                                <div>Good mid-game option</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="artisan">
              <div className="space-y-6">
                <Card className="stardew-card">
                  <CardHeader>
                    <CardTitle className="font-pixel text-lg">Artisan Machines & Products</CardTitle>
                    <CardDescription>
                      Process your crops and animal products into artisan goods for higher profits
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-amber-50">
                            <th className="border border-amber-200 p-2 text-left font-pixel text-xs">Machine</th>
                            <th className="border border-amber-200 p-2 text-left font-pixel text-xs">Input</th>
                            <th className="border border-amber-200 p-2 text-left font-pixel text-xs">Output</th>
                            <th className="border border-amber-200 p-2 text-left font-pixel text-xs">Value Formula</th>
                            <th className="border border-amber-200 p-2 text-left font-pixel text-xs">
                              Processing Time
                            </th>
                            <th className="border border-amber-200 p-2 text-left font-pixel text-xs">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {artisanGoods.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-amber-50"}>
                              <td className="border border-amber-200 p-2 text-xs">{item.machine}</td>
                              <td className="border border-amber-200 p-2 text-xs">{item.input}</td>
                              <td className="border border-amber-200 p-2 text-xs">{item.output}</td>
                              <td className="border border-amber-200 p-2 text-xs">{item.formula}</td>
                              <td className="border border-amber-200 p-2 text-xs">{item.processingTime}</td>
                              <td className="border border-amber-200 p-2 text-xs">{item.notes}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="stardew-card">
                  <CardHeader>
                    <CardTitle className="font-pixel text-lg">Most Profitable Artisan Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="stardew-card">
                        <CardHeader className="p-3">
                          <CardTitle className="font-pixel text-sm">Wine</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0 text-xs space-y-2">
                          <p>
                            <span className="font-bold">Best Crops:</span> Starfruit, Ancient Fruit, Pineapple
                          </p>
                          <p>
                            <span className="font-bold">Starfruit Wine:</span> 2,250g (3,150g aged to Iridium)
                          </p>
                          <p>
                            <span className="font-bold">Ancient Fruit Wine:</span> 1,650g (2,310g aged to Iridium)
                          </p>
                          <p>
                            <span className="font-bold">Strategy:</span> Fill your greenhouse with Ancient Fruit and
                            your cellar with casks aging Starfruit Wine
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="stardew-card">
                        <CardHeader className="p-3">
                          <CardTitle className="font-pixel text-sm">Pale Ale & Other Beverages</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0 text-xs space-y-2">
                          <p>
                            <span className="font-bold">Pale Ale:</span> 300g (420g with Artisan)
                          </p>
                          <p>
                            <span className="font-bold">Coffee:</span> 150g (210g with Artisan)
                          </p>
                          <p>
                            <span className="font-bold">Mead:</span> Best with Fairy Rose Honey (400g)
                          </p>
                          <p>
                            <span className="font-bold">Strategy:</span> Hops produce daily after maturity, making Pale
                            Ale production very efficient
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="stardew-card">
                        <CardHeader className="p-3">
                          <CardTitle className="font-pixel text-sm">Animal Products</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0 text-xs space-y-2">
                          <p>
                            <span className="font-bold">Truffle Oil:</span> 1,065g (1,491g with Artisan)
                          </p>
                          <p>
                            <span className="font-bold">Goat Cheese:</span> 400g (560g with Artisan)
                          </p>
                          <p>
                            <span className="font-bold">Aged Goat Cheese:</span> 800g (1,120g with Artisan)
                          </p>
                          <p>
                            <span className="font-bold">Strategy:</span> Pigs finding truffles + Artisan profession is
                            one of the most profitable combinations
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="stardew-card">
                        <CardHeader className="p-3">
                          <CardTitle className="font-pixel text-sm">Preserves</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0 text-xs space-y-2">
                          <p>
                            <span className="font-bold">Pickled Vegetables:</span> Best for low-value crops
                          </p>
                          <p>
                            <span className="font-bold">Fruit Jellies:</span> Best for low-value fruits
                          </p>
                          <p>
                            <span className="font-bold">Aged Cheese:</span> Cow and Goat Cheese can be aged in casks
                          </p>
                          <p>
                            <span className="font-bold">Strategy:</span> Use Preserves Jars for low-value crops and Kegs
                            for high-value crops
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tips">
              <div className="space-y-4">
                {farmingTips.map((tip, index) => (
                  <Card key={index} className="stardew-card">
                    <CardHeader className="p-4">
                      <CardTitle className="font-pixel text-sm">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="profit-calculator">
              <CropProfitCalculator crops={crops} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
