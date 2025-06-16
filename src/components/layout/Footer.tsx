import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t bg-background/95">
            <div className="container flex flex-col md:flex-row items-center justify-between py-8 gap-4 px-4 sm:px-6 lg:px-8 mx-auto">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Portfolio. All rights reserved.
                </p>

                <div className="flex items-center gap-4">
                    <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                    </Link>
                    <Link href="mailto:example@example.com" aria-label="Email">
                        <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                    </Link>
                </div>
            </div>
        </footer>
    );
} 