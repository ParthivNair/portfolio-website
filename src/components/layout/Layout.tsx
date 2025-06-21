"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import NowPlaying from "@/components/NowPlaying";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 w-full mx-auto">{children}</main>
            <Footer />
            <NowPlaying />
        </div>
    );
} 