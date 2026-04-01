"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin } from "@phosphor-icons/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] grid grid-cols-1 lg:grid-cols-[1fr_1fr] overflow-hidden"
    >
      {/* Left — Content */}
      <div className="relative z-10 flex flex-col justify-end pb-20 pt-36 px-6 md:px-16 lg:px-20">
        <motion.div style={{ y: textY }} className="space-y-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-[#C8A96E]" />
            <span className="text-[11px] tracking-[0.3em] text-[#C8A96E] uppercase font-medium">
              Est. 2007 — Best Barbershop in Business Bay, Dubai
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(5rem,16vw,12rem)] font-light leading-[0.9] tracking-[-0.03em] text-[#F5F0E8]"
          >
            The Art of
            <br />
            <span className="gold-shimmer font-semibold">The Cut.</span>
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15px] leading-relaxed text-[#7A7A7A] max-w-[38ch] font-light"
          >
            Where precision meets craft. Siryano is a sanctuary for the
            modern gentleman — sharp lines, immaculate grooming, and a
            ritual worth returning to.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2"
          >
            <a
              href="#contact"
              className="group flex items-center gap-3 bg-[#C8A96E] text-[#0C0C0C] px-8 py-4 text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-[#F0D090] transition-all duration-300 active:scale-[0.98]"
            >
              Book a Session
              <ArrowRight
                size={14}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#services"
              className="text-[12px] tracking-[0.15em] uppercase text-[#7A7A7A] hover:text-[#F5F0E8] transition-colors duration-300 font-medium border-b border-transparent hover:border-[#C8A96E] pb-0.5"
            >
              View Services
            </a>
          </motion.div>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center gap-2 pt-4"
          >
            <MapPin size={13} weight="fill" className="text-[#C8A96E]" />
            <span className="text-[12px] text-[#4A4A4A] tracking-wide">
              Escape Tower, Business Bay, Dubai — Next to Metro • Free Parking
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Right — Video */}
      <div className="relative overflow-hidden hidden lg:block">
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-0 origin-center"
        >
          <video
            src="/siryano hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Dark fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/60 via-transparent to-transparent" />
        </motion.div>

        {/* Floating stat card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-16 right-10 z-10 bg-[#0C0C0C]/80 backdrop-blur-md border border-[#2A2A2A] p-6 space-y-4"
          style={{
            boxShadow: "inset 0 1px 0 rgba(200,169,110,0.1)",
          }}
        >
          <div className="flex gap-8">
            {[
              { value: "4,200+", label: "Happy Clients" },
              { value: "19+", label: "Years Running" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-2xl font-semibold text-[#C8A96E] tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[11px] text-[#5A5A5A] tracking-widest uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile bg video */}
      <div className="absolute inset-0 lg:hidden">
        <video
          src="/siryano hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/75 to-[#0C0C0C]/30" />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0C0C0C] to-transparent pointer-events-none z-10" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-[#4A4A4A] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#C8A96E] to-transparent"
        />
      </motion.div>
    </section>
  );
}
