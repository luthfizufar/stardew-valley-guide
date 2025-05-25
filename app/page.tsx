"use client"

import { useState } from "react"
import { MainNavigation } from "@/components/main-navigation"
import { LanguageToggle } from "@/components/language-toggle"
import { PixelParticles } from "@/components/pixel-particles"
import { GameUIElements } from "@/components/game-ui-elements"
import { CharactersContent } from "@/components/content/characters-content"
import { MarriageContent } from "@/components/content/marriage-content"
import { LocationsContent } from "@/components/content/locations-content"
import { CalendarContent } from "@/components/content/calendar-content"
import { FarmingContent } from "@/components/content/farming-content"
import { FishingContent } from "@/components/content/fishing-content"
import { MiningContent } from "@/components/content/mining-content"
import { CommunityCenterContent } from "@/components/content/community-center-content"
import { MuseumContent } from "@/components/content/museum-content"
import { StoryContent } from "@/components/content/story-content"
import { HeartEventsContent } from "@/components/content/heart-events-content"
import { CharacterQuestsContent } from "@/components/content/character-quests-content"
import { FriendshipMechanicsContent } from "@/components/content/friendship-mechanics-content"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("characters")

  const renderContent = () => {
    switch (activeSection) {
      case "characters":
        return <CharactersContent />
      case "marriage":
        return <MarriageContent />
      case "locations":
        return <LocationsContent />
      case "calendar":
        return <CalendarContent />
      case "farming":
        return <FarmingContent />
      case "fishing":
        return <FishingContent />
      case "mining":
        return <MiningContent />
      case "community":
        return <CommunityCenterContent />
      case "museum":
        return <MuseumContent />
      case "story":
        return <StoryContent />
      case "heart-events":
        return <HeartEventsContent />
      case "character-quests":
        return <CharacterQuestsContent />
      case "friendship-mechanics":
        return <FriendshipMechanicsContent />
      default:
        return <CharactersContent />
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-stardew-bg">
      <div className="simple-background"></div>
      <PixelParticles />
      <GameUIElements />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="font-pixel text-3xl md:text-4xl text-stardew-green">Stardew Valley Guide</h1>
          <div className="flex items-center gap-4">
            <LanguageToggle />
          </div>
        </header>

        <MainNavigation activeSection={activeSection} onSectionChange={setActiveSection} />

        <main className="mt-12 relative">{renderContent()}</main>

        <footer className="mt-16 py-6 text-center font-pixel text-xs text-stardew-green">
          <p>© {new Date().getFullYear()} Stardew Valley Guide</p>
          <p className="mt-2">Not affiliated with ConcernedApe or Stardew Valley</p>
        </footer>
      </div>
    </div>
  )
}
