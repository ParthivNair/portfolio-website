"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import { memo } from "react";

// Memoized card component to prevent unnecessary re-renders
const ProjectCard = memo(({ index }: { index: number }) => (
  <Card key={index} className="overflow-hidden">
    <CardHeader>
      <CardTitle>Project {index}</CardTitle>
      <CardDescription>A brief description of project {index}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-40 bg-muted rounded-md flex items-center justify-center">
        Project Preview
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
              Upcoming Software Developer
            </h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Driven by Ideas. Grounded in Purpose.
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
                Profile Photo
              </div>
              {/* Uncomment and use your actual photo 
              <Image 
                src="/profile.jpg" 
                alt="Parthiv Nair" 
                fill 
                className="object-cover"
                priority
              /> 
              */}
            </div>
          </div>

          {/* Text - Right on desktop, bottom on mobile */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Who I Am</h3>
              <p className="text-muted-foreground">
              I’m a Computer Science student at Oregon State University who enjoys building useful things—whether that’s a smart home app, a tool to share local experiences, or a system that automates daily tasks.
              I’ve spent time exploring different areas of tech, from backend systems and microservices to UI design and robotics.
              Most of my projects are built around the idea of making everyday life a little easier or more connected.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">What I Do</h3>
              <p className="text-muted-foreground">
              Outside of coding, I’m always thinking about new ideas—how tech can be more human, how to reduce unnecessary complexity, or how to make things more accessible.
              I like working on projects that solve real problems, and I try to keep learning and improving as I go.
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
          {[1, 2, 3].map((i) => (
            <ProjectCard key={i} index={i} />
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
