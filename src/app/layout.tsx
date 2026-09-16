import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { LanguageProvider } from "@/components/theme/language-context";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AccentColorProvider } from "@/components/theme/accent-color-context";
import { CommandPaletteProvider } from "@/components/layout/command-palette-context";
import { BlackHoleProvider } from "@/components/theme/black-hole-context";
import { CollapseLayoutWrapper } from "@/components/layout/collapse-layout-wrapper";
import { LazyOverlays } from "@/components/layout/lazy-overlays";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { generateBaseMetadata } from "@/lib/metadata";
import { getPersonAndWebsiteJsonLd, sanitizeJsonLd } from "@/lib/jsonld";

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
  const jsonLd = getPersonAndWebsiteJsonLd();

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className="scroll-smooth dark"
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(jsonLd) }}
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
          <LanguageProvider>
            <BlackHoleProvider>
              <AccentColorProvider>
                <CommandPaletteProvider>
                  <CollapseLayoutWrapper>
                    <Navbar />
                    <main className="flex-grow px-4 sm:px-6 py-6 pb-28 flex flex-col gap-8 print:p-0 print:m-0 print:pb-0 print:gap-0 print:block print:w-full print:max-w-none">{children}</main>
                    <Footer />
                  </CollapseLayoutWrapper>
                  <LazyOverlays />
                </CommandPaletteProvider>
              </AccentColorProvider>
            </BlackHoleProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
