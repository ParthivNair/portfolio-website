import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText } from "lucide-react";
import { images } from "@/lib/images";
import Image from "next/image";
import { Metadata } from "next";
import NowPlaying from "@/components/NowPlaying";

export const metadata: Metadata = {
    title: "About Parthiv Nair",
    description: "Learn about Parthiv Nair, a Computer Science student at Oregon State University with experience in team leadership and full-stack development. Passionate about creating innovative solutions that reduce complexity and improve everyday systems.",
    keywords: [
        "Parthiv Nair about",
        "Computer Science student",
        "Oregon State University",
        "full-stack developer",
        "team leadership",
        "web development",
        "software engineering",
        "smart home automation",
        "startup projects",
        "React developer",
        "Next.js developer",
        "Python developer"
    ],
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: "About Parthiv Nair - CS Student & Developer",
        description: "Computer Science student with experience in team leadership and innovative web development. Building solutions that reduce complexity and improve everyday systems.",
        url: 'https://www.parthivnair.com/about',
        images: ['/img/profile/about_pfp.jpg'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Parthiv Nair - CS Student & Developer',
        description: 'Computer Science student with experience in team leadership and innovative web development.',
        images: ['/img/profile/about_pfp.jpg'],
    },
};

export default function AboutPage() {
    return (
        <div className="container py-12 space-y-12">
            <section className="space-y-6" role="main">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
                    <p className="text-xl text-muted-foreground">
                    Full-stack developer building systems that prioritize impact, accessibility, and meaningful change.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Student & Leader</h2>
                        <p className="text-muted-foreground">
                            As a third-year Computer Science student at Oregon State University, I bring leadership experience from my time as captain of a competitive team. This experience taught me valuable skills in project management, team coordination, and problem-solving under pressure.
                        </p>
                        <p className="text-muted-foreground">
                            My academic journey combines theoretical computer science knowledge with hands-on application in web development, system design, and innovative problem-solving approaches that bridge technology and human needs.
                        </p>

                        <h2 className="text-2xl font-semibold pt-4">Innovation & Entrepreneurship</h2>
                        <p className="text-muted-foreground">
                            I&apos;m passionate about creating technologies that reduce complexity and improve everyday systems. From developing property management platforms to building community-focused applications, I focus on solutions that make technology more accessible and human-centered.
                        </p>

                        <div className="pt-4">
                            <Button asChild>
                                <Link href="/contact" className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Let&apos;s Connect
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative h-64 bg-muted rounded-lg overflow-hidden border-4 border-muted">
                            <Image 
                                src={images.profile.pfp2} 
                                alt="Parthiv Nair - Computer Science student and developer" 
                                fill 
                                className="object-cover" 
                            />
                        </div>
                        <NowPlaying isEmbedded={true} />
                    </div>
                </div>
            </section>

            <section className="space-y-6" role="complementary">
                <h2 className="text-2xl font-semibold">Technical Skills & Development Stack</h2>
                <p className="text-muted-foreground mb-4">
                    My technical expertise spans modern web development, system design, and emerging technologies, with a focus on creating scalable and maintainable solutions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        "React & Next.js", "TypeScript & JavaScript", "Python & FastAPI", "TailwindCSS & UI/UX", 
                        "Firebase & Authentication", "PostgreSQL & MongoDB", "Docker & Microservices", "Mapbox & Geolocation APIs",
                        "Smart Home IoT", "System Architecture", "RESTful API Design", "Payment Integration",
                        "OpenAI API Integration", "FFmpeg Video Processing", "JWT Authentication", "Figma & Design Systems"
                    ].map((skill) => (
                        <Card key={skill} className="bg-muted/50">
                            <CardContent className="p-4">
                                <p className="font-medium text-center text-sm">{skill}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Background & Experience</h2>
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold">Computer Science Student</h3>
                                    <span className="text-sm text-muted-foreground">2022-Present</span>
                                </div>
                                <p className="text-muted-foreground font-medium">Oregon State University</p>
                                <p className="text-sm text-muted-foreground">
                                    Third-year CS student focusing on software engineering, web development, and system design. Active in technology innovation projects and collaborative development.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold">Team Captain</h3>
                                    <span className="text-sm text-muted-foreground">Leadership Role</span>
                                </div>
                                <p className="text-muted-foreground font-medium">Team 12599 Overcharged</p>
                                <p className="text-sm text-muted-foreground">
                                    Led competitive team through complex technical challenges. Developed leadership skills while managing projects, coordinating team efforts, and driving innovative solutions.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Project Focus Areas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Smart Home & IoT</h3>
                            <p className="text-muted-foreground text-sm">
                                Creating comprehensive smart home platforms that integrate lighting, temperature, and environmental controls with personalized user experiences and intelligent automation.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Community Platforms</h3>
                            <p className="text-muted-foreground text-sm">
                                Building platforms that connect local communities, from food marketplaces to activity discovery apps, focusing on reducing intermediaries and empowering local businesses.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Business Systems</h3>
                            <p className="text-muted-foreground text-sm">
                                Developing scalable property management systems and business automation tools using modern architecture, helping streamline operations and reduce administrative complexity.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Web Applications</h3>
                            <p className="text-muted-foreground text-sm">
                                Building full-stack web applications with React, Next.js, and modern technologies, focusing on user experience, performance, and scalable architecture.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
} 