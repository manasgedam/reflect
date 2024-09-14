import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Building, Globe, Users } from "lucide-react"
import Image from "next/image"


export default function About() {
  return (
    <div className="flex flex-col min-h-screen justify-center mt-20">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  About Reflect
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl dark:text-gray-400">
                  Innovating for a better tomorrow. We're on a mission to transform industries and improve lives through
                  cutting-edge technology.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Mission</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  At Acme Inc, we're dedicated to pushing the boundaries of what's possible. Our mission is to create
                  innovative solutions that address the world's most pressing challenges, improving lives and
                  transforming industries in the process.
                </p>
                <ul className="grid gap-4 mt-8">
                  <li className="flex items-center gap-4">
                    <Globe className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Global Impact</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Our solutions are used by millions worldwide
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <Users className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Collaborative Innovation</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        We work closely with partners and clients
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <Award className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Industry Recognition</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Award-winning products and services
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="flex gap-3">
                  <Button>Join Us</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
              <div className="space-y-4">
                <Image
                  alt="Team working together"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  height="310"
                  src="/images/about.jpg"
                  width="550"
                />
                <p className="text-gray-500 dark:text-gray-400">
                  Our team of experts collaborating on groundbreaking projects
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-gray-100 dark:bg-gray-800 flex justify-center ">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Our Team</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Image
                    alt="John Doe"
                    className="mx-auto rounded-full"
                    height="150"
                    src="/placeholder.svg?height=150&width=150"
                    style={{
                      aspectRatio: "150/150",
                      objectFit: "cover",
                    }}
                    width="150"
                  />
                  <CardTitle>John Doe</CardTitle>
                  <CardDescription>CEO & Founder</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    With over 20 years of experience in tech, John leads our company's vision and strategy.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Image
                    alt="Jane Smith"
                    className="mx-auto rounded-full"
                    height="150"
                    src="/placeholder.svg?height=150&width=150"
                    style={{
                      aspectRatio: "150/150",
                      objectFit: "cover",
                    }}
                    width="150"
                  />
                  <CardTitle>Jane Smith</CardTitle>
                  <CardDescription>CTO</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Jane oversees our technical operations and drives innovation in our product development.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Image
                    alt="Mike Johnson"
                    className="mx-auto rounded-full"
                    height="150"
                    src="/placeholder.svg?height=150&width=150"
                    style={{
                      aspectRatio: "150/150",
                      objectFit: "cover",
                    }}
                    width="150"
                  />
                  <CardTitle>Mike Johnson</CardTitle>
                  <CardDescription>Head of Design</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Mike leads our design team, ensuring our products are both beautiful and user-friendly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}