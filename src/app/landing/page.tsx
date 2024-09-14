import React from 'react'
import Navbar from '@/app/_components/Navbar'
import Hero from "@/app/_components/Hero"
import Video from "@/app/_components/Video"
import Features from "@/app/_components/Features"
import Contact from "@/app/_components/Contact"
import Footer from "@/app/_components/Footer"
import About from "@/app/_components/About"
export default function page() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Video />
      <Features/>
      <About/>
      <Contact />
      <Footer />
    </div>
  )
}
