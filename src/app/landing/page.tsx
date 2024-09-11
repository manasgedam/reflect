import React from 'react'
import Navbar from '@/app/components/Navbar'
import Hero from "@/app/components/Hero"
import Video from "@/app/components/Video"
import Features from "@/app/components/Features"
export default function page() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Video />
      <Features/>
    </div>
  )
}
