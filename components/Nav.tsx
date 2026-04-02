"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Home Services", href: "/home-service" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-[#0C0C0C]/90 backdrop-blur-md border-b border-[#2A2A2A]"
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group transition-all duration-300 group-hover:scale-105">
            <img
              src="/siryano-logo-gold.png"
              alt="Siryano"
              width={50}
              height={30}
              className="object-contain"
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[13px] tracking-[0.15em] text-[#7A7A7A] hover:text-[#F5F0E8] transition-colors duration-300 uppercase font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase font-semibold text-[#0C0C0C] bg-[#C8A96E] px-6 py-2.5 hover:bg-[#F0D090] transition-all duration-300 active:scale-[0.98]"
          >
            Book Now
          </a>

          {/* Mobile burger */}
          <button
            className="md:hidden text-[#F5F0E8] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-0 z-40 bg-[#0C0C0C] flex flex-col items-center justify-center gap-10 ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {navLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-light tracking-widest text-[#F5F0E8] hover:text-[#C8A96E] transition-colors duration-300"
          >
            {link.label}
          </motion.a>
        ))}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.32, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setMenuOpen(false)}
          className="mt-4 text-[12px] tracking-[0.25em] uppercase font-semibold text-[#0C0C0C] bg-[#C8A96E] px-10 py-3 hover:bg-[#F0D090] transition-all duration-300"
        >
          Book Now
        </motion.a>
      </motion.div>
    </>
  );
}
