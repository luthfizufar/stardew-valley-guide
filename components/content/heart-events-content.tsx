import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export function HeartEventsContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Heart Events</h2>
        <p className="text-muted-foreground">
          Heart events are special cutscenes that occur when you reach certain friendship levels with characters. These
          events provide insight into characters' personalities and backstories.
        </p>
      </div>

      <Tabs defaultValue="bachelor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bachelor">Bachelors</TabsTrigger>
          <TabsTrigger value="bachelorette">Bachelorettes</TabsTrigger>
        </TabsList>

        <TabsContent value="bachelor" className="space-y-4">
          <BachelorHeartEvents />
        </TabsContent>

        <TabsContent value="bachelorette" className="space-y-4">
          <BacheloretteHeartEvents />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Heart Event Tips</CardTitle>
          <CardDescription>Important information about triggering and experiencing heart events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Heart events only trigger when you enter the specified location during the correct time and weather
              conditions.
            </li>
            <li>Some heart events require specific friendship levels with other characters.</li>
            <li>
              You can re-watch heart events you've already seen by talking to the Wizard after completing the "Goblin
              Problem" quest.
            </li>
            <li>Your dialogue choices during heart events can affect your relationship with characters.</li>
            <li>Some heart events are only available after marriage.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function BachelorHeartEvents() {
  return (
    <div className="space-y-4">
      <CharacterHeartEvents
        name="Sebastian"
        events={[
          {
            hearts: 2,
            location: "Sebastian's Room",
            time: "Any time",
            conditions: "Enter Sebastian's room when he's there",
            description: "Sebastian is working on his computer and talks about his programming job.",
          },
          {
            hearts: 4,
            location: "Mountain Lake",
            time: "Any time",
            conditions: "Rainy day",
            description: "Sebastian is smoking by the lake and talks about his love for rainy days.",
          },
          {
            hearts: 6,
            location: "Beach",
            time: "7pm - 12am",
            conditions: "Not winter, not raining",
            description: "Sebastian shows you his motorcycle and talks about wanting to move to the city.",
          },
          {
            hearts: 8,
            location: "Sebastian's Room",
            time: "Any time",
            conditions: "Enter Sebastian's room when he's there",
            description: "Sebastian invites you to play a tabletop game with Sam and Abigail.",
          },
          {
            hearts: 10,
            location: "Mountain",
            time: "Any time",
            conditions: "Sunny day",
            description: "Sebastian takes you for a ride on his motorcycle.",
          },
          {
            hearts: 14,
            location: "Farmhouse",
            time: "After 9pm",
            conditions: "After marriage",
            description: "Sebastian talks about adjusting to farm life and his future plans.",
          },
        ]}
      />

      <CharacterHeartEvents
        name="Sam"
        events={[
          {
            hearts: 2,
            location: "Sam's House",
            time: "Any time",
            conditions: "Enter Sam's house when he's there",
            description: "Sam is practicing guitar and talks about his band.",
          },
          {
            hearts: 4,
            location: "Town",
            time: "Any time",
            conditions: "Not winter",
            description: "Sam attempts a skateboard trick and you help him when he falls.",
          },
          {
            hearts: 6,
            location: "Beach",
            time: "Any time",
            conditions: "Not winter, not raining",
            description: "Sam invites you to help write lyrics for his band.",
          },
          {
            hearts: 8,
            location: "Sam's House",
            time: "After 8pm",
            conditions: "Enter Sam's house when he's there",
            description: "Sam's band practices and you get to hear them play.",
          },
          {
            hearts: 10,
            location: "Bus Stop",
            time: "Any time",
            conditions: "Sunny day",
            description: "Sam talks about his father who is away in the military.",
          },
          {
            hearts: 14,
            location: "Farmhouse",
            time: "After 9pm",
            conditions: "After marriage",
            description: "Sam sets up a small music studio in your house.",
          },
        ]}
      />

      <CharacterHeartEvents
        name="Alex"
        events={[
          {
            hearts: 2,
            location: "Alex's House",
            time: "Any time",
            conditions: "Enter Alex's house when he's there",
            description: "Alex is working out and talks about his fitness routine.",
          },
          {
            hearts: 4,
            location: "Beach",
            time: "Any time",
            conditions: "Sunny day, not winter",
            description: "Alex is playing with his dog Dusty and invites you to join.",
          },
          {
            hearts: 6,
            location: "Alex's House",
            time: "Any time",
            conditions: "Enter Alex's house when he's there",
            description: "Alex shares his dream of becoming a professional athlete.",
          },
          {
            hearts: 8,
            location: "Clinic",
            time: "Any time",
            conditions: "Enter the clinic when Alex is there",
            description: "Alex is visiting his grandmother at the clinic and opens up about his parents.",
          },
          {
            hearts: 10,
            location: "Beach",
            time: "Any time",
            conditions: "Sunny day",
            description: "Alex invites you to play catch with him at the beach.",
          },
          {
            hearts: 14,
            location: "Farmhouse",
            time: "After 9pm",
            conditions: "After marriage",
            description: "Alex talks about how happy he is with farm life and your relationship.",
          },
        ]}
      />

      <CharacterHeartEvents
        name="Harvey"
        events={[
          {
            hearts: 2,
            location: "Clinic",
            time: "During clinic hours",
            conditions: "Enter the clinic when Harvey is there",
            description: "Harvey talks about his concern for the health of Pelican Town residents.",
          },
          {
            hearts: 4,
            location: "Harvey's Room",
            time: "Any time",
            conditions: "Enter Harvey's room above the clinic",
            description: "Harvey is playing with his radio equipment and shares his hobby with you.",
          },
          {
            hearts: 6,
            location: "Clinic",
            time: "During clinic hours",
            conditions: "Enter the clinic when Harvey is there",
            description: "Harvey gives you a free check-up and expresses concern for your health.",
          },
          {
            hearts: 8,
            location: "Railroad",
            time: "Any time",
            conditions: "Sunny day",
            description: "Harvey is watching planes and reveals his fear of heights.",
          },
          {
            hearts: 10,
            location: "Clinic",
            time: "During clinic hours",
            conditions: "Enter the clinic when Harvey is there",
            description: "Harvey takes you on a hot air balloon ride to help him overcome his fear of heights.",
          },
          {
            hearts: 14,
            location: "Farmhouse",
            time: "After 9pm",
            conditions: "After marriage",
            description: "Harvey sets up a small clinic area in your house to help local farmers.",
          },
        ]}
      />

      <CharacterHeartEvents
        name="Elliott"
        events={[
          {
            hearts: 2,
            location: "Elliott's Cabin",
            time: "Any time",
            conditions: "Enter Elliott's cabin when he's there",
            description: "Elliott is working on his novel and talks about his writing process.",
          },
          {
            hearts: 4,
            location: "Beach",
            time: "Any time",
            conditions: "Sunny day",
            description: "Elliott plays piano for you on the beach.",
          },
          {
            hearts: 6,
            location: "Elliott's Cabin",
            time: "Any time",
            conditions: "Enter Elliott's cabin when he's there",
            description: "Elliott reads you a chapter from his novel and asks for your opinion.",
          },
          {
            hearts: 8,
            location: "Library",
            time: "Library hours",
            conditions: "Enter the library when Elliott is there",
            description: "Elliott is researching for his novel and shares his inspiration with you.",
          },
          {
            hearts: 10,
            location: "Town",
            time: "Any time",
            conditions: "After Elliott completes his novel",
            description: "Elliott holds a reading of his published novel and dedicates it to you.",
          },
          {
            hearts: 14,
            location: "Farmhouse",
            time: "After 9pm",
            conditions: "After marriage",
            description: "Elliott writes a poem about your life together on the farm.",
          },
        ]}
      />

      <CharacterHeartEvents
        name="Shane"
        events={[
          {
            hearts: 2,
            location: "Forest",
            time: "After 8pm",
            conditions: "Enter the forest south of your farm",
            description: "Shane is drinking by the lake and talks about his depression.",
          },
          {
            hearts: 4,
            location: "Marnie's Ranch",
            time: "Any time",
            conditions: "Enter Marnie's Ranch when Shane is there",
            description: "Shane shows you his pet chickens and seems happier than usual.",
          },
          {
            hearts: 6,
            location: "Forest",
            time: "After 8pm",
            conditions: "Rainy day",
            description: "Shane is drunk by the cliffs and you help him home. A serious event about his depression.",
          },
          {
            hearts: 8,
            location: "Marnie's Ranch",
            time: "Any time",
            conditions: "Enter Marnie's Ranch when Shane is there",
            description: "Shane is sober and shows you his blue chicken breeding project.",
          },
          {
            hearts: 10,
            location: "Cindersap Forest",
            time: "Any time",
            conditions: "Sunny day",
            description: "Shane takes you to a special spot in the forest and opens up about his recovery.",
          },
          {
            hearts: 14,
            location: "Farmhouse",
            time: "After 9pm",
            conditions: "After marriage",
            description: "Shane talks about staying sober and his plans to expand his chicken breeding.",
          },
        ]}
      />
    </div>
  )
}

