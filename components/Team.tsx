"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { InstagramLogo } from "@phosphor-icons/react";

const barbers = [
  {
    name: "Rafael Moraes",
    role: "Master Barber & Founder",
    specialty: "Classic Cuts & Straight Razors",
    since: "2018",
    seed: "barber-rafael",
  },
  {
    name: "Kai Oduya",
    role: "Senior Barber",
    specialty: "Skin Fades & Texture Work",
    since: "2020",
    seed: "barber-kai",
  },
  {
    name: "Matteo Greco",
    role: "Barber & Beard Specialist",
    specialty: "Beard Sculpting & Hot Towel",
    since: "2021",
    seed: "barber-matteo",
  },
];

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 mb-20"
        >
          <div className="flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#C8A96E]" />
            <span className="text-[11px] tracking-[0.3em] text-[#C8A96E] uppercase font-medium">
              The Team
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight tracking-[-0.02em] text-[#F5F0E8]">
            The Hands
            <br />
            <span className="font-semibold italic">Behind the Craft.</span>
          </h2>
        </motion.div>

        {/* Barbers — asymmetric sizes */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-6">
          {barbers.map((barber, i) => (
            <motion.div
              key={barber.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.14,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden cursor-default"
            >
              {/* Image */}
              <div
                className={`overflow-hidden ${i === 0 ? "h-[520px]" : "h-[400px]"}`}
              >
                <motion.img
                  src={`https://picsum.photos/seed/${barber.seed}/600/700`}
                  alt={barber.name}
                  className="w-full h-[calc(100%+40px)] object-cover object-top"
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* Info block — below image */}
              <div className="pt-5 pb-2 space-y-1.5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[16px] font-medium text-[#F5F0E8] tracking-tight">
                      {barber.name}
                    </h3>
                    <p className="text-[12px] text-[#C8A96E] tracking-wide mt-0.5">
                      {barber.role}
                    </p>
                  </div>
                  <button
                    className="flex items-center justify-center w-11 h-11 border border-[#2A2A2A] hover:border-[#C8A96E]/40 transition-colors duration-300"
                    aria-label={`${barber.name} on Instagram`}
                  >
                    <InstagramLogo
                      size={14}
                      weight="light"
                      className="text-[#5A5A5A] hover:text-[#C8A96E]"
                    />
                  </button>
                </div>
                <p className="text-[12px] text-[#4A4A4A] tracking-wide font-light">
                  {barber.specialty}
                </p>
                <p className="text-[11px] text-[#3A3A3A] tracking-widest uppercase font-mono">
                  Since {barber.since}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
