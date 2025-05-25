"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from "@/hooks/use-translations"
import { useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import Image from "next/image"

export function MiningContent() {
  const { t } = useTranslations()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const mineResources = {
    ores: [
      {
        name: "Copper Ore",
        image: "/images/mining/copper-ore.png",
        levels: "1-39",
        value: "5g",
        uses: "Copper Bar (5 ores)",
      },
      {
        name: "Iron Ore",
        image: "/images/mining/iron-ore.png",
        levels: "40-79",
        value: "10g",
        uses: "Iron Bar (5 ores)",
      },
      {
        name: "Gold Ore",
        image: "/images/mining/gold-ore.png",
        levels: "80-119",
        value: "25g",
        uses: "Gold Bar (5 ores)",
      },
      {
        name: "Iridium Ore",
        image: "/images/mining/iridium-ore.png",
        levels: "Skull Cavern",
        value: "100g",
        uses: "Iridium Bar (5 ores)",
      },
      {
        name: "Radioactive Ore",
        image: "/images/mining/radioactive-ore.png",
        levels: "Qi's Walnut Room",
        value: "300g",
        uses: "Radioactive Bar (5 ores)",
      },
      {
        name: "Coal",
        image: "/images/mining/coal.png",
        levels: "Any",
        value: "15g",
        uses: "Smelting, Crafting",
      },
      {
        name: "Stone",
        image: "/images/mining/stone.png",
        levels: "Any",
        value: "2g",
        uses: "Building, Crafting",
      },
      {
        name: "Clay",
        image: "/images/mining/clay.png",
        levels: "Any",
        value: "20g",
        uses: "Crafting, Silo",
      },
      {
        name: "Fiber",
        image: "/images/mining/fiber.png",
        levels: "Any",
        value: "1g",
        uses: "Crafting, Grass Starter",
      },
    ],
    gems: [
      {
        name: "Emerald",
        image: "/images/mining/emerald.png",
        levels: "Any",
        value: "250g",
        uses: "Gifts, Tailoring",
      },
      {
        name: "Ruby",
        image: "/images/mining/ruby.png",
        levels: "Any",
        value: "250g",
        uses: "Gifts, Ruby Ring",
      },
      {
        name: "Amethyst",
        image: "/images/mining/amethyst.png",
        levels: "Any",
        value: "100g",
        uses: "Gifts, Tailoring",
      },
      {
        name: "Diamond",
        image: "/images/mining/diamond.png",
        levels: "Any",
        value: "750g",
        uses: "Gifts, Diamond Ring",
      },
      {
        name: "Topaz",
        image: "/images/mining/topaz.png",
        levels: "Any",
        value: "80g",
        uses: "Gifts, Tailoring",
      },
      {
        name: "Jade",
        image: "/images/mining/jade.png",
        levels: "Any",
        value: "200g",
        uses: "Gifts, Desert Trader",
      },
      {
        name: "Aquamarine",
        image: "/images/mining/aquamarine.png",
        levels: "Any",
        value: "180g",
        uses: "Gifts, Tailoring",
      },
      {
        name: "Fire Opal",
        image: "/images/mining/fire-opal.png",
        levels: "Magma Geodes",
        value: "350g",
        uses: "Gifts, Tailoring",
      },
      {
        name: "Earth Crystal",
        image: "/images/mining/earth-crystal.png",
        levels: "1-39",
        value: "50g",
        uses: "Mayonnaise Machine",
      },
      {
        name: "Frozen Tear",
        image: "/images/mining/frozen-tear.png",
        levels: "40-79",
        value: "75g",
        uses: "Gifts, Crafting",
      },
      {
        name: "Fire Quartz",
        image: "/images/mining/fire-quartz.png",
        levels: "80-119",
        value: "100g",
        uses: "Refined Quartz",
      },
      {
        name: "Prismatic Shard",
        image: "/images/mining/prismatic-shard.png",
        levels: "Any (Rare)",
        value: "2000g",
        uses: "Galaxy Sword, Museum",
      },
      {
        name: "Quartz",
        image: "/images/mining/quartz.png",
        levels: "Any",
        value: "25g",
        uses: "Refined Quartz",
      },
      {
        name: "Celestine",
        image: "/images/mining/celestine.png",
        levels: "Geodes",
        value: "125g",
        uses: "Gifts, Museum",
      },
      {
        name: "Marble",
        image: "/images/mining/marble.png",
        levels: "Frozen Geodes",
        value: "110g",
        uses: "Gifts, Museum",
      },
      {
        name: "Sandstone",
        image: "/images/mining/sandstone.png",
        levels: "Geodes",
        value: "60g",
        uses: "Gifts, Museum",
      },
    ],
    geodes: [
      {
        name: "Geode",
        image: "/images/mining/geode.png",
        levels: "1-39",
        value: "50g",
        uses: "Crack open at Blacksmith",
      },
      {
        name: "Frozen Geode",
        image: "/images/mining/frozen-geode.png",
        levels: "40-79",
        value: "100g",
        uses: "Crack open at Blacksmith",
      },
      {
        name: "Magma Geode",
        image: "/images/mining/magma-geode.png",
        levels: "80-119",
        value: "150g",
        uses: "Crack open at Blacksmith",
      },
      {
        name: "Omni Geode",
        image: "/images/mining/omni-geode.png",
        levels: "Any",
        value: "300g",
        uses: "Crack open at Blacksmith",
      },
      {
        name: "Artifact Trove",
        image: "/images/mining/artifact-trove.png",
        levels: "Special",
        value: "500g",
        uses: "Guaranteed Artifact",
      },
      {
        name: "Golden Coconut",
        image: "/images/mining/golden-coconut.png",
        levels: "Ginger Island",
        value: "200g",
        uses: "Crack open at Clint",
      },
      {
        name: "Treasure Chest",
        image: "/images/mining/treasure-chest.png",
        levels: "Skull Cavern",
        value: "1000g",
        uses: "Random valuable items",
      },
    ],
  }

  const mineMonsters = [
    {
      name: "Green Slime",
      image: "/images/mining/green-slime.png",
      levels: "1-39",
      drops: "Slime, Coal",
      health: "40",
      damage: "1-5",
    },
    {
      name: "Dust Spirit",
      image: "/images/mining/dust-spirit.png",
      levels: "40-79",
      drops: "Coal, Coffee Bean",
      health: "25",
      damage: "3-5",
    },
    {
      name: "Bat",
      image: "/images/mining/bat.png",
      levels: "1-29",
      drops: "Bat Wing",
      health: "18",
      damage: "3-6",
    },
    {
      name: "Skeleton",
      image: "/images/mining/skeleton.png",
      levels: "70-79",
      drops: "Bone Fragment",
      health: "80",
      damage: "10-15",
    },
    {
      name: "Shadow Brute",
      image: "/images/mining/shadow-brute.png",
      levels: "80-119",
      drops: "Solar Essence",
      health: "150",
      damage: "20-30",
    },
    {
      name: "Serpent",
      image: "/images/mining/serpent.png",
      levels: "Skull Cavern",
      drops: "Snake Vertebrae",
      health: "150",
      damage: "30-45",
    },
    {
      name: "Rock Crab",
      image: "/images/mining/rock-crab.png",
      levels: "1-29",
      drops: "Stone, Crab Cakes Recipe",
      health: "200",
      damage: "8-12",
    },
    {
      name: "Lava Crab",
      image: "/images/mining/lava-crab.png",
      levels: "80-119",
      drops: "Fire Quartz, Lava Eel",
      health: "300",
      damage: "15-25",
    },
    {
      name: "Iridium Crab",
      image: "/images/mining/iridium-crab.png",
      levels: "Skull Cavern",
      drops: "Iridium Ore, Crab Cakes",
      health: "400",
      damage: "20-30",
    },
    {
      name: "Grub",
      image: "/images/mining/grub.png",
      levels: "1-39",
      drops: "Cave Carrot, Bug Meat",
      health: "15",
      damage: "2-4",
    },
    {
      name: "Fly",
      image: "/images/mining/fly.png",
      levels: "40-79",
      drops: "Bug Meat",
      health: "35",
      damage: "4-8",
    },
    {
      name: "Metal Head",
      image: "/images/mining/metal-head.png",
      levels: "80-119",
      drops: "Iron Ore, Coal",
      health: "300",
      damage: "20-35",
    },
    {
      name: "Shadow Shaman",
      image: "/images/mining/shadow-shaman.png",
      levels: "80-119",
      drops: "Void Essence, Purple Mushroom",
      health: "200",
      damage: "16-28",
    },
    {
      name: "Squid Kid",
      image: "/images/mining/squid-kid.png",
      levels: "80-119",
      drops: "Squid Ink, Refined Quartz",
      health: "200",
      damage: "18-30",
    },
    {
      name: "Mummy",
      image: "/images/mining/mummy.png",
      levels: "Skull Cavern",
      drops: "Cloth, Bone Fragment",
      health: "400",
      damage: "30-50",
    },
    {
      name: "Pepper Rex",
      image: "/images/mining/pepper-rex.png",
      levels: "Skull Cavern",
      drops: "Pepper Seeds, Spicy Eel",
      health: "500",
      damage: "35-55",
    },
    {
      name: "Iridium Bat",
      image: "/images/mining/iridium-bat.png",
      levels: "Skull Cavern",
      drops: "Iridium Ore, Bat Wing",
      health: "300",
      damage: "25-40",
    },
    {
      name: "Magma Geode",
      image: "/images/mining/magma-geode-monster.png",
      levels: "Volcano Dungeon",
      drops: "Magma Geode, Dragon Tooth",
      health: "250",
      damage: "20-35",
    },
    {
      name: "Blue Slime",
      image: "/images/mining/blue-slime.png",
      levels: "40-79",
      drops: "Slime, Refined Quartz",
      health: "65",
      damage: "4-8",
    },
    {
      name: "Red Slime",
      image: "/images/mining/red-slime.png",
      levels: "80-119",
      drops: "Slime, Fire Quartz",
      health: "90",
      damage: "6-12",
    },
    {
      name: "Purple Slime",
      image: "/images/mining/purple-slime.png",
      levels: "Skull Cavern",
      drops: "Slime, Iridium Ore",
      health: "200",
      damage: "10-20",
    },
    {
      name: "Tiger Slime",
      image: "/images/mining/tiger-slime.png",
      levels: "Volcano Dungeon",
      drops: "Slime, Dragon Tooth",
      health: "300",
      damage: "15-25",
    },
    {
      name: "Frost Bat",
      image: "/images/mining/frost-bat.png",
      levels: "40-79",
      drops: "Bat Wing, Frozen Tear",
      health: "45",
      damage: "5-10",
    },
    {
      name: "Lava Bat",
      image: "/images/mining/lava-bat.png",
      levels: "80-119",
      drops: "Bat Wing, Fire Quartz",
      health: "80",
      damage: "8-15",
    },
    {
      name: "Haunted Skull",
      image: "/images/mining/haunted-skull.png",
      levels: "Skull Cavern",
      drops: "Bone Fragment, Coal",
      health: "180",
      damage: "15-25",
    },
    {
      name: "Carbon Ghost",
      image: "/images/mining/carbon-ghost.png",
      levels: "Skull Cavern",
      drops: "Refined Quartz, Coal",
      health: "120",
      damage: "12-20",
    },
    {
      name: "Dwarvish Sentry",
      image: "/images/mining/dwarvish-sentry.png",
      levels: "Volcano Dungeon",
      drops: "Dwarf Gadget, Battery Pack",
      health: "400",
      damage: "25-40",
    },
    {
      name: "Magma Sparker",
      image: "/images/mining/magma-sparker.png",
      levels: "Volcano Dungeon",
      drops: "Fire Quartz, Cinder Shard",
      health: "250",
      damage: "20-30",
    },
    {
      name: "Magma Duggy",
      image: "/images/mining/magma-duggy.png",
      levels: "Volcano Dungeon",
      drops: "Magma Geode, Coal",
      health: "300",
      damage: "18-28",
    },
    {
      name: "Hot Head",
      image: "/images/mining/hot-head.png",
      levels: "Volcano Dungeon",
      drops: "Fire Quartz, Spicy Eel",
      health: "350",
      damage: "22-35",
    },
    {
      name: "Armored Bug",
      image: "/images/mining/armored-bug.png",
      levels: "1-29",
      drops: "Bug Meat, Refined Quartz",
      health: "60",
      damage: "5-9",
    },
    {
      name: "Bug",
      image: "/images/mining/bug.png",
      levels: "1-29",
      drops: "Bug Meat",
      health: "20",
      damage: "2-5",
    },
    {
      name: "Stone Golem",
      image: "/images/mining/stone-golem.png",
      levels: "1-39",
      drops: "Stone, Geode",
      health: "300",
      damage: "15-25",
    },
    {
      name: "Wilderness Golem",
      image: "/images/mining/wilderness-golem.png",
      levels: "Wilderness Farm",
      drops: "Stone, Coal, Fiber",
      health: "400",
      damage: "20-30",
    },
    {
      name: "Duggy",
      image: "/images/mining/duggy.png",
      levels: "1-29",
      drops: "Earth Crystal, Cave Carrot",
      health: "100",
      damage: "8-15",
    },
    {
      name: "Magma Duggy",
      image: "/images/mining/magma-duggy-alt.png",
      levels: "80-119",
      drops: "Fire Quartz, Magma Geode",
      health: "200",
      damage: "15-25",
    },
    // NEW MONSTERS ADDED
    {
      name: "Shadow Warrior",
      image: "/images/mining/shadow-warrior.png",
      levels: "80-119",
      drops: "Void Essence, Shadow Essence",
      health: "280",
      damage: "22-38",
    },
    {
      name: "Crystal Slime",
      image: "/images/mining/crystal-slime.png",
      levels: "Skull Cavern",
      drops: "Slime, Prismatic Shard (Rare)",
      health: "350",
      damage: "18-30",
    },
    {
      name: "Bone Serpent",
      image: "/images/mining/bone-serpent.png",
      levels: "Skull Cavern",
      drops: "Bone Fragment, Ancient Seed",
      health: "400",
      damage: "35-50",
    },
    {
      name: "Void Spirit",
      image: "/images/mining/void-spirit.png",
      levels: "Skull Cavern",
      drops: "Void Essence, Dark Essence",
      health: "180",
      damage: "20-35",
    },
    {
      name: "Lava Lurker",
      image: "/images/mining/lava-lurker.png",
      levels: "Volcano Dungeon",
      drops: "Magma Geode, Fire Essence",
      health: "320",
      damage: "25-40",
    },
    {
      name: "Ice Wraith",
      image: "/images/mining/ice-wraith.png",
      levels: "40-79",
      drops: "Frozen Tear, Ice Crystal",
      health: "150",
      damage: "12-22",
    },
    {
      name: "Thunder Egg",
      image: "/images/mining/thunder-egg.png",
      levels: "80-119",
      drops: "Thunder Egg, Battery Pack",
      health: "220",
      damage: "15-28",
    },
    {
      name: "Prismatic Jelly",
      image: "/images/mining/prismatic-jelly.png",
      levels: "Special Quest",
      drops: "Prismatic Jelly",
      health: "500",
      damage: "25-45",
    },
    {
      name: "Radioactive Slime",
      image: "/images/mining/radioactive-slime.png",
      levels: "Qi's Walnut Room",
      drops: "Radioactive Ore, Slime",
      health: "600",
      damage: "40-60",
    },
    {
      name: "Cursed Doll",
      image: "/images/mining/cursed-doll.png",
      levels: "Haunted Skulls",
      drops: "Strange Doll, Cloth",
      health: "160",
      damage: "18-32",
    },
  ]

  const weaponProgression = [
    {
      tier: "Early Game (Levels 1-39)",
      weapons: [
        { name: "Rusty Sword", damage: "2-5", source: "Starting weapon", cost: "Free" },
        { name: "Wooden Blade", damage: "3-7", source: "Crafting", cost: "10 Wood" },
        { name: "Steel Smallsword", damage: "4-8", source: "Adventurer's Guild", cost: "350g" },
        { name: "Silver Saber", damage: "8-15", source: "Chest/Drop", cost: "Found" },
      ],
    },
    {
      tier: "Mid Game (Levels 40-79)",
      weapons: [
        { name: "Cutlass", damage: "9-17", source: "Adventurer's Guild", cost: "2000g" },
        { name: "Iron Edge", damage: "12-25", source: "Blacksmith Upgrade", cost: "5 Iron Bars" },
        { name: "Burglar's Shank", damage: "18-27", source: "Chest Level 60", cost: "Found" },
        { name: "Forest Sword", damage: "7-11", source: "Crafting", cost: "50 Wood, 2 Iron Bars" },
      ],
    },
    {
      tier: "Late Game (Levels 80-119)",
      weapons: [
        { name: "Claymore", damage: "20-32", source: "Adventurer's Guild", cost: "6000g" },
        { name: "Steel Falchion", damage: "28-46", source: "Chest Level 90", cost: "Found" },
        { name: "Tempered Broadsword", damage: "29-44", source: "Blacksmith Upgrade", cost: "5 Gold Bars" },
        { name: "Lava Katana", damage: "55-64", source: "Volcano Dungeon", cost: "Found" },
      ],
    },
    {
      tier: "End Game (Skull Cavern+)",
      weapons: [
        { name: "Galaxy Sword", damage: "60-80", source: "Desert Pillar + Prismatic Shard", cost: "1 Prismatic Shard" },
        { name: "Galaxy Hammer", damage: "70-90", source: "Galaxy Sword + 3 Galaxy Souls", cost: "3 Galaxy Souls" },
        { name: "Galaxy Dagger", damage: "30-40", source: "Galaxy Sword + 3 Galaxy Souls", cost: "3 Galaxy Souls" },
        {
          name: "Infinity Blade",
          damage: "80-100",
          source: "Galaxy Sword + 3 Prismatic Shards",
          cost: "3 Prismatic Shards",
        },
      ],
    },
  ]

  const combatSkillTips = [
    {
      level: "Level 1-2",
      xpNeeded: "100-380 XP",
      strategy: "Kill slimes and bats in early mine levels. Each kill gives 5-15 XP.",
      tips: ["Focus on Green Slimes (easy targets)", "Use basic sword attacks", "Don't worry about efficiency yet"],
    },
    {
      level: "Level 3-5",
      xpNeeded: "770-2150 XP",
      strategy: "Farm Dust Sprites on levels 40-79. They give good XP and valuable drops.",
      tips: ["Dust Sprites give 10 XP each", "Bring food for healing", "Learn enemy patterns"],
    },
    {
      level: "Level 6-8",
      xpNeeded: "3300-6900 XP",
      strategy: "Fight stronger enemies in levels 80-119. Shadow creatures give excellent XP.",
      tips: ["Shadow Brutes give 20 XP", "Use better weapons", "Consider combat food buffs"],
    },
    {
      level: "Level 9-10",
      xpNeeded: "10000-15000 XP",
      strategy: "Skull Cavern monsters give the most XP. Serpents and Mummies are ideal.",
      tips: ["Serpents give 25 XP", "Mummies give 30 XP", "Use Spicy Eel for luck and speed"],
    },
  ]

  const specialAttacks = [
    {
      name: "Sword Combo",
      description: "Click rapidly for a 3-hit combo that deals increasing damage",
      execution: "Left-click → Left-click → Left-click (timing is key)",
      damage: "100% → 125% → 150% weapon damage",
      cooldown: "None",
    },
    {
      name: "Defensive Block",
      description: "Hold right-click to block incoming attacks and reduce damage",
      execution: "Hold right-click before enemy attack",
      damage: "Reduces incoming damage by 50%",
      cooldown: "None",
    },
    {
      name: "Critical Strike",
      description: "Random chance for double damage with visual effect",
      execution: "Automatic with any attack (luck-based)",
      damage: "200% weapon damage",
      cooldown: "Random chance",
    },
    {
      name: "Club Slam",
      description: "Clubs have area damage that hits multiple enemies",
      execution: "Normal attack with club weapon",
      damage: "Full damage to all enemies in range",
      cooldown: "None",
    },
    {
      name: "Dagger Flurry",
      description: "Daggers attack faster but with lower damage per hit",
      execution: "Rapid clicking with dagger",
      damage: "Lower per hit, higher DPS",
      cooldown: "None",
    },
    {
      name: "Special Move",
      description: "Right-click special attacks unique to each weapon type",
      execution: "Right-click with charged weapon",
      damage: "Varies by weapon (usually 2x damage)",
      cooldown: "2-3 seconds",
    },
  ]

  const defensiveEquipment = [
    {
      category: "Boots",
      items: [
        { name: "Leather Boots", defense: "+1", source: "Chest Level 10", effect: "Basic protection" },
        { name: "Sneakers", defense: "+2", source: "Chest Level 30", effect: "Slight speed boost" },
        { name: "Combat Boots", defense: "+4", source: "Chest Level 80", effect: "Good all-around protection" },
        { name: "Tundra Boots", defense: "+5", source: "Chest Level 110", effect: "Cold resistance" },
        { name: "Space Boots", defense: "+4", source: "Chest Level 110", effect: "Best overall boots" },
        { name: "Cinderclown Shoes", defense: "+6", source: "Volcano Dungeon", effect: "Fire immunity" },
      ],
    },
    {
      category: "Rings",
      items: [
        { name: "Warrior Ring", defense: "+10 Attack", source: "Chest Level 40", effect: "Increases damage" },
        {
          name: "Ring of Yoba",
          defense: "Glow + Magnetic",
          source: "Chest Level 60",
          effect: "Light and item attraction",
        },
        {
          name: "Slime Charmer Ring",
          defense: "Slime Immunity",
          source: "Adventurer's Guild",
          effect: "No slime debuffs",
        },
        {
          name: "Burglar's Ring",
          defense: "Double Drops",
          source: "Adventurer's Guild",
          effect: "Monsters drop 2x items",
        },
        {
          name: "Iridium Band",
          defense: "Glow + Magnetic + Attack",
          source: "Crafting",
          effect: "Combines 3 ring effects",
        },
        { name: "Crabshell Ring", defense: "+5 Defense", source: "Crab Pot Bundle", effect: "Reduces damage taken" },
      ],
    },
    {
      category: "Food Buffs",
      items: [
        { name: "Life Elixir", defense: "Full Health", source: "Harvey/Crafting", effect: "Instant full heal" },
        { name: "Energy Tonic", defense: "Full Energy", source: "Harvey/Crafting", effect: "Instant full energy" },
        { name: "Spicy Eel", defense: "+1 Luck, +1 Speed", source: "Cooking", effect: "Mining and combat boost" },
        { name: "Crab Cakes", defense: "+1 Defense, +1 Speed", source: "Cooking", effect: "Damage reduction" },
        { name: "Pumpkin Soup", defense: "+2 Luck, +2 Defense", source: "Cooking", effect: "Great for Skull Cavern" },
        { name: "Red Plate", defense: "+25 Attack, +1 Mining", source: "Cooking", effect: "Massive damage boost" },
      ],
    },
  ]

  const monsterSpawnMechanics = [
    {
      area: "Regular Mines (1-119)",
      mechanics: [
        "Monsters spawn when entering a new level",
        "Maximum 12 monsters per level",
        "Spawn rate increases with depth",
        "Killing monsters can spawn ladders (2% base chance)",
        "Monster type determined by level range",
      ],
      factors: [
        "Daily Luck affects spawn rates",
        "Time of day doesn't affect spawning",
        "Monsters don't respawn on same level",
        "Elevators reset monster spawns",
      ],
    },
    {
      area: "Skull Cavern",
      mechanics: [
        "Infinite levels with scaling difficulty",
        "Monster health/damage increases with depth",
        "More dangerous monsters at deeper levels",
        "Iridium monsters appear after level 50",
        "Flying serpents become more common",
      ],
      factors: [
        "Luck HEAVILY affects monster spawns",
        "Deeper levels = more monsters",
        "Prismatic Shards more likely from deep monsters",
        "Monster swarms possible at deep levels",
      ],
    },
    {
      area: "Volcano Dungeon",
      mechanics: [
        "Fixed 10 levels with unique monsters",
        "Lava pools deal damage over time",
        "Special monsters drop Dragon Teeth",
        "Dwarf puzzles affect monster spawns",
        "Boss monster on level 10",
      ],
      factors: [
        "Magma-themed monsters only",
        "Higher drop rates for rare items",
        "Cinder Shards from most monsters",
        "Watering can needed for lava navigation",
      ],
    },
  ]

  const combatStrategies = {
    slimes: {
      title: "Slime Combat Tactics",
      description: "Slimes are bouncing enemies that move in predictable patterns",
      monsters: [
        "Green Slime",
        "Blue Slime",
        "Red Slime",
        "Purple Slime",
        "Tiger Slime",
        "Crystal Slime",
        "Radioactive Slime",
      ],
      strategies: [
        {
          tactic: "Hit and Run",
          description: "Attack when they land, then move away before they bounce again",
          difficulty: "Easy",
        },
        {
          tactic: "Corner Trapping",
          description: "Push slimes into corners where they can't bounce effectively",
          difficulty: "Medium",
        },
        {
          tactic: "Weapon Choice",
          description: "Use swords for single targets, clubs for groups. Avoid daggers due to low reach",
          difficulty: "Easy",
        },
      ],
      tips: [
        "Slimes always bounce in straight lines - use this to predict their movement",
        "Larger slimes split into smaller ones when killed",
        "Slime charmer ring makes you immune to slime debuffs",
        "Crystal Slimes have rare Prismatic Shard drops",
      ],
    },
    bats: {
      title: "Bat Combat Tactics",
      description: "Flying enemies that swoop down in erratic patterns",
      monsters: ["Bat", "Frost Bat", "Lava Bat", "Iridium Bat"],
      strategies: [
        {
          tactic: "Timing Attacks",
          description: "Wait for bats to swoop low, then strike when they're at your level",
          difficulty: "Medium",
        },
        {
          tactic: "Defensive Positioning",
          description: "Stay near walls to limit their approach angles",
          difficulty: "Easy",
        },
        {
          tactic: "Area Weapons",
          description: "Use clubs or hammers for their wide swing to catch flying bats",
          difficulty: "Medium",
        },
      ],
      tips: [
        "Bats have low health but high mobility",
        "They often attack in groups - prioritize crowd control",
        "Magnetic ring helps collect bat wings automatically",
      ],
    },
    crabs: {
      title: "Crab Combat Tactics",
      description: "Heavily armored enemies that hide and ambush",
      monsters: ["Rock Crab", "Lava Crab", "Iridium Crab"],
      strategies: [
        {
          tactic: "Shell Breaking",
          description: "Attack repeatedly to force them out of their shell state",
          difficulty: "Hard",
        },
        {
          tactic: "Patience Strategy",
          description: "Wait for them to emerge naturally, then attack quickly",
          difficulty: "Medium",
        },
        {
          tactic: "Bomb Usage",
          description: "Bombs can damage crabs even when they're hiding",
          difficulty: "Easy",
        },
      ],
      tips: [
        "Crabs are immune to damage while hiding in shells",
        "They have high health but slow movement when active",
        "Explosive ammo works well against armored enemies",
      ],
    },
    undead: {
      title: "Undead Combat Tactics",
      description: "Skeleton warriors and ghostly enemies with unique behaviors",
      monsters: ["Skeleton", "Haunted Skull", "Carbon Ghost", "Mummy", "Bone Serpent", "Cursed Doll"],
      strategies: [
        {
          tactic: "Holy Water",
          description: "Use life elixirs and energy tonics - they're extra effective against undead",
          difficulty: "Easy",
        },
        {
          tactic: "Quick Strikes",
          description: "Attack fast before they can use their special abilities",
          difficulty: "Medium",
        },
        {
          tactic: "Resurrection Prevention",
          description: "Some undead can revive - use bombs to destroy remains",
          difficulty: "Hard",
        },
      ],
      tips: [
        "Mummies can wrap you up - keep moving to avoid being stunned",
        "Skeletons throw bones - dodge sideways to avoid projectiles",
        "Haunted skulls phase through walls - use enclosed spaces carefully",
        "Bone Serpents are faster than regular serpents",
      ],
    },
    elementals: {
      title: "Elemental Combat Tactics",
      description: "Fire, ice, and shadow creatures with elemental attacks",
      monsters: [
        "Dust Spirit",
        "Shadow Brute",
        "Shadow Shaman",
        "Magma Sparker",
        "Hot Head",
        "Shadow Warrior",
        "Void Spirit",
        "Ice Wraith",
        "Lava Lurker",
      ],
      strategies: [
        {
          tactic: "Elemental Resistance",
          description: "Wear rings that provide resistance to their element type",
          difficulty: "Medium",
        },
        {
          tactic: "Opposite Elements",
          description: "Use weapons with opposing elements (ice vs fire, light vs shadow)",
          difficulty: "Hard",
        },
        {
          tactic: "Range Combat",
          description: "Use slingshots to avoid their elemental aura damage",
          difficulty: "Medium",
        },
      ],
      tips: [
        "Shadow creatures are weaker in well-lit areas",
        "Fire elementals can ignite nearby grass and debris",
        "Dust spirits move very fast but have low health",
        "Ice Wraiths slow you down with frost attacks",
      ],
    },
    bosses: {
      title: "Boss & Elite Combat Tactics",
      description: "High-health enemies requiring special strategies",
      monsters: ["Pepper Rex", "Serpent", "Metal Head", "Dwarvish Sentry", "Prismatic Jelly", "Thunder Egg"],
      strategies: [
        {
          tactic: "Preparation",
          description: "Bring plenty of food, bombs, and your best weapons",
          difficulty: "Hard",
        },
        {
          tactic: "Pattern Recognition",
          description: "Learn their attack patterns and find safe windows to strike",
          difficulty: "Hard",
        },
        {
          tactic: "Environmental Usage",
          description: "Use terrain features like rocks and walls for cover",
          difficulty: "Medium",
        },
      ],
      tips: [
        "Pepper Rex breathes fire in a cone - attack from the sides",
        "Serpents are fast but predictable - use their momentum against them",
        "Metal Heads are slow but deal massive damage - keep your distance",
        "Prismatic Jelly is extremely rare and valuable",
      ],
    },
  }

  const generalCombatTips = [
    {
      title: "Weapon Selection",
      description:
        "Choose weapons based on the situation: swords for single targets, clubs for groups, daggers for speed",
    },
    {
      title: "Food Management",
      description: "Always carry cheese, salads, or cactus fruit for quick healing during combat",
    },
    {
      title: "Ring Combinations",
      description: "Combine Burglar's Ring (double drops) with Slime Charmer Ring for optimal mining",
    },
    {
      title: "Bomb Strategy",
      description: "Use bombs to clear multiple enemies and create escape routes",
    },
    {
      title: "Defensive Play",
      description: "Sometimes retreating to a safer area is better than fighting in cramped spaces",
    },
    {
      title: "Weapon Upgrades",
      description: "Upgrade weapons at the blacksmith - higher tier weapons make combat much easier",
    },
  ]

  const miningTips = [
    {
      title: t("mining.tips.elevators"),
      description: "The mine has elevators every 5 levels. Reach these checkpoints to save your progress.",
    },
    {
      title: t("mining.tips.preparation"),
      description: "Bring food to restore energy and health. Cheese, Salads, and Spicy Eel are excellent choices.",
    },
    {
      title: t("mining.tips.efficiency"),
      description: "Focus on finding ladders to descend quickly. Break ore nodes and kill monsters to find them.",
    },
    {
      title: t("mining.tips.combat"),
      description: "Learn monster attack patterns. Most can be avoided with proper timing and positioning.",
    },
    {
      title: t("mining.tips.timing"),
      description: "Mine on days with good luck (check TV) for better ore and geode drops, and more ladder spawns.",
    },
  ]

  return (
    <div className="space-y-8 mining-section">
      {/* Mining section decorations with high z-index */}
      {mounted && !isMobile && (
        <>
          <div className="section-element character-element character-element-1"></div>
          <div className="section-element character-element character-element-2"></div>

          {/* Additional mining decorations */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`mine-deco-${index}`}
              className="section-decoration"
              style={{
                top: `${20 + index * 15}%`,
                left: `${5 + (index % 3) * 30}%`,
                width: "15px",
                height: "15px",
                backgroundColor: "var(--stardew-brown)",
                borderRadius: "2px",
                animationDelay: `${index * 0.5}s`,
                animation: "pulse-decoration 3s infinite ease-in-out",
              }}
            />
          ))}
        </>
      )}

      <Card className="pixel-border stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-xl text-stardew-green">{t("mining.title")}</CardTitle>
          <CardDescription className="font-pixel text-xs">{t("mining.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="resources">
            <TabsList className="grid grid-cols-6 mb-6">
              <TabsTrigger value="resources" className="font-pixel text-xs">
                Resources
              </TabsTrigger>
              <TabsTrigger value="monsters" className="font-pixel text-xs">
                Monsters
              </TabsTrigger>
              <TabsTrigger value="combat" className="font-pixel text-xs">
                Combat
              </TabsTrigger>
              <TabsTrigger value="equipment" className="font-pixel text-xs">
                Equipment
              </TabsTrigger>
              <TabsTrigger value="mechanics" className="font-pixel text-xs">
                Mechanics
              </TabsTrigger>
              <TabsTrigger value="tips" className="font-pixel text-xs">
                Tips
              </TabsTrigger>
            </TabsList>

            <TabsContent value="resources">
              <Tabs defaultValue="ores">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="ores" className="font-pixel text-xs">
                    {t("mining.resources.ores.title")}
                  </TabsTrigger>
                  <TabsTrigger value="gems" className="font-pixel text-xs">
                    {t("mining.resources.gems.title")}
                  </TabsTrigger>
                  <TabsTrigger value="geodes" className="font-pixel text-xs">
                    {t("mining.resources.geodes.title")}
                  </TabsTrigger>
                </TabsList>

                {Object.entries(mineResources).map(([category, resources]) => (
                  <TabsContent key={category} value={category}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {resources.map((resource) => (
                        <Card key={resource.name} className="overflow-hidden stardew-card">
                          <div className="aspect-square relative bg-amber-100 p-4 flex items-center justify-center">
                            <Image
                              src={resource.image || "/placeholder.svg"}
                              alt={resource.name}
                              width={80}
                              height={80}
                              className="object-contain pixel-image"
                            />
                          </div>
                          <CardHeader className="p-4">
                            <CardTitle className="font-pixel text-sm">{resource.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="grid grid-cols-1 gap-2 text-xs">
                              <div>
                                <span className="font-bold">Found on levels:</span> {resource.levels}
                              </div>
                              <div>
                                <span className="font-bold">Value:</span> {resource.value}
                              </div>
                              <div>
                                <span className="font-bold">Uses:</span> {resource.uses}
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

            <TabsContent value="monsters">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mineMonsters.map((monster) => (
                  <Card key={monster.name} className="overflow-hidden stardew-card">
                    <div className="aspect-square relative bg-amber-100 p-4 flex items-center justify-center">
                      <Image
                        src={monster.image || "/placeholder.svg"}
                        alt={monster.name}
                        width={80}
                        height={80}
                        className="object-contain pixel-image"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="font-pixel text-sm">{monster.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="grid grid-cols-1 gap-2 text-xs">
                        <div>
                          <span className="font-bold">Found on levels:</span> {monster.levels}
                        </div>
                        <div>
                          <span className="font-bold">Drops:</span> {monster.drops}
                        </div>
                        <div>
                          <span className="font-bold">Health:</span> {monster.health}
                        </div>
                        <div>
                          <span className="font-bold">Damage:</span> {monster.damage}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="combat">
              <Tabs defaultValue="strategies">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="strategies" className="font-pixel text-xs">
                    Combat Strategies
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="font-pixel text-xs">
                    Skill Leveling
                  </TabsTrigger>
                  <TabsTrigger value="attacks" className="font-pixel text-xs">
                    Special Attacks
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="strategies">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {Object.entries(combatStrategies).map(([key, strategy]) => (
                        <Card key={key} className="stardew-card">
                          <CardHeader className="p-4">
                            <CardTitle className="font-pixel text-sm text-stardew-green">{strategy.title}</CardTitle>
                            <CardDescription className="text-xs">{strategy.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-0 space-y-4">
                            <div>
                              <h4 className="font-bold text-xs mb-2">Target Monsters:</h4>
                              <div className="flex flex-wrap gap-1">
                                {strategy.monsters.map((monster) => (
                                  <span key={monster} className="bg-amber-100 px-2 py-1 rounded text-xs">
                                    {monster}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-bold text-xs mb-2">Combat Strategies:</h4>
                              <div className="space-y-2">
                                {strategy.strategies.map((strat, index) => (
                                  <div key={index} className="border-l-2 border-stardew-green pl-3">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-bold text-xs">{strat.tactic}</span>
                                      <span
                                        className={`text-xs px-2 py-0.5 rounded ${
                                          strat.difficulty === "Easy"
                                            ? "bg-green-100 text-green-800"
                                            : strat.difficulty === "Medium"
                                              ? "bg-yellow-100 text-yellow-800"
                                              : "bg-red-100 text-red-800"
                                        }`}
                                      >
                                        {strat.difficulty}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-600">{strat.description}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-bold text-xs mb-2">Pro Tips:</h4>
                              <ul className="space-y-1">
                                {strategy.tips.map((tip, index) => (
                                  <li key={index} className="text-xs flex items-start gap-2">
                                    <span className="text-stardew-green">•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Card className="stardew-card">
                      <CardHeader className="p-4">
                        <CardTitle className="font-pixel text-sm text-stardew-green">General Combat Tips</CardTitle>
                        <CardDescription className="text-xs">Universal strategies for mine combat</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {generalCombatTips.map((tip, index) => (
                            <div key={index} className="border-l-2 border-amber-400 pl-3">
                              <h4 className="font-bold text-xs mb-1">{tip.title}</h4>
                              <p className="text-xs text-gray-600">{tip.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="skills">
                  <div className="space-y-4">
                    {combatSkillTips.map((skill, index) => (
                      <Card key={index} className="stardew-card">
                        <CardHeader className="p-4">
                          <CardTitle className="font-pixel text-sm text-stardew-green">{skill.level}</CardTitle>
                          <CardDescription className="text-xs">{skill.xpNeeded}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-3">
                          <div>
                            <h4 className="font-bold text-xs mb-1">Best Strategy:</h4>
                            <p className="text-xs text-gray-600">{skill.strategy}</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-xs mb-2">Tips:</h4>
                            <ul className="space-y-1">
                              {skill.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="text-xs flex items-start gap-2">
                                  <span className="text-stardew-green">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="attacks">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specialAttacks.map((attack, index) => (
                      <Card key={index} className="stardew-card">
                        <CardHeader className="p-4">
                          <CardTitle className="font-pixel text-sm text-stardew-green">{attack.name}</CardTitle>
                          <CardDescription className="text-xs">{attack.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-2">
                          <div>
                            <span className="font-bold text-xs">Execution:</span>
                            <p className="text-xs text-gray-600">{attack.execution}</p>
                          </div>
                          <div>
                            <span className="font-bold text-xs">Damage:</span>
                            <p className="text-xs text-gray-600">{attack.damage}</p>
                          </div>
                          <div>
                            <span className="font-bold text-xs">Cooldown:</span>
                            <p className="text-xs text-gray-600">{attack.cooldown}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="equipment">
              <Tabs defaultValue="weapons">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="weapons" className="font-pixel text-xs">
                    Weapon Progression
                  </TabsTrigger>
                  <TabsTrigger value="defense" className="font-pixel text-xs">
                    Defensive Equipment
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="weapons">
                  <div className="space-y-6">
                    {weaponProgression.map((tier, index) => (
                      <Card key={index} className="stardew-card">
                        <CardHeader className="p-4">
                          <CardTitle className="font-pixel text-sm text-stardew-green">{tier.tier}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tier.weapons.map((weapon, weaponIndex) => (
                              <div key={weaponIndex} className="border-l-2 border-amber-400 pl-3">
                                <h4 className="font-bold text-xs mb-1">{weapon.name}</h4>
                                <div className="text-xs space-y-1">
                                  <div>
                                    <span className="font-bold">Damage:</span> {weapon.damage}
                                  </div>
                                  <div>
                                    <span className="font-bold">Source:</span> {weapon.source}
                                  </div>
                                  <div>
                                    <span className="font-bold">Cost:</span> {weapon.cost}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="defense">
                  <div className="space-y-6">
                    {defensiveEquipment.map((category, index) => (
                      <Card key={index} className="stardew-card">
                        <CardHeader className="p-4">
                          <CardTitle className="font-pixel text-sm text-stardew-green">{category.category}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {category.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="border-l-2 border-blue-400 pl-3">
                                <h4 className="font-bold text-xs mb-1">{item.name}</h4>
                                <div className="text-xs space-y-1">
                                  <div>
                                    <span className="font-bold">Defense:</span> {item.defense}
                                  </div>
                                  <div>
                                    <span className="font-bold">Source:</span> {item.source}
                                  </div>
                                  <div>
                                    <span className="font-bold">Effect:</span> {item.effect}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="mechanics">
              <div className="space-y-6">
                {monsterSpawnMechanics.map((area, index) => (
                  <Card key={index} className="stardew-card">
                    <CardHeader className="p-4">
                      <CardTitle className="font-pixel text-sm text-stardew-green">{area.area}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-4">
                      <div>
                        <h4 className="font-bold text-xs mb-2">Spawn Mechanics:</h4>
                        <ul className="space-y-1">
                          {area.mechanics.map((mechanic, mechanicIndex) => (
                            <li key={mechanicIndex} className="text-xs flex items-start gap-2">
                              <span className="text-stardew-green">•</span>
                              <span>{mechanic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs mb-2">Important Factors:</h4>
                        <ul className="space-y-1">
                          {area.factors.map((factor, factorIndex) => (
                            <li key={factorIndex} className="text-xs flex items-start gap-2">
                              <span className="text-amber-500">•</span>
                              <span>{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tips">
              <div className="space-y-4">
                {miningTips.map((tip, index) => (
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
