"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

const CROP_IMAGES = [
  "/images/crops/Strawberry.png",
  "/images/crops/Blueberry.png",
  "/images/crops/Starfruit.png",
  "/images/crops/Melon.png",
  "/images/crops/Ancient-fruit.png",
  "/images/crops/Coffee-Bean.png",
  "/images/crops/Grape.png",
  "/images/crops/Hot-Pepper.png",
  "/images/crops/Pumpkin.png",
  "/images/crops/Sunflower.png",
];

const NUM_ITEMS = 15; // Number of floating items

interface AnimatedItem {
  id: number;
  src: string;
  style: React.CSSProperties;
  size: number;
}

export function DynamicBackgroundAnimations() {
  const [items, setItems] = useState<AnimatedItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const generateItems = () => {
      const newItems: AnimatedItem[] = [];
      for (let i = 0; i < NUM_ITEMS; i++) {
        const randomSize = Math.random() * 30 + 20; // Size between 20px and 50px
        newItems.push({
          id: i,
          src: CROP_IMAGES[Math.floor(Math.random() * CROP_IMAGES.length)],
          size: randomSize,
          style: {
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            width: `${randomSize}px`,
            height: `${randomSize}px`,
            animationDelay: `${Math.random() * 5}s, ${Math.random() * 7}s`, // Random delay for each animation
            animationDuration: `${Math.random() * 5 + 5}s, ${Math.random() * 5 + 7}s`, // Random duration
          },
        });
      }
      setItems(newItems);
    };

    generateItems();
    // Optional: regenerate items on window resize for better responsiveness
    // window.addEventListener('resize', generateItems);
    // return () => window.removeEventListener('resize', generateItems);
  }, [mounted]);

  if (!mounted) {
    return null; // Avoid rendering on server or before hydration
  }

  return (
    <div className="dynamic-background-container">
      {items.map((item) => (
        <div
          key={item.id}
          className="dynamic-floating-item"
          style={item.style}
        >
          <Image
            src={item.src}
            alt="Floating decorative item"
            width={item.size}
            height={item.size}
            priority={false} // Not critical for LCP
          />
        </div>
      ))}
    </div>
  );
}