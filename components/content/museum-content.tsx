"use client"

import type React from "react"
import Image from "next/image"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gem, Scroll, Gift, MapPin, Star, Trophy, Layout, CheckSquare, RotateCcw, Download, Upload } from "lucide-react"

interface CollectionItem {
  id: string
  name: string
  location: string
  rarity: string
  description: string
  type: "artifact" | "mineral"
  image?: string
}

interface Achievement {
  id: string
  name: string
  description: string
  requirement: string
  progress: number
  maxProgress: number
  completed: boolean
  reward?: string
}

interface MuseumSlot {
  id: string
  x: number
  y: number
  itemId?: string
  itemName?: string
  type: "artifact" | "mineral" | "empty"
}

export function MuseumContent() {
  const [collectedItems, setCollectedItems] = useState<Set<string>>(new Set())
  const [museumLayout, setMuseumLayout] = useState<MuseumSlot[]>([])
  const [selectedItem, setSelectedItem] = useState<string>("")
  const [achievements, setAchievements] = useState<Achievement[]>([])

  // Initialize museum layout grid (simplified 10x6 grid)
  useEffect(() => {
    const initializeLayout = () => {
      const slots: MuseumSlot[] = []
      for (let y = 0; y < 6; y++) {
        for (let x = 0; x < 10; x++) {
          slots.push({
            id: `slot-${x}-${y}`,
            x,
            y,
            type: "empty",
          })
        }
      }
      setMuseumLayout(slots)
    }

    const initializeAchievements = () => {
      setAchievements([
        {
          id: "first-donation",
          name: "First Donation",
          description: "Donate your first item to the museum",
          requirement: "Donate 1 item",
          progress: 0,
          maxProgress: 1,
          completed: false,
          reward: "Cauliflower Seeds (9)",
        },
        {
          id: "getting-started",
          name: "Getting Started",
          description: "Donate 5 items to the museum",
          requirement: "Donate 5 items",
          progress: 0,
          maxProgress: 5,
          completed: false,
          reward: "Cauliflower Seeds (9)",
        },
        {
          id: "treasure-hunter",
          name: "Treasure Hunter",
          description: "Donate 40 items to the museum",
          requirement: "Donate 40 items",
          progress: 0,
          maxProgress: 40,
          completed: false,
          reward: "Rusty Key (Sewers Access)",
        },
        {
          id: "museum-patron",
          name: "Museum Patron",
          description: "Donate 60 items to the museum",
          requirement: "Donate 60 items",
          progress: 0,
          maxProgress: 60,
          completed: false,
          reward: "Geode Crusher",
        },
        {
          id: "completionist",
          name: "Completionist",
          description: "Complete the entire museum collection",
          requirement: "Donate all 95 items",
          progress: 0,
          maxProgress: 95,
          completed: false,
          reward: "Stardrop (+34 Max Energy)",
        },
        {
          id: "artifact-collector",
          name: "Artifact Collector",
          description: "Donate all artifacts to the museum",
          requirement: "Donate all 28 artifacts",
          progress: 0,
          maxProgress: 28,
          completed: false,
          reward: "Archaeological Achievement",
        },
        {
          id: "mineral-collector",
          name: "Mineral Collector",
          description: "Donate all minerals to the museum",
          requirement: "Donate all 53 minerals",
          progress: 0,
          maxProgress: 53,
          completed: false,
          reward: "Geological Achievement",
        },
        {
          id: "dwarf-scrolls",
          name: "Dwarf Scroll Collection",
          description: "Find all four Dwarf Scrolls",
          requirement: "Collect Dwarf Scrolls I-IV",
          progress: 0,
          maxProgress: 4,
          completed: false,
          reward: "Dwarvish Translation Guide",
        },
        {
          id: "strange-dolls",
          name: "Strange Doll Collection",
          description: "Find both Strange Dolls",
          requirement: "Collect both Strange Dolls",
          progress: 0,
          maxProgress: 2,
          completed: false,
          reward: "Mystery Achievement",
        },
        {
          id: "prismatic-finder",
          name: "Prismatic Finder",
          description: "Find a Prismatic Shard",
          requirement: "Obtain 1 Prismatic Shard",
          progress: 0,
          maxProgress: 1,
          completed: false,
          reward: "Galaxy Sword Access",
        },
      ])
    }

    // Load saved data from localStorage
    const savedCollected = localStorage.getItem("stardew-collected-items")
    const savedLayout = localStorage.getItem("stardew-museum-layout")

    if (savedCollected) {
      setCollectedItems(new Set(JSON.parse(savedCollected)))
    }

    if (savedLayout) {
      setMuseumLayout(JSON.parse(savedLayout))
    } else {
      initializeLayout()
    }

    initializeAchievements()
  }, [])

  // Update achievements when collected items change
  useEffect(() => {
    const updateAchievements = () => {
      const totalCollected = collectedItems.size
      const artifactsCollected = artifacts.filter((item) => collectedItems.has(item.id)).length
      const mineralsCollected = minerals.filter((item) => collectedItems.has(item.id)).length
      const dwarvesScrollsCollected = ["dwarf-scroll-1", "dwarf-scroll-2", "dwarf-scroll-3", "dwarf-scroll-4"].filter(
        (id) => collectedItems.has(id),
      ).length
      const strangeDoilsCollected = ["strange-doll-green", "strange-doll-yellow"].filter((id) =>
        collectedItems.has(id),
      ).length
      const hasPrismaticShard = collectedItems.has("prismatic-shard")

      setAchievements((prev) =>
        prev.map((achievement) => {
          let newProgress = achievement.progress
          let completed = achievement.completed

          switch (achievement.id) {
            case "first-donation":
              newProgress = Math.min(totalCollected, 1)
              completed = totalCollected >= 1
              break
            case "getting-started":
              newProgress = Math.min(totalCollected, 5)
              completed = totalCollected >= 5
              break
            case "treasure-hunter":
              newProgress = Math.min(totalCollected, 40)
              completed = totalCollected >= 40
              break
            case "museum-patron":
              newProgress = Math.min(totalCollected, 60)
              completed = totalCollected >= 60
              break
            case "completionist":
              newProgress = totalCollected
              completed = totalCollected >= 95
              break
            case "artifact-collector":
              newProgress = artifactsCollected
              completed = artifactsCollected >= 28
              break
            case "mineral-collector":
              newProgress = mineralsCollected
              completed = mineralsCollected >= 53
              break
            case "dwarf-scrolls":
              newProgress = dwarvesScrollsCollected
              completed = dwarvesScrollsCollected >= 4
              break
            case "strange-dolls":
              newProgress = strangeDoilsCollected
              completed = strangeDoilsCollected >= 2
              break
            case "prismatic-finder":
              newProgress = hasPrismaticShard ? 1 : 0
              completed = hasPrismaticShard
              break
          }

          return { ...achievement, progress: newProgress, completed }
        }),
      )
    }

    updateAchievements()
  }, [collectedItems])

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem("stardew-collected-items", JSON.stringify([...collectedItems]))
  }, [collectedItems])

  useEffect(() => {
    localStorage.setItem("stardew-museum-layout", JSON.stringify(museumLayout))
  }, [museumLayout])

  const artifacts: CollectionItem[] = [
    {
      id: "dwarf-scroll-1",
      name: "Dwarf Scroll I",
      location: "Mines (floors 1-40)",
      rarity: "Common",
      description: "A yellowed scroll of parchment filled with dwarven script.",
      type: "artifact",
      image: "/images/artifacts/dwarf_scroll_1.png",
    },
    {
      id: "dwarf-scroll-2",
      name: "Dwarf Scroll II",
      location: "Mines (floors 1-40)",
      rarity: "Common",
      description: "A yellowed scroll of parchment filled with dwarven script.",
      type: "artifact",
      image: "/images/artifacts/dwarf_scroll_2.png",
    },
    {
      id: "dwarf-scroll-3",
      name: "Dwarf Scroll III",
      location: "Mines (floors 41-80)",
      rarity: "Uncommon",
      description: "A yellowed scroll of parchment filled with dwarven script.",
      type: "artifact",
      image: "/images/artifacts/dwarf_scroll_3.png",
    },
    {
      id: "dwarf-scroll-4",
      name: "Dwarf Scroll IV",
      location: "Mines (floors 81-120)",
      rarity: "Rare",
      description: "A yellowed scroll of parchment filled with dwarven script.",
      type: "artifact",
      image: "/images/artifacts/dwarf_scroll_4.png",
    },
    {
      id: "ancient-seed",
      name: "Ancient Seed",
      location: "Artifact spots, Bugs, Cave Carrot",
      rarity: "Rare",
      description: "It's a dry old seed from some ancient plant.",
      type: "artifact",
      image: "/images/artifacts/ancient_seed.png",
    },
    {
      id: "ancient-doll",
      name: "Ancient Doll",
      location: "Mountain artifact spots",
      rarity: "Rare",
      description: "An ancient doll covered in grime.",
      type: "artifact",
      image: "/images/artifacts/ancient_doll.png",
    },
    {
      id: "elvish-jewelry",
      name: "Elvish Jewelry",
      location: "Forest artifact spots",
      rarity: "Rare",
      description:
        "Dirty but still beautiful. On the side is a flowing script thought to be the ancient language of the elves.",
      type: "artifact",
      image: "/images/artifacts/elvish_jewelry.png",
    },
    {
      id: "chewing-stick",
      name: "Chewing Stick",
      location: "Mountain/Forest artifact spots",
      rarity: "Common",
      description: "Ancient people chewed on these to keep their teeth clean.",
      type: "artifact",
      image: "/images/artifacts/chewing_stick.png",
    },
    {
      id: "ornamental-fan",
      name: "Ornamental Fan",
      location: "Beach/Town artifact spots",
      rarity: "Uncommon",
      description: "This exquisite fan most likely belonged to a noblewoman.",
      type: "artifact",
      image: "/images/artifacts/ornamental_fan.png",
    },
    {
      id: "dinosaur-egg",
      name: "Dinosaur Egg",
      location: "Artifact spots, Pepper Rex",
      rarity: "Very Rare",
      description: "A giant dino egg... The entire shell is still intact!",
      type: "artifact",
      image: "/images/artifacts/dinosaur_egg.png",
    },
    {
      id: "rare-disc",
      name: "Rare Disc",
      location: "Artifact spots",
      rarity: "Very Rare",
      description: "A heavy black disc studded with peculiar red stones.",
      type: "artifact",
      image: "/images/artifacts/rare_disc.png",
    },
    {
      id: "ancient-sword",
      name: "Ancient Sword",
      location: "Forest/Mountain artifact spots",
      rarity: "Rare",
      description: "It's the remains of an ancient sword. Most of the blade has turned to rust.",
      type: "artifact",
      image: "/images/artifacts/ancient_sword.png",
    },
    {
      id: "rusty-spoon",
      name: "Rusty Spoon",
      location: "Town artifact spots",
      rarity: "Common",
      description: "A plain old spoon, probably ten years old. Not very interesting.",
      type: "artifact",
      image: "/images/artifacts/rusty_spoon.png",
    },
    {
      id: "rusty-spur",
      name: "Rusty Spur",
      location: "Farm artifact spots",
      rarity: "Common",
      description: "An old spur that was once attached to a cowboy boot.",
      type: "artifact",
      image: "/images/artifacts/rusty_spur.png",
    },
    {
      id: "rusty-cog",
      name: "Rusty Cog",
      location: "Mountain artifact spots",
      rarity: "Common",
      description: "A well preserved cog that must have been part of some ancient machine.",
      type: "artifact",
      image: "/images/artifacts/rusty_cog.png",
    },
    {
      id: "chicken-statue",
      name: "Chicken Statue",
      location: "Farm artifact spots",
      rarity: "Uncommon",
      description: "It's a statue of a chicken on a bronze base.",
      type: "artifact",
      image: "/images/artifacts/chicken_statue.png",
    },
    {
      id: "ancient-drum",
      name: "Ancient Drum",
      location: "Bus Stop/Town artifact spots",
      rarity: "Uncommon",
      description: "It's a drum made from wood and animal skin.",
      type: "artifact",
      image: "/images/artifacts/ancient_drum.png",
    },
    {
      id: "golden-mask",
      name: "Golden Mask",
      location: "Desert artifact spots",
      rarity: "Very Rare",
      description: "A creepy golden mask probably used in ancient rituals.",
      type: "artifact",
      image: "/images/artifacts/golden_mask.png",
    },
    {
      id: "golden-relic",
      name: "Golden Relic",
      location: "Desert artifact spots",
      rarity: "Very Rare",
      description: "It's a golden slab with heiroglyphs and pictures emblazoned onto the front.",
      type: "artifact",
      image: "/images/artifacts/golden_relic.png",
    },
    {
      id: "strange-doll-green",
      name: "Strange Doll (green)",
      location: "Secret Woods artifact spots",
      rarity: "Very Rare",
      description: "???",
      type: "artifact",
      image: "/images/artifacts/strange_doll_green.png",
    },
    {
      id: "strange-doll-yellow",
      name: "Strange Doll (yellow)",
      location: "Farm/Town artifact spots",
      rarity: "Very Rare",
      description: "???",
      type: "artifact",
      image: "/images/artifacts/strange_doll_yellow.png",
    },
    {
      id: "prehistoric-tool",
      name: "Prehistoric Tool",
      location: "Mountain/Forest/Bus Stop",
      rarity: "Uncommon",
      description: "Some kind of gnarly old digging tool.",
      type: "artifact",
      image: "/images/artifacts/prehistoric_tool.png",
    },
    {
      id: "dried-starfish",
      name: "Dried Starfish",
      location: "Beach artifact spots",
      rarity: "Common",
      description: "A starfish from the primordial ocean.",
      type: "artifact",
      image: "/images/artifacts/dried_starfish.png",
    },
    {
      id: "anchor",
      name: "Anchor",
      location: "Beach artifact spots",
      rarity: "Uncommon",
      description: "It may have belonged to ancient pirates.",
      type: "artifact",
      image: "/images/artifacts/anchor.png",
    },
    {
      id: "glass-shards",
      name: "Glass Shards",
      location: "Beach artifact spots",
      rarity: "Common",
      description: "A mixture of glass shards smoothed by centuries of ocean surf.",
      type: "artifact",
      image: "/images/artifacts/glass_shards.png",
    },
    {
      id: "bone-flute",
      name: "Bone Flute",
      location: "Mountain/Forest/Town",
      rarity: "Uncommon",
      description: "It's a prehistoric wind instrument carved from an animal bone.",
      type: "artifact",
      image: "/images/artifacts/bone_flute.png",
    },
    {
      id: "prehistoric-handaxe",
      name: "Prehistoric Handaxe",
      location: "Mountain/Forest/Bus Stop",
      rarity: "Uncommon",
      description: "One of the earliest tools employed by humans.",
      type: "artifact",
      image: "/images/artifacts/prehistoric_handaxe.png",
    },
    {
      id: "dwarvish-safety-manual",
      name: "Dwarvish Safety Manual",
      location: "Mines (geodes)",
      rarity: "Rare",
      description: "A book written in dwarven script.",
      type: "artifact",
      image: "/images/artifacts/dwarvish_safety_manual.png",
    },
  ]

  const minerals: CollectionItem[] = [
    {
      id: "quartz",
      name: "Quartz",
      location: "Mines (all floors), Geodes",
      rarity: "Very Common",
      description: "A clear crystal commonly found in caves and mines.",
      type: "mineral",
      image: "/images/minerals/quartz.png",
    },
    {
      id: "earth-crystal",
      name: "Earth Crystal",
      location: "Mines (floors 1-40), Geodes",
      rarity: "Common",
      description: "A resinous substance found near the surface.",
      type: "mineral",
      image: "/images/minerals/earth_crystal.png",
    },
    {
      id: "frozen-tear",
      name: "Frozen Tear",
      location: "Mines (floors 41-80), Frozen Geodes",
      rarity: "Common",
      description: "A crystal fabled to be the frozen tears of a yeti.",
      type: "mineral",
      image: "/images/minerals/frozen_tear.png",
    },
    {
      id: "fire-quartz",
      name: "Fire Quartz",
      location: "Mines (floors 81-120), Magma Geodes",
      rarity: "Common",
      description: "A glowing red crystal commonly found near hot lava.",
      type: "mineral",
      image: "/images/minerals/fire_quartz.png",
    },
    {
      id: "emerald",
      name: "Emerald",
      location: "Mines, Geodes",
      rarity: "Uncommon",
      description: "A precious stone with a brilliant green color.",
      type: "mineral",
      image: "/images/minerals/emerald.png",
    },
    {
      id: "aquamarine",
      name: "Aquamarine",
      location: "Mines (floors 41-80), Frozen Geodes",
      rarity: "Uncommon",
      description: "A shimmery blue-green gem.",
      type: "mineral",
      image: "/images/minerals/aquamarine.png",
    },
    {
      id: "ruby",
      name: "Ruby",
      location: "Mines (floors 81-120), Magma Geodes",
      rarity: "Uncommon",
      description: "A precious stone that is sought after for its rich color and beautiful luster.",
      type: "mineral",
      image: "/images/minerals/ruby.png",
    },
    {
      id: "amethyst",
      name: "Amethyst",
      location: "Mines, Geodes",
      rarity: "Uncommon",
      description: "A purple variant of quartz.",
      type: "mineral",
      image: "/images/minerals/amethyst.png",
    },
    {
      id: "topaz",
      name: "Topaz",
      location: "Mines, Geodes",
      rarity: "Uncommon",
      description: "Fairly common but still prized for its beauty.",
      type: "mineral",
      image: "/images/minerals/topaz.png",
    },
    {
      id: "jade",
      name: "Jade",
      location: "Mines, Geodes",
      rarity: "Uncommon",
      description: "A pale green ornamental stone.",
      type: "mineral",
      image: "/images/minerals/jade.png",
    },
    {
      id: "diamond",
      name: "Diamond",
      location: "Mines (floors 50+), Geodes",
      rarity: "Rare",
      description: "A rare and valuable gem.",
      type: "mineral",
      image: "/images/minerals/diamond.png",
    },
    {
      id: "prismatic-shard",
      name: "Prismatic Shard",
      location: "Mines (floors 115+), Rainbow Trout Fish Pond",
      rarity: "Very Rare",
      description: "A very rare and powerful substance with unknown origins.",
      type: "mineral",
      image: "/images/minerals/prismatic_shard.png",
    },
    {
      id: "alamite",
      name: "Alamite",
      location: "Geodes",
      rarity: "Uncommon",
      description: "Its distinctive fluorescence makes it a favorite among rock collectors.",
      type: "mineral",
      image: "/images/minerals/alamite.png",
    },
    {
      id: "bixite",
      name: "Bixite",
      location: "Magma Geodes, Omni Geodes",
      rarity: "Uncommon",
      description: "A dark metallic Mineral sought after for its cubic structure.",
      type: "mineral",
      image: "/images/minerals/bixite.png",
    },
    {
      id: "baryte",
      name: "Baryte",
      location: "Magma Geodes",
      rarity: "Uncommon",
      description: "The best specimens resemble a desert rose.",
      type: "mineral",
      image: "/images/minerals/baryte.png",
    },
    {
      id: "aerinite",
      name: "Aerinite",
      location: "Frozen Geodes",
      rarity: "Uncommon",
      description: "These crystals are curiously light.",
      type: "mineral",
      image: "/images/minerals/aerinite.png",
    },
    {
      id: "calcite",
      name: "Calcite",
      location: "Geodes",
      rarity: "Common",
      description: "This yellow crystal is speckled with shimmering nodules.",
      type: "mineral",
      image: "/images/minerals/calcite.png",
    },
    {
      id: "dolomite",
      name: "Dolomite",
      location: "Magma Geodes",
      rarity: "Uncommon",
      description: "It can occur in coral reefs, often near an underwater volcano.",
      type: "mineral",
      image: "/images/minerals/dolomite.png",
    },
    {
      id: "esperite",
      name: "Esperite",
      location: "Frozen Geodes",
      rarity: "Uncommon",
      description: "The crystals glow bright green when stimulated.",
      type: "mineral",
      image: "/images/minerals/esperite.png",
    },
    {
      id: "fluorapatite",
      name: "Fluorapatite",
      location: "Frozen Geodes",
      rarity: "Uncommon",
      description: "Small amounts are found in human teeth.",
      type: "mineral",
      image: "/images/minerals/fluorapatite.png",
    },
    {
      id: "geminite",
      name: "Geminite",
      location: "Frozen Geodes",
      rarity: "Uncommon",
      description: "Occurs in brilliant clusters.",
      type: "mineral",
      image: "/images/minerals/geminite.png",
    },
    {
      id: "helvite",
      name: "Helvite",
      location: "Magma Geodes",
      rarity: "Uncommon",
      description: "It forms in a variety of interesting colors.",
      type: "mineral",
      image: "/images/minerals/helvite.png",
    },
    {
      id: "jamborite",
      name: "Jamborite",
      location: "Geodes",
      rarity: "Uncommon",
      description: "The crystals are so tightly packed it almost looks fuzzy.",
      type: "mineral",
      image: "/images/minerals/jamborite.png",
    },
    {
      id: "jagoite",
      name: "Jagoite",
      location: "Geodes",
      rarity: "Uncommon",
      description: "A high volume of tiny crystals makes it very glittery.",
      type: "mineral",
      image: "/images/minerals/jagoite.png",
    },
    {
      id: "kyanite",
      name: "Kyanite",
      location: "Frozen Geodes",
      rarity: "Uncommon",
      description: "The geometric faces are as smooth as glass.",
      type: "mineral",
      image: "/images/minerals/kyanite.png",
    },
    {
      id: "lunarite",
      name: "Lunarite",
      location: "Frozen Geodes",
      rarity: "Uncommon",
      description: "The cratered white orbs form a tight cluster.",
      type: "mineral",
      image: "/images/minerals/lunarite.png",
    },
    {
      id: "malachite",
      name: "Malachite",
      location: "Geodes",
      rarity: "Uncommon",
      description: "A popular ornamental stone, used in jewelry and other decorative objects.",
      type: "mineral",
      image: "/images/minerals/malachite.png",
    },
    {
      id: "neptunite",
      name: "Neptunite",
      location: "Magma Geodes",
      rarity: "Uncommon",
      description: "A jet-black crystal that is unusually reflective.",
      type: "mineral",
      image: "/images/minerals/neptunite.png",
    },
    {
      id: "lemon-stone",
      name: "Lemon Stone",
      location: "Magma Geodes",
      rarity: "Uncommon",
      description: "Some claim the powdered crystal is a dwarvish delicacy.",
      type: "mineral",
      image: "/images/minerals/lemon_stone.png",
    },
    {
      id: "nekoite",
      name: "Nekoite",
      location: "Geodes",
      rarity: "Uncommon",
      description: "The delicate shards form a tiny pink meadow.",
      type: "mineral",
      image: "/images/minerals/nekoite.png",
    },
    {
      id: "orpiment",
      name: "Orpiment",
      location: "Geodes",
      rarity: "Uncommon",
      description: "Despite its beauty, this mineral is quite toxic.",
      type: "mineral",
      image: "/images/minerals/orpiment.png",
    },
    {
      id: "petrified-slime",
      name: "Petrified Slime",
      location: "Geodes",
      rarity: "Uncommon",
      description: "This little guy may be 100,000 years old.",
      type: "mineral",
      image: "/images/minerals/petrified_slime.png",
    },
    {
      id: "thunder-egg",
      name: "Thunder Egg",
      location: "Geodes",
      rarity: "Uncommon",
      description: "According to legend, angry thunder spirits would throw these stones at one another.",
      type: "mineral",
      image: "/images/minerals/thunder_egg.png",
    },
    {
      id: "pyrite",
      name: "Pyrite",
      location: "Frozen Geodes",
      rarity: "Uncommon",
      description: "Commonly known as 'Fool's Gold'.",
      type: "mineral",
      image: "/images/minerals/pyrite.png",
    },
    {
      id: "ocean-stone",
      name: "Ocean Stone",
      location: "Geodes",
      rarity: "Uncommon",
      description: "An old legend claims these are the mermaid's tears.",
      type: "mineral",
      image: "/images/minerals/ocean_stone.png",
    },
    {
      id: "ghost-crystal",
      name: "Ghost Crystal",
      location: "Frozen Geodes",
      rarity: "Uncommon",
      description: "There is an aura of coldness around this crystal.",
      type: "mineral",
      image: "/images/minerals/ghost_crystal.png",
    },
    {
      id: "tigerseye",
      name: "Tigerseye",
      location: "Magma Geodes",
      rarity: "Uncommon",
      description: "A stripe of shimmering gold gives this gem a warm luster.",
      type: "mineral",
      image: "/images/minerals/tigerseye.png",
    },
    {
      id: "jasper",
      name: "Jasper",
      location: "Magma Geodes",
      rarity: "Uncommon",
      description: "When polished, this stone becomes attractively luminous.",
      type: "mineral",
      image: "/images/minerals/jasper.png",
    },
    {
      id: "opal",
      name: "Opal",
      location: "Frozen Geodes",
      rarity: "Uncommon",
      description: "Its internal structure causes it to reflect a rainbow of light.",
      type: "mineral",
      image: "/images/minerals/opal.png",
    },
    {
      id: "fire-opal",
      name: "Fire Opal",
      location: "Magma Geodes",
      rarity: "Uncommon",
      description: "A rare variety of opal, named for its red spots.",
      type: "mineral",
      image: "/images/minerals/fire_opal.png",
    },
    {
      id: "celestine",
      name: "Celestine",
      location: "Geodes",
      rarity: "Uncommon",
      description: "Some early life forms had bones made from this.",
      type: "mineral",
      image: "/images/minerals/celestine.png",
    },
    {
      id: "marble",
      name: "Marble",
      location: "Frozen Geodes",
      rarity: "Uncommon",
      description: "A very popular material for sculptures and construction.",
      type: "mineral",
      image: "/images/minerals/marble.png",
    },
    {
      id: "sandstone",
      name: "Sandstone",
      location: "Geodes",
      rarity: "Common",
      description: "A common type of stone with red and brown striations.",
      type: "mineral",
      image: "/images/minerals/sandstone.png",
    },
    {
      id: "granite",
      name: "Granite",
      location: "Geodes",
      rarity: "Common",
      description: "A speckled Mineral that is commonly used in construction.",
      type: "mineral",
      image: "/images/minerals/granite.png",
    },
    {
      id: "basalt",
      name: "Basalt",
      location: "Magma Geodes",
      rarity: "Common",
      description: "Forms near searing hot magma.",
      type: "mineral",
      image: "/images/minerals/basalt.png",
    },
    {
      id: "limestone",
      name: "Limestone",
      location: "Geodes",
      rarity: "Common",
      description: "A very common type of stone. It's not worth very much.",
      type: "mineral",
      image: "/images/minerals/limestone.png",
    },
    {
      id: "soapstone",
      name: "Soapstone",
      location: "Frozen Geodes",
      rarity: "Common",
      description: "Because of its relatively soft consistency, this stone is very popular for carving.",
      type: "mineral",
      image: "/images/minerals/soapstone.png",
    },
    {
      id: "hematite",
      name: "Hematite",
      location: "Frozen Geodes",
      rarity: "Common",
      description: "An iron-based mineral with interesting magnetic properties.",
      type: "mineral",
      image: "/images/minerals/hematite.png",
    },
    {
      id: "mudstone",
      name: "Mudstone",
      location: "Geodes",
      rarity: "Common",
      description: "A fine-grained rock made from ancient clay or mud.",
      type: "mineral",
      image: "/images/minerals/mudstone.png",
    },
    {
      id: "obsidian",
      name: "Obsidian",
      location: "Magma Geodes",
      rarity: "Common",
      description: "A volcanic glass that forms when lava cools rapidly.",
      type: "mineral",
      image: "/images/minerals/obsidian.png",
    },
    {
      id: "slate",
      name: "Slate",
      location: "Geodes",
      rarity: "Common",
      description: "It's extremely resistant to water, making it a good roofing material.",
      type: "mineral",
      image: "/images/minerals/slate.png",
    },
    {
      id: "fairy-stone",
      name: "Fairy Stone",
      location: "Frozen Geodes",
      rarity: "Uncommon",
      description: "An old miner's song suggests these are made from the bones of ancient fairies.",
      type: "mineral",
      image: "/images/minerals/fairy_stone.png",
    },
    {
      id: "star-shards",
      name: "Star Shards",
      location: "Magma Geodes",
      rarity: "Rare",
      description: "No one knows how these form. It's impossible to tell their age using modern techniques.",
      type: "mineral",
      image: "/images/minerals/star_shards.png",
    },
  ]

  const allItems = [...artifacts, ...minerals]
  const totalItems = allItems.length
  const totalCollected = collectedItems.size
  const completionPercentage = Math.round((totalCollected / totalItems) * 100)
  const artifactsCollected = artifacts.filter((item) => collectedItems.has(item.id)).length
  const mineralsCollected = minerals.filter((item) => collectedItems.has(item.id)).length

  const toggleItemCollection = (itemId: string) => {
    setCollectedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const resetCollection = () => {
    setCollectedItems(new Set())
    localStorage.removeItem("stardew-collected-items")
  }

  const exportData = () => {
    const data = {
      collectedItems: [...collectedItems],
      museumLayout,
      achievements,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "stardew-museum-data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          if (data.collectedItems) {
            setCollectedItems(new Set(data.collectedItems))
          }
          if (data.museumLayout) {
            setMuseumLayout(data.museumLayout)
          }
          if (data.achievements) {
            setAchievements(data.achievements)
          }
        } catch (error) {
          console.error("Error importing data:", error)
        }
      }
      reader.readAsText(file)
    }
  }

  const placeItemInMuseum = (slotId: string) => {
    if (!selectedItem) return

    setMuseumLayout((prev) =>
      prev.map((slot) => {
        if (slot.id === slotId && slot.type === "empty") {
          const item = allItems.find((i) => i.id === selectedItem)
          return {
            ...slot,
            itemId: selectedItem,
            itemName: item?.name,
            type: item?.type || "empty",
          }
        }
        return slot
      }),
    )
    setSelectedItem("")
  }

  const removeItemFromMuseum = (slotId: string) => {
    setMuseumLayout((prev) =>
      prev.map((slot) => {
        if (slot.id === slotId) {
          return {
            ...slot,
            itemId: undefined,
            itemName: undefined,
            type: "empty",
          }
        }
        return slot
      }),
    )
  }

  const clearMuseumLayout = () => {
    setMuseumLayout((prev) =>
      prev.map((slot) => ({
        ...slot,
        itemId: undefined,
        itemName: undefined,
        type: "empty",
      })),
    )
  }

  const museumRewards = [
    { donations: 5, reward: "9 Cauliflower Seeds", description: "Starter farming boost" },
    { donations: 10, reward: "Bridge to Quarry", description: "Access to quarry area" },
    { donations: 15, reward: "Glittering Boulder Removed", description: "Access to mines shortcut" },
    { donations: 20, reward: "Greenhouse", description: "Year-round crop growing" },
    { donations: 25, reward: "Bridge to Desert", description: "Access to Calico Desert" },
    { donations: 35, reward: "Glittering Boulder Removed", description: "Access to secret woods" },
    { donations: 40, reward: "Rusty Key", description: "Access to sewers" },
    { donations: 50, reward: "Crystalarium", description: "Duplicate minerals" },
    { donations: 60, reward: "Geode Crusher", description: "Process geodes instantly" },
    { donations: 70, reward: "Bridge Repair", description: "Access to tide pools" },
    { donations: 80, reward: "Bone Mill", description: "Create fertilizer from bones" },
    { donations: 90, reward: "Ostrich Incubator", description: "Hatch ostrich eggs" },
    { donations: 95, reward: "Stardrop", description: "Permanent energy increase" },
  ]

  const collectionTips = [
    {
      title: "Artifact Spot Hunting",
      tips: [
        "Check artifact spots daily - they respawn",
        "Rainy days increase artifact spot spawns",
        "Different areas have different artifact pools",
        "Use the Tracker profession to see artifact spots on minimap",
      ],
    },
    {
      title: "Geode Strategy",
      tips: [
        "Save geodes until you get the Geologist profession",
        "Clint processes geodes for 25g each",
        "Different geode types contain different minerals",
        "Omni Geodes can contain any mineral",
      ],
    },
    {
      title: "Mining Optimization",
      tips: [
        "Skull Cavern has better mineral variety",
        "Use bombs to break multiple rocks quickly",
        "Lucky days increase rare mineral chances",
        "Magnet Ring attracts items automatically",
      ],
    },
    {
      title: "Completion Strategy",
      tips: [
        "Prioritize artifacts first - they're location-specific",
        "Keep one of every mineral before selling",
        "Trade with other players for missing items",
        "Some items are seasonal - plan accordingly",
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-pixel text-2xl md:text-3xl text-stardew-green mb-4">Museum Collection Guide</h2>
        <p className="text-stardew-brown mb-6">
          Complete Gunther's museum collection to unlock valuable rewards and community improvements!
        </p>

        <Card className="pixel-border bg-amber-50 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Collection Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Total Progress</span>
                  <span>
                    {totalCollected}/{totalItems} ({completionPercentage}%)
                  </span>
                </div>
                <Progress value={completionPercentage} className="h-3" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-stardew-green">
                    {artifactsCollected}/{artifacts.length}
                  </p>
                  <p className="text-sm text-stardew-brown">Artifacts</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-stardew-blue">
                    {mineralsCollected}/{minerals.length}
                  </p>
                  <p className="text-sm text-stardew-brown">Minerals</p>
                </div>
              </div>
              <div className="flex gap-2 justify-center flex-wrap">
                <Button onClick={resetCollection} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={exportData} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <label className="cursor-pointer">
                  <Button variant="outline" size="sm" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </span>
                  </Button>
                  <input type="file" accept=".json" onChange={importData} className="hidden" />
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tracker" className="w-full">
        <TabsList className="grid w-full grid-cols-6 pixel-border">
          <TabsTrigger value="tracker" className="pixel-button-small">
            <CheckSquare className="w-4 h-4 mr-2" />
            Tracker
          </TabsTrigger>
          <TabsTrigger value="artifacts" className="pixel-button-small">
            <Scroll className="w-4 h-4 mr-2" />
            Artifacts
          </TabsTrigger>
          <TabsTrigger value="minerals" className="pixel-button-small">
            <Gem className="w-4 h-4 mr-2" />
            Minerals
          </TabsTrigger>
          <TabsTrigger value="layout" className="pixel-button-small">
            <Layout className="w-4 h-4 mr-2" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="achievements" className="pixel-button-small">
            <Trophy className="w-4 h-4 mr-2" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="rewards" className="pixel-button-small">
            <Gift className="w-4 h-4 mr-2" />
            Rewards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tracker" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="pixel-border bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scroll className="w-5 h-5 text-amber-600" />
                  Artifacts ({artifactsCollected}/{artifacts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                {artifacts.map((artifact) => (
                  <div key={artifact.id} className="flex items-center space-x-3 p-2 rounded hover:bg-amber-100">
                    <div className="w-8 h-8 flex items-center justify-center bg-amber-200 rounded">
                      <Image
                        src={artifact.image || "/placeholder.svg?height=32&width=32"}
                        alt={artifact.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <Checkbox
                      id={artifact.id}
                      checked={collectedItems.has(artifact.id)}
                      onCheckedChange={() => toggleItemCollection(artifact.id)}
                    />
                    <label htmlFor={artifact.id} className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm ${collectedItems.has(artifact.id) ? "line-through text-gray-500" : ""}`}
                        >
                          {artifact.name}
                        </span>
                        <Badge
                          variant={
                            artifact.rarity === "Very Rare"
                              ? "destructive"
                              : artifact.rarity === "Rare"
                                ? "default"
                                : artifact.rarity === "Uncommon"
                                  ? "secondary"
                                  : "outline"
                          }
                          className="text-xs"
                        >
                          {artifact.rarity}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{artifact.location}</div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="pixel-border bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gem className="w-5 h-5 text-blue-600" />
                  Minerals ({mineralsCollected}/{minerals.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                {minerals.map((mineral) => (
                  <div key={mineral.id} className="flex items-center space-x-3 p-2 rounded hover:bg-blue-100">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-200 rounded">
                      <Image
                        src={mineral.image || "/placeholder.svg?height=32&width=32"}
                        alt={mineral.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <Checkbox
                      id={mineral.id}
                      checked={collectedItems.has(mineral.id)}
                      onCheckedChange={() => toggleItemCollection(mineral.id)}
                    />
                    <label htmlFor={mineral.id} className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm ${collectedItems.has(mineral.id) ? "line-through text-gray-500" : ""}`}
                        >
                          {mineral.name}
                        </span>
                        <Badge
                          variant={
                            mineral.rarity === "Very Rare"
                              ? "destructive"
                              : mineral.rarity === "Rare"
                                ? "default"
                                : mineral.rarity === "Uncommon"
                                  ? "secondary"
                                  : "outline"
                          }
                          className="text-xs"
                        >
                          {mineral.rarity}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{mineral.location}</div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="artifacts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {artifacts.map((artifact) => (
              <Card
                key={artifact.id}
                className={`pixel-border transition-colors ${
                  collectedItems.has(artifact.id) ? "bg-green-50 border-green-300" : "bg-amber-50 hover:bg-amber-100"
                }`}
              >
                <div className="aspect-square relative bg-amber-100 p-4 flex items-center justify-center">
                  <Image
                    src={artifact.image || "/placeholder.svg?height=64&width=64"}
                    alt={artifact.name}
                    width={64}
                    height={64}
                    className="object-contain pixel-image"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={collectedItems.has(artifact.id)}
                        onCheckedChange={() => toggleItemCollection(artifact.id)}
                      />
                      <span className={collectedItems.has(artifact.id) ? "line-through" : ""}>{artifact.name}</span>
                    </div>
                    <Badge
                      variant={
                        artifact.rarity === "Very Rare"
                          ? "destructive"
                          : artifact.rarity === "Rare"
                            ? "default"
                            : artifact.rarity === "Uncommon"
                              ? "secondary"
                              : "outline"
                      }
                      className="text-xs"
                    >
                      {artifact.rarity}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-stardew-brown">
                    <MapPin className="w-4 h-4" />
                    {artifact.location}
                  </div>
                  <p className="text-sm text-gray-600">{artifact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="minerals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {minerals.map((mineral) => (
              <Card
                key={mineral.id}
                className={`pixel-border transition-colors ${
                  collectedItems.has(mineral.id) ? "bg-green-50 border-green-300" : "bg-blue-50 hover:bg-blue-100"
                }`}
              >
                <div className="aspect-square relative bg-blue-100 p-4 flex items-center justify-center">
                  <Image
                    src={mineral.image || "/placeholder.svg?height=64&width=64"}
                    alt={mineral.name}
                    width={64}
                    height={64}
                    className="object-contain pixel-image"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={collectedItems.has(mineral.id)}
                        onCheckedChange={() => toggleItemCollection(mineral.id)}
                      />
                      <span className={collectedItems.has(mineral.id) ? "line-through" : ""}>{mineral.name}</span>
                    </div>
                    <Badge
                      variant={
                        mineral.rarity === "Very Rare"
                          ? "destructive"
                          : mineral.rarity === "Rare"
                            ? "default"
                            : mineral.rarity === "Uncommon"
                              ? "secondary"
                              : "outline"
                      }
                      className="text-xs"
                    >
                      {mineral.rarity}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-stardew-brown">
                    <MapPin className="w-4 h-4" />
                    {mineral.location}
                  </div>
                  <p className="text-sm text-gray-600">{mineral.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <Card className="pixel-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-purple-600" />
                Museum Layout Planner
              </CardTitle>
              <CardDescription>
                Plan your museum display layout. Select an item and click on an empty slot to place it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-center flex-wrap">
                <Select value={selectedItem} onValueChange={setSelectedItem}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select item to place" />
                  </SelectTrigger>
                  <SelectContent>
                    {allItems
                      .filter((item) => collectedItems.has(item.id))
                      .map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name} ({item.type})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button onClick={clearMuseumLayout} variant="outline" size="sm">
                  Clear Layout
                </Button>
              </div>

              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="grid grid-cols-10 gap-1 max-w-4xl mx-auto">
                  {museumLayout.map((slot) => (
                    <div
                      key={slot.id}
                      className={`
                        aspect-square border-2 rounded cursor-pointer text-xs flex items-center justify-center
                        transition-colors relative group
                        ${
                          slot.type === "empty"
                            ? "border-gray-300 bg-white hover:bg-gray-100"
                            : slot.type === "artifact"
                              ? "border-amber-400 bg-amber-100"
                              : "border-blue-400 bg-blue-100"
                        }
                        ${selectedItem && slot.type === "empty" ? "hover:border-green-400" : ""}
                      `}
                      onClick={() => {
                        if (slot.type === "empty" && selectedItem) {
                          placeItemInMuseum(slot.id)
                        } else if (slot.type !== "empty") {
                          removeItemFromMuseum(slot.id)
                        }
                      }}
                      title={slot.itemName || "Empty slot"}
                    >
                      {slot.type === "artifact" && <Scroll className="w-3 h-3" />}
                      {slot.type === "mineral" && <Gem className="w-3 h-3" />}
                      {slot.type === "empty" && selectedItem && <div className="text-green-600">+</div>}

                      {slot.itemName && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {slot.itemName}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p>
                  <strong>Instructions:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Select an item from the dropdown (only collected items are available)</li>
                  <li>Click on an empty slot (white) to place the item</li>
                  <li>Click on a placed item to remove it</li>
                  <li>Amber slots contain artifacts, blue slots contain minerals</li>
                  <li>Hover over placed items to see their names</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`pixel-border transition-colors ${
                  achievement.completed ? "bg-green-50 border-green-300" : "bg-gray-50"
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className={`w-5 h-5 ${achievement.completed ? "text-yellow-500" : "text-gray-400"}`} />
                    {achievement.name}
                    {achievement.completed && (
                      <Badge variant="default" className="bg-green-600">
                        Completed
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                  </div>
                  <div className="text-sm">
                    <p>
                      <strong>Requirement:</strong> {achievement.requirement}
                    </p>
                    {achievement.reward && (
                      <p>
                        <strong>Reward:</strong> {achievement.reward}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="pixel-border bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600" />
                Achievement Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-purple-600">{achievements.filter((a) => a.completed).length}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {achievements.filter((a) => a.progress > 0 && !a.completed).length}
                  </p>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-600">
                    {achievements.filter((a) => a.progress === 0).length}
                  </p>
                  <p className="text-sm text-gray-600">Not Started</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round((achievements.filter((a) => a.completed).length / achievements.length) * 100)}%
                  </p>
                  <p className="text-sm text-gray-600">Complete</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {museumRewards.map((reward, index) => (
              <Card
                key={index}
                className={`pixel-border ${
                  totalCollected >= reward.donations ? "bg-green-50 border-green-300" : "bg-gray-50"
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift
                      className={`w-5 h-5 ${totalCollected >= reward.donations ? "text-green-600" : "text-gray-400"}`}
                    />
                    {reward.donations} Donations
                    {totalCollected >= reward.donations && (
                      <Badge variant="default" className="bg-green-600">
                        Unlocked
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="font-semibold text-stardew-green">{reward.reward}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{reward.description}</p>
                  {totalCollected < reward.donations && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-500 mb-1">
                        {reward.donations - totalCollected} more donations needed
                      </div>
                      <Progress value={(totalCollected / reward.donations) * 100} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
