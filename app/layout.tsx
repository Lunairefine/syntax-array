import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FarcasterProvider from "@/components/farcasterprovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Syntax Array",
  description: "Your magic is real",
  metadataBase: new URL('https://syntax-array.vercel.app'),
  openGraph: {
    title: "syntaxarray@server:~",
    description: "Your magic is real",
    url: "https://syntax-array.vercel.app",
    siteName: "Syntax Array",
    images: [
      {
        url: "/media/frame.png",
        width: 1200,
        height: 630,
        alt: "Syntax Array OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Syntax Array",
    description: "Your magic is real",
    card: "summary_large_image",
    images: ["/media/frame.png"],
  },
  other: {
    "fc:frame": JSON.stringify({
    version: "next",
    imageUrl: "https://syntax-array.vercel.app/media/frame.png",
    button: {
      title: "Create your magic",
      action: {
        type: "launch_frame",
        name: "Syntax Array Baseapp",
        url: "https://syntax-array.vercel.app",
        splashImageUrl: "https://syntax-array.vercel.app/media/icon.png",
        splashBackgroundColor: "#000000",
      },
    },
  }),
    'base:app_id': '694f44094d3a403912ed81ab',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
                <FarcasterProvider>
        {children}
      </FarcasterProvider>
      </body>
    </html>
  );
}
