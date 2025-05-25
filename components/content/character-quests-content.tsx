import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function CharacterQuestsContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Character Quests</h2>
        <p className="text-muted-foreground">
          Many characters in Stardew Valley offer special quests that provide unique rewards and deepen your
          relationship with them.
        </p>
      </div>

      <Tabs defaultValue="story" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="story">Story Quests</TabsTrigger>
          <TabsTrigger value="friendship">Friendship Quests</TabsTrigger>
          <TabsTrigger value="special">Special Quests</TabsTrigger>
        </TabsList>

        <TabsContent value="story" className="space-y-4">
          <StoryQuests />
        </TabsContent>

        <TabsContent value="friendship" className="space-y-4">
          <FriendshipQuests />
        </TabsContent>

        <TabsContent value="special" className="space-y-4">
          <SpecialQuests />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Quest Tips</CardTitle>
          <CardDescription>Important information about character quests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Most character quests are time-sensitive and will expire if not completed within the specified time frame.
            </li>
            <li>Some quests are only available during certain seasons or weather conditions.</li>
            <li>Completing character quests often rewards you with friendship points in addition to other rewards.</li>
            <li>Special quests may unlock new areas, items, or game mechanics.</li>
            <li>Check the quest log in your menu to track active quests and their requirements.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function StoryQuests() {
  return (
    <div className="space-y-4">
      <QuestCard
        title="Jodi's Request"
        character="Jodi"
        description="Jodi asks you to bring her a Cauliflower for a special dinner she's preparing for her son's return."
        requirements="1 Cauliflower"
        reward="Friendship with Jodi, 150g"
        availability="Spring, Year 1"
        timeLimit="3 days"
      />

      <QuestCard
        title="Clint's Special Order"
        character="Clint"
        description="Clint asks you to deliver an amethyst to Emily as a gift, but he's too shy to do it himself."
        requirements="1 Amethyst"
        reward="Friendship with Clint, 100g"
        availability="After reaching 3 hearts with Clint"
        timeLimit="2 days"
      />

      <QuestCard
        title="Mayor's Shorts"
        character="Lewis"
        description="Mayor Lewis lost his purple shorts and asks you to find them discreetly."
        requirements="Find Lewis's purple shorts (in Marnie's bedroom)"
        reward="750g, Friendship with Lewis"
        availability="After reaching 2 hearts with Lewis"
        timeLimit="None"
      />

      <QuestCard
        title="Robin's Axe"
        character="Robin"
        description="Robin lost her axe near the mountain lake and asks you to find it."
        requirements="Find Robin's axe"
        reward="250g, Friendship with Robin"
        availability="Spring, Year 1"
        timeLimit="2 days"
      />

      <QuestCard
        title="Wizard's Ink"
        character="Wizard"
        description="The Wizard needs void essence for a special ink he's brewing."
        requirements="1 Void Essence"
        reward="Friendship with Wizard, Special Charm"
        availability="After unlocking the Sewers"
        timeLimit="5 days"
      />

      <QuestCard
        title="Demetrius's Experiment"
        character="Demetrius"
        description="Demetrius asks you to collect a cave insect for his research."
        requirements="1 Cave Insect"
        reward="Friendship with Demetrius, 1 Rare Seed"
        availability="Summer, Year 1"
        timeLimit="3 days"
      />
    </div>
  )
}

