import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Contact | Portfolio",
    description: "Get in touch with me",
};

export default function ContactPage() {
    return (
        <div className="container py-12 space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
                <p className="text-xl text-muted-foreground">
                    Get in touch with me for collaborations or inquiries
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <p className="text-muted-foreground">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        Feel free to reach out through the contact form or via my social media profiles.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <p>example@example.com</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <p>San Francisco, CA</p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <h3 className="text-lg font-medium mb-3">Connect with me</h3>
                        <div className="flex gap-4">
                            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Button variant="outline" size="icon">
                                    <Github className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Button variant="outline" size="icon">
                                    <Linkedin className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <Button variant="outline" size="icon">
                                    <Twitter className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Send a Message</CardTitle>
                        <CardDescription>Fill out the form below to send me a message</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="w-full p-2 rounded-md border border-input bg-background"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="w-full p-2 rounded-md border border-input bg-background"
                                        placeholder="Your email"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    className="w-full p-2 rounded-md border border-input bg-background"
                                    placeholder="Subject"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full p-2 rounded-md border border-input bg-background resize-none"
                                    placeholder="Your message"
                                ></textarea>
                            </div>
                            <Button type="submit" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 