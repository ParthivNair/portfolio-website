"use client";

import { useEffect, useState } from "react";

interface ClientOnlyProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Return fallback or null during SSR to prevent hydration errors
    if (!isMounted) {
        return fallback;
    }

    return <>{children}</>;
} 