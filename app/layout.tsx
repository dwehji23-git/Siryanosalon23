import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://siryano.com"),
  title: {
    default: "Siryano — Best Barbershop in Business Bay, Dubai",
    template: "%s | Siryano Barbershop Dubai",
  },
  description: "Siryano is the best barbershop in Business Bay, Dubai. Premium haircuts, skin fades, beard shaping & home barber service across Dubai. Open 9AM–11PM daily. Escape Tower, next to Metro.",
  keywords: [
    "best barbershop in UAE",
    "barbershop in business bay",
    "barbershop home service",
    "barber home service dubai",
    "haircut business bay",
    "best business bay barbershop",
    "men haircut dubai",
    "skin fade dubai",
    "beard trim dubai",
    "siryano barbershop",
  ],
  openGraph: {
    type: "website",
    title: "Siryano — Best Barbershop in Business Bay, Dubai",
    description: "Premium men's grooming in the heart of Business Bay. Haircuts, fades, beard shaping & home barber service. Est. 2007. Open daily 9AM–11PM.",
    url: "https://siryano.com",
    siteName: "Siryano Barbershop",
    locale: "en_AE",
    images: [
      {
        url: "/hero-barbershop-professional.jpg",
        width: 1200,
        height: 630,
        alt: "Siryano Barbershop Business Bay Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siryano — Best Barbershop in Business Bay, Dubai",
    description: "Premium men's grooming in Business Bay. Haircuts, fades, beard shaping & home barber service across Dubai.",
    images: ["/hero-barbershop-professional.jpg"],
  },
  alternates: {
    canonical: "https://siryano.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "Siryano Gent Saloon & Spa",
    description: "Best barbershop in Business Bay, Dubai. Premium haircuts, skin fades, beard grooming and home barber service.",
    url: "https://siryano.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Escape Tower, Business Bay",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.1865,
      longitude: 55.2653,
    },
    openingHours: "Mo-Su 09:00-23:00",
    priceRange: "AED 45–499",
    hasMap: "https://maps.google.com/?q=Escape+Tower+Business+Bay+Dubai",
    areaServed: ["Dubai", "Business Bay", "UAE"],
    foundingDate: "2007",
    image: "https://siryano.com/hero-barbershop-professional.jpg",
  };

  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grain min-h-full flex flex-col bg-[#0C0C0C]">
        {children}
      </body>
    </html>
  );
}
