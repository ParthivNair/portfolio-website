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
    default: "Parthiv Nair - CS Student & Robotics Leader | Oregon State University",
    template: "%s | Parthiv Nair - Developer Portfolio"
  },
  description: "Computer Science student at Oregon State University specializing in AI navigation systems, robotics leadership, and full-stack development. Former robotics team captain with expertise in autonomous systems and innovative web applications.",
  keywords: [
    "Computer Science student Oregon State",
    "robotics team captain",
    "AI navigation systems",
    "autonomous systems developer",
    "full-stack developer portfolio",
    "React Next.js developer",
    "CS student robotics leadership",
    "Oregon State University CS",
    "web application developer",
    "startup founder tech",
    "property management system developer",
    "geolocation app developer",
    "voiceover content generator"
  ],
  authors: [{ name: "Parthiv Nair" }],
  creator: "Parthiv Nair",
  publisher: "Parthiv Nair",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://parthivnair.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://parthivnair.dev',
    title: 'Parthiv Nair - CS Student & Robotics Leader | Oregon State University',
    description: 'Computer Science student at Oregon State University specializing in AI navigation systems, robotics leadership, and full-stack development. View my portfolio of innovative web applications and startup projects.',
    siteName: 'Parthiv Nair Portfolio',
    images: [
      {
        url: '/img/profile/pfp.jpg',
        width: 1200,
        height: 630,
        alt: 'Parthiv Nair - Oregon State CS student and robotics team captain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parthiv Nair - CS Student & Robotics Leader',
    description: 'Computer Science student at Oregon State University specializing in AI navigation systems and full-stack development.',
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
    google: 'your-google-verification-code',
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
              "description": "CS student at Oregon State University, former robotics team captain specializing in AI navigation systems and full-stack development",
              "url": "https://parthivnair.dev",
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
                "Robotics",
                "AI Navigation Systems", 
                "Full-Stack Development",
                "React",
                "Next.js",
                "Python",
                "Autonomous Systems"
              ],
              "image": "https://parthivnair.dev/img/profile/pfp.jpg"
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
