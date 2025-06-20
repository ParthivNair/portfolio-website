"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState, useCallback, memo } from "react";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Design", href: "/design" },
    { name: "Contact", href: "/contact" },
];

// Memoized navigation link to prevent unnecessary re-renders
const NavLink = memo(({ item, isActive, isMobile = false, onClick = () => { } }: {
    item: { name: string; href: string };
    isActive: boolean;
    isMobile?: boolean;
    onClick?: () => void;
}) => (
    <Link
        href={item.href}
        className={`${isMobile ? 'text-lg' : 'text-sm'} font-medium transition-colors ${isActive ? 'text-primary' : 'hover:text-primary'}`}
        onClick={onClick}
    >
        {item.name}
    </Link>
));

NavLink.displayName = "NavLink";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const handleOpenChange = useCallback((open: boolean) => {
        setIsOpen(open);
    }, []);

    const handleLinkClick = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="flex items-center gap-2">
                    <Link href="/" className="font-bold text-xl">Parthiv Nair</Link>
                </div>

                {/* Desktop Navigation */}
                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                item={item}
                                isActive={pathname === item.href}
                            />
                        ))}
                    </nav>
                    
                    {/* Theme Toggle */}
                    <ThemeToggle />
                </div>

                {/* Mobile Navigation */}
                <div className="flex items-center gap-2 md:hidden">
                    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Menu">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col gap-4 mt-8">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        item={item}
                                        isActive={pathname === item.href}
                                        isMobile={true}
                                        onClick={handleLinkClick}
                                    />
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
} 