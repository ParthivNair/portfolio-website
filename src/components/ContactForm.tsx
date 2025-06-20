"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [submitMessage, setSubmitMessage] = useState('');

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    async function onSubmit(values: ContactFormValues) {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        
        try {
            // Use FastAPI backend deployed to Vercel
            const apiUrl = process.env.NODE_ENV === 'production' 
                ? 'https://api.parthivnair.com/api/contact'
                : 'http://localhost:8000/api/contact';
                
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setSubmitMessage(data.message || 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.');
                form.reset();
            } else {
                setSubmitStatus('error');
                setSubmitMessage(data.detail || data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            setSubmitStatus('error');
            setSubmitMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card role="complementary">
            <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                    Reach out for collaboration opportunities, project inquiries, or just to connect
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your name"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email *</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Your email"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Project collaboration, internship opportunity, etc."
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message *</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={5}
                                            placeholder="Tell me about your project, opportunity, or how we can collaborate..."
                                            className="resize-none"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                                <CheckCircle className="h-4 w-4" />
                                <p className="text-sm">{submitMessage}</p>
                            </div>
                        )}
                        
                        {submitStatus === 'error' && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{submitMessage}</p>
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                'Send Message'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
} 