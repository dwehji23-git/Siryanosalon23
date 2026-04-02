// app/home-service/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Home Service | Siryano Barbershop Dubai",
  description: "Book premium haircut and grooming services in the comfort of your home. Same-day booking available across Dubai. Haircut, skin fade, beard trim, and more.",
  keywords: [
    "home barber service dubai",
    "barber home service",
    "at-home haircut",
    "mobile barber dubai",
  ],
};

export default function HomeServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
