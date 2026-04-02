"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, Clock, MapPin } from "@phosphor-icons/react";

export default function Booking() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-32 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Full-width CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden bg-[#C8A96E] p-12 md:p-16 mb-16"
        >
          {/* Background texture */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
              backgroundSize: "12px 12px",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3">
              <p className="text-[11px] tracking-[0.3em] text-[#0C0C0C]/60 uppercase font-medium">
                Ready for your best cut?
              </p>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-tight tracking-[-0.03em] text-[#0C0C0C]">
                Book your appointment.
              </h2>
              <p className="text-[14px] text-[#0C0C0C]/70 font-light max-w-[40ch]">
                Spots fill up fast. Reserve yours online or give us a call directly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:+13128471928"
                className="group flex items-center gap-2 bg-[#0C0C0C] text-[#C8A96E] px-8 py-4 text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-[#1A1A1A] transition-all duration-300 active:scale-[0.98]"
              >
                <Phone size={14} weight="bold" />
                Call Now
              </a>
              <a
                href="/home-service"
                className="group flex items-center gap-2 bg-transparent border-2 border-[#0C0C0C] text-[#0C0C0C] px-8 py-4 text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-[#0C0C0C]/10 transition-all duration-300 active:scale-[0.98]"
              >
                Book Online
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2A2A2A]">
          {[
            {
              icon: MapPin,
              label: "Location",
              lines: ["Business Bay, Dubai", "Escape Tower — Next to Metro", "Free Parking Available"],
            },
            {
              icon: Clock,
              label: "Hours",
              lines: ["Monday – Sunday", "9:00 AM – 11:00 PM", "Same-Day Booking Available"],
            },
            {
              icon: Phone,
              label: "Book Now",
              lines: ["WhatsApp for Quick Booking", "Call for Consultations", "@siryano.barbershop"],
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-[#0A0A0A] p-8 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} weight="light" className="text-[#C8A96E]" />
                  <span className="text-[11px] tracking-[0.25em] text-[#C8A96E] uppercase font-medium">
                    {item.label}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {item.lines.map((line) => (
                    <p key={line} className="text-[14px] text-[#7A7A7A] font-light leading-snug">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
