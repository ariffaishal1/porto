import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AccentColorProvider } from "@/components/theme/accent-color-context";
import { CommandPaletteProvider } from "@/components/layout/command-palette-context";
import { BlackHoleProvider } from "@/components/theme/black-hole-context";
import { CollapseLayoutWrapper } from "@/components/layout/collapse-layout-wrapper";
import { BlackHoleCollapseOverlay } from "@/components/ui/black-hole-collapse";
import { TerminalCommandPalette } from "@/components/ui/terminal-command-palette";
import { MatrixRain } from "@/components/ui/matrix-rain";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { generateBaseMetadata } from "@/lib/metadata";
import { profileData } from "@/data/profile";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = generateBaseMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Person & Website JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.name,
    jobTitle: profileData.role,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://arif-faishal-nugraha.vercel.app",
    sameAs: [
      profileData.socialLinks.github,
      profileData.socialLinks.linkedin,
    ].filter(Boolean),
    knowsAbout: [
      "Software Development",
      "Frontend Development",
      "React",
      "Next.js",
      "TypeScript",
      "Flutter",
    ],
  };

  return (
    <html lang="id" suppressHydrationWarning className="scroll-smooth dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} font-mono antialiased min-h-screen flex flex-col bg-[var(--terminal-bg)] text-[var(--terminal-text)]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BlackHoleProvider>
            <AccentColorProvider>
              <CommandPaletteProvider>
                <MatrixRain />
                <CollapseLayoutWrapper>
                  <Navbar />
                  <main className="flex-grow px-4 sm:px-6 py-6 pb-28 flex flex-col gap-8">{children}</main>
                  <Footer />
                </CollapseLayoutWrapper>
                <BlackHoleCollapseOverlay />
                <TerminalCommandPalette />
              </CommandPaletteProvider>
            </AccentColorProvider>
          </BlackHoleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


