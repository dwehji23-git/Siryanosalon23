"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, Clock, MapPin, X } from "@phosphor-icons/react";

export default function Booking() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showCallModal, setShowCallModal] = useState(false);

  return (
    <section id="contact" className="py-32 bg-[#0A0A0A]" ref={ref}>
      {/* Call Location Picker Modal */}
      <AnimatePresence>
        {showCallModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowCallModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#0C0C0C] border border-[#2A2A2A] w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-[#1E1E1E]">
                <h3 className="text-[14px] tracking-[0.2em] text-[#C8A96E] uppercase font-medium">
                  Choose Location
                </h3>
                <button
                  onClick={() => setShowCallModal(false)}
                  className="text-[#5A5A5A] hover:text-[#F5F0E8] transition-colors"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>
              <div className="p-2">
                <a
                  href="tel:+97143387337"
                  className="flex items-center gap-4 p-5 hover:bg-[#141414] transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-[#C8A96E]/30 shrink-0">
                    <MapPin size={16} weight="light" className="text-[#C8A96E]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] text-[#F5F0E8] font-medium group-hover:text-[#C8A96E] transition-colors">
                      Dubai
                    </p>
                    <p className="text-[13px] text-[#5A5A5A] font-light">
                      +971 4 338 7337
                    </p>
                  </div>
                  <Phone size={16} weight="bold" className="text-[#C8A96E] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <div className="mx-5 border-t border-[#1E1E1E]" />
                <a
                  href="tel:+97124403338"
                  className="flex items-center gap-4 p-5 hover:bg-[#141414] transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-[#C8A96E]/30 shrink-0">
                    <MapPin size={16} weight="light" className="text-[#C8A96E]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] text-[#F5F0E8] font-medium group-hover:text-[#C8A96E] transition-colors">
                      Abu Dhabi
                    </p>
                    <p className="text-[13px] text-[#5A5A5A] font-light">
                      +971 2 440 3338
                    </p>
                  </div>
                  <Phone size={16} weight="bold" className="text-[#C8A96E] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <button
                onClick={() => setShowCallModal(true)}
                className="group flex items-center gap-2 bg-[#0C0C0C] text-[#C8A96E] px-8 py-4 text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-[#1A1A1A] transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                <Phone size={14} weight="bold" />
                Call Now
              </button>
              <a
                href="/book"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2A2A2A]">
          {[
            {
              icon: MapPin,
              label: "Dubai",
              lines: ["Business Bay", "Escape Tower — Next to Metro", "Free Parking Available", "+971 56 833 9874"],
              link: "https://maps.app.goo.gl/LC3VJfmLatrhFBBMA",
            },
            {
              icon: MapPin,
              label: "Abu Dhabi",
              lines: ["Al Seef Village Mall, 1st Floor", "27 Al Murouj St", "Al Muntazah — Zone 1", "+971 56 833 9917"],
              link: "https://maps.app.goo.gl/1Qyi1SEbvyWgTzmU8",
            },
            {
              icon: Clock,
              label: "Hours",
              lines: ["Monday – Sunday", "10:00 AM – 11:00 PM", "Same-Day Booking Available"],
            },
            {
              icon: Phone,
              label: "Book Now",
              lines: ["WhatsApp for Quick Booking", "Call for Consultations", "@siryano.barbershop"],
            },
          ].map((item, i) => {
            const Icon = item.icon;
            const content = (
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
            return 'link' in item && item.link ? (
              <a key={item.label} href={item.link} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
