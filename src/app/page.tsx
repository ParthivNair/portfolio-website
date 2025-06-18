"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TypingEffect } from "@/components/ui/typing-effect";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import { memo } from "react";
import { images } from '@/lib/images';


// Catchphrases for typing effect
const catchphrases = [
  "Building useful things that make everyday life a little easier or more connected.",
  "Creating solutions that bridge the gap between technology and human needs.",
  "Developing apps and systems that solve real-world problems.",
  "Crafting digital experiences that bring people together.",
  "Turning ideas into tools that make a difference."
];

// Featured projects data
const featuredProjects = [
  {
    id: 1,
    title: "SpaceSync",
    description: "Smart Home Automation Platform that allows users to control lighting, temperature, and environmental routines with account-based personalization.",
    tags: ["React", "TailwindCSS", "Firebase", "Figma", "Usability Testing"]
  },
  {
    id: 2,
    title: "Adresur",
    description: "A home-cooked food marketplace that connects local chefs to nearby customers, eliminating third-party fees and empowering small food creators.",
    tags: ["Next.js", "Firebase", "Stripe API", "TailwindCSS"]
  },
  {
    id: 3,
    title: "Place",
    description: "An interactive map-based app that helps users find local hikes, restaurants, and attractions with personalized recommendations.",
    tags: ["FastAPI", "React", "PostgreSQL", "Mapbox API", "JWT Auth"]
  }
];

// Memoized card component to prevent unnecessary re-renders
const ProjectCard = memo(({ project }: { project: typeof featuredProjects[0] }) => (
  <Card key={project.id} className="overflow-hidden">
    <CardHeader>
      <CardTitle>{project.title}</CardTitle>
      <CardDescription className="line-clamp-3">{project.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-40 bg-muted rounded-md flex items-center justify-center mb-4">
        Project Preview
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium border"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="inline-flex items-center text-xs text-muted-foreground px-2 py-1">
            +{project.tags.length - 3} more
          </span>
        )}
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="ghost" size="sm" className="ml-auto" asChild>
        <Link href="/projects" className="flex items-center gap-1">
          Learn More <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
));

ProjectCard.displayName = "ProjectCard";

export default function Home() {
  return (
    <div className="container space-y-24 py-12 md:py-16">
      {/* Hero Section with Animation */}
      <LazyMotion features={domAnimation}>
        <section className="flex flex-col items-center text-center space-y-6 py-16 md:py-24">
          <m.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut"
            }}
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Parthiv Nair
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
              Computer Science Student
            </h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto min-h-[3.5rem] flex items-center justify-center">
              <TypingEffect 
                phrases={catchphrases}
                typingSpeed={80}
                deletingSpeed={40}
                pauseTime={2500}
                errorChance={0.4}
                className="text-center"
              />
            </p>

            <m.div
              className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.2,
                ease: "easeOut"
              }}
            >
              <Button asChild size="lg">
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Me</Link>
              </Button>
            </m.div>
          </m.div>
        </section>
      </LazyMotion>

      {/* About Me Section */}
      <section className="py-12">
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-center md:text-left">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Photo - Left on desktop, top on mobile */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-muted">
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                <Image src={images.profile.pfp} alt="Parthiv Nair" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Text - Right on desktop, bottom on mobile */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Who I Am</h3>
              <p className="text-muted-foreground">
                I&apos;m a Computer Science student at Oregon State University who enjoys building useful things—whether that&apos;s a smart home app, a tool to share local experiences, or a system that automates daily tasks. I&apos;ve spent time exploring different areas of tech, from backend systems and microservices to UI design and robotics.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">What Drives Me</h3>
              <p className="text-muted-foreground">
                Most of my projects are built around the idea of making everyday life a little easier or more connected. I&apos;m always thinking about new ideas—how tech can be more human, how to reduce unnecessary complexity, or how to make things more accessible.
              </p>
            </div>

            <div className="pt-4">
              <Button asChild>
                <Link href="/about">More About Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-8 py-12">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          <p className="text-muted-foreground">Check out some of my recent work</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
