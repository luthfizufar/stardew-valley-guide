"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from "@/hooks/use-translations"
import Image from "next/image"
import { Heart, Users, Gift, Star, AlertCircle, Crown, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function MarriageContent() {
  const { t } = useTranslations()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="space-y-8 marriage-section">
      {/* Marriage section decorations with high z-index */}
      {mounted && !isMobile && (
        <>
          <div className="section-element marriage-element marriage-element-1"></div>
          <div className="section-element marriage-element marriage-element-2"></div>

          {/* Additional heart decorations */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`heart-deco-${index}`}
              className="heart-decoration"
              style={{
                top: `${10 + index * 15}%`,
                right: `${10 + (index % 3) * 20}%`,
                animation: `float-decoration ${3 + index}s infinite ease-in-out`,
                animationDelay: `${index * 0.7}s`,
                transform: `scale(${0.6 + (index % 3) * 0.2}) rotate(45deg)`,
              }}
            />
          ))}
        </>
      )}

      <Card className="pixel-border stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-xl text-stardew-green">Marriage & Romance Guide</CardTitle>
          <CardDescription className="font-pixel text-xs">
            Complete guide to romance, marriage, and family life in Stardew Valley
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="marriage-basics">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="marriage-basics" className="font-pixel text-xs">
                Marriage Basics
              </TabsTrigger>
              <TabsTrigger value="coop-marriage" className="font-pixel text-xs">
                Co-op Marriage
              </TabsTrigger>
              <TabsTrigger value="candidates" className="font-pixel text-xs">
                Candidates
              </TabsTrigger>
              <TabsTrigger value="family-life" className="font-pixel text-xs">
                Family Life
              </TabsTrigger>
            </TabsList>

            <TabsContent value="marriage-basics">
              <MarriageBasicsContent />
            </TabsContent>

            <TabsContent value="coop-marriage">
              <CoopMarriageContent />
            </TabsContent>

            <TabsContent value="candidates">
              <CandidatesContent />
            </TabsContent>

            <TabsContent value="family-life">
              <FamilyLifeContent />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function MarriageBasicsContent() {
  const marriageSteps = [
    {
      id: "hearts",
      title: "Reach 8 Hearts",
      description: "Build friendship to 8 hearts with your chosen candidate",
      icon: Heart,
      details: [
        "Give 2 gifts per week (loved gifts give 80 points)",
        "Talk to them daily (+20 friendship points)",
        "Complete their heart events",
        "Participate in festivals with them",
      ],
    },
    {
      id: "bouquet",
      title: "Give a Bouquet",
      description: "Purchase and give a bouquet to start dating",
      icon: Gift,
      details: [
        "Buy bouquet from Pierre's for 200g",
        "Only works at 8+ hearts",
        "Unlocks 9th and 10th heart",
        "Makes you 'dating' - can date multiple people",
      ],
    },
    {
      id: "pendant",
      title: "Mermaid's Pendant",
      description: "Propose with the Mermaid's Pendant",
      icon: Crown,
      details: [
        "Buy from Old Mariner on beach (rainy day, 5,000g)",
        "Requires 10 hearts with candidate",
        "Must have upgraded house (kitchen)",
        "Proposal happens immediately when given",
      ],
    },
    {
      id: "ceremony",
      title: "Wedding Ceremony",
      description: "Attend your wedding 3 days after proposal",
      icon: Star,
      details: [
        "Ceremony happens automatically after 3 days",
        "All villagers attend (except other marriage candidates)",
        "Spouse moves into your farmhouse",
        "Gain access to spouse room and benefits",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="relative">
        <Image
          src="/images/marriage/marriage-guide.png"
          alt="Marriage Guide"
          width={800}
          height={400}
          className="rounded-lg mx-auto"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {marriageSteps.map((step, index) => (
          <Card key={step.id} className="overflow-hidden border-2 border-amber-200 stardew-card">
            <CardHeader className="bg-amber-100 p-4">
              <div className="flex items-center gap-2">
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-pixel">
                  {index + 1}
                </div>
                <CardTitle className="font-pixel text-sm">{step.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm mb-3">{step.description}</p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                {step.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-amber-100 stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-sm">Marriage Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Daily Benefits:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Spouse helps with farm work (watering, feeding animals)</li>
                <li>Daily gifts (food, resources, or money)</li>
                <li>Cooking meals that restore energy</li>
                <li>Repairing fences and equipment</li>
                <li>Occasional rare gifts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Special Rewards:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Stardrop from spouse (permanent energy increase)</li>
                <li>Spouse's unique room decoration</li>
                <li>Special dialogue and cutscenes</li>
                <li>Ability to have children</li>
                <li>Emotional support and companionship</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> You can only marry one person at a time. Dating multiple people has no negative
          consequences, but marriage is exclusive. You can divorce and remarry, but it costs 50,000g and affects
          friendship with your ex-spouse.
        </AlertDescription>
      </Alert>
    </div>
  )
}

function CoopMarriageContent() {
  return (
    <div className="space-y-6">
      <Alert>
        <Users className="h-4 w-4" />
        <AlertDescription>
          <strong>Co-op Marriage:</strong> In multiplayer mode, players can marry each other! This creates unique
          gameplay opportunities and shared benefits.
        </AlertDescription>
      </Alert>

      <Card className="stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-lg flex items-center gap-2">
            <Users className="w-5 h-5" />
            Player-to-Player Marriage Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Prerequisites:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Both players must have upgraded their house (kitchen)</li>
                  <li>Both players must be in the same multiplayer session</li>
                  <li>Both players must consent to the marriage</li>
                  <li>Neither player can be married to an NPC</li>
                  <li>Wedding Ring must be crafted by the proposing player</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  Wedding Ring Recipe:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>5 Iridium Bars</li>
                  <li>1 Prismatic Shard</li>
                  <li>Recipe purchased from Traveling Cart (500g)</li>
                  <li>Can only be used once per game</li>
                  <li>Must be given directly to the other player</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-lg">Co-op Marriage Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4">
              {[
                {
                  step: 1,
                  title: "Preparation Phase",
                  description: "Both players prepare for marriage",
                  details: [
                    "Upgrade both farmhouses to include kitchen",
                    "Gather materials for Wedding Ring (5 Iridium Bars + 1 Prismatic Shard)",
                    "Purchase Wedding Ring recipe from Traveling Cart",
                    "Decide who will propose (craft the ring)",
                    "Choose a wedding date that works for both players",
                  ],
                },
                {
                  step: 2,
                  title: "Proposal",
                  description: "One player proposes to the other",
                  details: [
                    "Craft the Wedding Ring at any crafting station",
                    "Give the Wedding Ring directly to your partner",
                    "Partner must accept the proposal",
                    "Wedding is automatically scheduled for 3 days later",
                    "Both players receive notification of wedding date",
                  ],
                },
                {
                  step: 3,
                  title: "Wedding Day",
                  description: "The wedding ceremony takes place",
                  details: [
                    "Both players must be online and in the same session",
                    "Ceremony happens automatically at 6:00 AM",
                    "All NPCs attend the wedding (except other marriage candidates)",
                    "Special wedding cutscene plays for both players",
                    "Marriage status is immediately active",
                  ],
                },
                {
                  step: 4,
                  title: "Married Life Setup",
                  description: "Establish your shared married life",
                  details: [
                    "Decide whose farmhouse to live in (or alternate)",
                    "Share resources and coordinate farm activities",
                    "Plan joint adventures and projects",
                    "Enjoy shared marriage benefits",
                    "Consider having children together",
                  ],
                },
              ].map((phase) => (
                <div key={phase.step} className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline">Step {phase.step}</Badge>
                    <h4 className="font-semibold">{phase.title}</h4>
                  </div>
                  <p className="text-sm mb-3">{phase.description}</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    {phase.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-lg">Co-op Marriage Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Unique Co-op Benefits:
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <strong>Shared Energy Pool:</strong> Both players can benefit from spouse energy restoration
                </li>
                <li>
                  <strong>Coordinated Farm Work:</strong> Plan and execute large-scale farming operations together
                </li>
                <li>
                  <strong>Resource Sharing:</strong> Easier coordination of materials and money
                </li>
                <li>
                  <strong>Joint Adventures:</strong> Explore mines and Skull Cavern as a team
                </li>
                <li>
                  <strong>Shared Children:</strong> Both players are parents to adopted/born children
                </li>
                <li>
                  <strong>Double Efficiency:</strong> Accomplish tasks faster with coordination
                </li>
                <li>
                  <strong>Emotional Support:</strong> Share the farming journey with a real person
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Marriage Mechanics:
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <strong>Shared Farmhouse:</strong> Both players can use either farmhouse
                </li>
                <li>
                  <strong>Joint Bank Account:</strong> Money is automatically shared
                </li>
                <li>
                  <strong>Coordinated Schedules:</strong> Plan activities around both players' availability
                </li>
                <li>
                  <strong>Shared Achievements:</strong> Many achievements count for both players
                </li>
                <li>
                  <strong>Communication:</strong> Built-in chat and emote system for coordination
                </li>
                <li>
                  <strong>Divorce Option:</strong> Players can divorce each other if needed
                </li>
                <li>
                  <strong>Remarriage:</strong> Can marry other players or NPCs after divorce
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="stardew-card bg-green-50">
        <CardHeader>
          <CardTitle className="font-pixel text-lg">Co-op Marriage Tips & Strategies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Communication is Key:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Use voice chat or external communication for better coordination</li>
                <li>Plan daily activities and long-term goals together</li>
                <li>Discuss resource allocation and farm layout decisions</li>
                <li>Share knowledge about game mechanics and strategies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Optimal Cooperation Strategies:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Specialize in different skills (one focuses on farming, other on mining)</li>
                <li>Coordinate crop planting for maximum efficiency</li>
                <li>Share the workload of animal care and artisan production</li>
                <li>Plan joint expeditions to Skull Cavern with shared supplies</li>
                <li>Alternate who handles different daily tasks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Relationship Maintenance:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Regularly give gifts to each other (works like NPC relationships)</li>
                <li>Participate in festivals together</li>
                <li>Share achievements and celebrate milestones</li>
                <li>Be patient with different play styles and schedules</li>
                <li>Respect each other's gaming preferences and goals</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important Notes:</strong> Player marriage requires both players to be actively playing together. If
          one player is frequently offline, consider the impact on shared farm management. The Wedding Ring recipe is
          expensive, so plan accordingly!
        </AlertDescription>
      </Alert>
    </div>
  )
}

function CandidatesContent() {
  const marriageCandidates = [
    {
      name: "Abigail",
      profession: "Adventurer",
      loves: [
        "Amethyst",
        "Banana Pudding",
        "Blackberry Cobbler",
        "Chocolate Cake",
        "Pufferfish",
        "Pumpkin",
        "Spicy Eel",
      ],
      personality: "Adventurous, rebellious, loves exploring",
      location: "Pierre's General Store",
      schedule: "Varies by season, often at cemetery or mines",
      benefits: "Gives bombs, helps with mining, adventurous spirit",
    },
    {
      name: "Alex",
      profession: "Athlete",
      loves: ["Complete Breakfast", "Salmon Dinner"],
      personality: "Athletic, confident, family-oriented",
      location: "1 River Road (with Evelyn and George)",
      schedule: "Beach in summer, gym in winter",
      benefits: "Gives breakfast, helps with farm work, motivational",
    },
    {
      name: "Elliott",
      profession: "Writer",
      loves: ["Crab Cakes", "Duck Feather", "Lobster", "Pomegranate", "Tom Kha Soup"],
      personality: "Romantic, poetic, artistic",
      location: "Elliott's Cabin (beach)",
      schedule: "Beach, library, saloon",
      benefits: "Gives coffee, writes poems, romantic gestures",
    },
    {
      name: "Emily",
      profession: "Tailor/Bartender",
      loves: ["Amethyst", "Aquamarine", "Cloth", "Emerald", "Jade", "Ruby", "Survival Burger", "Topaz", "Wool"],
      personality: "Spiritual, creative, optimistic",
      location: "2 Willow Lane (with Haley)",
      schedule: "Saloon evenings, home during day",
      benefits: "Gives cloth, helps with tailoring, positive energy",
    },
    {
      name: "Haley",
      profession: "Photographer",
      loves: ["Coconut", "Fruit Salad", "Pink Cake", "Sunflower"],
      personality: "Fashion-conscious, initially superficial but caring",
      location: "2 Willow Lane (with Emily)",
      schedule: "Town square, beach, home",
      benefits: "Gives breakfast, helps with photography, style advice",
    },
    {
      name: "Harvey",
      profession: "Doctor",
      loves: ["Coffee", "Pickles", "Super Meal", "Truffle Oil", "Wine"],
      personality: "Caring, anxious, health-conscious",
      location: "Medical Clinic",
      schedule: "Clinic during day, aerobics radio show",
      benefits: "Gives coffee, health items, medical care",
    },
    {
      name: "Leah",
      profession: "Artist",
      loves: ["Goat Cheese", "Poppyseed Muffin", "Salad", "Stir Fry", "Truffle", "Vegetable Medley", "Wine"],
      personality: "Artistic, nature-loving, independent",
      location: "Leah's Cottage (Cindersap Forest)",
      schedule: "Forest, beach, cottage",
      benefits: "Gives salad, helps with foraging, artistic inspiration",
    },
    {
      name: "Maru",
      profession: "Nurse/Inventor",
      loves: [
        "Battery Pack",
        "Cauliflower",
        "Cheese Cauliflower",
        "Diamond",
        "Gold Bar",
        "Iridium Bar",
        "Miner's Treat",
        "Pepper Poppers",
        "Radioactive Bar",
        "Rhubarb Pie",
        "Strawberry",
      ],
      personality: "Intelligent, inventive, helpful",
      location: "Mountain (with Robin, Demetrius, Sebastian)",
      schedule: "Clinic, home, observatory",
      benefits: "Gives bombs, helps with machines, scientific knowledge",
    },
    {
      name: "Penny",
      profession: "Teacher",
      loves: [
        "Diamond",
        "Emerald",
        "Melon",
        "Poppy",
        "Poppyseed Muffin",
        "Red Plate",
        "Roots Platter",
        "Sandfish",
        "Tom Kha Soup",
      ],
      personality: "Kind, nurturing, loves children",
      location: "Trailer (with Pam)",
      schedule: "Library, teaching children, home",
      benefits: "Gives food, helps with children, educational support",
    },
    {
      name: "Sam",
      profession: "Musician",
      loves: ["Cactus Fruit", "Maple Bar", "Pizza", "Tigerseye"],
      personality: "Energetic, musical, family-oriented",
      location: "1 Willow Lane (with Jodi, Vincent, Kent)",
      schedule: "Town, band practice, home",
      benefits: "Gives food, musical entertainment, youthful energy",
    },
    {
      name: "Sebastian",
      profession: "Programmer",
      loves: ["Frozen Tear", "Obsidian", "Pumpkin Soup", "Sashimi", "Void Egg"],
      personality: "Introverted, independent, motorcycle enthusiast",
      location: "Mountain (with Robin, Demetrius, Maru)",
      schedule: "Basement, mountain lake, town",
      benefits: "Gives coffee, helps with technology, quiet companionship",
    },
    {
      name: "Shane",
      profession: "Ranch Hand",
      loves: ["Beer", "Hot Pepper", "Pepper Poppers", "Pizza"],
      personality: "Troubled but caring, loves animals",
      location: "Marnie's Ranch",
      schedule: "Ranch, JojaMart, Saloon",
      benefits: "Gives pepper poppers, blue chickens, emotional depth",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {marriageCandidates.map((candidate) => (
          <Card key={candidate.name} className="stardew-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-pixel text-lg">{candidate.name}</CardTitle>
                <Badge variant="outline">{candidate.profession}</Badge>
              </div>
              <CardDescription>{candidate.personality}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-sm">Location:</span>
                    <p className="text-sm">{candidate.location}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-sm">Schedule:</span>
                    <p className="text-sm">{candidate.schedule}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-sm">Marriage Benefits:</span>
                    <p className="text-sm">{candidate.benefits}</p>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-sm">Loved Gifts:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {candidate.loves.slice(0, 6).map((gift) => (
                      <Badge key={gift} variant="secondary" className="text-xs">
                        {gift}
                      </Badge>
                    ))}
                    {candidate.loves.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{candidate.loves.length - 6} more
                      </Badge>
                    )}
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

function FamilyLifeContent() {
  return (
    <div className="space-y-6">
      <Card className="stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-lg">Having Children</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Adoption Process:</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Must be married for at least 7 days</li>
                <li>House must be upgraded to include nursery</li>
                <li>Spouse will ask about having children</li>
                <li>Choose "Yes" to start adoption process</li>
                <li>Child arrives after 14 days</li>
                <li>Can have up to 2 children total</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Child Development:</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <strong>Baby Stage:</strong> 14 days, sleeps in crib
                </li>
                <li>
                  <strong>Toddler Stage:</strong> Crawls around house
                </li>
                <li>
                  <strong>Child Stage:</strong> Walks and talks
                </li>
                <li>Children never age beyond toddler/child stage</li>
                <li>Can interact with children daily</li>
                <li>Children have unique dialogue</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-lg">Spouse Daily Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Helpful Activities:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  <strong>Watering Crops:</strong> Spouse may water some crops for you
                </li>
                <li>
                  <strong>Feeding Animals:</strong> Helps feed animals in coops and barns
                </li>
                <li>
                  <strong>Repairing Fences:</strong> Occasionally repairs broken fences
                </li>
                <li>
                  <strong>Cooking Meals:</strong> Prepares food that restores energy
                </li>
                <li>
                  <strong>Gift Giving:</strong> Provides daily gifts (food, resources, money)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Spouse Locations:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Spouse room in your farmhouse</li>
                <li>Kitchen and living areas</li>
                <li>Front porch and farm areas</li>
                <li>Occasionally visits their old locations in town</li>
                <li>May go to festivals and events</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="stardew-card">
        <CardHeader>
          <CardTitle className="font-pixel text-lg">Marriage Maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Keeping Spouse Happy:</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Give gifts regularly (loved gifts preferred)</li>
                <li>Talk to spouse daily</li>
                <li>Kiss spouse daily (+12 friendship points)</li>
                <li>Attend festivals together</li>
                <li>Don't give gifts to other marriage candidates</li>
                <li>Maintain 10+ hearts for best benefits</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Divorce & Remarriage:</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Divorce costs 50,000g at Mayor Lewis's house</li>
                <li>Ex-spouse friendship drops to 0 hearts</li>
                <li>Ex-spouse has negative dialogue</li>
                <li>Children remain but become sad</li>
                <li>Can remarry same person or someone new</li>
                <li>Memory wipe available from Witch's Hut</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Heart className="h-4 w-4" />
        <AlertDescription>
          <strong>Pro Tip:</strong> Marriage in Stardew Valley is a long-term commitment that significantly enhances
          your farming experience. Choose a spouse whose personality and benefits align with your playstyle for the most
          enjoyable experience!
        </AlertDescription>
      </Alert>
    </div>
  )
}
