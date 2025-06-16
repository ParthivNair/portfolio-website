"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProjectStore, Project } from "@/lib/store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ClientOnly from "@/components/ClientOnly";

// Access key for basic protection
// In client components, we need to use NEXT_PUBLIC_ prefix for environment variables
const ACCESS_KEY = process.env.NEXT_PUBLIC_ADMIN_ACCESS_KEY;

// Define form schema with string type for tags (will be transformed later)
const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    image: z.string().url("Please enter a valid URL"),
    tags: z.string(),
    demoUrl: z.string().url("Please enter a valid URL"),
    githubUrl: z.string().url("Please enter a valid URL"),
});

// Type for the form values
type FormValues = z.infer<typeof formSchema>;

function AdminContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const { addProject, projects } = useProjectStore();

    // Check if the access key is correct
    useEffect(() => {
        const key = searchParams?.get("key") || null;
        if (key === ACCESS_KEY) {
            setIsAuthorized(true);
        } else {
            router.push("/");
        }
    }, [searchParams, router]);

    console.log("Access key:", ACCESS_KEY); // For debugging

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            image: "",
            tags: "",
            demoUrl: "",
            githubUrl: "",
        },
    });

    function onSubmit(values: FormValues) {
        // Transform tags string to array before adding to store
        const tagsArray = values.tags.split(",").map(tag => tag.trim());

        addProject({
            title: values.title,
            description: values.description,
            image: values.image,
            tags: tagsArray,
            demoUrl: values.demoUrl,
            githubUrl: values.githubUrl,
        });

        form.reset();
        alert("Project added successfully!");
    }

    if (!isAuthorized) {
        return <div className="container py-12">Checking authorization...</div>;
    }

    return (
        <div className="container py-12 space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-xl text-muted-foreground">
                    Add and manage your projects
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Project</CardTitle>
                            <CardDescription>
                                Fill out the form below to add a new project to your portfolio
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Project Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="My Awesome Project" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="A brief description of your project"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="tags"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tech Stack</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="React, TypeScript, Tailwind CSS" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Comma-separated list of technologies used
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Image URL</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://example.com/image.jpg" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="demoUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Demo URL</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://myproject.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="githubUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>GitHub URL</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://github.com/user/repo" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full">Add Project</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Stats</CardTitle>
                            <CardDescription>
                                Overview of your portfolio projects
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Total Projects</span>
                                    <span className="font-medium text-lg">{projects.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Latest Project</span>
                                    <span className="font-medium">
                                        {projects.length > 0
                                            ? projects.sort((a, b) => b.createdAt - a.createdAt)[0].title
                                            : "None"}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full" onClick={() => router.push("/projects")}>
                                View All Projects
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function AdminPage() {
    return (
        <ClientOnly>
            <AdminContent />
        </ClientOnly>
    );
} 