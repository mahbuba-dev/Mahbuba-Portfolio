import type { Metadata } from "next";
import { Inter, Sora, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { CommandPalette } from "./components/command-palette";
import { ScrollToTop } from "./components/scroll-to-top";
import { SmoothScroll } from "./components/smooth-scroll";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://mahbuba.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mahbuba Akter — Junior Full Stack Web Developer",
    template: "%s · Mahbuba Akter",
  },
  description:
    "Portfolio of Mahbuba Akter — Junior Full Stack Web Developer based in New York.",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mahbuba Akter",
  url: SITE_URL,
  jobTitle: "Junior Full Stack Web Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-dvh flex-col">
            
            <Navbar />

            {/* ✅ FIXED: NO CONTAINER WRAPPER (IMPORTANT FOR ROUTING) */}
            <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 max-[380px]:px-2 pb-16 sm:pb-20">
              {children}
            </main>

            <Footer />
          </div>

          <CommandPalette />
          <ScrollToTop />
          <SmoothScroll />
        </ThemeProvider>
      </body>
    </html>
  );
}