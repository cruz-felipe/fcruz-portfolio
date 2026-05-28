import type { Metadata } from "next";
import "./globals.css";
import ResponsiveStyles from "@/components/ResponsiveStyles";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Felipe Cruz — Senior Product Designer",
  description: "Eleven years designing products at global scale. BSS/OSS, telecom, B2B and B2C across 9 countries.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Felipe Cruz",
    description: "I design for the moment when complexity is no longer manageable and someone has to make it work.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>  
      <body>
        <ResponsiveStyles />
        <ScrollProgress />
        <a href="#main-content" className="skip-link" aria-label="Skip to main content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
