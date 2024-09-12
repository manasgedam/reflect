import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Code, Cpu, Globe, Headphones, Zap } from "lucide-react"
export default function Features() {
    return (
        <>
        <div className="w-full md:p-14 lg:p-20 flex justify-center">
            <h1 className='font-bold text-2xl lg:text-4xl '>Our Top Features</h1>
        </div>
            <section className="w-full flex justify-center mt-10 lg:mt-0">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <Zap className="h-10 w-10 mb-4 text-primary" />
                                <CardTitle>Lightning Fast</CardTitle>
                                <CardDescription>Experience unparalleled speed and performance.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                Our optimized infrastructure ensures your applications run at peak efficiency, delivering
                                lightning-fast results to your users.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Globe className="h-10 w-10 mb-4 text-primary" />
                                <CardTitle>Global Reach</CardTitle>
                                <CardDescription>Connect with users around the world.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                Leverage our global network to deliver your content and services to users wherever they are, ensuring
                                low latency and high availability.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CheckCircle className="h-10 w-10 mb-4 text-primary" />
                                <CardTitle>Reliable & Secure</CardTitle>
                                <CardDescription>Trust in our robust security measures.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                Rest easy knowing your data and applications are protected by industry-leading security protocols and
                                backed by our 99.9% uptime guarantee.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Code className="h-10 w-10 mb-4 text-primary" />
                                <CardTitle>Developer Friendly</CardTitle>
                                <CardDescription>Built with developers in mind.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                Our intuitive APIs and comprehensive documentation make integration a breeze, allowing you to focus on
                                building great products.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Cpu className="h-10 w-10 mb-4 text-primary" />
                                <CardTitle>Scalable Architecture</CardTitle>
                                <CardDescription>Grow without limits.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                Our flexible infrastructure scales seamlessly with your needs, from startup to enterprise, ensuring
                                your applications perform flawlessly at any scale.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Headphones className="h-10 w-10 mb-4 text-primary" />
                                <CardTitle>24/7 Support</CardTitle>
                                <CardDescription>We're here when you need us.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                Our dedicated support team is available around the clock to assist you with any questions or issues,
                                ensuring your peace of mind.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}