function BacheloretteHeartEvents() {
  return (
    <div className="space-y-4">
      <CharacterHeartEvents
        name="Abigail"
        events={[
          {
            hearts: 2,
            location: "Pierre's Shop",
            time: "Any time",
            conditions: "Enter Pierre's when Abigail is there",
            description: "Abigail is arguing with her mother about dyeing her hair purple.",
          },
          {
            hearts: 4,
            location: "Abigail's Room",
            time: "After 9pm",
            conditions: "Enter Abigail's room when she's there",
            description: "Abigail invites you to play a video game with her.",
          },
          {
            hearts: 6,
            location: "Graveyard",
            time: "7pm - 12am",
            conditions: "Rainy day",
            description: "Abigail is playing her flute in the graveyard and shares her love for spooky places.",
          },
          {
            hearts: 8,
            location: "Mountain",
            time: "Any time",
            conditions: "Sunny day",
            description: "Abigail is practicing with her sword and talks about wanting to explore the mines.",
          },
          {
            hearts: 10,
            location: "Mines",
            time: "Any time",
            conditions: "Enter level 20 of the mines",
            description: "You find Abigail in the mines and help her fight off monsters.",
          },
          {
            hearts: 14,
            location: "Farmhouse",
            time: "After 9pm",
            conditions: "After marriage",
            description: "Abigail sets up a gaming area in your house and talks about her adventures.",
          },
        ]}
      />

      <CharacterHeartEvents
        name="Leah"
        events={[
          {
            hearts: 2,
            location: "Leah's Cottage",
            time: "Any time",
            conditions: "Enter Leah's cottage when she's there",
            description: "Leah is working on a sculpture and talks about her art.",
          },
          {
            hearts: 4,
            location: "Forest",
            time: "Any time",
            conditions: "Enter the forest near Leah's cottage",
            description: "Leah shows you how she forages for materials for her art.",
          },
          {
            hearts: 6,
            location: "Leah's Cottage",
            time: "Any time",
            conditions: "Enter Leah's cottage when she's there",
            description: "Leah receives a call from her ex who wants her to give up art and come back to the city.",
          },
          {
            hearts: 8,
            location: "Forest",
            time: "Any time",
            conditions: "Sunny day",
            description: "Leah invites you on a picnic and shares her dreams for the future.",
          },
          {
            hearts: 10,
            location: "Town",
            time: "Any time",
            conditions: "Enter town when an art show is happening",
            description: "Leah holds her first art show and you help her deal with her ex who shows up.",
          },
          {
            hearts: 14,
            location: "Farmhouse",
            time: "After 9pm",
            conditions: "After marriage",
            description: "Leah sets up an art studio on your farm and talks about her inspiration.",
          },
        ]}
      />

      <CharacterHeartEvents
        name="Haley"
        events={[
          {
            hearts: 2,
            location: "Haley's House",
            time: "Any time",
            conditions: "Enter Haley's house when she's there",
            description: "Haley asks for your help finding her lost bracelet.",
          },
          {
            hearts: 4,
            location: "Forest",
            time: "Any time",
            conditions: "Sunny day, not winter",
            description: "Haley is taking photographs in the forest and shows you her camera.",
          },
          {
            hearts: 6,
            location: "Beach",
            time: "Any time",
            conditions: "Sunny day, summer",
            description: "Haley invites you to help her with a photoshoot at the beach.",
          },
          {
            hearts: 8,
            location: "Haley's House",
            time: "Any time",
            conditions: "Enter Haley's house when she's there",
            description: "Haley shows you her darkroom and her photography collection.",
          },
          {
            hearts: 10,
            location: "Cindersap Forest",
            time: "Any time",
            conditions: "Sunny day",
            description: "Haley takes you on a photography trip and reveals how much she's grown to love the valley.",
          },
          {
            hearts: 14,
            location: "Farmhouse",
            time: "After 9pm",
            conditions: "After marriage",
            description: "Haley creates a photo album of your life together on the farm.",
          },
        ]}
      />

      <CharacterHeartEvents
        name="Penny"
        events={[
          {
            hearts: 2,
            location: "Town",
            time: "Any time",
            conditions: "Enter town when Penny is teaching Jas and Vincent",
            description: "Penny is teaching the children and invites you to join their lesson.",
          },
          {
            hearts: 4,
            location: "Trailer",
            time: "Any time",
            conditions: "Enter Penny's trailer when she's there",
            description: "Penny is cleaning the trailer and talks about her mother's drinking problem.",
          },
          {
            hearts: 6,
            location: "Museum",
            time: "Any time",
            conditions: "Enter the museum when Penny is there",
            description: "Penny is taking Jas and Vincent on a field trip and asks for your help.",
          },
          {
            hearts: 8,
            location: "Town",
            time: "Any time",
            conditions: "Sunny day",
            description: "Penny invites you on a picnic by the river and opens up about her dreams.",
          },
          {
            hearts: 10,
            location: "Bathhouse",
            time: "After 7pm",
            conditions: "Enter the bathhouse when Penny is there",
            description: "You encounter Penny at the bathhouse in an awkward but sweet moment.",
          },
          {
            hearts: 14,
            location: "Farmhouse",
            time: "After 9pm",
            conditions: "After marriage",
            description:
              "Penny talks about how happy she is to have a real home and her plans to homeschool your children.",
          },
        ]}
      />

      <CharacterHeartEvents
        name="Maru"
        events={[
          {
            hearts: 2,
            location: "Maru's Room",
            time: "Any time",
            conditions: "Enter Maru's room when she's there",
            description: "Maru is working on a gadget and talks about her love for science and invention.",
          },
          {
            hearts: 4,
            location: "Hospital",
            time: "During clinic hours",
            conditions: "Enter the hospital when Maru is working",
            description: "Maru is working at the clinic and shares her experiences as a nurse.",
          },
          {
            hearts: 6,
            location: "Maru's Room",
            time: "Any time",
            conditions: "Enter Maru's room when she's there",
            description: "Maru shows you her robot project and it malfunctions in a humorous way.",
          },
          {
            hearts: 8,
            location: "Mountain",
            time: "After 8pm",
            conditions: "Clear night",
            description: "Maru invites you to stargaze with her telescope and talks about space.",
          },
          {
            hearts: 10,
            location: "Mountain",
            time: "Any time",
            conditions: "Sunny day",
            description: "Maru shows you her completed robot and talks about her future inventions.",
          },
          {
            hearts: 14,
            location: "Farmhouse",
            time: "After 9pm",
            conditions: "After marriage",
            description: "Maru sets up a small lab in your house and creates a helpful farming gadget.",
          },
        ]}
      />

      <CharacterHeartEvents
        name="Emily"
        events={[
          {
            hearts: 2,
            location: "Emily's House",
            time: "Any time",
            conditions: "Enter Emily's house when she's there",
            description: "Emily is dancing in her room and invites you to join her.",
          },
          {
            hearts: 4,
            location: "Emily's House",
            time: "Any time",
            conditions: "Enter Emily's house when she's there",
            description: "Emily is making clothes and asks for your opinion on her designs.",
          },
          {
            hearts: 6,
            location: "Secret Woods",
            time: "After 10pm",
            conditions: "Enter the Secret Woods at night",
            description: "Emily is communing with nature spirits and shares her spiritual side with you.",
          },
          {
            hearts: 8,
            location: "Emily's House",
            time: "Any time",
            conditions: "Enter Emily's house when she's there",
            description: "Emily has a dream about you and creates a special outfit based on it.",
          },
          {
            hearts: 10,
            location: "Town",
            time: "After 7pm",
            conditions: "Enter town during the night market",
            description: "Emily performs a dance at the Stardrop Saloon and dedicates it to you.",
          },
          {
            hearts: 14,
            location: "Farmhouse",
            time: "After 9pm",
            conditions: "After marriage",
            description: "Emily sets up a meditation space on your farm and talks about her connection to the valley.",
          },
        ]}
      />
    </div>
  )
}

interface HeartEvent {
  hearts: number
  location: string
  time: string
  conditions: string
  description: string
}

interface CharacterHeartEventsProps {
  name: string
  events: HeartEvent[]
}

function CharacterHeartEvents({ name, events }: CharacterHeartEventsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Heart events for {name}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {events.map((event, index) => (
            <AccordionItem key={index} value={`${name}-${event.hearts}`}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                    {event.hearts} ♥
                  </Badge>
                  <span>{event.location}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="font-semibold">Time:</span> {event.time}
                    </div>
                    <div>
                      <span className="font-semibold">Conditions:</span> {event.conditions}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold">Description:</span> {event.description}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
