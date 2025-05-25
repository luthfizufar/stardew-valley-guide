"use client"

import { en } from "@/translations/en"

export function useTranslations() {
  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = en // Always use English

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k as keyof typeof value]
      } else {
        return key // Fallback to key if translation not found
      }
    }

    // Handle nested objects that might be returned
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value)
    }

    return value as string
  }

  return { t }
}
