import React from 'react'
import Navbar from '@/app/components/Navbar'
import Hero from "@/app/components/Hero"
import Video from "@/app/components/Video"
import Features from "@/app/components/Features"
import Contact from "@/app/components/Contact"
import Footer from "@/app/components/Footer"
export default function page() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Video />
      <Features/>
      <Contact />
      <Footer />
    </div>
  )
}
