import type React from "react"
import "@/app/globals.css"
// import "@/app/dynamic-animations.css"; // Import will be moved to globals.css
import { Inter } from "next/font/google"
// import { DynamicBackgroundAnimations } from "@/components/DynamicBackgroundAnimations"; // Import new component
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stardew Valley Guide",
  description: "A comprehensive guide for Stardew Valley players",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <div className="stardew-theme">
          {/* <DynamicBackgroundAnimations /> */}
          {children}
        </div>
      </body>
    </html>
  )
}
