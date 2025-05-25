"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from "@/hooks/use-translations"
import { useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { MapPin, Fish, Calendar, Cloud, Gauge, Clock } from "lucide-react"

export function FishingContent() {
  const { t } = useTranslations()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fishCategories = {
    common: [
      {
        name: "Anchovy",
        image: "/images/fish/anchovy.png",
        location: "Ocean",
        season: "Spring, Fall",
        time: "Any",
        weather: "Any",
        difficulty: "Easy",
      },
      {
        name: "Sardine",
        image: "/images/fish/sardine.png",
        location: "Ocean",
        season: "Spring, Fall, Winter",
        time: "6am - 7pm",
        weather: "Any",
        difficulty: "Easy",
      },
      {
        name: "Sunfish",
        image: "/images/fish/sunfish.png",
        location: "River",
        season: "Spring, Summer",
        time: "6am - 7pm",
        weather: "Sunny",
        difficulty: "Easy",
      },
      {
        name: "Carp",
        image: "/images/fish/carp.png",
        location: "Lake, Pond",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Easy",
      },
      {
        name: "Herring",
        image: "/images/fish/herring.png",
        location: "Ocean",
        season: "Spring, Winter",
        time: "Any",
        weather: "Any",
        difficulty: "Easy",
      },
      {
        name: "Smallmouth Bass",
        image: "/images/fish/smallmouth-bass.png",
        location: "River",
        season: "Spring, Fall",
        time: "Any",
        weather: "Any",
        difficulty: "Easy",
      },
      {
        name: "Chub",
        image: "/images/fish/chub.png",
        location: "River, Mountain Lake",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Easy",
      },
      {
        name: "Perch",
        image: "/images/fish/perch.png",
        location: "River, Lake",
        season: "Winter",
        time: "Any",
        weather: "Any",
        difficulty: "Easy",
      },
      {
        name: "Bream",
        image: "/images/fish/bream.png",
        location: "River",
        season: "Any",
        time: "6pm - 2am",
        weather: "Any",
        difficulty: "Easy",
      },
      {
        name: "Sea Cucumber",
        image: "/images/fish/sea-cucumber.png",
        location: "Ocean",
        season: "Fall, Winter",
        time: "6am - 7pm",
        weather: "Any",
        difficulty: "Easy",
      },
      {
        name: "Rainbow Trout",
        image: "/images/fish/rainbow-trout.png",
        location: "River",
        season: "Summer",
        time: "6am - 7pm",
        weather: "Sunny",
        difficulty: "Easy",
      },
    ],
    uncommon: [
      {
        name: "Largemouth Bass",
        image: "/images/fish/largemouth-bass.png",
        location: "Lake",
        season: "Any",
        time: "6am - 7pm",
        weather: "Any",
        difficulty: "Medium",
      },
      {
        name: "Salmon",
        image: "/images/fish/salmon.png",
        location: "River",
        season: "Fall",
        time: "6am - 7pm",
        weather: "Any",
        difficulty: "Medium",
      },
      {
        name: "Walleye",
        image: "/images/fish/walleye.png",
        location: "River, Lake",
        season: "Fall",
        time: "12pm - 2am",
        weather: "Rainy",
        difficulty: "Medium",
      },
      {
        name: "Eel",
        image: "/images/fish/eel.png",
        location: "Ocean",
        season: "Spring, Fall",
        time: "4pm - 2am",
        weather: "Rainy",
        difficulty: "Medium",
      },
      {
        name: "Catfish",
        image: "/images/fish/catfish.png",
        location: "River, Secret Woods Pond",
        season: "Spring, Fall",
        time: "6am - 12am",
        weather: "Rainy",
        difficulty: "Medium",
      },
      {
        name: "Pike",
        image: "/images/fish/pike.png",
        location: "River, Forest Pond",
        season: "Summer, Winter",
        time: "Any",
        weather: "Any",
        difficulty: "Medium",
      },
      {
        name: "Albacore",
        image: "/images/fish/albacore.png",
        location: "Ocean",
        season: "Fall, Winter",
        time: "6am - 11am, 6pm - 2am",
        weather: "Any",
        difficulty: "Medium",
      },
      {
        name: "Shad",
        image: "/images/fish/shad.png",
        location: "River",
        season: "Spring, Summer, Fall",
        time: "9am - 2am",
        weather: "Rainy",
        difficulty: "Medium",
      },
      {
        name: "Tuna",
        image: "/images/fish/tuna.png",
        location: "Ocean",
        season: "Summer, Winter",
        time: "6am - 7pm",
        weather: "Any",
        difficulty: "Medium",
      },
      {
        name: "Red Snapper",
        image: "/images/fish/red-snapper.png",
        location: "Ocean",
        season: "Summer, Fall",
        time: "6am - 7pm",
        weather: "Rainy",
        difficulty: "Medium",
      },
      {
        name: "Dorado",
        image: "/images/fish/dorado.png",
        location: "Forest River",
        season: "Summer",
        time: "6am - 7pm",
        weather: "Any",
        difficulty: "Medium",
      },
    ],
    rare: [
      {
        name: "Sturgeon",
        image: "/images/fish/sturgeon.png",
        location: "Mountain Lake",
        season: "Summer, Winter",
        time: "6am - 7pm",
        weather: "Any",
        difficulty: "Hard",
      },
      {
        name: "Super Cucumber",
        image: "/images/fish/super-cucumber.png",
        location: "Ocean",
        season: "Summer, Fall",
        time: "6pm - 2am",
        weather: "Any",
        difficulty: "Hard",
      },
      {
        name: "Lava Eel",
        image: "/images/fish/lava-eel.png",
        location: "The Mines (floor 100)",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Very Hard",
      },
      {
        name: "Ice Pip",
        image: "/images/fish/ice-pip.png",
        location: "The Mines (floors 60-79)",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Hard",
      },
      {
        name: "Sandfish",
        image: "/images/fish/sandfish.png",
        location: "The Desert",
        season: "Any",
        time: "6am - 8pm",
        weather: "Any",
        difficulty: "Hard",
      },
      {
        name: "Scorpion Carp",
        image: "/images/fish/scorpion-carp.png",
        location: "The Desert",
        season: "Any",
        time: "6am - 8pm",
        weather: "Any",
        difficulty: "Hard",
      },
      {
        name: "Octopus",
        image: "/images/fish/octopus.png",
        location: "Ocean",
        season: "Summer",
        time: "6am - 1pm",
        weather: "Any",
        difficulty: "Hard",
      },
      {
        name: "Blobfish",
        image: "/images/fish/blobfish.png",
        location: "Night Market Submarine",
        season: "Winter (Night Market)",
        time: "5pm - 2am",
        weather: "Any",
        difficulty: "Hard",
      },
      {
        name: "Pufferfish",
        image: "/images/fish/pufferfish.png",
        location: "Ocean",
        season: "Summer",
        time: "12pm - 4pm",
        weather: "Sunny",
        difficulty: "Hard",
      },
      {
        name: "Ghostfish",
        image: "/images/fish/ghostfish.png",
        location: "The Mines (floors 20+)",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Hard",
      },
      {
        name: "Woodskip",
        image: "/images/fish/woodskip.png",
        location: "Secret Woods",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Hard",
      },
    ],
    legendary: [
      {
        name: "Legend",
        image: "/images/fish/legend.png",
        location: "Mountain Lake",
        season: "Spring",
        time: "6am - 10pm",
        weather: "Rainy",
        difficulty: "Very Hard",
      },
      {
        name: "Crimsonfish",
        image: "/images/fish/crimsonfish.png",
        location: "East Pier (Ocean)",
        season: "Summer",
        time: "Any",
        weather: "Any",
        difficulty: "Very Hard",
      },
      {
        name: "Angler",
        image: "/images/fish/angler.png",
        location: "North of JojaMart",
        season: "Fall",
        time: "Any",
        weather: "Any",
        difficulty: "Very Hard",
      },
      {
        name: "Glacierfish",
        image: "/images/fish/glacierfish.png",
        location: "South of Arrowhead Island",
        season: "Winter",
        time: "6am - 10pm",
        weather: "Any",
        difficulty: "Very Hard",
      },
      {
        name: "Mutant Carp",
        image: "/images/fish/mutant-carp.png",
        location: "The Sewers",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Very Hard",
      },
      {
        name: "Ms. Angler",
        image: "/images/fish/ms-angler.png",
        location: "North of JojaMart",
        season: "Fall",
        time: "Any",
        weather: "Any",
        difficulty: "Very Hard",
        note: "Extended Family quest",
      },
      {
        name: "Son of Crimsonfish",
        image: "/images/fish/son-of-crimsonfish.png",
        location: "East Pier (Ocean)",
        season: "Summer",
        time: "Any",
        weather: "Any",
        difficulty: "Very Hard",
        note: "Extended Family quest",
      },
      {
        name: "Radioactive Carp",
        image: "/images/fish/radioactive-carp.png",
        location: "The Sewers",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Very Hard",
        note: "Extended Family quest",
      },
      {
        name: "Glacierfish Jr.",
        image: "/images/fish/glacierfish-jr.png",
        location: "South of Arrowhead Island",
        season: "Winter",
        time: "6am - 10pm",
        weather: "Any",
        difficulty: "Very Hard",
        note: "Extended Family quest",
      },
      {
        name: "Legend II",
        image: "/images/fish/legend-ii.png",
        location: "Mountain Lake",
        season: "Spring",
        time: "6am - 10pm",
        weather: "Rainy",
        difficulty: "Very Hard",
        note: "Extended Family quest",
      },
    ],
    special: [
      {
        name: "Void Salmon",
        image: "/images/fish/void-salmon.png",
        location: "Witch's Swamp",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Medium",
      },
      {
        name: "Slimejack",
        image: "/images/fish/slimejack.png",
        location: "Mutant Bug Lair",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Medium",
      },
      {
        name: "Stonefish",
        image: "/images/fish/stonefish.png",
        location: "The Mines (floors 20+)",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Hard",
      },
      {
        name: "Ghost Fish",
        image: "/images/fish/ghost-fish.png",
        location: "The Mines (floors 50+)",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Medium",
      },
      {
        name: "Midnight Squid",
        image: "/images/fish/midnight-squid.png",
        location: "Night Market Submarine",
        season: "Winter (Night Market)",
        time: "5pm - 2am",
        weather: "Any",
        difficulty: "Hard",
      },
      {
        name: "Spook Fish",
        image: "/images/fish/spook-fish.png",
        location: "Night Market Submarine",
        season: "Winter (Night Market)",
        time: "5pm - 2am",
        weather: "Any",
        difficulty: "Hard",
      },
      {
        name: "Lionfish",
        image: "/images/fish/lionfish.png",
        location: "Ginger Island Ocean",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Hard",
      },
      {
        name: "Blue Discus",
        image: "/images/fish/blue-discus.png",
        location: "Ginger Island Pond",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Hard",
      },
      {
        name: "Stingray",
        image: "/images/fish/stingray.png",
        location: "Ginger Island Ocean",
        season: "Any",
        time: "Any",
        weather: "Any",
        difficulty: "Hard",
      },
    ],
  }

  const fishingEquipment = {
    rods: [
      {
        name: "Training Rod",
        image: "/images/fishing/training-rod.png",
        cost: "25g",
        description: "Easier fishing, but limited to basic fish. Cannot use bait.",
      },
      {
        name: "Bamboo Pole",
        image: "/images/fishing/bamboo-pole.png",
        cost: "500g",
        description: "Basic fishing rod. Cannot use bait.",
      },
      {
        name: "Fiberglass Rod",
        image: "/images/fishing/fiberglass-rod.png",
        cost: "1,800g",
        description: "Can use bait to attract fish faster.",
      },
      {
        name: "Iridium Rod",
        image: "/images/fishing/iridium-rod.png",
        cost: "7,500g",
        description: "Can use bait and tackle for special effects.",
      },
    ],
    tackles: [
      {
        name: "Spinner",
        image: "/images/fishing/spinner.png",
        cost: "500g",
        description: "Fish bite more quickly.",
      },
      {
        name: "Trap Bobber",
        image: "/images/fishing/trap-bobber.png",
        cost: "500g",
        description: "Fish escape slower when you're not reeling them in.",
      },
      {
        name: "Cork Bobber",
        image: "/images/fishing/cork-bobber.png",
        cost: "750g",
        description: "Increases the size of your fishing bar.",
      },
      {
        name: "Treasure Hunter",
        image: "/images/fishing/treasure-hunter.png",
        cost: "750g",
        description: "Makes it easier to find treasure while fishing.",
      },
    ],
  }

  const fishingTips = [
    {
      title: t("fishing.tips.weather"),
      description: "Some fish only appear when it's raining, while others prefer sunny days.",
    },
    {
      title: t("fishing.tips.seasons"),
      description: "Each season has unique fish. Plan your fishing schedule to catch seasonal varieties.",
    },
    {
      title: t("fishing.tips.time"),
      description: "Many fish are only active during specific hours. Check the fish encyclopedia for details.",
    },
    {
      title: t("fishing.tips.patience"),
      description:
        "The fishing minigame requires practice. Keep the green bar aligned with the fish by tapping or holding the button.",
    },
    {
      title: t("fishing.tips.quality"),
      description: "Higher fishing skill increases the quality of fish caught, which increases their value.",
    },
  ]

  const specialFishingTechniques = [
    {
      title: "Bait Types",
      description:
        "Different baits attract different fish. Regular bait increases bite rate, while magnet bait increases the chance of finding treasure.",
    },
    {
      title: "Crab Pots",
      description:
        "Place these in water to passively catch fish and crustaceans. Check them daily for the best results.",
    },
    {
      title: "Fishing Buffs",
      description: "Certain foods like Dish O' The Sea and Trout Soup provide temporary fishing skill boosts.",
    },
    {
      title: "Perfect Catch",
      description:
        "Catching a fish without letting the bar drop gives you a 'Perfect' catch, increasing the quality by one level.",
    },
    {
      title: "Treasure Chests",
      description:
        "When you see a treasure appear while fishing, try to keep the fish caught while also getting the treasure bar filled for bonus items.",
    },
  ]

  const fishingLocations = [
    {
      name: "Mountain Lake",
      description: "The lake north of town, near the mines and Robin's house.",
      fish: ["Largemouth Bass", "Carp", "Bullhead", "Sturgeon", "Legend (Legendary)"],
      bestSpots: [
        { x: 58, y: 40, description: "North side of the lake, near the mine entrance" },
        { x: 75, y: 60, description: "East side of the lake, near the log" },
      ],
      seasons: "All seasons, but Sturgeon only in Summer and Winter",
    },
    {
      name: "Town River",
      description: "The river that runs through Pelican Town.",
      fish: ["Sunfish", "Bream", "Smallmouth Bass", "Tiger Trout", "Shad", "Catfish"],
      bestSpots: [
        { x: 30, y: 55, description: "Near the bridge by the museum" },
        { x: 45, y: 75, description: "South of town, near Leah's cottage" },
      ],
      seasons: "All seasons, but some fish are seasonal",
    },
    {
      name: "Ocean",
      description: "The beach area south of town.",
      fish: ["Sardine", "Anchovy", "Tuna", "Red Snapper", "Tilapia", "Super Cucumber", "Crimsonfish (Legendary)"],
      bestSpots: [
        { x: 85, y: 90, description: "End of the eastern pier" },
        { x: 15, y: 85, description: "Western side of the beach" },
      ],
      seasons: "All seasons, but many fish are seasonal",
    },
    {
      name: "Secret Woods Pond",
      description: "The small pond in the Secret Woods.",
      fish: ["Woodskip"],
      bestSpots: [{ x: 50, y: 50, description: "Center of the pond" }],
      seasons: "All seasons",
    },
    {
      name: "Cindersap Forest",
      description: "The forest area west of your farm, including the small lake.",
      fish: ["Carp", "Largemouth Bass", "Bullhead", "Catfish"],
      bestSpots: [
        { x: 30, y: 65, description: "Near Leah's cottage" },
        { x: 70, y: 80, description: "South lake, near Marnie's Ranch" },
      ],
      seasons: "All seasons, but Catfish only in rainy weather",
    },
    {
      name: "The Sewers",
      description: "Accessible after donating 60 items to the museum.",
      fish: ["Green Algae", "Mutant Carp"],
      bestSpots: [{ x: 50, y: 50, description: "Anywhere in the sewers" }],
      seasons: "All seasons",
    },
    {
      name: "Ginger Island",
      description: "The tropical island accessible after repairing Willy's boat.",
      fish: ["Lionfish", "Blue Discus", "Stingray", "Tuna", "Super Cucumber"],
      bestSpots: [
        { x: 40, y: 60, description: "West side of the island, near the dock" },
        { x: 70, y: 40, description: "North side of the island, near the river mouth" },
      ],
      seasons: "All seasons, island has no seasonal changes",
    },
    {
      name: "Night Market",
      description: "Available only during Winter 15-17, includes a submarine ride for deep sea fishing.",
      fish: ["Midnight Squid", "Spook Fish", "Blobfish"],
      bestSpots: [{ x: 50, y: 50, description: "Submarine ride (costs 1000g)" }],
      seasons: "Winter 15-17 only",
    },
    {
      name: "Witch's Swamp",
      description: "Accessible after completing the Dark Talisman quest.",
      fish: ["Void Salmon"],
      bestSpots: [{ x: 50, y: 50, description: "Anywhere in the swamp" }],
      seasons: "All seasons",
    },
    {
      name: "Mutant Bug Lair",
      description: "Accessible through the sewers after completing certain quests.",
      fish: ["Slimejack"],
      bestSpots: [{ x: 50, y: 50, description: "The small pond in the lair" }],
      seasons: "All seasons",
    },
  ]

  // Fish pond data
  const fishPonds = {
    bestPonds: [
      {
        fish: "Lava Eel",
        products: ["Lava Eel Roe (760g)", "Gold Ore (5-10)", "Spicy Eel", "Magma Geode"],
        population: "10 fish maximum",
        notes: "Most profitable fish pond. Pond water turns red.",
      },
      {
        fish: "Sturgeon",
        products: ["Sturgeon Roe (process into Caviar - 700g)", "Sturgeon"],
        population: "10 fish maximum",
        notes: "Caviar is required for some bundles and quests.",
      },
      {
        fish: "Super Cucumber",
        products: ["Super Cucumber Roe (250g)", "Iridium Ore (rare)", "Super Cucumber"],
        population: "10 fish maximum",
        notes: "Pond water turns purple. Chance for Iridium Ore.",
      },
      {
        fish: "Blobfish",
        products: ["Blobfish Roe (200g)", "Pearl (rare)", "Blobfish"],
        population: "10 fish maximum",
        notes: "Chance for valuable Pearls.",
      },
    ],
    specialPonds: [
      {
        fish: "Rainbow Trout",
        products: ["Rainbow Trout Roe (65g)", "Prismatic Shard (very rare)"],
        population: "10 fish maximum",
        notes: "Very small chance (0.09%) to produce a Prismatic Shard.",
      },
      {
        fish: "Void Salmon",
        products: ["Void Salmon Roe (150g)", "Void Essence (1-3)"],
        population: "10 fish maximum",
        notes: "Pond water turns black. Good source of Void Essence.",
      },
      {
        fish: "Stingray",
        products: ["Stingray Roe (150g)", "Dragon Tooth (very rare)"],
        population: "10 fish maximum",
        notes: "One of the only renewable sources of Dragon Tooth.",
      },
      {
        fish: "Slimejack",
        products: ["Slimejack Roe (75g)", "Slime (5-10)"],
        population: "10 fish maximum",
        notes: "Pond water turns green. Good source of Slime.",
      },
    ],
  }

  // Fish recipes data
  const fishRecipes = {
    buffs: [
      {
        name: "Dish o' The Sea",
        ingredients: "Sardine (2) + Hashbrowns (1)",
        effects: "+3 Fishing (11m)",
        energy: "+125 Energy, +56 Health",
        source: "Queen of Sauce (Year 1, Spring 14)",
      },
      {
        name: "Fish Taco",
        ingredients: "Tuna (1) + Tortilla (1) + Red Cabbage (1) + Mayonnaise (1)",
        effects: "+2 Fishing (7m)",
        energy: "+175 Energy, +78 Health",
        source: "Linus (4 hearts)",
      },
      {
        name: "Lobster Bisque",
        ingredients: "Lobster (1) + Milk (1)",
        effects: "+3 Defense (16m)",
        energy: "+225 Energy, +101 Health",
        source: "Willy (9 hearts)",
      },
      {
        name: "Seafoam Pudding",
        ingredients: "Flounder (1) + Midnight Carp (1) + Squid Ink (1)",
        effects: "+4 Fishing (16m)",
        energy: "+175 Energy, +78 Health",
        source: "Queen of Sauce (Year 2, Winter 14)",
      },
    ],
    simple: [
      {
        name: "Sashimi",
        ingredients: "Any Fish (1)",
        effects: "None",
        energy: "+75 Energy, +33 Health",
        source: "Linus (3 hearts)",
        notes: "Loved by Sebastian",
      },
      {
        name: "Maki Roll",
        ingredients: "Any Fish (1) + Seaweed (1) + Rice (1)",
        effects: "None",
        energy: "+100 Energy, +45 Health",
        source: "Queen of Sauce (Year 1, Summer 21)",
        notes: "Loved by Sebastian and Linus",
      },
      {
        name: "Fried Eel",
        ingredients: "Eel (1) + Oil (1)",
        effects: "None",
        energy: "+150 Energy, +67 Health",
        source: "Fishing level 3",
        notes: "Loved by George",
      },
      {
        name: "Baked Fish",
        ingredients: "Sunfish (1) + Bream (1) + Wheat Flour (1)",
        effects: "None",
        energy: "+100 Energy, +45 Health",
        source: "Queen of Sauce (Year 1, Summer 7)",
        notes: "Liked by most villagers",
      },
    ],
    advanced: [
      {
        name: "Spicy Eel",
        ingredients: "Eel (1) + Hot Pepper (1)",
        effects: "+1 Luck, +1 Speed (7m)",
        energy: "+115 Energy, +51 Health",
        source: "George (7 hearts)",
        notes: "Popular for Skull Cavern runs",
      },
      {
        name: "Crab Cakes",
        ingredients: "Crab (1) + Wheat Flour (1) + Egg (1) + Oil (1)",
        effects: "+1 Speed, +1 Defense (16m)",
        energy: "+225 Energy, +101 Health",
        source: "Queen of Sauce (Year 2, Fall 21)",
        notes: "Long duration makes it excellent for mining",
      },
      {
        name: "Fish Stew",
        ingredients: "Crayfish (1) + Mussel (1) + Periwinkle (1) + Tomato (1)",
        effects: "+3 Max Energy (7m)",
        energy: "+175 Energy, +78 Health",
        source: "Gus (7 hearts)",
        notes: "Good for long days of activities",
      },
      {
        name: "Lucky Lunch",
        ingredients: "Sea Cucumber (1) + Tortilla (1) + Blue Jazz (1)",
        effects: "+3 Luck (11m)",
        energy: "+100 Energy, +45 Health",
        source: "Queen of Sauce (Year 2, Spring 28)",
        notes: "Best luck food in the game",
      },
    ],
  }

  // Seasonal fish data
  const seasonalFish = {
    spring: [
      { name: "Anchovy", location: "Ocean", time: "Any", weather: "Any" },
      { name: "Sardine", location: "Ocean", time: "6am - 7pm", weather: "Any" },
      { name: "Sunfish", location: "River", time: "6am - 7pm", weather: "Sunny" },
      { name: "Herring", location: "Ocean", time: "Any", weather: "Any" },
      { name: "Eel", location: "Ocean", time: "4pm - 2am", weather: "Rainy" },
      { name: "Catfish", location: "River", time: "6am - 12am", weather: "Rainy" },
      { name: "Legend", location: "Mountain Lake", time: "6am - 10pm", weather: "Rainy", legendary: true },
    ],
    summer: [
      { name: "Sunfish", location: "River", time: "6am - 7pm", weather: "Sunny" },
      { name: "Tuna", location: "Ocean", time: "6am - 7pm", weather: "Any" },
      { name: "Red Snapper", location: "Ocean", time: "6am - 7pm", weather: "Rainy" },
      { name: "Tilapia", location: "Ocean", time: "6am - 2pm", weather: "Any" },
      { name: "Super Cucumber", location: "Ocean", time: "6pm - 2am", weather: "Any" },
      { name: "Sturgeon", location: "Mountain Lake", time: "6am - 7pm", weather: "Any" },
      { name: "Octopus", location: "Ocean", time: "6am - 1pm", weather: "Any" },
      { name: "Crimsonfish", location: "East Pier", time: "Any", weather: "Any", legendary: true },
    ],
    fall: [
      { name: "Anchovy", location: "Ocean", time: "Any", weather: "Any" },
      { name: "Sardine", location: "Ocean", time: "6am - 7pm", weather: "Any" },
      { name: "Salmon", location: "River", time: "6am - 7pm", weather: "Any" },
      { name: "Walleye", location: "River, Lake", time: "12pm - 2am", weather: "Rainy" },
      { name: "Eel", location: "Ocean", time: "4pm - 2am", weather: "Rainy" },
      { name: "Red Snapper", location: "Ocean", time: "6am - 7pm", weather: "Rainy" },
      { name: "Albacore", location: "Ocean", time: "6am - 11am, 6pm - 2am", weather: "Any" },
      { name: "Angler", location: "North of JojaMart", time: "Any", weather: "Any", legendary: true },
    ],
    winter: [
      { name: "Sardine", location: "Ocean", time: "6am - 7pm", weather: "Any" },
      { name: "Herring", location: "Ocean", time: "Any", weather: "Any" },
      { name: "Perch", location: "River, Lake", time: "Any", weather: "Any" },
      { name: "Pike", location: "River", time: "Any", weather: "Any" },
      { name: "Albacore", location: "Ocean", time: "6am - 11am, 6pm - 2am", weather: "Any" },
      { name: "Sturgeon", location: "Mountain Lake", time: "6am - 7pm", weather: "Any" },
      { name: "Midnight Squid", location: "Night Market", time: "5pm - 2am", weather: "Any", special: true },
      {
        name: "Glacierfish",
        location: "South of Arrowhead Island",
        time: "6am - 10pm",
        weather: "Any",
        legendary: true,
      },
    ],
  }

  return (
    <div className="space-y-8 fishing-section">
      {/* Fishing section decorations with high z-index */}
      {mounted && !isMobile && (
        <>
          <div className="section-element character-element character-element-1"></div>
          <div className="section-element character-element character-element-2"></div>

          {/* Additional fishing decorations */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`fish-deco-${index}`}
              className="section-decoration"
              style={{
                top: `${20 + index * 15}%`,
                left: `${5 + (index % 3) * 30}%`,
                width: "20px",
                height: "10px",
                backgroundColor: "var(--stardew-blue)",
                borderRadius: "50% 0 0 50%",
                animationDelay: `${index * 0.5}s`,
                animation: "fish-swim 10s infinite linear",
              }}
            />
          ))}
        </>
      )}

      <Card className="pixel-border stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-xl text-stardew-green">{t("fishing.title")}</CardTitle>
          <CardDescription className="font-pixel text-xs">{t("fishing.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="map">
            <TabsList className="grid grid-cols-7 mb-6">
              <TabsTrigger value="map" className="font-pixel text-xs">
                Fishing Map
              </TabsTrigger>
              <TabsTrigger value="fish" className="font-pixel text-xs">
                fish
              </TabsTrigger>
              <TabsTrigger value="equipment" className="font-pixel text-xs">
                equipment
              </TabsTrigger>
              <TabsTrigger value="tips" className="font-pixel text-xs">
                tips
              </TabsTrigger>
              <TabsTrigger value="techniques" className="font-pixel text-xs">
                Techniques
              </TabsTrigger>
              <TabsTrigger value="ponds" className="font-pixel text-xs">
                Fish Ponds
              </TabsTrigger>
              <TabsTrigger value="recipes" className="font-pixel text-xs">
                Recipes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="map">
              <div className="space-y-6">
                <div className="relative w-full h-[400px] bg-amber-50 rounded-lg overflow-hidden border-2 border-amber-200">
                  <Image
                    src="/images/fishing/stardew-map.png"
                    alt="Stardew Valley Map"
                    fill
                    className="object-contain"
                  />

                  {/* Fishing spot markers */}
                  {fishingLocations.flatMap((location) =>
                    location.bestSpots.map((spot, index) => (
                      <div
                        key={`${location.name}-spot-${index}`}
                        className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 z-10"
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      >
                        <div className="relative group">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                            <Fish className="w-3 h-3 text-white" />
                          </div>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded shadow-lg text-xs hidden group-hover:block">
                            <p className="font-bold">{location.name}</p>
                            <p>{spot.description}</p>
                          </div>
                        </div>
                      </div>
                    )),
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fishingLocations.map((location) => (
                    <Card key={location.name} className="stardew-card">
                      <CardHeader className="p-4">
                        <CardTitle className="font-pixel text-sm flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {location.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm mb-2">{location.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Fish className="w-4 h-4 mt-0.5 shrink-0" />
                            <div className="text-xs">
                              <span className="font-bold">Fish:</span>{" "}
                              <div className="flex flex-wrap gap-1 mt-1">
                                {location.fish.map((fish) => (
                                  <Badge key={fish} variant="outline" className="bg-blue-50">
                                    {fish}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 shrink-0" />
                            <div className="text-xs">
                              <span className="font-bold">Seasons:</span> {location.seasons}
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                            <div className="text-xs">
                              <span className="font-bold">Best Spots:</span>
                              <ul className="list-disc pl-4 mt-1 space-y-1">
                                {location.bestSpots.map((spot, index) => (
                                  <li key={index}>{spot.description}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fish">
              <Tabs defaultValue="common">
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="common" className="font-pixel text-xs">
                    {t("fishing.fish.common")}
                  </TabsTrigger>
                  <TabsTrigger value="uncommon" className="font-pixel text-xs">
                    {t("fishing.fish.uncommon")}
                  </TabsTrigger>
                  <TabsTrigger value="rare" className="font-pixel text-xs">
                    Rare
                  </TabsTrigger>
                  <TabsTrigger value="legendary" className="font-pixel text-xs">
                    {t("fishing.fish.legendary")}
                  </TabsTrigger>
                  <TabsTrigger value="special" className="font-pixel text-xs">
                    Special
                  </TabsTrigger>
                </TabsList>

                {Object.entries(fishCategories).map(([category, fishes]) => (
                  <TabsContent key={category} value={category}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {fishes.map((fish) => (
                        <Card key={fish.name} className="overflow-hidden stardew-card">
                          <div className="aspect-square relative bg-amber-100 p-4 flex items-center justify-center">
                            <Image
                              src={fish.image || "/placeholder.svg"}
                              alt={fish.name}
                              width={80}
                              height={80}
                              className="object-contain pixel-image"
                            />
                          </div>
                          <CardHeader className="p-4">
                            <CardTitle className="font-pixel text-sm">{fish.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="grid grid-cols-1 gap-2 text-xs">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3" />
                                <span className="font-bold">{t("fishing.fishDetails.location")}:</span> {fish.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                <span className="font-bold">{t("fishing.fishDetails.season")}:</span> {fish.season}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                <span className="font-bold">{t("fishing.fishDetails.time")}:</span> {fish.time}
                              </div>
                              <div className="flex items-center gap-2">
                                <Cloud className="w-3 h-3" />
                                <span className="font-bold">{t("fishing.fishDetails.weather")}:</span> {fish.weather}
                              </div>
                              <div className="flex items-center gap-2">
                                <Gauge className="w-3 h-3" />
                                <span className="font-bold">{t("fishing.fishDetails.difficulty")}:</span>{" "}
                                {fish.difficulty}
                              </div>
                              {fish.note && (
                                <div className="flex items-center gap-2 text-amber-600">
                                  <span className="font-bold">Note:</span> {fish.note}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            <TabsContent value="equipment">
              <Tabs defaultValue="rods">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="rods" className="font-pixel text-xs">
                    {t("fishing.equipment.rods.title")}
                  </TabsTrigger>
                  <TabsTrigger value="tackles" className="font-pixel text-xs">
                    {t("fishing.equipment.tackles.title")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="rods">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {fishingEquipment.rods.map((rod) => (
                      <Card key={rod.name} className="overflow-hidden stardew-card">
                        <div className="aspect-square relative bg-amber-100 p-4 flex items-center justify-center">
                          <Image
                            src={rod.image || "/placeholder.svg"}
                            alt={rod.name}
                            width={80}
                            height={80}
                            className="object-contain pixel-image"
                          />
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className="font-pixel text-sm">{rod.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="font-bold">Cost:</span> {rod.cost}
                            </div>
                            <div>
                              <span className="font-bold">Description:</span> {rod.description}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tackles">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {fishingEquipment.tackles.map((tackle) => (
                      <Card key={tackle.name} className="overflow-hidden stardew-card">
                        <div className="aspect-square relative bg-amber-100 p-4 flex items-center justify-center">
                          <Image
                            src={tackle.image || "/placeholder.svg"}
                            alt={tackle.name}
                            width={80}
                            height={80}
                            className="object-contain pixel-image"
                          />
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className="font-pixel text-sm">{tackle.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="font-bold">Cost:</span> {tackle.cost}
                            </div>
                            <div>
                              <span className="font-bold">Description:</span> {tackle.description}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="tips">
              <div className="space-y-4">
                {fishingTips.map((tip, index) => (
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

            <TabsContent value="techniques">
              <div className="space-y-4">
                {specialFishingTechniques.map((technique, index) => (
                  <Card key={index} className="stardew-card">
                    <CardHeader className="p-4">
                      <CardTitle className="font-pixel text-sm">{technique.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">{technique.description}</p>
                    </CardContent>
                  </Card>
                ))}

                <Card className="stardew-card">
                  <CardHeader className="p-4">
                    <CardTitle className="font-pixel text-sm">Legendary Fish Challenge</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm mb-4">
                      Catching all five legendary fish is one of the greatest challenges in Stardew Valley. Each can
                      only be caught once per save file.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <h4 className="font-pixel text-sm mb-2">Tips for Legendary Fish</h4>
                        <ul className="list-disc pl-4 text-xs space-y-2">
                          <li>Reach fishing level 10 before attempting</li>
                          <li>Use an Iridium Rod with the best tackle</li>
                          <li>Cork Bobber or Trap Bobber are recommended</li>
                          <li>Eat fishing buff foods like Seafoam Pudding</li>
                          <li>Be patient - they're called legendary for a reason!</li>
                        </ul>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <h4 className="font-pixel text-sm mb-2">Extended Family Quest</h4>
                        <p className="text-xs">
                          After catching all five legendary fish, Mr. Qi may offer you the "Extended Family" quest to
                          catch their even more challenging relatives.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ponds">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="stardew-card">
                    <CardHeader className="p-4">
                      <CardTitle className="font-pixel text-sm">Fish Pond Basics</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm mb-3">
                        Fish Ponds allow you to raise fish and collect various resources. Each type of fish can produce
                        different items when placed in a pond.
                      </p>
                      <ul className="list-disc pl-4 text-xs space-y-1">
                        <li>Built from Robin's Carpentry Shop for 5,000g, 200 stone, 5 seaweed, and 5 green algae</li>
                        <li>Initial capacity is 3 fish</li>
                        <li>Complete fish quests to increase capacity (max 10 fish)</li>
                        <li>Higher population = more frequent and better quality items</li>
                        <li>Check ponds daily for new items floating on the surface</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="stardew-card">
                    <CardHeader className="p-4">
                      <CardTitle className="font-pixel text-sm">Population Quests</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm mb-3">
                        Fish will request items to increase the pond's capacity. These quests appear as speech bubbles
                        above the pond.
                      </p>
                      <ul className="list-disc pl-4 text-xs space-y-1">
                        <li>3→5 fish: First quest</li>
                        <li>5→7 fish: Second quest</li>
                        <li>7→10 fish: Final quest</li>
                        <li>Quest items relate to the fish type (e.g., Lava Eel might request Spicy Eel)</li>
                        <li>Some quests are easier than others - plan accordingly</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="font-pixel text-lg text-stardew-green mt-6">Most Profitable Fish Ponds</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fishPonds.bestPonds.map((pond) => (
                    <Card key={pond.fish} className="stardew-card">
                      <CardHeader className="p-4">
                        <CardTitle className="font-pixel text-sm">{pond.fish}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="font-bold">Products:</span>
                            <ul className="list-disc pl-4 mt-1 space-y-1">
                              {pond.products.map((product, index) => (
                                <li key={index}>{product}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="font-bold">Population:</span> {pond.population}
                          </div>
                          <div>
                            <span className="font-bold">Notes:</span> {pond.notes}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h3 className="font-pixel text-lg text-stardew-green mt-6">Special Resource Ponds</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fishPonds.specialPonds.map((pond) => (
                    <Card key={pond.fish} className="stardew-card">
                      <CardHeader className="p-4">
                        <CardTitle className="font-pixel text-sm">{pond.fish}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="font-bold">Products:</span>
                            <ul className="list-disc pl-4 mt-1 space-y-1">
                              {pond.products.map((product, index) => (
                                <li key={index}>{product}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="font-bold">Population:</span> {pond.population}
                          </div>
                          <div>
                            <span className="font-bold">Notes:</span> {pond.notes}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recipes">
              <div className="space-y-6">
                <h3 className="font-pixel text-lg text-stardew-green">Fishing Buff Recipes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fishRecipes.buffs.map((recipe) => (
                    <Card key={recipe.name} className="stardew-card">
                      <CardHeader className="p-4">
                        <CardTitle className="font-pixel text-sm">{recipe.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="font-bold">Ingredients:</span> {recipe.ingredients}
                          </div>
                          <div className="text-green-600">
                            <span className="font-bold">Effects:</span> {recipe.effects}
                          </div>
                          <div className="text-blue-600">
                            <span className="font-bold">Energy:</span> {recipe.energy}
                          </div>
                          <div>
                            <span className="font-bold">Source:</span> {recipe.source}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h3 className="font-pixel text-lg text-stardew-green mt-6">Simple Fish Recipes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fishRecipes.simple.map((recipe) => (
                    <Card key={recipe.name} className="stardew-card">
                      <CardHeader className="p-4">
                        <CardTitle className="font-pixel text-sm">{recipe.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="font-bold">Ingredients:</span> {recipe.ingredients}
                          </div>
                          <div className="text-blue-600">
                            <span className="font-bold">Energy:</span> {recipe.energy}
                          </div>
                          <div>
                            <span className="font-bold">Source:</span> {recipe.source}
                          </div>
                          {recipe.notes && (
                            <div className="text-amber-600">
                              <span className="font-bold">Notes:</span> {recipe.notes}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h3 className="font-pixel text-lg text-stardew-green mt-6">Advanced Fish Recipes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fishRecipes.advanced.map((recipe) => (
                    <Card key={recipe.name} className="stardew-card">
                      <CardHeader className="p-4">
                        <CardTitle className="font-pixel text-sm">{recipe.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="font-bold">Ingredients:</span> {recipe.ingredients}
                          </div>
                          <div className="text-green-600">
                            <span className="font-bold">Effects:</span> {recipe.effects}
                          </div>
                          <div className="text-blue-600">
                            <span className="font-bold">Energy:</span> {recipe.energy}
                          </div>
                          <div>
                            <span className="font-bold">Source:</span> {recipe.source}
                          </div>
                          {recipe.notes && (
                            <div className="text-amber-600">
                              <span className="font-bold">Notes:</span> {recipe.notes}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
