"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Gift, Star, Zap } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export function StoryContent() {
  return (
    <div className="space-y-8 story-section">
      <Card className="pixel-border stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-xl text-stardew-green">Stardew Valley Story & Quests</CardTitle>
          <CardDescription className="font-pixel text-xs">
            Complete guide to the main storyline, character arcs, and all available quests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="main-story">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="main-story" className="font-pixel text-xs">
                Main Story
              </TabsTrigger>
              <TabsTrigger value="character-arcs" className="font-pixel text-xs">
                Character Arcs
              </TabsTrigger>
              <TabsTrigger value="side-quests" className="font-pixel text-xs">
                Side Quests
              </TabsTrigger>
              <TabsTrigger value="special-events" className="font-pixel text-xs">
                Special Events
              </TabsTrigger>
              <TabsTrigger value="quest-tracker" className="font-pixel text-xs">
                Quest Tracker
              </TabsTrigger>
            </TabsList>

            <TabsContent value="main-story">
              <MainStoryContent />
            </TabsContent>

            <TabsContent value="character-arcs">
              <CharacterArcsContent />
            </TabsContent>

            <TabsContent value="side-quests">
              <SideQuestsContent />
            </TabsContent>

            <TabsContent value="special-events">
              <SpecialEventsContent />
            </TabsContent>

            <TabsContent value="quest-tracker">
              <QuestTrackerContent />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function QuestTrackerContent() {
  const [completedQuests, setCompletedQuests] = useState<Record<string, boolean>>({})
  const [completedStoryChapters, setCompletedStoryChapters] = useState<Record<string, boolean>>({})
  const [completedCharacterArcs, setCompletedCharacterArcs] = useState<Record<string, Record<number, boolean>>>({})

  // Load saved progress from localStorage
  useEffect(() => {
    const savedQuests = localStorage.getItem("stardew-completed-quests")
    const savedChapters = localStorage.getItem("stardew-completed-chapters")
    const savedArcs = localStorage.getItem("stardew-completed-arcs")

    if (savedQuests) setCompletedQuests(JSON.parse(savedQuests))
    if (savedChapters) setCompletedStoryChapters(JSON.parse(savedChapters))
    if (savedArcs) setCompletedCharacterArcs(JSON.parse(savedArcs))
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("stardew-completed-quests", JSON.stringify(completedQuests))
  }, [completedQuests])

  useEffect(() => {
    localStorage.setItem("stardew-completed-chapters", JSON.stringify(completedStoryChapters))
  }, [completedStoryChapters])

  useEffect(() => {
    localStorage.setItem("stardew-completed-arcs", JSON.stringify(completedCharacterArcs))
  }, [completedCharacterArcs])

  const toggleQuest = (questId: string) => {
    setCompletedQuests((prev) => ({
      ...prev,
      [questId]: !prev[questId],
    }))
  }

  const toggleChapter = (chapterId: string) => {
    setCompletedStoryChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }))
  }

  const toggleCharacterEvent = (character: string, eventIndex: number) => {
    setCompletedCharacterArcs((prev) => ({
      ...prev,
      [character]: {
        ...prev[character],
        [eventIndex]: !prev[character]?.[eventIndex],
      },
    }))
  }

  const resetAllProgress = () => {
    if (confirm("Are you sure you want to reset all quest progress? This cannot be undone.")) {
      setCompletedQuests({})
      setCompletedStoryChapters({})
      setCompletedCharacterArcs({})
      localStorage.removeItem("stardew-completed-quests")
      localStorage.removeItem("stardew-completed-chapters")
      localStorage.removeItem("stardew-completed-arcs")
    }
  }

  const exportProgress = () => {
    const data = {
      quests: completedQuests,
      chapters: completedStoryChapters,
      characterArcs: completedCharacterArcs,
      exportDate: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "stardew-quest-progress.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const importProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.quests) setCompletedQuests(data.quests)
        if (data.chapters) setCompletedStoryChapters(data.chapters)
        if (data.characterArcs) setCompletedCharacterArcs(data.characterArcs)
        alert("Progress imported successfully!")
      } catch (error) {
        alert("Error importing progress. Please check the file format.")
      }
    }
    reader.readAsText(file)
  }

  // Quest data
  const allQuests = [
    // Help Wanted Board Quests
    {
      id: "item-delivery",
      title: "Item Delivery Quests",
      category: "Help Wanted",
      description: "Complete item delivery requests",
    },
    {
      id: "slay-monsters",
      title: "Monster Slaying Quests",
      category: "Help Wanted",
      description: "Complete monster elimination requests",
    },
    {
      id: "gather-resources",
      title: "Resource Gathering Quests",
      category: "Help Wanted",
      description: "Complete resource collection requests",
    },
    {
      id: "fish-delivery",
      title: "Fish Delivery Quests",
      category: "Help Wanted",
      description: "Complete fish delivery requests",
    },

    // Special Orders
    {
      id: "qi-crop-challenge",
      title: "Qi's Crop Challenge",
      category: "Special Orders",
      description: "Grow and ship 500 Qi Fruit",
    },
    {
      id: "prismatic-jelly",
      title: "Prismatic Jelly",
      category: "Special Orders",
      description: "Collect Prismatic Jelly from rare slime",
    },
    {
      id: "robin-project",
      title: "Robin's Project",
      category: "Special Orders",
      description: "Gather 80 Hardwood for community project",
    },
    {
      id: "pam-needs",
      title: "Pam's Needs",
      category: "Special Orders",
      description: "Bring Pam 25 Beer and 25 Pale Ale",
    },
    {
      id: "gus-request",
      title: "Gus's Request",
      category: "Special Orders",
      description: "Supply 100 Gold Star vegetables",
    },
    {
      id: "clint-challenge",
      title: "Clint's Challenge",
      category: "Special Orders",
      description: "Bring 10 Iridium Bars and 5 Prismatic Shards",
    },

    // Adventurer's Guild
    {
      id: "guild-initiation",
      title: "Guild Initiation",
      category: "Adventurer's Guild",
      description: "Slay 10 slimes to join the guild",
    },
    { id: "root-platter", title: "Root Platter", category: "Adventurer's Guild", description: "Kill 15 Cave Insects" },
    {
      id: "deeper-mines",
      title: "Deeper in the Mines",
      category: "Adventurer's Guild",
      description: "Reach Mine Level 40",
    },
    { id: "to-bottom", title: "To the Bottom", category: "Adventurer's Guild", description: "Reach Mine Level 120" },
    {
      id: "skull-cavern",
      title: "Skull Cavern Invasion",
      category: "Adventurer's Guild",
      description: "Reach Skull Cavern Level 25",
    },
    {
      id: "monster-eradication",
      title: "Monster Eradication Goals",
      category: "Adventurer's Guild",
      description: "Complete all monster slaying goals",
    },
  ]

  const storyChapters = [
    { id: "prologue", title: "The Inheritance", description: "Your grandfather's letter leads you to Pelican Town" },
    {
      id: "first-spring",
      title: "Learning the Ropes",
      description: "Master the basics of farming, fishing, and mining",
    },
    {
      id: "community-center",
      title: "The Community Center Mystery",
      description: "Discover the magical Junimos and their bundles",
    },
    {
      id: "first-year",
      title: "Establishing Your Farm",
      description: "Build a sustainable farm operation through all four seasons",
    },
    {
      id: "restoration",
      title: "Valley Restoration",
      description: "Restore the Community Center or support JojaMart development",
    },
    { id: "desert-exploration", title: "Desert Adventures", description: "Explore the Calico Desert and Skull Cavern" },
    {
      id: "grandpa-evaluation",
      title: "Grandpa's Evaluation",
      description: "Your grandfather's spirit evaluates your progress",
    },
    {
      id: "ginger-island",
      title: "Ginger Island Adventure",
      description: "Explore the tropical paradise and help Leo",
    },
    {
      id: "qi-challenges",
      title: "Mr. Qi's Challenges",
      description: "Complete the most difficult tasks in Stardew Valley",
    },
    { id: "perfection", title: "Achieving Perfection", description: "Master every aspect of valley life" },
    {
      id: "year-two-expansion",
      title: "Year Two Mastery",
      description: "Expand your operations and master advanced gameplay",
    },
    { id: "marriage-family", title: "Love and Family", description: "Find love and start a family in Stardew Valley" },
    {
      id: "skull-cavern-mastery",
      title: "Skull Cavern Mastery",
      description: "Conquer the dangerous depths of Skull Cavern",
    },
    { id: "economic-mastery", title: "Economic Empire", description: "Build a massive economic empire" },
    { id: "social-butterfly", title: "Community Leader", description: "Become beloved by the entire community" },
  ]

  const characterArcs = [
    {
      character: "Shane",
      title: "Overcoming Addiction",
      events: [
        "Shane's Depression (2 hearts)",
        "Cliffs Confrontation (4 hearts)",
        "Therapy Session (6 hearts)",
        "New Beginnings (8 hearts)",
        "Recovery (10 hearts)",
      ],
    },
    {
      character: "Clint",
      title: "Unrequited Love",
      events: ["Amethyst Request (3 hearts)", "Geode Confession (6 hearts)", "Rejection Reality (9 hearts)"],
    },
    {
      character: "Pam",
      title: "Road to Recovery",
      events: ["Bus Troubles (4 hearts)", "Family Tensions (7 hearts)", "New House (9 hearts)"],
    },
    {
      character: "Linus",
      title: "Acceptance and Understanding",
      events: ["Tent Vandalism (4 hearts)", "Past Revealed (7 hearts)", "True Friendship (10 hearts)"],
    },
    {
      character: "Kent",
      title: "PTSD and Homecoming",
      events: ["Loud Noises (3 hearts)", "War Memories (7 hearts)", "Family Healing (10 hearts)"],
    },
    {
      character: "Leo",
      title: "Integration into Society",
      events: [
        "First Contact (2 hearts)",
        "Language Barrier (4 hearts)",
        "Mainland Visit (6 hearts)",
        "Making Friends (8 hearts)",
        "New Family (10 hearts)",
      ],
    },
    {
      character: "Robin",
      title: "Master Builder's Journey",
      events: [
        "Workshop Tour (2 hearts)",
        "Family Tensions (4 hearts)",
        "Building Dreams (6 hearts)",
        "Community Project (8 hearts)",
        "Master Craftsperson (10 hearts)",
      ],
    },
    {
      character: "Demetrius",
      title: "Scientific Discovery",
      events: [
        "Laboratory Visit (2 hearts)",
        "Stepfather Struggles (4 hearts)",
        "Research Breakthrough (6 hearts)",
        "Family Harmony (8 hearts)",
        "Scientific Recognition (10 hearts)",
      ],
    },
    {
      character: "Caroline",
      title: "Green Thumb Awakening",
      events: [
        "Garden Tour (2 hearts)",
        "Aerobics Class (4 hearts)",
        "Tea Ceremony (6 hearts)",
        "Secret Garden (8 hearts)",
        "Natural Healer (10 hearts)",
      ],
    },
    {
      character: "Pierre",
      title: "Small Business Dreams",
      events: [
        "Store Struggles (2 hearts)",
        "Quality Produce (4 hearts)",
        "Business Expansion (6 hearts)",
        "Community Support (8 hearts)",
        "Thriving Business (10 hearts)",
      ],
    },
    {
      character: "Evelyn",
      title: "Grandmother's Wisdom",
      events: [
        "Cookie Recipe (2 hearts)",
        "Garden Wisdom (4 hearts)",
        "Family Stories (6 hearts)",
        "Community Memory (8 hearts)",
        "Living Legend (10 hearts)",
      ],
    },
    {
      character: "George",
      title: "Grumpy Heart of Gold",
      events: [
        "Wheelchair Accessibility (2 hearts)",
        "Past Glories (4 hearts)",
        "Hidden Kindness (6 hearts)",
        "Acceptance (8 hearts)",
        "Respected Elder (10 hearts)",
      ],
    },
    {
      character: "Jodi",
      title: "Military Wife's Strength",
      events: [
        "Single Parenting (2 hearts)",
        "Worry and Waiting (4 hearts)",
        "Community Support (6 hearts)",
        "Reunion Preparation (8 hearts)",
        "Family Healing (10 hearts)",
      ],
    },
    {
      character: "Marnie",
      title: "Animal Lover's Dedication",
      events: [
        "Animal Care (2 hearts)",
        "Secret Romance (4 hearts)",
        "Business Expansion (6 hearts)",
        "Personal Happiness (8 hearts)",
        "Ranch Legacy (10 hearts)",
      ],
    },
  ]

  // Calculate progress percentages
  const questProgress = (Object.values(completedQuests).filter(Boolean).length / allQuests.length) * 100
  const chapterProgress = (Object.values(completedStoryChapters).filter(Boolean).length / storyChapters.length) * 100

  const totalCharacterEvents = characterArcs.reduce((sum, arc) => sum + arc.events.length, 0)
  const completedCharacterEvents = Object.values(completedCharacterArcs).reduce(
    (sum, character) => sum + Object.values(character).filter(Boolean).length,
    0,
  )
  const characterProgress = (completedCharacterEvents / totalCharacterEvents) * 100

  const overallProgress =
    ((Object.values(completedQuests).filter(Boolean).length +
      Object.values(completedStoryChapters).filter(Boolean).length +
      completedCharacterEvents) /
      (allQuests.length + storyChapters.length + totalCharacterEvents)) *
    100

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-lg">Quest Progress Overview</CardTitle>
          <CardDescription>Track your completion across all quest categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-stardew-green">{Math.round(overallProgress)}%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
              <Progress value={overallProgress} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round(questProgress)}%</div>
              <div className="text-sm text-gray-600">Side Quests</div>
              <Progress value={questProgress} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{Math.round(chapterProgress)}%</div>
              <div className="text-sm text-gray-600">Story Chapters</div>
              <Progress value={chapterProgress} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{Math.round(characterProgress)}%</div>
              <div className="text-sm text-gray-600">Character Arcs</div>
              <Progress value={characterProgress} className="mt-2" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={exportProgress} variant="outline" size="sm">
              Export Progress
            </Button>
            <label className="cursor-pointer">
              <Button variant="outline" size="sm" asChild>
                <span>Import Progress</span>
              </Button>
              <input type="file" accept=".json" onChange={importProgress} className="hidden" />
            </label>
            <Button onClick={resetAllProgress} variant="destructive" size="sm">
              Reset All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Story Chapters Tracker */}
      <Card className="stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-lg">Main Story Chapters</CardTitle>
          <CardDescription>Track your progress through the main storyline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {storyChapters.map((chapter) => (
              <div key={chapter.id} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <Checkbox
                  id={`chapter-${chapter.id}`}
                  checked={completedStoryChapters[chapter.id] || false}
                  onCheckedChange={() => toggleChapter(chapter.id)}
                />
                <div className="flex-1">
                  <label
                    htmlFor={`chapter-${chapter.id}`}
                    className={`font-medium cursor-pointer ${
                      completedStoryChapters[chapter.id] ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {chapter.title}
                  </label>
                  <p className="text-sm text-gray-600">{chapter.description}</p>
                </div>
                {completedStoryChapters[chapter.id] && <Badge variant="default">✓ Complete</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Side Quests Tracker */}
      <Card className="stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-lg">Side Quests</CardTitle>
          <CardDescription>Track completion of all side quest categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {allQuests.map((quest) => (
              <div key={quest.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Checkbox
                  id={`quest-${quest.id}`}
                  checked={completedQuests[quest.id] || false}
                  onCheckedChange={() => toggleQuest(quest.id)}
                />
                <div className="flex-1">
                  <label
                    htmlFor={`quest-${quest.id}`}
                    className={`font-medium cursor-pointer ${
                      completedQuests[quest.id] ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {quest.title}
                  </label>
                  <p className="text-sm text-gray-600">{quest.description}</p>
                </div>
                <Badge variant="outline">{quest.category}</Badge>
                {completedQuests[quest.id] && <Badge variant="default">✓ Complete</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Character Arcs Tracker */}
      <Card className="stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-lg">Character Heart Events</CardTitle>
          <CardDescription>Track heart events for major character storylines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {characterArcs.map((arc) => (
              <div key={arc.character} className="border rounded-lg p-4 bg-orange-50">
                <h4 className="font-semibold mb-3">
                  {arc.character}: {arc.title}
                </h4>
                <div className="space-y-2">
                  {arc.events.map((event, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Checkbox
                        id={`${arc.character}-${index}`}
                        checked={completedCharacterArcs[arc.character]?.[index] || false}
                        onCheckedChange={() => toggleCharacterEvent(arc.character, index)}
                      />
                      <label
                        htmlFor={`${arc.character}-${index}`}
                        className={`cursor-pointer ${
                          completedCharacterArcs[arc.character]?.[index] ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {event}
                      </label>
                      {completedCharacterArcs[arc.character]?.[index] && (
                        <Badge variant="default" size="sm">
                          ✓
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Progress
                    value={
                      (Object.values(completedCharacterArcs[arc.character] || {}).filter(Boolean).length /
                        arc.events.length) *
                      100
                    }
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MainStoryContent() {
  const storyChapters = [
    {
      id: "prologue",
      title: "The Inheritance",
      description: "Your grandfather's letter leads you to Pelican Town",
      objectives: [
        "Read grandfather's letter",
        "Arrive at the farm",
        "Meet Mayor Lewis",
        "Clear the first parsnip patch",
        "Plant your first crops",
        "Meet Robin and get basic tools",
        "Explore Pelican Town",
        "Meet key villagers (Pierre, Marnie, Clint)",
      ],
      rewards: "15 Parsnip Seeds, Basic Tools, Farm ownership",
      timeframe: "Day 1-7",
      status: "required",
    },
    {
      id: "first-spring",
      title: "Learning the Ropes",
      description: "Master the basics of farming, fishing, and mining",
      objectives: [
        "Plant and harvest your first crops",
        "Catch your first fish",
        "Enter the mines for the first time",
        "Attend the Egg Festival",
        "Make friends with at least 3 villagers",
        "Upgrade your first tool",
        "Build your first coop or barn",
      ],
      rewards: "Tool upgrades, Animal buildings, Festival participation",
      timeframe: "Spring Year 1",
      status: "tutorial",
    },
    {
      id: "community-center",
      title: "The Community Center Mystery",
      description: "Discover the magical Junimos and their bundles",
      objectives: [
        "Enter the Community Center",
        "Meet the Wizard",
        "Learn about Junimos",
        "Complete your first bundle",
        "Choose Community Center or JojaMart path",
        "Unlock the first room reward",
      ],
      rewards: "Access to Bundles, Wizard Friendship, Bridge repair or Greenhouse",
      timeframe: "Spring-Summer Year 1",
      status: "major",
    },
    {
      id: "first-year",
      title: "Establishing Your Farm",
      description: "Build a sustainable farm operation through all four seasons",
      objectives: [
        "Experience all four seasons",
        "Build relationships with townspeople",
        "Upgrade your house at least once",
        "Reach level 5 in at least 3 skills",
        "Complete several bundles",
        "Attend all seasonal festivals",
        "Explore the mines to level 80+",
      ],
      rewards: "Seasonal knowledge, Skill progression, Festival rewards",
      timeframe: "Year 1",
      status: "major",
    },
    {
      id: "restoration",
      title: "Valley Restoration",
      description: "Restore the Community Center or support JojaMart development",
      objectives: [
        "Complete all 6 bundle rooms (CC path)",
        "OR Purchase all JojaMart developments",
        "Unlock the Desert",
        "Gain access to new areas",
        "Witness the valley's transformation",
        "Attend the completion ceremony",
      ],
      rewards: "Desert Access, Greenhouse, Minecarts, Bridge Repair, Bus Repair",
      timeframe: "Year 1-2",
      status: "major",
    },
    {
      id: "desert-exploration",
      title: "Desert Adventures",
      description: "Explore the Calico Desert and Skull Cavern",
      objectives: [
        "Visit the Calico Desert",
        "Enter Skull Cavern",
        "Find your first Prismatic Shard",
        "Reach level 25 in Skull Cavern",
        "Meet Mr. Qi",
        "Complete desert-related quests",
      ],
      rewards: "Skull Cavern access, Prismatic Shards, Mr. Qi introduction",
      timeframe: "Post-Community Center",
      status: "exploration",
    },
    {
      id: "grandpa-evaluation",
      title: "Grandpa's Evaluation",
      description: "Your grandfather's spirit evaluates your progress",
      objectives: [
        "Reach the beginning of Year 3",
        "Earn evaluation points through various achievements",
        "Receive 1-4 candles based on performance",
        "Unlock the Statue of Perfection (4 candles)",
        "Re-evaluate if needed with diamond",
      ],
      rewards: "Statue of Perfection (Iridium daily), Validation of success",
      timeframe: "Spring 1, Year 3",
      status: "major",
    },
    {
      id: "ginger-island",
      title: "Ginger Island Adventure",
      description: "Explore the tropical paradise and help Leo",
      objectives: [
        "Repair Willy's boat",
        "Explore Ginger Island",
        "Help Leo integrate with the valley",
        "Complete Professor Snail's fossil collection",
        "Unlock Qi's Walnut Room",
        "Find all 130 Golden Walnuts",
        "Complete island-specific challenges",
      ],
      rewards: "New crops, Golden Walnuts, Qi Gems, Leo as friend, Island recipes",
      timeframe: "Post-Community Center",
      status: "expansion",
    },
    {
      id: "qi-challenges",
      title: "Mr. Qi's Challenges",
      description: "Complete the most difficult tasks in Stardew Valley",
      objectives: [
        "Access Qi's Walnut Room",
        "Complete Qi's special orders",
        "Earn Qi Gems",
        "Unlock Qi's shop",
        "Complete the hardest challenges",
        "Prove your mastery",
      ],
      rewards: "Qi Gems, Exclusive items, Ultimate challenges",
      timeframe: "Post-Ginger Island",
      status: "endgame",
    },
    {
      id: "perfection",
      title: "Achieving Perfection",
      description: "Master every aspect of valley life",
      objectives: [
        "Reach 100% completion",
        "Max all friendships",
        "Complete all collections",
        "Master all skills",
        "Find all Golden Walnuts",
        "Complete all achievements",
        "Reach perfection status",
      ],
      rewards: "Mr. Qi's Recognition, Ultimate Bragging Rights, Perfection achievement",
      timeframe: "Long-term goal",
      status: "endgame",
    },
    {
      id: "year-two-expansion",
      title: "Year Two Mastery",
      description: "Expand your operations and master advanced gameplay",
      objectives: [
        "Upgrade all tools to Iridium quality",
        "Build all farm buildings",
        "Reach level 10 in all skills",
        "Complete the Community Center or JojaMart path",
        "Establish profitable artisan goods production",
        "Explore Skull Cavern extensively",
        "Build strong relationships with all villagers",
        "Participate in all seasonal festivals",
      ],
      rewards: "Advanced gameplay mastery, High-tier equipment, Skill mastery",
      timeframe: "Year 2",
      status: "advanced",
    },
    {
      id: "marriage-family",
      title: "Love and Family",
      description: "Find love and start a family in Stardew Valley",
      objectives: [
        "Choose a marriage candidate",
        "Reach 10 hearts with your chosen partner",
        "Obtain the Mermaid's Pendant",
        "Plan and attend your wedding",
        "Upgrade your house for married life",
        "Adopt or have children",
        "Balance family life with farming",
        "Enjoy spouse benefits and daily gifts",
      ],
      rewards: "Marriage, Children, Spouse benefits, Expanded house, Daily gifts",
      timeframe: "Year 1-2",
      status: "personal",
    },
    {
      id: "skull-cavern-mastery",
      title: "Skull Cavern Mastery",
      description: "Conquer the dangerous depths of Skull Cavern",
      objectives: [
        "Reach level 100 in Skull Cavern",
        "Collect rare gems and ores",
        "Find Prismatic Shards",
        "Master combat against dangerous enemies",
        "Use staircases and bombs effectively",
        "Optimize luck and timing",
        "Collect rare artifacts",
        "Achieve consistent deep runs",
      ],
      rewards: "Rare materials, Prismatic Shards, Combat mastery, Valuable loot",
      timeframe: "Post-Desert Access",
      status: "challenge",
    },
    {
      id: "economic-mastery",
      title: "Economic Empire",
      description: "Build a massive economic empire",
      objectives: [
        "Earn 10,000,000g total",
        "Establish automated farming systems",
        "Master all artisan production chains",
        "Optimize crop rotations for maximum profit",
        "Build extensive animal operations",
        "Dominate all markets",
        "Achieve financial independence",
        "Fund all community projects",
      ],
      rewards: "Unlimited resources, Economic dominance, Community respect",
      timeframe: "Long-term goal",
      status: "mastery",
    },
    {
      id: "social-butterfly",
      title: "Community Leader",
      description: "Become beloved by the entire community",
      objectives: [
        "Reach 10 hearts with all marriageable candidates",
        "Reach 10 hearts with all townspeople",
        "Complete all heart events",
        "Give perfect gifts to everyone",
        "Participate in all community events",
        "Help solve everyone's problems",
        "Become the valley's most trusted friend",
        "Unite the entire community",
      ],
      rewards: "Universal love, Community leadership, All recipes, Maximum friendship benefits",
      timeframe: "Multi-year goal",
      status: "social",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {storyChapters.map((chapter, index) => (
          <Card key={chapter.id} className="stardew-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-pixel text-lg">
                  Chapter {index + 1}: {chapter.title}
                </CardTitle>
                <Badge
                  variant={
                    chapter.status === "required"
                      ? "default"
                      : chapter.status === "major"
                        ? "destructive"
                        : chapter.status === "expansion"
                          ? "secondary"
                          : "outline"
                  }
                >
                  {chapter.status}
                </Badge>
              </div>
              <CardDescription>{chapter.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Objectives
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {chapter.objectives.map((objective, i) => (
                      <li key={i}>{objective}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      Rewards:
                    </span>
                    <p className="text-sm">{chapter.rewards}</p>
                  </div>
                  <div>
                    <span className="font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Timeframe:
                    </span>
                    <p className="text-sm">{chapter.timeframe}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CharacterArcsContent() {
  const characterArcs = [
    {
      character: "Shane",
      title: "Overcoming Addiction",
      description: "Help Shane battle his alcoholism and find purpose in life",
      heartEvents: [
        { hearts: 2, event: "Shane's Depression", description: "Witness Shane's struggles at the Stardrop Saloon" },
        { hearts: 4, event: "Cliffs Confrontation", description: "Find Shane at the cliffs in a dark moment" },
        { hearts: 6, event: "Therapy Session", description: "Shane seeks professional help" },
        { hearts: 8, event: "New Beginnings", description: "Shane starts raising blue chickens" },
        { hearts: 10, event: "Recovery", description: "Shane has found peace and purpose" },
      ],
      rewards: "Blue Chickens, Pepper Poppers Recipe, Deep Friendship",
      impact: "Major character development, unlocks blue chickens",
    },
    {
      character: "Penny",
      title: "Breaking the Cycle",
      description: "Help Penny escape poverty and pursue her dreams",
      heartEvents: [
        { hearts: 2, event: "Library Tutoring", description: "Penny teaches Jas and Vincent" },
        { hearts: 4, event: "Mother's Drinking", description: "Penny worries about Pam's alcoholism" },
        { hearts: 6, event: "Dreams Deferred", description: "Penny shares her teaching aspirations" },
        { hearts: 8, event: "New House", description: "Community builds Penny and Pam a new house" },
        { hearts: 10, event: "Future Plans", description: "Penny looks forward to a better future" },
      ],
      rewards: "Friendship with Penny, Teaching recipes, Community upgrade",
      impact: "Affects Pam's storyline, unlocks house upgrade quest",
    },
    {
      character: "Clint",
      title: "Unrequited Love",
      description: "Navigate Clint's awkward crush on Emily",
      heartEvents: [
        { hearts: 3, event: "Amethyst Request", description: "Clint asks you to give Emily an amethyst" },
        { hearts: 6, event: "Geode Confession", description: "Clint opens up about his feelings" },
        { hearts: 9, event: "Rejection Reality", description: "Clint realizes Emily doesn't reciprocate" },
      ],
      rewards: "Friendship with Clint, Geode Processing Discounts",
      impact: "Affects Emily relationship dynamics",
    },
    {
      character: "Pam",
      title: "Road to Recovery",
      description: "Help Pam overcome her drinking problem and rebuild her life",
      heartEvents: [
        { hearts: 4, event: "Bus Troubles", description: "Pam's drinking affects her job" },
        { hearts: 7, event: "Family Tensions", description: "Conflict with Penny over lifestyle" },
        { hearts: 9, event: "New House", description: "Community builds Pam a new house" },
      ],
      rewards: "Pam's Friendship, Community Upgrade",
      impact: "Unlocks house upgrade quest, improves Penny relationship",
    },
    {
      character: "Linus",
      title: "Acceptance and Understanding",
      description: "Learn about Linus's choice to live off the grid",
      heartEvents: [
        { hearts: 4, event: "Tent Vandalism", description: "Someone destroys Linus's tent" },
        { hearts: 7, event: "Past Revealed", description: "Learn about Linus's former life" },
        { hearts: 10, event: "True Friendship", description: "Linus shares his philosophy on simple living" },
      ],
      rewards: "Foraging Recipes, Wild Bait Recipe, Sashimi Recipe",
      impact: "Teaches valuable life lessons about materialism",
    },
    {
      character: "Kent",
      title: "PTSD and Homecoming",
      description: "Help Kent readjust to civilian life after war",
      heartEvents: [
        { hearts: 3, event: "Loud Noises", description: "Kent is triggered by popcorn sounds" },
        { hearts: 7, event: "War Memories", description: "Kent opens up about his experiences" },
        { hearts: 10, event: "Family Healing", description: "Kent finds peace with his family" },
      ],
      rewards: "Friendship with Kent, Military MRE Recipes",
      impact: "Affects Jodi and Sam's storylines",
    },
    {
      character: "Leo",
      title: "Integration into Society",
      description: "Help the island boy adapt to valley life",
      heartEvents: [
        { hearts: 2, event: "First Contact", description: "Leo is afraid of strangers" },
        { hearts: 4, event: "Language Barrier", description: "Communication difficulties" },
        { hearts: 6, event: "Mainland Visit", description: "Leo visits Pelican Town" },
        { hearts: 8, event: "Making Friends", description: "Leo befriends Jas and Vincent" },
        { hearts: 10, event: "New Family", description: "Leo finds his place in the community" },
      ],
      rewards: "Leo's Friendship, Island Recipes, Parrot Express",
      impact: "Unlocks Ginger Island features, affects children's events",
    },
    {
      character: "Emily",
      title: "Spiritual Journey",
      description: "Follow Emily's path of self-discovery and creativity",
      heartEvents: [
        { hearts: 2, event: "Dream Catcher", description: "Emily shares her spiritual beliefs" },
        { hearts: 4, event: "Crystal Cave", description: "Emily takes you to a magical cave" },
        { hearts: 6, event: "Clothing Therapy", description: "Emily creates a special outfit for you" },
        { hearts: 8, event: "Parrot Rescue", description: "Emily helps an injured parrot" },
        { hearts: 10, event: "True Self", description: "Emily embraces her authentic self" },
      ],
      rewards: "Tailoring recipes, Cloth, Spiritual guidance",
      impact: "Unlocks tailoring system, affects Clint's storyline",
    },
    {
      character: "Sebastian",
      title: "Finding Independence",
      description: "Help Sebastian break free from family expectations",
      heartEvents: [
        { hearts: 2, event: "Basement Hideout", description: "Sebastian shows you his programming work" },
        { hearts: 4, event: "Motorcycle Ride", description: "Sebastian takes you for a ride" },
        { hearts: 6, event: "Family Dinner", description: "Awkward dinner with Robin and Demetrius" },
        { hearts: 8, event: "City Dreams", description: "Sebastian considers leaving the valley" },
        { hearts: 10, event: "New Perspective", description: "Sebastian finds his place in the world" },
      ],
      rewards: "Friendship with Sebastian, Programming insights",
      impact: "Affects Robin and Demetrius relationships",
    },
    {
      character: "Abigail",
      title: "Adventure Seeker",
      description: "Join Abigail on her quest for excitement and adventure",
      heartEvents: [
        { hearts: 2, event: "Graveyard Practice", description: "Abigail practices sword fighting" },
        { hearts: 4, event: "Mine Adventure", description: "Abigail wants to explore the mines" },
        { hearts: 6, event: "Ouija Board", description: "Abigail tries to contact spirits" },
        { hearts: 8, event: "Monster Hunt", description: "Abigail joins you in monster hunting" },
        { hearts: 10, event: "True Adventurer", description: "Abigail embraces her adventurous spirit" },
      ],
      rewards: "Friendship with Abigail, Adventure companion",
      impact: "Unlocks mine companion, affects Pierre and Caroline",
    },
    {
      character: "Sam",
      title: "Musical Dreams",
      description: "Support Sam's musical aspirations and family responsibilities",
      heartEvents: [
        { hearts: 2, event: "Band Practice", description: "Sam practices with Sebastian and Abigail" },
        { hearts: 4, event: "Pizza Delivery", description: "Sam works to support his family" },
        { hearts: 6, event: "Father's Return", description: "Kent returns from war" },
        { hearts: 8, event: "Concert Performance", description: "Sam's band performs publicly" },
        { hearts: 10, event: "Musical Future", description: "Sam balances dreams with responsibility" },
      ],
      rewards: "Friendship with Sam, Musical recipes",
      impact: "Affects Kent and Jodi storylines, unlocks band events",
    },
    {
      character: "Harvey",
      title: "Overcoming Anxiety",
      description: "Help Harvey gain confidence and overcome his fears",
      heartEvents: [
        { hearts: 2, event: "Medical Checkup", description: "Harvey gives you a health examination" },
        { hearts: 4, event: "Radio Show", description: "Harvey hosts an aerobics radio show" },
        { hearts: 6, event: "Hot Air Balloon", description: "Harvey's fear of heights is revealed" },
        { hearts: 8, event: "Flying Lesson", description: "Harvey overcomes his fear" },
        { hearts: 10, event: "Confident Doctor", description: "Harvey becomes more self-assured" },
      ],
      rewards: "Friendship with Harvey, Medical recipes, Health bonuses",
      impact: "Unlocks health benefits, affects medical services",
    },
    {
      character: "Robin",
      title: "Master Builder's Journey",
      description: "Help Robin balance work and family while building the valley",
      heartEvents: [
        { hearts: 2, event: "Workshop Tour", description: "Robin shows you her carpentry workshop" },
        { hearts: 4, event: "Family Tensions", description: "Robin worries about Sebastian's isolation" },
        { hearts: 6, event: "Building Dreams", description: "Robin shares her architectural aspirations" },
        { hearts: 8, event: "Community Project", description: "Robin leads a major construction project" },
        { hearts: 10, event: "Master Craftsperson", description: "Robin achieves recognition for her skills" },
      ],
      rewards: "Building discounts, Hardwood access, Construction recipes",
      impact: "Affects Sebastian and Demetrius storylines, unlocks building benefits",
    },
    {
      character: "Demetrius",
      title: "Scientific Discovery",
      description: "Support Demetrius in his scientific research",
      heartEvents: [
        { hearts: 2, event: "Laboratory Visit", description: "Demetrius explains his research projects" },
        { hearts: 4, event: "Stepfather Struggles", description: "Demetrius tries to connect with Sebastian" },
        { hearts: 6, event: "Research Breakthrough", description: "Demetrius makes an important discovery" },
        { hearts: 8, event: "Family Harmony", description: "Demetrius finds balance between work and family" },
        { hearts: 10, event: "Scientific Recognition", description: "Demetrius gains acclaim for his work" },
      ],
      rewards: "Scientific recipes, Research insights, Family harmony",
      impact: "Improves Robin and Sebastian relationships, unlocks science content",
    },
    {
      character: "Caroline",
      title: "Green Thumb Awakening",
      description: "Help Caroline discover her passion for gardening and natural living",
      heartEvents: [
        { hearts: 2, event: "Garden Tour", description: "Caroline shows you her small garden" },
        { hearts: 4, event: "Aerobics Class", description: "Caroline leads the town fitness program" },
        { hearts: 6, event: "Tea Ceremony", description: "Caroline shares her love of tea and meditation" },
        { hearts: 8, event: "Secret Garden", description: "Caroline creates a hidden meditation garden" },
        { hearts: 10, event: "Natural Healer", description: "Caroline becomes the valley's herbalist" },
      ],
      rewards: "Tea sapling, Herbal recipes, Garden knowledge, Meditation benefits",
      impact: "Unlocks tea cultivation, affects Pierre and Abigail storylines",
    },
    {
      character: "Pierre",
      title: "Small Business Dreams",
      description: "Help Pierre compete with JojaMart and grow his business",
      heartEvents: [
        { hearts: 2, event: "Store Struggles", description: "Pierre worries about JojaMart competition" },
        { hearts: 4, event: "Quality Produce", description: "Pierre seeks high-quality local products" },
        { hearts: 6, event: "Business Expansion", description: "Pierre plans to expand his store" },
        { hearts: 8, event: "Community Support", description: "The town rallies behind Pierre's shop" },
        { hearts: 10, event: "Thriving Business", description: "Pierre's store becomes the heart of commerce" },
      ],
      rewards: "Store discounts, Seed varieties, Business partnership",
      impact: "Affects JojaMart storyline, improves local economy",
    },
    {
      character: "Evelyn",
      title: "Grandmother's Wisdom",
      description: "Learn life lessons from the valley's beloved grandmother",
      heartEvents: [
        { hearts: 2, event: "Cookie Recipe", description: "Evelyn teaches you her famous cookie recipe" },
        { hearts: 4, event: "Garden Wisdom", description: "Evelyn shares decades of gardening knowledge" },
        { hearts: 6, event: "Family Stories", description: "Evelyn tells stories about the valley's history" },
        { hearts: 8, event: "Community Memory", description: "Evelyn helps preserve the valley's traditions" },
        { hearts: 10, event: "Living Legend", description: "Evelyn is honored as the valley's matriarch" },
      ],
      rewards: "Cooking recipes, Gardening tips, Historical knowledge, Grandmother's blessing",
      impact: "Unlocks traditional recipes, affects Alex storyline, preserves valley culture",
    },
    {
      character: "George",
      title: "Grumpy Heart of Gold",
      description: "Break through George's gruff exterior to find his caring nature",
      heartEvents: [
        { hearts: 2, event: "Wheelchair Accessibility", description: "George struggles with mobility around town" },
        { hearts: 4, event: "Past Glories", description: "George reminisces about his younger days" },
        { hearts: 6, event: "Hidden Kindness", description: "George secretly helps community members" },
        { hearts: 8, event: "Acceptance", description: "George opens up about his fears and hopes" },
        { hearts: 10, event: "Respected Elder", description: "George becomes a valued community advisor" },
      ],
      rewards: "Respect, Wisdom, Traditional knowledge, Community acceptance",
      impact: "Affects Alex and Evelyn storylines, improves community harmony",
    },
    {
      character: "Jodi",
      title: "Military Wife's Strength",
      description: "Support Jodi through the challenges of military family life",
      heartEvents: [
        { hearts: 2, event: "Single Parenting", description: "Jodi manages the household alone" },
        { hearts: 4, event: "Worry and Waiting", description: "Jodi anxiously awaits news from Kent" },
        { hearts: 6, event: "Community Support", description: "The town helps Jodi during difficult times" },
        { hearts: 8, event: "Reunion Preparation", description: "Jodi prepares for Kent's return" },
        { hearts: 10, event: "Family Healing", description: "Jodi helps her family readjust together" },
      ],
      rewards: "Family recipes, Support network, Resilience inspiration",
      impact: "Affects Kent and Sam storylines, strengthens community bonds",
    },
    {
      character: "Marnie",
      title: "Animal Lover's Dedication",
      description: "Help Marnie balance her love for animals with her personal life",
      heartEvents: [
        { hearts: 2, event: "Animal Care", description: "Marnie demonstrates proper animal husbandry" },
        { hearts: 4, event: "Secret Romance", description: "Marnie's relationship with Mayor Lewis is revealed" },
        { hearts: 6, event: "Business Expansion", description: "Marnie considers expanding her ranch" },
        { hearts: 8, event: "Personal Happiness", description: "Marnie finds balance between work and love" },
        { hearts: 10, event: "Ranch Legacy", description: "Marnie establishes her ranch as the valley's best" },
      ],
      rewards: "Animal care knowledge, Ranch discounts, Breeding tips",
      impact: "Affects Mayor Lewis storyline, improves animal services",
    },
  ]

  return (
    <div className="space-y-6">
      {questCategories.map((category) => (
        <Card key={category.category} className="stardew-card">
          <CardHeader>
            <CardTitle className="font-pixel text-lg">{category.category}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {category.quests.map((quest, index) => (
                <div key={index} className="p-4 border rounded-lg bg-amber-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{quest.title}</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline">{quest.giver}</Badge>
                      <Badge
                        variant={
                          quest.difficulty === "Easy"
                            ? "default"
                            : quest.difficulty === "Medium"
                              ? "secondary"
                              : quest.difficulty === "Hard"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {quest.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm mb-3">{quest.description}</p>
                  <div className="grid md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Requirements:</span>
                      <p>{quest.requirements}</p>
                    </div>
                    <div>
                      <span className="font-medium">Reward:</span>
                      <p>{quest.reward}</p>
                    </div>
                    <div>
                      <span className="font-medium">Time Limit:</span>
                      <p>{quest.timeLimit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function SpecialEventsContent() {
  const specialEvents = [
    {
      title: "Community Center Restoration",
      description: "The ultimate community project",
      phases: [
        { phase: "Discovery", description: "Find the Community Center and meet the Junimos" },
        { phase: "Bundle Collection", description: "Complete bundles in all 6 rooms" },
        { phase: "Restoration", description: "Watch the magical restoration ceremony" },
        { phase: "Celebration", description: "Attend the grand reopening party" },
      ],
      rewards: "Greenhouse, Minecarts, Bridge Repair, Desert Access, Bus Repair, Friendship Boosts",
      impact: "Major story milestone, unlocks new areas and features",
    },
    {
      title: "JojaMart Development",
      description: "The corporate alternative path",
      phases: [
        { phase: "Membership", description: "Purchase JojaMart membership for 5,000g" },
        { phase: "Development Projects", description: "Fund community improvements through Joja" },
        { phase: "Corporate Victory", description: "Complete all development projects" },
        { phase: "Transformation", description: "Watch Pelican Town become modernized" },
      ],
      rewards: "Same unlocks as Community Center but through corporate funding",
      impact: "Alternative story path, different cutscenes and dialogue",
    },
    {
      title: "Grandpa's Evaluation",
      description: "Your grandfather judges your progress",
      phases: [
        { phase: "The Visit", description: "Grandpa's spirit appears at the shrine" },
        { phase: "Evaluation", description: "Points calculated based on achievements" },
        { phase: "Judgment", description: "Receive 1-4 candles based on performance" },
        { phase: "Reward", description: "Statue of Perfection if you earn 4 candles" },
      ],
      rewards: "Statue of Perfection (produces 2-8 Iridium Ore daily)",
      impact: "Major milestone, validates your farming success",
    },
    {
      title: "Ginger Island Expedition",
      description: "Explore the mysterious tropical island",
      phases: [
        { phase: "Boat Repair", description: "Help Willy fix his old boat" },
        { phase: "Island Discovery", description: "Explore the four regions of Ginger Island" },
        { phase: "Leo's Story", description: "Help the island boy integrate with society" },
        { phase: "Walnut Collection", description: "Find all 130 Golden Walnuts" },
        { phase: "Qi's Challenges", description: "Complete Mr. Qi's special orders" },
      ],
      rewards: "New crops, Golden Walnuts, Qi Gems, Leo friendship, Island recipes",
      impact: "Major expansion content, new gameplay mechanics",
    },
    {
      title: "Movie Theater Opening",
      description: "Bring cinema to Pelican Town",
      phases: [
        { phase: "Missing Bundle", description: "Complete the secret Missing Bundle" },
        { phase: "Construction", description: "Watch the abandoned JojaMart transform" },
        { phase: "Grand Opening", description: "Attend the first movie screening" },
        { phase: "Regular Showings", description: "Enjoy weekly movies with friends" },
      ],
      rewards: "Movie Theater access, new friendship activities, unique items",
      impact: "New social activities, additional friendship building options",
    },
    {
      title: "Perfection Achievement",
      description: "Master every aspect of Stardew Valley",
      phases: [
        { phase: "Skill Mastery", description: "Reach level 10 in all skills" },
        { phase: "Collection Complete", description: "Complete museum and shipping collections" },
        { phase: "Social Butterfly", description: "Max friendship with all villagers" },
        { phase: "Golden Walnut Hunter", description: "Find all 130 Golden Walnuts" },
        { phase: "Perfect Farmer", description: "Achieve 100% completion" },
      ],
      rewards: "Mr. Qi's recognition, bragging rights, sense of accomplishment",
      impact: "Ultimate endgame goal, proves mastery of all game systems",
    },
    {
      title: "Marriage and Family",
      description: "Build a family in Stardew Valley",
      phases: [
        { phase: "Courtship", description: "Reach 10 hearts with a marriageable candidate" },
        { phase: "Proposal", description: "Give a Mermaid's Pendant" },
        { phase: "Wedding", description: "Attend your wedding ceremony" },
        { phase: "Married Life", description: "Enjoy married life benefits" },
        { phase: "Children", description: "Adopt or have children" },
      ],
      rewards: "Spouse benefits, children, expanded house, daily gifts",
      impact: "Major life change, affects daily routine and relationships",
    },
    {
      title: "Seasonal Festivals",
      description: "Participate in all valley celebrations",
      phases: [
        { phase: "Spring Festivals", description: "Egg Festival, Flower Dance" },
        { phase: "Summer Festivals", description: "Luau, Dance of the Moonlight Jellies" },
        { phase: "Fall Festivals", description: "Stardew Valley Fair, Spirit's Eve" },
        { phase: "Winter Festivals", description: "Festival of Ice, Feast of the Winter Star" },
      ],
      rewards: "Festival-specific items, friendship boosts, seasonal recipes",
      impact: "Community integration, seasonal content, relationship building",
    },
    {
      title: "Secret Areas Discovery",
      description: "Uncover all hidden locations in the valley",
      phases: [
        { phase: "Secret Woods", description: "Find the entrance to the Secret Woods" },
        { phase: "Sewers", description: "Gain access to the underground sewers" },
        { phase: "Witch's Hut", description: "Discover the Witch's Swamp" },
        { phase: "Casino", description: "Unlock the secret casino in the desert" },
        { phase: "Quarry Mine", description: "Explore the quarry's hidden mine" },
      ],
      rewards: "Unique items, rare resources, special NPCs, hidden content",
      impact: "Expands explorable world, provides rare resources and items",
    },
    {
      title: "Skill Mastery Journey",
      description: "Master all skills and unlock their secrets",
      phases: [
        { phase: "Basic Skills", description: "Reach level 5 in all skills" },
        { phase: "Profession Choice", description: "Choose specializations for each skill" },
        { phase: "Advanced Mastery", description: "Reach level 10 in all skills" },
        { phase: "Skill Books", description: "Find and read all skill books" },
        { phase: "Perfect Mastery", description: "Unlock all skill-related content" },
      ],
      rewards: "Profession benefits, skill books, mastery rewards, efficiency bonuses",
      impact: "Gameplay optimization, unlocks advanced content, improves efficiency",
    },
    {
      title: "Friendship Network",
      description: "Build relationships with every villager",
      phases: [
        { phase: "First Meetings", description: "Meet all villagers in Pelican Town" },
        { phase: "Gift Giving", description: "Learn everyone's favorite gifts" },
        { phase: "Heart Events", description: "Trigger heart events with major characters" },
        { phase: "Max Friendship", description: "Reach 10 hearts with all villagers" },
        { phase: "Community Leader", description: "Become beloved by the entire town" },
      ],
      rewards: "Recipes, items, heart events, community respect, daily gifts",
      impact: "Social mastery, unlocks all character content, community benefits",
    },
    {
      title: "Economic Empire",
      description: "Build a massive farming and business empire",
      phases: [
        { phase: "First Million", description: "Earn your first 1,000,000g" },
        { phase: "Automation", description: "Set up automated farming systems" },
        { phase: "Diversification", description: "Master all income sources" },
        { phase: "Optimization", description: "Maximize profit efficiency" },
        { phase: "Economic Dominance", description: "Achieve ultimate wealth" },
      ],
      rewards: "Financial freedom, automated systems, business mastery, economic power",
      impact: "Resource abundance, gameplay freedom, achievement satisfaction",
    },
    {
      title: "The Great Crop Competition",
      description: "Annual valley-wide farming competition",
      phases: [
        { phase: "Registration", description: "Sign up for the competition categories" },
        { phase: "Preparation", description: "Plan and plant your competition crops" },
        { phase: "Growing Season", description: "Tend to your crops with extra care" },
        { phase: "Judging Day", description: "Present your best crops to the judges" },
        { phase: "Awards Ceremony", description: "Celebrate winners and achievements" },
      ],
      rewards: "Competition trophies, rare seeds, farming recognition, prize money",
      impact: "Establishes farming reputation, unlocks advanced techniques",
    },
    {
      title: "Valley Time Capsule",
      description: "Create a time capsule for future generations",
      phases: [
        { phase: "Planning Committee", description: "Join the community planning committee" },
        { phase: "Item Collection", description: "Gather meaningful items from each villager" },
        { phase: "Capsule Creation", description: "Design and build the time capsule" },
        { phase: "Burial Ceremony", description: "Bury the capsule in a special ceremony" },
        { phase: "Legacy Documentation", description: "Document the valley's current state" },
      ],
      rewards: "Historical preservation, community unity, legacy items, time capsule key",
      impact: "Preserves valley history, strengthens community bonds",
    },
    {
      title: "The Lost Treasure Hunt",
      description: "Uncover the valley's hidden treasure",
      phases: [
        { phase: "Ancient Map Discovery", description: "Find clues about hidden treasure" },
        { phase: "Riddle Solving", description: "Decode ancient riddles and puzzles" },
        { phase: "Location Hunting", description: "Search various locations for treasure markers" },
        { phase: "Final Excavation", description: "Dig up the legendary treasure" },
        { phase: "Treasure Distribution", description: "Share the treasure with the community" },
      ],
      rewards: "Ancient artifacts, valuable gems, historical knowledge, treasure map",
      impact: "Uncovers valley secrets, provides valuable resources",
    },
    {
      title: "Seasonal Festival Circuit",
      description: "Master all seasonal festivals and events",
      phases: [
        { phase: "Spring Festivals", description: "Excel at Egg Festival and Flower Dance" },
        { phase: "Summer Celebrations", description: "Dominate Luau and Moonlight Jellies" },
        { phase: "Fall Competitions", description: "Win at Fair and Spirit's Eve" },
        { phase: "Winter Gatherings", description: "Triumph at Ice Festival and Winter Star" },
        { phase: "Festival Champion", description: "Become the ultimate festival champion" },
      ],
      rewards: "Festival mastery, seasonal items, community recognition, champion status",
      impact: "Establishes social dominance, unlocks exclusive festival content",
    },
    {
      title: "The Great Valley Renovation",
      description: "Lead a massive community improvement project",
      phases: [
        { phase: "Needs Assessment", description: "Survey the valley for improvement opportunities" },
        { phase: "Fundraising Campaign", description: "Raise money for renovation projects" },
        { phase: "Construction Phase", description: "Oversee major construction projects" },
        { phase: "Beautification", description: "Add aesthetic improvements throughout the valley" },
        { phase: "Grand Reopening", description: "Celebrate the renovated valley" },
      ],
      rewards: "Valley improvements, construction knowledge, community leadership, renovation rewards",
      impact: "Permanently improves valley infrastructure and appearance",
    },
    {
      title: "Master Chef Challenge",
      description: "Become the valley's ultimate culinary master",
      phases: [
        { phase: "Recipe Collection", description: "Learn all cooking recipes in the valley" },
        { phase: "Ingredient Mastery", description: "Source the finest ingredients" },
        { phase: "Cooking Competition", description: "Compete against other valley cooks" },
        { phase: "Restaurant Opening", description: "Open your own restaurant" },
        { phase: "Culinary Legend", description: "Achieve legendary chef status" },
      ],
      rewards: "Master chef title, cooking bonuses, restaurant ownership, culinary fame",
      impact: "Establishes culinary dominance, unlocks advanced cooking content",
    },
    {
      title: "The Valley Olympics",
      description: "Organize and compete in valley-wide games",
      phases: [
        { phase: "Event Planning", description: "Organize various competitive events" },
        { phase: "Training Season", description: "Train for different Olympic events" },
        { phase: "Opening Ceremony", description: "Launch the valley Olympics" },
        { phase: "Competition Days", description: "Compete in multiple events" },
        { phase: "Closing Ceremony", description: "Celebrate achievements and sportsmanship" },
      ],
      rewards: "Olympic medals, athletic recognition, sports equipment, champion status",
      impact: "Promotes valley fitness and competition, builds community spirit",
    },
    {
      title: "Environmental Restoration",
      description: "Restore the valley's natural environment",
      phases: [
        { phase: "Environmental Assessment", description: "Survey environmental damage and needs" },
        { phase: "Cleanup Campaign", description: "Remove pollution and debris" },
        { phase: "Reforestation Project", description: "Plant trees and restore forests" },
        { phase: "Wildlife Protection", description: "Establish wildlife conservation areas" },
        { phase: "Sustainable Future", description: "Implement long-term environmental protection" },
      ],
      rewards: "Environmental awards, conservation knowledge, wildlife benefits, green technology",
      impact: "Improves valley ecology, attracts wildlife, establishes environmental leadership",
    },
  ]

  return (
    <div className="space-y-6">
      {specialEvents.map((event, index) => (
        <Card key={index} className="stardew-card">
          <CardHeader>
            <CardTitle className="font-pixel text-lg flex items-center gap-2">
              <Zap className="w-5 h-5" />
              {event.title}
            </CardTitle>
            <CardDescription>{event.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Event Phases</h4>
                <div className="space-y-2">
                  {event.phases.map((phase, phaseIndex) => (
                    <div key={phaseIndex} className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                      <Badge variant="outline">Phase {phaseIndex + 1}</Badge>
                      <div className="flex-1">
                        <span className="font-medium">{phase.phase}</span>
                        <p className="text-sm text-gray-600">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold">Rewards:</span>
                  <p className="text-sm">{event.rewards}</p>
                </div>
                <div>
                  <span className="font-semibold">Story Impact:</span>
                  <p className="text-sm">{event.impact}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const questCategories = [
  {
    category: "Foraging Quests",
    description: "Gather wild plants and resources",
    quests: [
      {
        title: "Spring Foraging",
        giver: "Mayor Lewis",
        difficulty: "Easy",
        description: "Collect 10 Spring Onions",
        requirements: "Spring Season",
        reward: "50g, Friendship",
        timeLimit: "7 days",
      },
      {
        title: "Summer Bounty",
        giver: "Linus",
        difficulty: "Medium",
        description: "Collect 5 Blueberries and 5 Spice Berries",
        requirements: "Summer Season",
        reward: "150g, Wild Bait Recipe",
        timeLimit: "7 days",
      },
      {
        title: "Fall Harvest",
        giver: "Evelyn",
        difficulty: "Easy",
        description: "Collect 10 Hazelnuts",
        requirements: "Fall Season",
        reward: "75g, Cookie Recipe",
        timeLimit: "7 days",
      },
      {
        title: "Winter Roots",
        giver: "George",
        difficulty: "Medium",
        description: "Collect 5 Winter Roots and 5 Snow Yams",
        requirements: "Winter Season, Digging Tool",
        reward: "200g, Friendship",
        timeLimit: "7 days",
      },
    ],
  },
  {
    category: "Fishing Quests",
    description: "Catch various types of fish",
    quests: [
      {
        title: "River Fish",
        giver: "Willy",
        difficulty: "Easy",
        description: "Catch 3 Sunfish",
        requirements: "Fishing Rod",
        reward: "100g, Bait",
        timeLimit: "3 days",
      },
      {
        title: "Ocean Catch",
        giver: "Elliott",
        difficulty: "Medium",
        description: "Catch 2 Sardines and 2 Anchovies",
        requirements: "Fishing Rod",
        reward: "150g, Crab Pot Recipe",
        timeLimit: "5 days",
      },
      {
        title: "Lake Treasure",
        giver: "Leah",
        difficulty: "Hard",
        description: "Catch 1 Largemouth Bass",
        requirements: "Fishing Rod",
        reward: "250g, Friendship",
        timeLimit: "7 days",
      },
      {
        title: "Mine Fishing",
        giver: "Dwarf",
        difficulty: "Hard",
        description: "Catch 1 Stonefish",
        requirements: "Fishing Rod, Mines Access",
        reward: "300g, Bomb Recipe",
        timeLimit: "7 days",
      },
    ],
  },
  {
    category: "Farming Quests",
    description: "Grow and harvest crops",
    quests: [
      {
        title: "Spring Crops",
        giver: "Pierre",
        difficulty: "Easy",
        description: "Harvest 10 Parsnips",
        requirements: "Parsnip Seeds",
        reward: "80g, Fertilizer",
        timeLimit: "7 days",
      },
      {
        title: "Summer Harvest",
        giver: "Caroline",
        difficulty: "Medium",
        description: "Harvest 5 Blueberries",
        requirements: "Blueberry Seeds",
        reward: "160g, Tea Sapling",
        timeLimit: "7 days",
      },
      {
        title: "Fall Bounty",
        giver: "Jodi",
        difficulty: "Easy",
        description: "Harvest 10 Pumpkins",
        requirements: "Pumpkin Seeds",
        reward: "120g, Pumpkin Pie Recipe",
        timeLimit: "7 days",
      },
      {
        title: "Greenhouse Crops",
        giver: "Wizard",
        difficulty: "Hard",
        description: "Harvest 5 Ancient Fruits",
        requirements: "Greenhouse Access, Ancient Seeds",
        reward: "400g, Friendship",
        timeLimit: "14 days",
      },
    ],
  },
  {
    category: "Mining Quests",
    description: "Collect ores and minerals",
    quests: [
      {
        title: "Copper Ore",
        giver: "Clint",
        difficulty: "Easy",
        description: "Collect 15 Copper Ore",
        requirements: "Mines Access",
        reward: "100g, Coal",
        timeLimit: "5 days",
      },
      {
        title: "Iron Bars",
        giver: "Robin",
        difficulty: "Medium",
        description: "Collect 5 Iron Bars",
        requirements: "Mines Access, Furnace",
        reward: "200g, Wood",
        timeLimit: "7 days",
      },
      {
        title: "Gold Ore",
        giver: "Demetrius",
        difficulty: "Medium",
        description: "Collect 10 Gold Ore",
        requirements: "Mines Access",
        reward: "250g, Scientific Recipe",
        timeLimit: "7 days",
      },
      {
        title: "Iridium Ore",
        giver: "Mr. Qi",
        difficulty: "Hard",
        description: "Collect 3 Iridium Ore",
        requirements: "Skull Cavern Access",
        reward: "500g, Qi Gem",
        timeLimit: "7 days",
      },
    ],
  },
  {
    category: "Monster Slaying Quests",
    description: "Eliminate monsters in the mines",
    quests: [
      {
        title: "Slime Hunt",
        giver: "Adventurer's Guild",
        difficulty: "Easy",
        description: "Slay 15 Slimes",
        requirements: "Sword",
        reward: "150g, Slime Egg-Press Recipe",
        timeLimit: "7 days",
      },
      {
        title: "Bat Eradication",
        giver: "Adventurer's Guild",
        difficulty: "Medium",
        description: "Slay 30 Bats",
        requirements: "Sword, Mines Access",
        reward: "250g, Friendship",
        timeLimit: "7 days",
      },
      {
        title: "Bug Clearing",
        giver: "Adventurer's Guild",
        difficulty: "Easy",
        description: "Slay 20 Cave Insects",
        requirements: "Sword, Mines Access",
        reward: "200g, Bug Steak Recipe",
        timeLimit: "7 days",
      },
      {
        title: "Shadow Brute",
        giver: "Adventurer's Guild",
        difficulty: "Hard",
        description: "Slay 10 Shadow Brutes",
        requirements: "Sword, Mines Access",
        reward: "400g, Void Essence",
        timeLimit: "7 days",
      },
    ],
  },
]

function SideQuestsContent() {
  return (
    <div className="space-y-6">
      {questCategories.map((category) => (
        <Card key={category.category} className="stardew-card">
          <CardHeader>
            <CardTitle className="font-pixel text-lg">{category.category}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {category.quests.map((quest, index) => (
                <div key={index} className="p-4 border rounded-lg bg-amber-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{quest.title}</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline">{quest.giver}</Badge>
                      <Badge
                        variant={
                          quest.difficulty === "Easy"
                            ? "default"
                            : quest.difficulty === "Medium"
                              ? "secondary"
                              : quest.difficulty === "Hard"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {quest.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm mb-3">{quest.description}</p>
                  <div className="grid md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Requirements:</span>
                      <p>{quest.requirements}</p>
                    </div>
                    <div>
                      <span className="font-medium">Reward:</span>
                      <p>{quest.reward}</p>
                    </div>
                    <div>
                      <span className="font-medium">Time Limit:</span>
                      <p>{quest.timeLimit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
