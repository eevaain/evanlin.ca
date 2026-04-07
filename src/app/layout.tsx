import type { Metadata } from "next";
import "./globals.css";
import { Spectral } from "next/font/google";
import Navigation from "@/components/navigation";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://www.evanlin.ca"),
  title: "Evan Lin",
  description:
    "Evan Lin's personal website - fascinated by fundamental building blocks and opening black boxes.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "Evan Lin",
    description: "Evan Lin's personal website",
    type: "website",
    url: "https://www.evanlin.ca",
    siteName: "Evan Lin",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Preconnect to improve font load performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Enable DNS prefetching for external links */}
        <link rel="dns-prefetch" href="https://twitter.com" />
        <link rel="dns-prefetch" href="https://github.com" />
      </head>
      <body className={`${spectral.className} h-full bg-[#FAFAF9] text-stone-800`}>
        <div className="min-h-screen px-6 pb-12 pt-8 md:px-8 md:pt-10">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:flex-row md:gap-16">
            <Navigation />
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
