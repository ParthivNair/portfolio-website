"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { motion, LazyMotion, domAnimation, m } from "framer-motion";
import { useProjectStore, Project } from "@/lib/store";
import { useEffect, useState, useMemo, memo } from "react";
import ClientOnly from "@/components/ClientOnly";

// Fallback projects in case there are no projects in the store
// Using static timestamps to avoid hydration errors
const fallbackProjects = [
    {
        id: "1",
        title: "E-commerce Platform",
        description: "A fully responsive e-commerce platform built with Next.js and Stripe integration for seamless payments.",
        image: "/placeholder.jpg",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
        demoUrl: "#",
        githubUrl: "#",
        createdAt: 1672531200000, // Static timestamp: Jan 1, 2023
    },
    {
        id: "2",
        title: "Task Management App",
        description: "A drag-and-drop task management application with real-time updates and collaborative features.",
        image: "/placeholder.jpg",
        tags: ["React", "Firebase", "Tailwind CSS", "DnD"],
        demoUrl: "#",
        githubUrl: "#",
        createdAt: 1675209600000, // Static timestamp: Feb 1, 2023
    },
    {
        id: "3",
        title: "Portfolio Website",
        description: "A responsive portfolio website built with Next.js, Tailwind CSS, and Framer Motion animations.",
        image: "/placeholder.jpg",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        demoUrl: "#",
        githubUrl: "#",
        createdAt: 1677628800000, // Static timestamp: Mar 1, 2023
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
            className="flex"
            layout
        >
            <Card className="flex flex-col overflow-hidden w-full border border-border/40 bg-card/60">
                <CardHeader className="pb-3">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <div className="h-40 bg-muted rounded-md flex items-center justify-center mb-4">
                        <span className="text-muted-foreground">Project Preview</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-full text-xs font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2 pt-3">
                    <Button variant="default" size="sm" className="flex-1" asChild>
                        <Link href={project.demoUrl} className="flex items-center justify-center gap-1">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View Project
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={project.githubUrl} className="flex items-center justify-center gap-1">
                            <Github className="h-4 w-4 mr-1" />
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
        // Initialize with fallback projects if no projects exist in the store
        if (projects.length === 0) {
            setProjects(fallbackProjects);
        }

        setDisplayProjects(projects.length > 0 ? projects : fallbackProjects);
        setLoading(false);
    }, [projects, setProjects]);

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
                    Explore my recent projects and applications
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