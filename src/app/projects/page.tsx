"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { motion, LazyMotion, domAnimation, m } from "framer-motion";
import { useProjectStore, Project } from "@/lib/store";
import { useEffect, useState, useMemo, memo } from "react";
import ClientOnly from "@/components/ClientOnly";

// Real projects from docs/projects.md
const realProjects = [
    {
        id: "spacesync",
        title: "SpaceSync",
        description: "Smart Home Automation Platform that allows users to control lighting, temperature, and environmental routines with account-based personalization.",
        image: "/placeholder.jpg",
        tags: ["React", "TailwindCSS", "Firebase", "Figma", "Usability Testing"],
        demoUrl: "#",
        githubUrl: "#",
        createdAt: 1672531200000,
    },
    {
        id: "adresur",
        title: "Adresur",
        description: "A home-cooked food marketplace that connects local chefs to nearby customers, eliminating third-party fees and empowering small food creators.",
        image: "/placeholder.jpg",
        tags: ["Next.js", "Firebase", "Stripe API", "TailwindCSS"],
        demoUrl: "#",
        githubUrl: "#",
        createdAt: 1675209600000,
    },
    {
        id: "place",
        title: "Place",
        description: "An interactive map-based app that helps users find local hikes, restaurants, and attractions with personalized recommendations.",
        image: "/placeholder.jpg",
        tags: ["FastAPI", "React", "PostgreSQL", "Mapbox API", "JWT Auth"],
        demoUrl: "#",
        githubUrl: "#",
        createdAt: 1677628800000,
    },
    {
        id: "property-management",
        title: "Property Management System",
        description: "A tool to help landlords and tenants manage listings, payments, and maintenance requests. Built using a modular microservice architecture.",
        image: "/placeholder.jpg",
        tags: ["FastAPI", "React", "MongoDB", "Docker", "Microservices"],
        demoUrl: "#",
        githubUrl: "#",
        createdAt: 1680220800000,
    },
    {
        id: "content-generator",
        title: "Content Generator",
        description: "AI-powered tool that creates social media voiceovers and subtitles for creators, with plans to evolve into a custom video platform.",
        image: "/placeholder.jpg",
        tags: ["Python", "FFmpeg", "OpenAI API", "React", "MongoDB"],
        demoUrl: "#",
        githubUrl: "#",
        createdAt: 1682812800000,
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
                    <div className="h-40 bg-muted rounded-lg flex items-center justify-center border">
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
    const { projects, setProjects } = useProjectStore();
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
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
                <p className="text-xl text-muted-foreground">
                    Explore my projects that make everyday life a little easier or more connected
                </p>
            </div>

            <LazyMotion features={domAnimation}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
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