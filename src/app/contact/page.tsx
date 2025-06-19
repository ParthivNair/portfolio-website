import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Parthiv Nair",
    description: "Get in touch with Parthiv Nair, Computer Science student and developer. Available for collaboration, internships, and project opportunities. Located in Portland, Oregon and open to remote work.",
    keywords: [
        "contact Parthiv Nair",
        "CS student contact",
        "developer hire",
        "full-stack developer",
        "Portland Oregon",
        "collaboration opportunities",
        "React developer",
        "web development",
        "software engineering",
        "internship opportunities",
        "remote work",
        "freelance developer"
    ],
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: "Contact Parthiv Nair - CS Student & Developer",
        description: "Connect with Parthiv Nair for collaboration opportunities and innovative web development projects. Available for internships and remote work.",
        url: 'https://www.parthivnair.com/contact',
        images: ['/img/profile/pfp.jpg'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Parthiv Nair - CS Student & Developer',
        description: 'Connect with Parthiv Nair for collaboration opportunities and innovative web development projects.',
        images: ['/img/profile/pfp.jpg'],
    },
};

export default function ContactPage() {
    return (
        <div className="container py-12 space-y-8">
            <header className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Contact Me</h1>
                <p className="text-xl text-muted-foreground">
                    Let&apos;s connect and explore opportunities to work together
                </p>
                <div className="text-sm text-muted-foreground pt-2">
                    <p>Available for internships, collaborations, and innovative project opportunities</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="space-y-6" role="main">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Let&apos;s Build Something Great</h2>
                        <p className="text-muted-foreground mb-4">
                            I&apos;m always excited to discuss new projects, innovative ideas, and opportunities to collaborate on cutting-edge technology solutions. Whether you&apos;re interested in web development, smart home automation, or community platforms, I&apos;d love to hear from you.
                        </p>
                        <p className="text-muted-foreground">
                            As a Computer Science student with leadership experience and a passion for entrepreneurship, I&apos;m particularly interested in projects that reduce complexity and improve everyday systems through technology.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Contact Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <a href="mailto:parthivnair1@gmail.com" className="hover:text-primary transition-colors">
                                    parthivnair1@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <p>Portland, Oregon - Open to remote opportunities</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <h3 className="text-lg font-medium mb-3">Connect Online</h3>
                        <div className="flex gap-4">
                            <Link href="https://github.com/ParthivNair" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Button variant="outline" size="icon">
                                    <Github className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="https://www.linkedin.com/in/parthivnair/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Button variant="outline" size="icon">
                                    <Linkedin className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="https://www.instagram.com/partthivv/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Button variant="outline" size="icon">
                                    <Instagram className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                <Card role="complementary">
                    <CardHeader>
                        <CardTitle>Send a Message</CardTitle>
                        <CardDescription>
                            Reach out for collaboration opportunities, project inquiries, or just to connect
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" action="#" method="POST">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Name *
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email *
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Your email"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">
                                    Subject *
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Project collaboration, internship opportunity, etc."
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full p-2 rounded-md border border-input bg-background resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Tell me about your project, opportunity, or how we can collaborate..."
                                ></textarea>
                            </div>
                            <Button type="submit" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <section className="pt-8 border-t">
                <h2 className="text-2xl font-semibold mb-4">Areas of Interest</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="p-4">
                        <h3 className="font-semibold mb-2">Full-Stack Development</h3>
                        <p className="text-sm text-muted-foreground">
                            React, Next.js, Python, and modern web application development with scalable architecture
                        </p>
                    </Card>
                    <Card className="p-4">
                        <h3 className="font-semibold mb-2">Smart Home & IoT</h3>
                        <p className="text-sm text-muted-foreground">
                            Home automation platforms, IoT integration, and intelligent environmental control systems
                        </p>
                    </Card>
                    <Card className="p-4">
                        <h3 className="font-semibold mb-2">Community Platforms</h3>
                        <p className="text-sm text-muted-foreground">
                            Local marketplace development, geolocation services, and community-driven applications
                        </p>
                    </Card>
                    <Card className="p-4">
                        <h3 className="font-semibold mb-2">Startup & Entrepreneurship</h3>
                        <p className="text-sm text-muted-foreground">
                            Building innovative solutions that reduce complexity and improve everyday systems
                        </p>
                    </Card>
                    <Card className="p-4">
                        <h3 className="font-semibold mb-2">System Architecture</h3>
                        <p className="text-sm text-muted-foreground">
                            Microservices, API design, and scalable backend systems for modern applications
                        </p>
                    </Card>
                    <Card className="p-4">
                        <h3 className="font-semibold mb-2">Internship Opportunities</h3>
                        <p className="text-sm text-muted-foreground">
                            Seeking summer 2024 internships in software development, web engineering, or tech startups
                        </p>
                    </Card>
                </div>
            </section>
        </div>
    );
} 