import type { Metadata, Viewport } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0a1b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dayonebrand.com"),
  title: "Day One — Foundation First. Growth Follows.",
  description:
    "Day One is the single team behind your website, software and growth marketing. Web design, custom software, SEO and digital marketing — one team, one point of accountability, from idea to launch.",
  icons: {
    icon: "/assets/day1-emblem-dark.png",
    shortcut: "/assets/day1-emblem-dark.png",
    apple: "/assets/day1-emblem-dark.png",
  },
  openGraph: {
    type: "website",
    siteName: "Day One",
    url: "https://dayonebrand.com/",
    title: "Day One — Foundation First. Growth Follows.",
    description:
      "The single team behind your website, software and growth marketing. Web design, custom software, SEO and digital marketing — one team, one point of accountability.",
    images: [
      {
        url: "/assets/day1-emblem-dark.png",
        width: 928,
        height: 928,
        alt: "Day One",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Day One — Foundation First. Growth Follows.",
    description:
      "The single team behind your website, software and growth marketing. Web design, custom software, SEO and digital marketing — one team, one point of accountability.",
    images: ["/assets/day1-emblem-dark.png"],
  },
};

import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSans.variable}`}>
      <body>
        <SmoothScrollProvider>
          <CustomCursor />
          <div className="starfield" id="starfield" aria-hidden="true" />
          <div className="bg-blob bg-blob--1" aria-hidden="true" />
          <div className="bg-blob bg-blob--2" aria-hidden="true" />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
