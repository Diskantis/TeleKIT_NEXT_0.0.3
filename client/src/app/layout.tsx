"use strict";

import React from "react";

import type { Metadata } from "next";
import "./globals.css";

import { Roboto } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "TeleKIT NEXT",
  description: "Телевизионный журналистский комплект",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={roboto.className}>
          <div className="h-screen">
            <Header />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
