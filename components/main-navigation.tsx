"use client"
import { useTranslations } from "@/hooks/use-translations"
import { Calendar, Heart, Map, Users, Leaf, Fish, Pickaxe, Home, BookOpen } from "lucide-react"

interface MainNavigationProps {
  onSectionChange: (section: string) => void
  activeSection: string
}

export function MainNavigation({ onSectionChange, activeSection }: MainNavigationProps) {
  const { t } = useTranslations()

  const navItems = [
    { id: "characters", icon: Users, label: t("navigation.characters") },
    { id: "story", icon: BookOpen, label: "Story & Quests" },
    { id: "friendship-mechanics", icon: Heart, label: "Friendship Mechanics" },
    { id: "calendar", icon: Calendar, label: t("navigation.calendar") },
    { id: "locations", icon: Map, label: t("navigation.locations") },
    { id: "marriage", icon: Heart, label: t("navigation.marriage") },
    { id: "farming", icon: Leaf, label: t("navigation.farming") },
    { id: "fishing", icon: Fish, label: t("navigation.fishing") },
    { id: "mining", icon: Pickaxe, label: t("navigation.mining") },
    { id: "community", icon: Home, label: t("navigation.community") },
    { id: "museum", icon: Users, label: "Museum" },
  ]

  return (
    <nav className="bg-amber-100 p-4 rounded-lg pixel-border">
      <ul className="flex flex-wrap justify-center gap-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onSectionChange(item.id)}
              className={`pixel-button ${activeSection === item.id ? "transform translate-x-1 translate-y-1" : ""}`}
              aria-label={item.label}
            >
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
