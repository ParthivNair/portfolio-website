import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText } from "lucide-react";

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
                            I'm a passionate web developer with a focus on creating modern, responsive, and user-friendly applications.
                            With several years of experience in the field, I've worked on a variety of projects ranging from small business
                            websites to complex web applications.
                        </p>
                        <p className="text-muted-foreground">
                            My goal is to build digital experiences that are not only visually appealing but also functional and accessible to all users.
                        </p>

                        <div className="pt-4">
                            <Button asChild>
                                <Link href="/contact" className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Download Resume
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                        Profile Image Placeholder
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">My Skills</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {["Frontend Development", "Backend Development", "UI/UX Design", "Responsive Design", "Database Management", "API Development"].map((skill) => (
                        <Card key={skill} className="bg-muted/50">
                            <CardContent className="p-4">
                                <p className="font-medium">{skill}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Experience</h2>
                <div className="space-y-6">
                    {[
                        { title: "Senior Developer", company: "Tech Company", period: "2021 - Present" },
                        { title: "Web Developer", company: "Digital Agency", period: "2018 - 2021" },
                        { title: "Junior Developer", company: "Startup", period: "2016 - 2018" }
                    ].map((job, index) => (
                        <Card key={index}>
                            <CardContent className="p-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold">{job.title}</h3>
                                        <span className="text-sm text-muted-foreground">{job.period}</span>
                                    </div>
                                    <p className="text-muted-foreground">{job.company}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
} 