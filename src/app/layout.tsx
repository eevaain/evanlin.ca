import "./globals.css";
import { Spectral } from "next/font/google";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata = {
  title: "Evan Lin",
  description:
    "Evan Lin's personal website - fascinated by fundamental building blocks and opening black boxes.",
  openGraph: {
    title: "Evan Lin",
    description: "Evan Lin's personal website",
    type: "website",
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
      <body className={`${spectral.className} bg-gray-100 h-full`}>
        {children}
      </body>
    </html>
  );
}
