"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Box, Sphere, OrbitControls } from "@react-three/drei"
import { useTheme } from "next-themes"
import type { Group } from "three"

function ChickenModel({ position = [-5, -2, 0] }) {
  const group = useRef<Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
      group.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1
    }
  })

  return (
    <group ref={group} position={position} scale={[0.5, 0.5, 0.5]}>
      {/* Simple chicken-like shape using primitives */}
      <group>
        {/* Body */}
        <Box args={[1.5, 1.2, 1.8]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#f8f8f8" />
        </Box>
        {/* Head */}
        <Sphere args={[0.6]} position={[0, 1.5, 0.7]}>
          <meshStandardMaterial color="#f8f8f8" />
        </Sphere>
        {/* Beak */}
        <Box args={[0.3, 0.2, 0.5]} position={[0, 1.4, 1.2]}>
          <meshStandardMaterial color="#f8a012" />
        </Box>
        {/* Comb */}
        <Box args={[0.3, 0.3, 0.1]} position={[0, 1.9, 0.7]}>
          <meshStandardMaterial color="#e74c3c" />
        </Box>
        {/* Legs */}
        <Box args={[0.2, 0.6, 0.2]} position={[-0.4, -0.3, 0]}>
          <meshStandardMaterial color="#f8a012" />
        </Box>
        <Box args={[0.2, 0.6, 0.2]} position={[0.4, -0.3, 0]}>
          <meshStandardMaterial color="#f8a012" />
        </Box>
      </group>
    </group>
  )
}

function StardropModel({ position = [5, -1, 0] }) {
  const group = useRef<Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.5
      group.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.2
    }
  })

  return (
    <group ref={group} position={position} scale={[0.5, 0.5, 0.5]}>
      {/* Simple stardrop shape */}
      <group>
        {/* Main star shape */}
        <Sphere args={[1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#9b59b6" />
        </Sphere>
        {/* Star points */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Box
            key={i}
            args={[0.5, 0.5, 0.5]}
            position={[Math.cos((i * Math.PI) / 3) * 1.2, Math.sin((i * Math.PI) / 3) * 1.2, 0]}
          >
            <meshStandardMaterial color="#8e44ad" />
          </Box>
        ))}
      </group>
    </group>
  )
}

export function ThreeModels() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="absolute left-0 bottom-0 w-1/4 h-1/3 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={isDark ? 0.5 : 0.8} />
          <directionalLight position={[10, 10, 5]} intensity={isDark ? 0.8 : 1} />
          <ChickenModel />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      <div className="absolute right-0 bottom-0 w-1/4 h-1/3 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={isDark ? 0.5 : 0.8} />
          <directionalLight position={[10, 10, 5]} intensity={isDark ? 0.8 : 1} />
          <StardropModel />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </div>
  )
}
