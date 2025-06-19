import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText } from "lucide-react";
import { images } from "@/lib/images";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Parthiv Nair - CS Student & Robotics Team Captain",
    description: "Learn about Parthiv Nair, a Computer Science student at Oregon State University and former robotics team captain (12599 Overcharged) specializing in AI navigation systems, autonomous robotics, and full-stack development.",
    keywords: [
        "Parthiv Nair about",
        "Oregon State Computer Science student",
        "robotics team captain 12599 Overcharged",
        "AI navigation systems developer",
        "autonomous systems expertise",
        "full-stack developer skills",
        "CS student robotics leadership",
        "smart home automation developer",
        "property management system creator",
        "geolocation app developer"
    ],
    openGraph: {
        title: "About Parthiv Nair - CS Student & Robotics Team Captain",
        description: "Computer Science student at Oregon State University with expertise in AI navigation, robotics leadership, and innovative web development.",
        images: ['/img/profile/about_pfp.jpg'],
    },
};

export default function AboutPage() {
    return (
        <div className="container py-12 space-y-12">
            <section className="space-y-6" role="main">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">About Parthiv Nair - Oregon State CS Student</h1>
                    <p className="text-xl text-muted-foreground">
                        Robotics team captain turned full-stack developer specializing in AI navigation systems
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Robotics Leadership & Academic Excellence</h2>
                        <p className="text-muted-foreground">
                            As a third-year Computer Science student at Oregon State University, I bring unique leadership experience as the former captain of a robotics team (Overcharged). My expertise in autonomous systems and AI navigation technologies stems from hands-on experience building and programming competitive robots for complex challenges.
                        </p>
                        <p className="text-muted-foreground">
                            My academic journey combines theoretical computer science knowledge with practical application in robotics, full-stack development, and innovative problem-solving approaches that bridge technology and human needs.
                        </p>

                        <h2 className="text-2xl font-semibold pt-4">Innovation & Entrepreneurship Focus</h2>
                        <p className="text-muted-foreground">
                            My passion lies in creating technologies that reduce corporate greed and improve everyday systems. From developing property management platforms to building geolocation-based activity explorers like &quot;Place&quot;, I focus on solutions that make technology more accessible and human-centered. My entrepreneurial mindset drives me to identify real-world problems and develop scalable technical solutions.
                        </p>

                        <div className="pt-4">
                            <Button asChild>
                                <Link href="/contact" className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Connect With Me
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="relative h-64 bg-muted rounded-lg overflow-hidden border-4 border-muted">
                        <Image 
                            src={images.profile.pfp2} 
                            alt="Parthiv Nair - Oregon State University Computer Science student with robotics and AI navigation expertise" 
                            fill 
                            className="object-cover" 
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-6" role="complementary">
                <h2 className="text-2xl font-semibold">Technical Skills & Development Stack</h2>
                <p className="text-muted-foreground mb-4">
                    My technical expertise spans modern web development, AI systems, and robotics programming, with a focus on creating scalable and maintainable solutions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        "React & Next.js", "TypeScript & JavaScript", "Python & FastAPI", "TailwindCSS & UI/UX", 
                        "Firebase & Authentication", "PostgreSQL & MongoDB", "Docker & Microservices", "Mapbox & Geolocation APIs",
                        "AI Navigation Systems", "Robotics Programming", "Autonomous Systems", "Smart Home IoT",
                        "Stripe Payment Integration", "OpenAI API Integration", "FFmpeg Video Processing",
                        "JWT Authentication", "RESTful API Design", "Figma & Design Systems"
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
                <h2 className="text-2xl font-semibold">Academic Background & Achievements</h2>
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
                                    Third-year CS student focusing on AI navigation systems, autonomous robotics, and full-stack development. Active in robotics competitions and technology innovation projects.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold">Robotics Team Captain</h3>
                                    <span className="text-sm text-muted-foreground">Leadership Role</span>
                                </div>
                                <p className="text-muted-foreground font-medium">Team 12599 Overcharged</p>
                                <p className="text-sm text-muted-foreground">
                                    Led competitive robotics team specializing in autonomous systems and AI navigation. Developed leadership skills while managing technical projects and team coordination for complex engineering challenges.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Project Specializations & Innovation Areas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">AI Navigation & Autonomous Systems</h3>
                            <p className="text-muted-foreground text-sm">
                                Developing intelligent navigation systems for smart vehicles and autonomous robotics, combining machine learning with real-time decision making for complex environments.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Smart Home & IoT Automation</h3>
                            <p className="text-muted-foreground text-sm">
                                Creating comprehensive smart home platforms like SpaceSync that integrate lighting, temperature, and environmental controls with personalized user experiences and account-based automation.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Local Marketplace & Community Apps</h3>
                            <p className="text-muted-foreground text-sm">
                                Building platforms that connect local communities, from food marketplaces like Adresur to activity discovery apps like Place, focusing on reducing corporate intermediaries and empowering local businesses.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Property Management & Business Systems</h3>
                            <p className="text-muted-foreground text-sm">
                                Developing scalable property management systems and business automation tools using microservices architecture, helping streamline operations and reduce administrative complexity.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
} 