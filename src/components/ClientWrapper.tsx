"use client";

import Layout from "@/components/layout/Layout";
import { ThemeProvider } from "@/lib/theme-context";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
} 