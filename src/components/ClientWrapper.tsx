"use client";

import Layout from "@/components/layout/Layout";
import { ThemeProvider } from "@/lib/theme-context";
import { useEffect, useState } from "react";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a minimal layout during SSR to prevent hydration issues
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
} 