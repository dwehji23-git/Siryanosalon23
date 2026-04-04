import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment — Siryano Barbershop",
  description:
    "Book your barbershop appointment at Siryano. Choose your location in Dubai or Abu Dhabi, select services, and reserve your time slot.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
