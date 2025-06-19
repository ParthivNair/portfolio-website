"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useProjectStore, Project } from "@/lib/store";
import { useEffect, useState, memo } from "react";
import ClientOnly from "@/components/ClientOnly";

// Real projects with SEO-optimized descriptions
const realProjects = [
    {
        id: "spacesync",
        title: "SpaceSync - Smart Home Automation Platform",
        description: "Comprehensive IoT smart home platform enabling users to control lighting, temperature, and environmental routines with AI-powered automation and account-based personalization. Built with React, Firebase, and modern IoT integration.",
        image: "/placeholder.jpg",
        tags: ["React", "TailwindCSS", "Firebase", "IoT", "Smart Home", "Automation"],
        demoUrl: "#",
        githubUrl: "#",
        createdAt: 1672531200000,
        imageAlt: "SpaceSync smart home dashboard showing automated lighting and temperature controls"
    },
    {
        id: "adresur",
        title: "Adresur - Local Food Marketplace",
        description: "Revolutionary home-cooked food marketplace connecting local chefs with nearby customers, eliminating third-party delivery fees and empowering small food creators through direct community connections and Stripe payment integration.",
        image: "/placeholder.jpg",
        tags: ["Next.js", "Firebase", "Stripe API", "E-commerce", "Local Business", "Community"],
        demoUrl: "#",
        githubUrl: "#",
        createdAt: 1675209600000,
        imageAlt: "Adresur marketplace interface showing local chef profiles and food ordering system"
    },
    {
        id: "place",
        title: "Place - Geolocation Activity Explorer",
        description: "Interactive map-based application helping users discover local hiking trails, restaurants, and attractions through advanced geolocation APIs, personalized recommendation algorithms, and community-driven content curation.",
        image: "/placeholder.jpg",
        tags: ["FastAPI", "React", "PostgreSQL", "Mapbox API", "Geolocation", "Recommendations"],
        demoUrl: "#",
        githubUrl: "#",
        createdAt: 1677628800000,
        imageAlt: "Place app displaying interactive map with hiking trails and restaurant recommendations"
    },
    {
        id: "property-management",
        title: "Property Management System",
        description: "Comprehensive property management platform for landlords and tenants featuring listing management, automated payment processing, maintenance request tracking, and tenant communication tools built with microservices architecture.",
        image: "/placeholder.jpg",
        tags: ["FastAPI", "React", "MongoDB", "Docker", "Microservices", "Property Management"],
        demoUrl: "#",
        githubUrl: "#",
        createdAt: 1680220800000,
        imageAlt: "Property management dashboard showing rental listings and maintenance request interface"
    },
    {
        id: "content-generator",
        title: "AI Voiceover Content Generator",
        description: "AI-powered content creation tool generating social media voiceovers and automated subtitles for content creators, utilizing OpenAI API and FFmpeg for video processing with plans to evolve into a custom video platform.",
        image: "/placeholder.jpg",
        tags: ["Python", "FFmpeg", "OpenAI API", "React", "MongoDB", "AI Content"],
        demoUrl: "#",
        githubUrl: "#",
        createdAt: 1682812800000,
        imageAlt: "Content generator interface showing AI voiceover creation and subtitle generation tools"
    },
];

// Memoized Project Card component to prevent unnecessary re-renders
const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
    return (
        <m.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                delay: Math.min(index * 0.05, 0.3), // Cap the delay to prevent too much staggering
                ease: "easeOut"
            }}
            whileHover={{
                y: -5, // Reduced movement for smoother hover
                transition: { duration: 0.2, ease: "easeOut" }
            }}
            className="h-full"
        >
            <Card className="h-full flex flex-col bg-card text-card-foreground border shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
                    <CardDescription className="text-muted-foreground line-clamp-3">
                        {project.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                    <div className="h-40 bg-muted rounded-lg flex items-center justify-center border" role="img" aria-label={project.imageAlt || `${project.title} project preview`}>
                        <span className="text-muted-foreground text-sm">Project Preview</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex gap-3 pt-4">
                    <Button variant="default" size="sm" className="flex-1" asChild>
                        <Link href={project.demoUrl} className="flex items-center justify-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            View Project
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={project.githubUrl} className="flex items-center justify-center gap-2">
                            <Github className="h-4 w-4" />
                            View Code
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </m.div>
    );
});

ProjectCard.displayName = "ProjectCard";

function ProjectsContent() {
    const { setProjects } = useProjectStore();
    const [displayProjects, setDisplayProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Always set our real projects data to ensure it's up to date
        setProjects(realProjects);
        setDisplayProjects(realProjects);
        setLoading(false);
    }, [setProjects]);

    if (loading) {
        return (
            <div className="container py-12 flex justify-center items-center">
                <p>Loading projects...</p>
            </div>
        );
    }

    return (
        <div className="container py-12 space-y-8">
            <header className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Development Projects Portfolio</h1>
                <p className="text-xl text-muted-foreground">
                    Explore innovative projects in AI navigation, robotics, smart home automation, and full-stack development
                </p>
                <div className="text-sm text-muted-foreground pt-2">
                    <p>Featuring expertise in React, Next.js, Python, AI systems, and autonomous robotics from Oregon State CS student</p>
                </div>
            </header>

            <LazyMotion features={domAnimation}>
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="main">
                    {displayProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </main>
            </LazyMotion>
        </div>
    );
}

export default function ProjectsPage() {
    return (
        <ClientOnly>
            <ProjectsContent />
        </ClientOnly>
    );
} 