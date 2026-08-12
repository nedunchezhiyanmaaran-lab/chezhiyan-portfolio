import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anbuchezhiyan — Full Stack Developer | Next.js, React, FastAPI & SaaS Architect",
  description: "Anbuchezhiyan is a Full Stack Developer with 1+ years of experience building modern web applications, SaaS platforms, backend APIs, and database architecture using TypeScript, Next.js, React, FastAPI, Supabase, and PostgreSQL.",
  keywords: [
    "Anbuchezhiyan",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "FastAPI Developer",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "MongoDB",
    "SaaS Developer",
    "Web Application Developer"
  ],
  authors: [{ name: "Anbuchezhiyan" }],
  creator: "Anbuchezhiyan",
  openGraph: {
    title: "Anbuchezhiyan — Full Stack Developer",
    description: "Full Stack Developer building modern web applications, SaaS platforms, backend APIs, and database-driven applications.",
    url: "https://anbuchezhiyan.dev",
    siteName: "Anbuchezhiyan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anbuchezhiyan — Full Stack Developer",
    description: "Full Stack Developer building modern web applications, SaaS platforms, backend APIs, and database-driven applications.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23881337%22/><text x=%2250%25%22 y=%2255%25%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2242%22 font-weight=%22bold%22 fill=%22%23ffffff%22 font-family=%22sans-serif%22>AC</text></svg>"
        />
      </head>
      <body className="min-h-screen bg-white text-[#27272a] font-sans antialiased selection:bg-[#fff1f2] selection:text-[#881337]">
        {children}
      </body>
    </html>
  );
}
