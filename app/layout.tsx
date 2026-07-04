import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/vazirmatn";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/italiana/400.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_PUBLIC_SITE_URL || "https://kalahamoon.com"),
  title: "Kalahamoon",
  description: "AI-powered omnichannel sales CRM for marketplace teams.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
