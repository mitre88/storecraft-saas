import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "StoreCraft — Launch Your Online Store in Minutes",
    template: "%s | StoreCraft",
  },
  description: "The all-in-one commerce platform for creators and entrepreneurs. Launch a stunning online store in minutes — no code, no compromise.",
  keywords: ["ecommerce", "online store", "saas", "storefront builder", "sell online"],
  openGraph: {
    title: "StoreCraft — Launch Your Online Store in Minutes",
    description: "The all-in-one commerce platform for creators and entrepreneurs.",
    url: "https://storecraft.app",
    siteName: "StoreCraft",
    type: "website",
    images: [{ url: "https://picsum.photos/1200/630?random=og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StoreCraft — Launch Your Online Store in Minutes",
    description: "The all-in-one commerce platform for creators and entrepreneurs.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "StoreCraft",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description: "The all-in-one commerce platform for creators and entrepreneurs. Launch a stunning online store in minutes.",
              url: "https://storecraft.app",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "29",
                highPrice: "199",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "8500",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