function FriendshipQuests() {
  return (
    <div className="space-y-4">
      <QuestCard
        title="Sebastian's Solarian Chronicles"
        character="Sebastian"
        description="Sebastian invites you to play the Solarian Chronicles board game with him and his friends."
        requirements="Visit Sebastian's room when he's there (6+ hearts)"
        reward="Significant friendship boost with Sebastian"
        availability="After reaching 6 hearts with Sebastian"
        timeLimit="None"
      />

      <QuestCard
        title="Sam's Band Practice"
        character="Sam"
        description="Sam asks for your help with his band's first performance."
        requirements="Attend the band practice at Sam's house (4+ hearts)"
        reward="Significant friendship boost with Sam"
        availability="After reaching 4 hearts with Sam"
        timeLimit="None"
      />

      <QuestCard
        title="Penny's Reading Session"
        character="Penny"
        description="Penny invites you to help with a reading session for Jas and Vincent."
        requirements="Meet Penny at the library during her teaching hours (4+ hearts)"
        reward="Significant friendship boost with Penny"
        availability="After reaching 4 hearts with Penny"
        timeLimit="None"
      />

      <QuestCard
        title="Leah's Art Show"
        character="Leah"
        description="Leah is preparing for her first art show and needs your support."
        requirements="Attend Leah's art show in town (8+ hearts)"
        reward="Significant friendship boost with Leah"
        availability="After reaching 8 hearts with Leah"
        timeLimit="None"
      />

      <QuestCard
        title="Abigail's Adventure"
        character="Abigail"
        description="Abigail wants to explore the mines but needs your protection."
        requirements="Meet Abigail at the mines entrance (10+ hearts)"
        reward="Significant friendship boost with Abigail"
        availability="After reaching 10 hearts with Abigail"
        timeLimit="None"
      />

      <QuestCard
        title="Harvey's Hot Air Balloon"
        character="Harvey"
        description="Harvey wants to overcome his fear of heights with a hot air balloon ride."
        requirements="Meet Harvey at his clinic (10+ hearts)"
        reward="Significant friendship boost with Harvey"
        availability="After reaching 10 hearts with Harvey"
        timeLimit="None"
      />
    </div>
  )
}

function SpecialQuests() {
  return (
    <div className="space-y-4">
      <QuestCard
        title="The Mysterious Qi"
        character="Mr. Qi"
        description="Mr. Qi challenges you to reach the bottom of the mines and find his secret note."
        requirements="Reach level 25 in the Skull Cavern"
        reward="Club Card (access to the Casino)"
        availability="After completing the Community Center"
        timeLimit="None"
      />

      <QuestCard
        title="Goblin Problem"
        character="Wizard"
        description="The Wizard asks you to deal with a goblin problem in the mountains."
        requirements="Defeat the goblin in the mountains cave"
        reward="Access to the Witch's Swamp"
        availability="After reaching 4 hearts with the Wizard"
        timeLimit="None"
      />

      <QuestCard
        title="Dark Talisman"
        character="Krobus"
        description="Krobus needs a Dark Talisman to access a sealed part of the sewers."
        requirements="Find the Dark Talisman in the Mutant Bug Lair"
        reward="Access to the Witch's Hut"
        availability="After reaching 4 hearts with Krobus"
        timeLimit="None"
      />

      <QuestCard
        title="The Missing Bundle"
        character="Junimos"
        description="The Junimos have one final bundle for you to complete after the Community Center is restored."
        requirements="Complete the Missing Bundle with various rare items"
        reward="Movie Theater unlocked in town"
        availability="After completing the Community Center"
        timeLimit="None"
      />

      <QuestCard
        title="Caroline's Sunroom"
        character="Caroline"
        description="Caroline invites you to visit her private sunroom behind Pierre's shop."
        requirements="Enter the sunroom when Caroline is there (2+ hearts)"
        reward="Tea Sapling recipe"
        availability="After reaching 2 hearts with Caroline"
        timeLimit="None"
      />

      <QuestCard
        title="Willy's Boat"
        character="Willy"
        description="Willy needs help repairing his old boat at the back of his shop."
        requirements="Hardwood, Battery Pack, Iridium Bar"
        reward="Access to Ginger Island"
        availability="After completing the Community Center"
        timeLimit="None"
      />
    </div>
  )
}

interface QuestCardProps {
  title: string
  character: string
  description: string
  requirements: string
  reward: string
  availability: string
  timeLimit: string
}

function QuestCard({ title, character, description, requirements, reward, availability, timeLimit }: QuestCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <Badge>{character}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-semibold">Requirements:</span> {requirements}
            </div>
            <div>
              <span className="font-semibold">Reward:</span> {reward}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-semibold">Availability:</span> {availability}
            </div>
            <div>
              <span className="font-semibold">Time Limit:</span> {timeLimit}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
