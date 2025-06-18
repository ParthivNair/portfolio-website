import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText } from "lucide-react";
import { images } from "@/lib/images";
import Image from "next/image";

export const metadata = {
    title: "About | Portfolio",
    description: "Learn more about me and my skills",
};

export default function AboutPage() {
    return (
        <div className="container py-12 space-y-12">
            <section className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
                    <p className="text-xl text-muted-foreground">
                        Get to know me and my professional journey
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Who I Am</h2>
                        <p className="text-muted-foreground">
                            I&apos;m a Computer Science student at Oregon State University who enjoys building useful things—whether that&apos;s a smart home app, a tool to share local experiences, or a system that automates daily tasks. I&apos;ve spent time exploring different areas of tech, from backend systems and microservices to UI design and robotics.
                        </p>
                        <p className="text-muted-foreground">
                            Most of my projects are built around the idea of making everyday life a little easier or more connected.
                        </p>

                        <h2 className="text-2xl font-semibold pt-4">What Drives Me</h2>
                        <p className="text-muted-foreground">
                            Outside of coding, I&apos;m always thinking about new ideas—how tech can be more human, how to reduce unnecessary complexity, or how to make things more accessible. I like working on projects that solve real problems, and I try to keep learning and improving as I go.
                        </p>

                        <div className="pt-4">
                            <Button asChild>
                                <Link href="/contact" className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Contact Me
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="relative h-64 bg-muted rounded-lg overflow-hidden border-4 border-muted">
                        <Image 
                            src={images.profile.pfp2} 
                            alt="Parthiv Nair" 
                            fill 
                            className="object-cover" 
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Technologies & Skills</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        "React", "Next.js", "TypeScript", "TailwindCSS", 
                        "Firebase", "FastAPI", "Python", "PostgreSQL", 
                        "MongoDB", "Docker", "Microservices", "API Development",
                        "UI/UX Design", "Figma", "JWT Auth", "Stripe API",
                        "OpenAI API", "FFmpeg", "Mapbox API"
                    ].map((skill) => (
                        <Card key={skill} className="bg-muted/50">
                            <CardContent className="p-4">
                                <p className="font-medium text-center">{skill}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Academic Background</h2>
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold">Computer Science Student</h3>
                                    <span className="text-sm text-muted-foreground">Current</span>
                                </div>
                                <p className="text-muted-foreground">Oregon State University</p>
                                <p className="text-sm text-muted-foreground">
                                    Exploring various areas of technology including backend systems, microservices, UI design, and robotics.
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
                                Building automation platforms that make everyday life more convenient and connected.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Local Community Apps</h3>
                            <p className="text-muted-foreground text-sm">
                                Creating platforms that connect people with local experiences, food, and services.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Microservices Architecture</h3>
                            <p className="text-muted-foreground text-sm">
                                Designing scalable systems with modular architecture for better maintainability.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">AI-Powered Tools</h3>
                            <p className="text-muted-foreground text-sm">
                                Developing content generation tools and automated solutions using modern AI APIs.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
} 