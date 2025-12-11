import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Freshies | Skincare for Tweens and Teens",
  description: "Freshies helps families find safe products and build healthy skincare routines.",
};

import StoryblokProvider from "@/components/StoryblokProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased bg-cream text-deep-purple font-sans`}>
        <StoryblokProvider>
          <Header />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </StoryblokProvider>
      </body>
    </html>
  );
}
