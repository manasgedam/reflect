'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

export default function UserDashboard() {
  const [flag, setFlag] = useState(true)
  const [selectAvatar, setselectAvatar] = useState<number | null>(null);

  const avatarts = [
    "https://github.com/shadcn.png",
    "https://github.com/shadcn.png",
    "https://github.com/shadcn.png",
    "https://github.com/shadcn.png",
    "https://github.com/shadcn.png",
    "https://github.com/shadcn.png",
  ]

  const handleclick = (index: number) => {
    setselectAvatar(index);
  }

  return (
    <section className="w-screen h-screen flex flex-col overflow-x-hidden">
      <nav className="border-b flex justify-center sm:py-0 px-2">
        <div className="container flex items-center justify-between py-1">
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={60}
              height={60}
              alt="logo"
            />
          </Link>
        </div>
      </nav>

      <div className="flex justify-center items-center flex-1 px-4 sm:px-6 lg:px-8 my-8">
        <div className="border border-none shadow-[0_3px_16px_-2px_rgba(0,0,0,0.3)] rounded-lg text-center space-y-6 max-w-2xl w-full text-wrap bg-white p-8">
          <h1 className="text-2xl font-bold md:text-4xl">Let's Craft your Identity</h1>
          <p className="text-gray-600 text-sm md:text-lg hidden md:block">
            "Customize your profile with an avatar and optional<br/> details for a personalized experience."
          </p>

          <p className="text-lg">Choose the level of privacy that suits you best</p>

          <form className="flex flex-row justify-center gap-8">
            <button type="button" onClick={() => setFlag(true)}>
              <img src="/images/1.jpg" alt="normal" className="w-16 h-16 md:w-32 md:h-32 rounded-md" />
            </button>
            <button type="button" onClick={() => setFlag(false)}>
              <img src="/images/1.jpg" alt="miscellaneous" className="w-16 h-16 md:w-32 md:h-32 rounded-md" />
            </button>
          </form>

          <div className="w-full flex justify-center">
            <Card className="w-full max-w-lg border-none shadow-none">
              <CardContent>
                <form className="w-full">
                  {flag && (
                    <div className="grid gap-4">
                      <div className="flex flex-col space-y-1.5 text-left">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="e.g. Atharva Ingale" />
                      </div>
                      <div className="flex flex-col space-y-1.5 text-left">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="e.g. atharva23@gmail.com" />
                      </div>
                    </div>
                  )}
                  <div className="mt-6">
                    <p className="text-left text-lg">Choose your Avatar:</p>
                    <div className="grid grid-cols-3 md:grid-cols-6 mt-3 gap-x-4 gap-y-4">
                      {avatarts.map((images, index) => (
                        <div key={index} className="flex justify-center items-center">
                          <button type="button" onClick={() => handleclick(index)}>
                            <Avatar className={`w-12 h-12 md:w-16 md:h-16 ${selectAvatar === index ? "ring-2 ring-black" : ""}`}>
                              <AvatarImage src={images} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar> 
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="mt-6">
                <div className="w-full">
                  <Link href="/landing" passHref>
                    <Button className="w-full">Next</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}