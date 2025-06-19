import { Metadata } from "next";
import ClientOnly from "@/components/ClientOnly";
import ProjectsContent from "./ProjectsContent";

// Add metadata for the projects page
export const metadata: Metadata = {
    title: "Projects - Parthiv Nair",
    description: "Explore Parthiv Nair's portfolio of innovative web development projects including smart home automation, local food marketplaces, geolocation apps, and full-stack applications built with React, Next.js, Python, and modern technologies.",
    keywords: [
        "Parthiv Nair projects",
        "web development portfolio",
        "React projects",
        "Next.js applications",
        "smart home automation",
        "full-stack developer",
        "Python projects",
        "Firebase applications",
        "geolocation apps",
        "property management system",
        "AI content generator",
        "local marketplace"
    ],
    alternates: {
        canonical: '/projects',
    },
    openGraph: {
        title: "Projects - Parthiv Nair Portfolio",
        description: "Innovative web development projects including smart home platforms, community marketplaces, and geolocation applications built with modern technologies.",
        url: 'https://www.parthivnair.com/projects',
        images: ['/img/profile/pfp.jpg'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projects - Parthiv Nair Portfolio',
        description: 'Innovative web development projects built with React, Next.js, Python, and modern technologies.',
        images: ['/img/profile/pfp.jpg'],
    },
};

export default function ProjectsPage() {
    return (
        <ClientOnly>
            <ProjectsContent />
        </ClientOnly>
    );
} 