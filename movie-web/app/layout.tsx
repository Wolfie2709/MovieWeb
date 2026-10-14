import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Movie Web",
  description: "Movie and streaming landing page built with Next.js and TypeScript.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-black text-white">
        <Providers>
          <main className= "flex-1 w-full">
          <Header />
          {children}
           <Footer />
          </main>
        </Providers>
        </body>
    </html>
  );
}
