import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Parthiv Nair - CS Student & Developer",
    template: "%s | Parthiv Nair"
  },
  description: "Computer Science student at Oregon State University with experience in team leadership and full-stack development. Building innovative web applications and exploring autonomous systems.",
  keywords: [
    "Parthiv Nair",
    "Computer Science student",
    "full-stack developer",
    "React Next.js developer",
    "web application developer",
    "Oregon State University",
    "software engineering",
    "startup founder",
    "property management system",
    "geolocation apps",
    "smart home automation"
  ],
  authors: [{ name: "Parthiv Nair" }],
  creator: "Parthiv Nair",
  publisher: "Parthiv Nair",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.parthivnair.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.parthivnair.com',
    title: 'Parthiv Nair - CS Student & Developer',
    description: 'Computer Science student at Oregon State University building innovative web applications and exploring autonomous systems. View my portfolio of projects and startup ideas.',
    siteName: 'Parthiv Nair Portfolio',
    images: [
      {
        url: '/img/profile/pfp.jpg',
        width: 1200,
        height: 630,
        alt: 'Parthiv Nair - Computer Science student and developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parthiv Nair - CS Student & Developer',
    description: 'Computer Science student building innovative web applications and exploring technology solutions.',
    images: ['/img/profile/pfp.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code-here', // Replace with your actual Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  if (['dark', 'earth', 'light'].includes(theme)) {
                    document.documentElement.classList.add(theme);
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Parthiv Nair",
              "jobTitle": "Computer Science Student",
              "description": "CS student and developer with experience in team leadership and full-stack development",
              "url": "https://www.parthivnair.com",
              "sameAs": [
                "https://github.com/ParthivNair",
                "https://www.linkedin.com/in/parthivnair/",
                "https://www.instagram.com/partthivv/"
              ],
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Oregon State University"
              },
              "knowsAbout": [
                "Computer Science",
                "Full-Stack Development",
                "React",
                "Next.js",
                "Python",
                "Web Applications",
                "Software Engineering",
                "Team Leadership"
              ],
              "image": "https://www.parthivnair.com/img/profile/pfp.jpg"
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
