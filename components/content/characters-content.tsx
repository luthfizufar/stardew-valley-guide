"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "@/hooks/use-translations"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CharactersContent() {
  const { t } = useTranslations()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const marriageableCharacters = [
    {
      id: "abigail",
      name: "Abigail",
      image: "/images/characters/abigail.png",
      description: "character.abigail.description",
      birthday: "Fall 13",
      location: "Pierre's General Store",
      gifts: "character.abigail.gifts",
    },
    {
      id: "alex",
      name: "Alex",
      image: "/images/characters/alex.png",
      description: "character.alex.description",
      birthday: "Summer 13",
      location: "1 River Road",
      gifts: "character.alex.gifts",
    },
    {
      id: "elliott",
      name: "Elliott",
      image: "/images/characters/elliott.png",
      description: "character.elliott.description",
      birthday: "Fall 5",
      location: "Elliott's Cabin (Beach)",
      gifts: "character.elliott.gifts",
    },
    {
      id: "emily",
      name: "Emily",
      image: "/images/characters/emily.png",
      description: "character.emily.description",
      birthday: "Spring 27",
      location: "2 Willow Lane",
      gifts: "character.emily.gifts",
    },
    {
      id: "harvey",
      name: "Harvey",
      image: "/images/characters/harvey.png",
      description: "character.harvey.description",
      birthday: "Winter 14",
      location: "Medical Clinic",
      gifts: "character.harvey.gifts",
    },
    {
      id: "leah",
      name: "Leah",
      image: "/images/characters/leah.png",
      description: "character.leah.description",
      birthday: "Winter 23",
      location: "Leah's Cottage",
      gifts: "character.leah.gifts",
    },
    {
      id: "penny",
      name: "Penny",
      image: "/images/characters/penny.png",
      description: "character.penny.description",
      birthday: "Fall 2",
      location: "Trailer (East of Town)",
      gifts: "character.penny.gifts",
    },
    {
      id: "sam",
      name: "Sam",
      image: "/images/characters/sam.png",
      description: "character.sam.description",
      birthday: "Summer 17",
      location: "1 Willow Lane",
      gifts: "character.sam.gifts",
    },
    {
      id: "sebastian",
      name: "Sebastian",
      image: "/images/characters/sebastian.png",
      description: "character.sebastian.description",
      birthday: "Winter 10",
      location: "Carpenter's Shop (Basement)",
      gifts: "character.sebastian.gifts",
    },
    {
      id: "shane",
      name: "Shane",
      image: "/images/characters/shane.png",
      description: "character.shane.description",
      birthday: "Spring 20",
      location: "Marnie's Ranch",
      gifts: "character.shane.gifts",
    },
    {
      id: "haley",
      name: "Haley",
      image: "/images/characters/haley.png",
      description: "character.haley.description",
      birthday: "Spring 14",
      location: "2 Willow Lane",
      gifts: "character.haley.gifts",
    },
    {
      id: "maru",
      name: "Maru",
      image: "/images/characters/maru.png",
      description: "character.maru.description",
      birthday: "Summer 10",
      location: "Carpenter's Shop",
      gifts: "character.maru.gifts",
    }
  ]

  const townspeople = [
    {
      id: "leo",
      name: "Leo",
      image: "/images/characters/leo.png",
      description: "character.leo.description",
      birthday: "Summer 26",
      location: "Ginger Island (Tree House)",
      gifts: "character.leo.gifts",
    },
    {
      id: "caroline",
      name: "Caroline",
      image: "/images/characters/caroline.png",
      description: "Pierre's wife and Abigail's mother. She enjoys gardening and hosts an aerobics class.",
      birthday: "Winter 7",
      location: "Pierre's General Store",
      gifts: "Tea Set, Summer Spangle, Daffodil, Green Tea",
    },
    {
      id: "clint",
      name: "Clint",
      image: "/images/characters/clint.png",
      description: "The town blacksmith who upgrades tools and cracks geodes. He has a crush on Emily.",
      birthday: "Winter 26",
      location: "Blacksmith Shop",
      gifts: "Gold Bar, Iridium Bar, Aquamarine, Jade, Ruby",
    },
    {
      id: "demetrius",
      name: "Demetrius",
      image: "/images/characters/demetrius.png",
      description: "Robin's husband and Maru's father. He's a scientist studying the local ecosystem.",
      birthday: "Summer 19",
      location: "Carpenter's Shop",
      gifts: "Strawberry, Ice Cream, Bean Hotpot, Rice Pudding",
    },
    {
      id: "evelyn",
      name: "Evelyn",
      image: "/images/characters/evelyn.png",
      description: "George's wife and Alex's grandmother. She loves to bake and tends the town gardens.",
      birthday: "Winter 20",
      location: "1 River Road",
      gifts: "Chocolate Cake, Diamond, Fairy Rose, Tulip",
    },
    {
      id: "george",
      name: "George",
      image: "/images/characters/george.png",
      description: "Evelyn's husband and Alex's grandfather. He's grumpy but has a soft side.",
      birthday: "Fall 24",
      location: "1 River Road",
      gifts: "Leek, Fried Mushroom, Spicy Eel",
    },
    {
      id: "gus",
      name: "Gus",
      image: "/images/characters/gus.png",
      description: "The friendly owner and chef of the Stardrop Saloon.",
      birthday: "Summer 8",
      location: "Stardrop Saloon",
      gifts: "Orange, Diamond, Fish Taco, Escargot",
    },
    {
      id: "jas",
      name: "Jas",
      image: "/images/characters/jas.png",
      description: "Shane's goddaughter who lives with him at Marnie's Ranch. She's friends with Vincent.",
      birthday: "Summer 4",
      location: "Marnie's Ranch",
      gifts: "Fairy Rose, Pink Cake, Plum Pudding",
    },
    {
      id: "jodi",
      name: "Jodi",
      image: "/images/characters/jodi.png",
      description: "Sam and Vincent's mother. Her husband Kent is away at war in Year 1.",
      birthday: "Fall 11",
      location: "1 Willow Lane",
      gifts: "Diamond, Chocolate Cake, Pancakes, Vegetable Medley",
    },
    {
      id: "kent",
      name: "Kent",
      image: "/images/characters/kent.png",
      description: "Jodi's husband and Sam and Vincent's father. Returns from war in Year 2.",
      birthday: "Spring 4",
      location: "1 Willow Lane",
      gifts: "Roasted Hazelnuts, Fiddlehead Risotto, Pearl",
    },
    {
      id: "lewis",
      name: "Lewis",
      image: "/images/characters/lewis.png",
      description:
        "The mayor of Pelican Town. He's been mayor for many years and has a secret relationship with Marnie.",
      birthday: "Spring 7",
      location: "Mayor's Manor",
      gifts: "Hot Pepper, Green Tea, Autumn's Bounty, Glazed Yams",
    },
    {
      id: "linus",
      name: "Linus",
      image: "/images/characters/linus.png",
      description: "A wild man who lives in a tent on the mountain. He's kind but shy due to past mistreatment.",
      birthday: "Winter 3",
      location: "Tent (Mountain)",
      gifts: "Yam, Coconut, Cactus Fruit, Dish o' The Sea",
    },
    {
      id: "marnie",
      name: "Marnie",
      image: "/images/characters/marnie.png",
      description: "Runs the animal ranch south of your farm. She's Shane's aunt and has a crush on Mayor Lewis.",
      birthday: "Fall 18",
      location: "Marnie's Ranch",
      gifts: "Pink Cake, Pumpkin Pie, Diamond, Farmer's Lunch",
    },
    {
      id: "pam",
      name: "Pam",
      image: "/images/characters/pam.png",
      description: "Penny's mother and the bus driver. She struggles with alcoholism.",
      birthday: "Spring 18",
      location: "Trailer",
      gifts: "Parsnip, Beer, Cactus Fruit, Glazed Yams",
    },
    {
      id: "pierre",
      name: "Pierre",
      image: "/images/characters/pierre.png",
      description: "The owner of the general store and Caroline's husband. He competes with JojaMart.",
      birthday: "Spring 26",
      location: "Pierre's General Store",
      gifts: "Fried Calamari, Gold Bar, Eggplant Parmesan",
    },
    {
      id: "robin",
      name: "Robin",
      image: "/images/characters/robin.png",
      description:
        "The town carpenter who builds farm buildings. She's married to Demetrius and is Sebastian's mother.",
      birthday: "Fall 21",
      location: "Carpenter's Shop",
      gifts: "Goat Cheese, Peach, Spaghetti, Hardwood",
    },
    {
      id: "vincent",
      name: "Vincent",
      image: "/images/characters/vincent.png",
      description: "Jodi and Kent's youngest son and Sam's brother. He's friends with Jas.",
      birthday: "Spring 10",
      location: "1 Willow Lane",
      gifts: "Grape, Snail, Ginger Ale, Pink Cake",
    },
    {
      id: "wizard",
      name: "Wizard",
      image: "/images/characters/wizard.png",
      description: "The mysterious wizard who lives in the tower west of the forest. His real name is M. Rasmodius.",
      birthday: "Winter 17",
      location: "Wizard's Tower",
      gifts: "Solar Essence, Void Essence, Purple Mushroom, Super Cucumber",
    },
    {
      id: "dwarf",
      name: "Dwarf",
      image: "/images/characters/dwarf.png",
      description: "A dwarf who lives in the mines. You need the Dwarvish Translation Guide to speak with him.",
      birthday: "Summer 22",
      location: "The Mines",
      gifts: "Jade, Ruby, Amethyst, Emerald, Aquamarine, Topaz, Diamond",
    },
    {
      id: "krobus",
      name: "Krobus",
      image: "/images/characters/krobus.png",
      description: "A friendly shadow person who sells rare items in the sewers. Can become a roommate.",
      birthday: "Winter 1",
      location: "The Sewers",
      gifts: "Void Egg, Diamond, Pumpkin, Wild Horseradish, Iridium Bar",
    },
    {
      id: "willy",
      name: "Willy",
      image: "/images/characters/willy.png",
      description: "The fisherman who owns the fish shop on the pier. He gives you your first fishing rod.",
      birthday: "Summer 24",
      location: "Fish Shop",
      gifts: "Catfish, Diamond, Iridium Bar, Mead, Octopus",
    },
    {
      id: "sandy",
      name: "Sandy",
      image: "/images/characters/sandy.png",
      description: "Runs the Oasis shop in the Calico Desert. She's friends with Emily.",
      birthday: "Fall 15",
      location: "Oasis (Desert)",
      gifts: "Daffodil, Sweet Pea, Crocus, Cloth",
    },
    {
      id: "professor_snail",
      name: "Professor Snail",
      image: "/images/characters/professor_snail.png",
      description:
        "A researcher studying the wildlife on Ginger Island. He'll trade Golden Walnuts for island artifacts.",
      birthday: "Unknown",
      location: "Ginger Island (West)",
      gifts: "Ginger, Magma Cap, Cinder Shard",
    },
    {
      id: "birdie",
      name: "Birdie",
      image: "/images/characters/birdie.png",
      description: "An elderly woman who lives alone on Ginger Island. She has a connection to Leo's past.",
      birthday: "Unknown",
      location: "Ginger Island (West)",
      gifts: "Ostrich Egg, Poi, Taro Root",
    },
    {
      id: "gunther",
      name: "Gunther",
      image: "/images/characters/gunther.png",
      description: "The curator of the town museum. He doesn't leave the museum and cannot receive gifts.",
      birthday: "Unknown",
      location: "Museum",
      gifts: "Cannot receive gifts",
    },
    {
      id: "morris",
      name: "Morris",
      image: "/images/characters/morris.png",
      description:
        "The manager of the JojaMart. He's trying to convince townspeople to shop at Joja instead of Pierre's.",
      birthday: "Unknown",
      location: "JojaMart",
      gifts: "Cannot receive gifts",
    },
    {
      id: "marlon",
      name: "Marlon",
      image: "/images/characters/marlon.png",
      description: "The owner of the Adventurer's Guild. He sells weapons and provides monster-slaying quests.",
      birthday: "Unknown",
      location: "Adventurer's Guild",
      gifts: "Cannot receive gifts",
    },
    {
      id: "gil",
      name: "Gil",
      image: "/images/characters/gil.png",
      description:
        "An elderly retired adventurer who sits in the Adventurer's Guild. He rewards you for monster slaying milestones.",
      birthday: "Unknown",
      location: "Adventurer's Guild",
      gifts: "Cannot receive gifts",
    },
    {
      id: "henchman",
      name: "Bouncer",
      image: "/images/characters/bouncer.png",
      description: "The bouncer at the Qi's Casino on Calico Desert. Only lets you in if you have the Club Card.",
      birthday: "Unknown",
      location: "Calico Desert (Casino)",
      gifts: "Cannot receive gifts",
    },
    {
      id: "mr_qi",
      name: "Mr. Qi",
      image: "/images/characters/mr_qi.png",
      description:
        "A mysterious blue-skinned man who runs the casino and provides special challenges in the late game.",
      birthday: "Unknown",
      location: "Qi's Walnut Room (Ginger Island)",
      gifts: "Cannot receive gifts",
    },
    {
      id: "governor",
      name: "Governor",
      image: "/images/characters/governor.png",
      description: "The governor who visits Stardew Valley during the Luau festival to taste the communal soup.",
      birthday: "Unknown",
      location: "Only appears during the Luau",
      gifts: "Cannot receive gifts",
    },
    {
      id: "grandpa",
      name: "Grandpa",
      image: "/images/characters/grandpa.png",
      description:
        "Your character's grandfather who left you the farm. He evaluates your progress at the start of Year 3.",
      birthday: "Unknown",
      location: "Appears as a ghost at your farm shrine",
      gifts: "Cannot receive gifts",
    },
    {
      id: "hat_mouse",
      name: "Hat Mouse",
      image: "/images/characters/hat_mouse.png",
      description: "A mouse who sells hats from an abandoned house in Cindersap Forest. Speaks in a unique dialect.",
      birthday: "Unknown",
      location: "Hat Shop (Cindersap Forest)",
      gifts: "Cannot receive gifts",
    },
  ]

  return (
    <div className="space-y-8 characters-section">
      {/* Character section decorations with high z-index */}
      {mounted && !isMobile && (
        <>
          <div className="section-element character-element character-element-1"></div>
          <div className="section-element character-element character-element-2"></div>

          {/* Additional character decorations */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`char-deco-${index}`}
              className="section-decoration character-decoration"
              style={{
                top: `${20 + index * 15}%`,
                left: `${5 + (index % 3) * 30}%`,
                animationDelay: `${index * 0.5}s`,
              }}
            />
          ))}
        </>
      )}

      <Card className="pixel-border stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-xl text-stardew-green">{t("characters.title")}</CardTitle>
          <CardDescription className="font-pixel text-xs">{t("characters.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="marriageable">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="marriageable" className="font-pixel text-xs">
                Marriageable Characters
              </TabsTrigger>
              <TabsTrigger value="townspeople" className="font-pixel text-xs">
                Townspeople
              </TabsTrigger>
              <TabsTrigger value="special" className="font-pixel text-xs">
                Special NPCs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="marriageable">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marriageableCharacters.map((character) => (
                  <Card
                    key={character.id}
                    className="overflow-hidden stardew-card hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-square relative bg-amber-100 p-2">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={character.image || "/placeholder.svg?height=400&width=400"}
                          alt={character.name}
                          width={400}
                          height={400}
                          className="object-contain pixel-image w-full h-full"
                          priority
                        />
                      </div>
                      <div className="absolute top-2 right-2 bg-amber-200 px-2 py-1 rounded-md text-xs font-pixel">
                        {character.birthday}
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="font-pixel text-sm">{character.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm mb-2">
                        {typeof t(character.description) === "object"
                          ? JSON.stringify(t(character.description))
                          : t(character.description)}
                      </p>
                      <div className="grid grid-cols-1 gap-2 text-xs mt-3">
                        <div>
                          <span className="font-bold">{t("characters.location")}:</span> {character.location}
                        </div>
                        <div>
                          <span className="font-bold">{t("characters.gifts")}:</span>{" "}
                          {typeof t(character.gifts) === "object"
                            ? JSON.stringify(t(character.gifts))
                            : t(character.gifts)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="townspeople">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {townspeople.map((character) => (
                  <Card
                    key={character.id}
                    className="overflow-hidden stardew-card hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-square relative bg-amber-100 p-2">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={character.image || "/placeholder.svg?height=400&width=400"}
                          alt={character.name}
                          width={400}
                          height={400}
                          className="object-contain pixel-image w-full h-full"
                          priority
                        />
                      </div>
                      <div className="absolute top-2 right-2 bg-amber-200 px-2 py-1 rounded-md text-xs font-pixel">
                        {character.birthday}
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="font-pixel text-sm">{character.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm mb-2">{character.description}</p>
                      <div className="grid grid-cols-1 gap-2 text-xs mt-3">
                        <div>
                          <span className="font-bold">{t("characters.location")}:</span> {character.location}
                        </div>
                        <div>
                          <span className="font-bold">{t("characters.gifts")}:</span> {character.gifts}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="special">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    id: "professor_snail",
                    name: "Professor Snail",
                    image: "/images/characters/professor_snail.png",
                    description:
                      "A researcher studying the wildlife on Ginger Island. He'll trade Golden Walnuts for island artifacts.",
                    birthday: "Unknown",
                    location: "Ginger Island (West)",
                    gifts: "Ginger, Magma Cap, Cinder Shard",
                  },
                  {
                    id: "birdie",
                    name: "Birdie",
                    image: "/images/characters/birdie.png",
                    description:
                      "An elderly woman who lives alone on Ginger Island. She has a connection to Leo's past.",
                    birthday: "Unknown",
                    location: "Ginger Island (West)",
                    gifts: "Ostrich Egg, Poi, Taro Root",
                  },
                  {
                    id: "gunther",
                    name: "Gunther",
                    image: "/images/characters/gunther.png",
                    description:
                      "The curator of the town museum. He doesn't leave the museum and cannot receive gifts.",
                    birthday: "Unknown",
                    location: "Museum",
                    gifts: "Cannot receive gifts",
                  },
                  {
                    id: "morris",
                    name: "Morris",
                    image: "/images/characters/morris.png",
                    description:
                      "The manager of the JojaMart. He's trying to convince townspeople to shop at Joja instead of Pierre's.",
                    birthday: "Unknown",
                    location: "JojaMart",
                    gifts: "Cannot receive gifts",
                  },
                  {
                    id: "marlon",
                    name: "Marlon",
                    image: "/images/characters/marlon.png",
                    description:
                      "The owner of the Adventurer's Guild. He sells weapons and provides monster-slaying quests.",
                    birthday: "Unknown",
                    location: "Adventurer's Guild",
                    gifts: "Cannot receive gifts",
                  },
                  {
                    id: "gil",
                    name: "Gil",
                    image: "/images/characters/gil.png",
                    description:
                      "An elderly retired adventurer who sits in the Adventurer's Guild. He rewards you for monster slaying milestones.",
                    birthday: "Unknown",
                    location: "Adventurer's Guild",
                    gifts: "Cannot receive gifts",
                  },
                  {
                    id: "bouncer",
                    name: "Bouncer",
                    image: "/images/characters/bouncer.png",
                    description:
                      "The bouncer at the Qi's Casino on Calico Desert. Only lets you in if you have the Club Card.",
                    birthday: "Unknown",
                    location: "Calico Desert (Casino)",
                    gifts: "Cannot receive gifts",
                  },
                  {
                    id: "mr_qi",
                    name: "Mr. Qi",
                    image: "/images/characters/mr_qi.png",
                    description:
                      "A mysterious blue-skinned man who runs the casino and provides special challenges in the late game.",
                    birthday: "Unknown",
                    location: "Qi's Walnut Room (Ginger Island)",
                    gifts: "Cannot receive gifts",
                  },
                  {
                    id: "governor",
                    name: "Governor",
                    image: "/images/characters/governor.png",
                    description:
                      "The governor who visits Stardew Valley during the Luau festival to taste the communal soup.",
                    birthday: "Unknown",
                    location: "Only appears during the Luau",
                    gifts: "Cannot receive gifts",
                  },
                  {
                    id: "grandpa",
                    name: "Grandpa",
                    image: "/images/characters/grandpa.png",
                    description:
                      "Your character's grandfather who left you the farm. He evaluates your progress at the start of Year 3.",
                    birthday: "Unknown",
                    location: "Appears as a ghost at your farm shrine",
                    gifts: "Cannot receive gifts",
                  },
                  {
                    id: "hat_mouse",
                    name: "Hat Mouse",
                    image: "/images/characters/hat_mouse.png",
                    description:
                      "A mouse who sells hats from an abandoned house in Cindersap Forest. Speaks in a unique dialect.",
                    birthday: "Unknown",
                    location: "Hat Shop (Cindersap Forest)",
                    gifts: "Cannot receive gifts",
                  },
                ].map((character) => (
                  <Card
                    key={character.id}
                    className="overflow-hidden stardew-card hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-square relative bg-amber-100 p-2">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={character.image || "/placeholder.svg?height=400&width=400"}
                          alt={character.name}
                          width={400}
                          height={400}
                          className="object-contain pixel-image w-full h-full"
                          priority
                        />
                      </div>
                      <div className="absolute top-2 right-2 bg-amber-200 px-2 py-1 rounded-md text-xs font-pixel">
                        {character.birthday}
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="font-pixel text-sm">{character.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm mb-2">{character.description}</p>
                      <div className="grid grid-cols-1 gap-2 text-xs mt-3">
                        <div>
                          <span className="font-bold">{t("characters.location")}:</span> {character.location}
                        </div>
                        <div>
                          <span className="font-bold">{t("characters.gifts")}:</span> {character.gifts}
                        </div>
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
