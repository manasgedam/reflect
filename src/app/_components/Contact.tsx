import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
    return (
        <>
            <section className="min-h-screen w-full pb-4 md:pb-5 lg:pb-10 flex flex-col justify-center items-center bg-gray-100">
                <div className="container px-4 md:px-6 w-full max-w-[1000px]">
                    <div className="">
                        <div className="space-y-4">
                            <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm">
                                Contact Us
                            </div>
                            <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                                Get in touch
                            </h2>
                            <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                We'd love to hear from you. Please fill out this form or shoot us an email.
                            </p>
                        </div>
                        <Card className="mt-3">
                            <CardHeader>
                                <CardTitle className="text-2xl">Send us a message</CardTitle>
                                <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" placeholder="Enter your name" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" placeholder="Enter your email" type="email" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input id="subject" placeholder="Enter the subject" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea className="min-h-[100px]" id="message" placeholder="Enter your message" />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Send Message</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>

        </>
    )
}