import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function FriendshipMechanicsContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Friendship Mechanics</h2>
        <p className="text-muted-foreground">
          Building relationships with the residents of Pelican Town is an important aspect of Stardew Valley.
          Understanding how friendship works will help you form meaningful connections.
        </p>
      </div>

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="gifts">Gifts</TabsTrigger>
          <TabsTrigger value="events">Events & Activities</TabsTrigger>
          <TabsTrigger value="decay">Decay & Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-4">
          <FriendshipBasics />
        </TabsContent>

        <TabsContent value="gifts" className="space-y-4">
          <GiftSystem />
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <EventsActivities />
        </TabsContent>

        <TabsContent value="decay" className="space-y-4">
          <DecayMaintenance />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function FriendshipBasics() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Friendship Points & Hearts</CardTitle>
          <CardDescription>Understanding the friendship measurement system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Friendship in Stardew Valley is measured in friendship points, with hearts displayed in the social tab of
            your menu. Each heart represents 250 friendship points.
          </p>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>1 Heart (250 points)</span>
              <Progress value={20} className="w-1/2" />
            </div>
            <div className="flex items-center justify-between">
              <span>5 Hearts (1250 points)</span>
              <Progress value={50} className="w-1/2" />
            </div>
            <div className="flex items-center justify-between">
              <span>10 Hearts (2500 points)</span>
              <Progress value={100} className="w-1/2" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Maximum Friendship Levels:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Regular villagers: 10 hearts (2500 points)</li>
              <li>Marriage candidates (before dating): 8 hearts (2000 points)</li>
              <li>Marriage candidates (while dating): 10 hearts (2500 points)</li>
              <li>Spouse: 14 hearts (3500 points)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dating & Marriage</CardTitle>
          <CardDescription>Taking relationships to the next level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="font-semibold">Dating:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>To date a marriage candidate, you must reach 8 hearts of friendship.</li>
              <li>Purchase a Bouquet from Pierre's Shop for 100g.</li>
              <li>Give the Bouquet to the character you wish to date.</li>
              <li>This allows friendship to increase up to 10 hearts.</li>
              <li>You can date multiple characters simultaneously.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Marriage:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>To marry a character, you must be dating them (have given them a Bouquet).</li>
              <li>Reach 10 hearts with the character.</li>
              <li>Upgrade your house to include a kitchen (first house upgrade).</li>
              <li>Purchase a Mermaid's Pendant from the Old Mariner on the beach (appears on rainy days) for 5000g.</li>
              <li>Give the Mermaid's Pendant to your chosen partner.</li>
              <li>The wedding will occur 3 days later.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">After Marriage:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your spouse will move into your farmhouse.</li>
              <li>They will have their own room added to your house.</li>
              <li>They may help around the farm by watering crops, feeding animals, or repairing fences.</li>
              <li>You can have up to two children with your spouse.</li>
              <li>Friendship can now increase to 14 hearts.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function GiftSystem() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Gift Preferences</CardTitle>
          <CardDescription>Every character has unique gift preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Each character in Stardew Valley has their own preferences for gifts, ranging from loved gifts (which give
            the most friendship points) to hated gifts (which decrease friendship).
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preference</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Birthday Bonus</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100">Loved</Badge>
                </TableCell>
                <TableCell>+80 points</TableCell>
                <TableCell>×8 (640 points)</TableCell>
                <TableCell>Abigail loves Amethyst</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">Liked</Badge>
                </TableCell>
                <TableCell>+45 points</TableCell>
                <TableCell>×8 (360 points)</TableCell>
                <TableCell>Most villagers like Artisan Goods</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Neutral</Badge>
                </TableCell>
                <TableCell>+20 points</TableCell>
                <TableCell>×8 (160 points)</TableCell>
                <TableCell>Most villagers are neutral about Eggs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                    Disliked
                  </Badge>
                </TableCell>
                <TableCell>-20 points</TableCell>
                <TableCell>×8 (-160 points)</TableCell>
                <TableCell>Most villagers dislike Bait</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">Hated</Badge>
                </TableCell>
                <TableCell>-40 points</TableCell>
                <TableCell>×8 (-320 points)</TableCell>
                <TableCell>Most villagers hate Trash</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="space-y-2">
            <p className="font-semibold">Gift Giving Rules:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>You can give each character up to two gifts per week.</li>
              <li>The gift counter resets on Sunday.</li>
              <li>Birthdays are special - gifts given on a character's birthday have 8× the normal effect.</li>
              <li>Giving a gift on the Feast of the Winter Star doesn't count toward the weekly limit.</li>
              <li>Gifts given during quests don't count toward the weekly limit.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Universal Gifts</CardTitle>
          <CardDescription>Gifts that most characters like or love</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="font-semibold">Universally Loved Gifts:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Prismatic Shard (except Haley)</li>
              <li>Pearl</li>
              <li>Rabbit's Foot (except Penny)</li>
              <li>Golden Pumpkin</li>
              <li>Magic Rock Candy</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Universally Liked Gifts:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Artisan Goods (except Oil)</li>
              <li>Cooked Meals (with some exceptions)</li>
              <li>Flowers (except Poppies for Sandy)</li>
              <li>Fruit Tree Fruits</li>
              <li>Gems (except Quartz)</li>
              <li>Vegetables (with some exceptions)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Universally Disliked/Hated Gifts:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Trash items (Trash, Driftwood, Soggy Newspaper, etc.)</li>
              <li>Bait and Tackle</li>
              <li>Sap</li>
              <li>Clay</li>
              <li>Bombs (except for Kent, who likes them)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function EventsActivities() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Daily Interactions</CardTitle>
          <CardDescription>Simple ways to build friendship every day</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Interaction</TableHead>
                <TableHead>Friendship Points</TableHead>
                <TableHead>Limit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Talking</TableCell>
                <TableCell>+10 points</TableCell>
                <TableCell>Once per day</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Giving a gift</TableCell>
                <TableCell>Varies by preference</TableCell>
                <TableCell>Twice per week</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Completing a request on the Help Wanted board</TableCell>
                <TableCell>+150 points</TableCell>
                <TableCell>Per request</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Dancing with someone at the Flower Dance</TableCell>
                <TableCell>+250 points</TableCell>
                <TableCell>Once per year</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Giving a gift at the Feast of the Winter Star</TableCell>
                <TableCell>Varies by preference (doesn't count toward weekly limit)</TableCell>
                <TableCell>Once per year</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="space-y-2">
            <p className="font-semibold">Tips for Daily Interactions:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Talk to villagers every day - it's a small boost but adds up over time.</li>
              <li>Learn characters' schedules to find them easily.</li>
              <li>Carry gifts with you when exploring the town.</li>
              <li>Check the calendar for birthdays and special events.</li>
              <li>Prioritize talking to characters whose friendship is decaying.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Special Events</CardTitle>
          <CardDescription>Festivals and events that affect friendship</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="font-semibold">Seasonal Festivals:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <span className="font-medium">Egg Festival (Spring 13)</span> - Participating in the egg hunt doesn't
                affect friendship.
              </li>
              <li>
                <span className="font-medium">Flower Dance (Spring 24)</span> - Dancing with a villager gives +250
                friendship points.
              </li>
              <li>
                <span className="font-medium">Luau (Summer 11)</span> - The quality of your soup contribution affects
                the Governor's reaction but doesn't directly impact friendship.
              </li>
              <li>
                <span className="font-medium">Dance of the Moonlight Jellies (Summer 28)</span> - Attending doesn't
                affect friendship.
              </li>
              <li>
                <span className="font-medium">Stardew Valley Fair (Fall 16)</span> - Participating in games doesn't
                affect friendship.
              </li>
              <li>
                <span className="font-medium">Spirit's Eve (Fall 27)</span> - Attending doesn't affect friendship.
              </li>
              <li>
                <span className="font-medium">Festival of Ice (Winter 8)</span> - Participating in the fishing contest
                doesn't affect friendship.
              </li>
              <li>
                <span className="font-medium">Feast of the Winter Star (Winter 25)</span> - Giving a gift to your secret
                friend provides friendship points based on the gift's preference category.
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Heart Events:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Triggering heart events doesn't directly give friendship points.</li>
              <li>However, your choices during these events can sometimes affect friendship.</li>
              <li>Some heart events unlock special items or abilities.</li>
              <li>Heart events are important for story progression and character development.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Quests:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Completing a character's personal quest typically rewards +150 to +500 friendship points.</li>
              <li>Help Wanted board quests give +150 friendship points with the requesting character.</li>
              <li>Special quests (like the Mayor's "shorts" quest) may give higher friendship rewards.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DecayMaintenance() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Friendship Decay</CardTitle>
          <CardDescription>How friendship points decrease over time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="font-semibold">Decay Rules:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Friendship decays by 2 points per day if you don't talk to a character.</li>
              <li>
                Friendship will not decay below the last heart milestone (e.g., if you have 3.5 hearts, it won't decay
                below 3 hearts).
              </li>
              <li>Decay stops at 0 points (no negative friendship).</li>
              <li>
                After marriage, friendship with your spouse decays by 20 points per day if you don't talk to them.
              </li>
              <li>Friendship with your spouse can decay to a minimum of 12.5 hearts.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Decay Prevention:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Talk to characters daily to prevent decay.</li>
              <li>After reaching 10 hearts with a non-datable NPC, friendship will no longer decay.</li>
              <li>
                After reaching 8 hearts with a datable NPC, friendship will no longer decay (unless you're dating or
                married to them).
              </li>
              <li>If you're dating someone, friendship will decay until you reach 10 hearts.</li>
              <li>After marriage, you must continue to talk to your spouse daily to maintain friendship.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Long-term Friendship Maintenance</CardTitle>
          <CardDescription>Strategies for maintaining high friendship levels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="font-semibold">For Villagers:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Focus on reaching 10 hearts with non-datable NPCs to eliminate decay.</li>
              <li>
                For datable NPCs, either reach 8 hearts and stop (to prevent decay) or give them a bouquet and work
                toward 10 hearts.
              </li>
              <li>Keep a supply of universally liked gifts for weekly gift-giving.</li>
              <li>Prioritize birthdays for maximum friendship gain.</li>
              <li>Complete Help Wanted board requests for characters you're working on.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">For Spouse:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Talk to your spouse every day to prevent the 20-point decay.</li>
              <li>Give your spouse a gift every day (counts as one of their two weekly gifts).</li>
              <li>Kiss your spouse daily for a small friendship boost.</li>
              <li>Complete their 14-heart event to unlock special dialogue and interactions.</li>
              <li>Consider keeping their loved gifts in a chest near your house for easy access.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Special Items That Help:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <span className="font-medium">Rabbit's Foot</span> - Prevents the jealousy event if you're dating
                multiple people.
              </li>
              <li>
                <span className="font-medium">Friendship Pendant</span> - A rare item that can be given to increase
                friendship.
              </li>
              <li>
                <span className="font-medium">Return Scepter</span> - Makes it easier to get home after a day of
                socializing.
              </li>
              <li>
                <span className="font-medium">Horse</span> - Faster travel means more time for socializing.
              </li>
              <li>
                <span className="font-medium">Warp Totems</span> - Quick travel to find characters in different areas.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
