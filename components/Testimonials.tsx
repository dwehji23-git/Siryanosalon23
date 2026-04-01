"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star } from "@phosphor-icons/react";

const testimonials = [
  {
    name: "Julian Hartmann",
    handle: "@j.hartmann",
    text: "The most precise fade I've ever had. I've been going to Siryano for two years and I won't trust anyone else with my hair.",
    rating: 5,
    seed: "client-1",
  },
  {
    name: "Elias Fontaine",
    handle: "@eliasfontaine_",
    text: "The hot towel shave alone is worth the visit. The whole experience feels like a ritual. Rare to find a spot this dialed in.",
    rating: 5,
    seed: "client-2",
  },
  {
    name: "Nico Adebayo",
    handle: "@nicoadebayo",
    text: "Walked in with overgrown chaos. Walked out looking like I had my life together. The barbers here actually listen.",
    rating: 5,
    seed: "client-3",
  },
  {
    name: "Marcus Lindqvist",
    handle: "@marcuslindqvist",
    text: "Best beard sculpt in the city, no debate. They understand texture, growth patterns, everything. Highly recommend.",
    rating: 5,
    seed: "client-4",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20 items-center">
        {/* Left — Header & nav */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#C8A96E]" />
              <span className="text-[11px] tracking-[0.3em] text-[#C8A96E] uppercase font-medium">
                Reviews
              </span>
            </div>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight tracking-[-0.02em] text-[#F5F0E8]">
              Words from
              <br />
              <span className="font-semibold italic">Our Regulars.</span>
            </h2>
          </div>

          {/* Rating summary */}
          <div className="space-y-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} weight="fill" className="text-[#C8A96E]" />
              ))}
            </div>
            <p className="text-[32px] font-semibold text-[#F5F0E8] tracking-tight">
              4.9 <span className="text-[14px] text-[#5A5A5A] font-normal">/5</span>
            </p>
            <p className="text-[12px] text-[#4A4A4A] tracking-widest uppercase">
              312 verified reviews
            </p>
          </div>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-[2px] transition-all duration-500 ${
                  active === i ? "w-8 bg-[#C8A96E]" : "w-2 bg-[#2A2A2A]"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Right — Active testimonial */}
        <div className="relative min-h-[280px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#141414] border border-[#2A2A2A] p-8 md:p-10 space-y-6 w-full"
              style={{ boxShadow: "inset 0 1px 0 rgba(200,169,110,0.06)" }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} size={13} weight="fill" className="text-[#C8A96E]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[16px] text-[#C8C4BC] leading-relaxed font-light italic">
                "{testimonials[active].text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-2 border-t border-[#1E1E1E]">
                <img
                  src={`https://picsum.photos/seed/${testimonials[active].seed}/80/80`}
                  alt={testimonials[active].name}
                  className="w-10 h-10 rounded-full object-cover grayscale"
                />
                <div>
                  <p className="text-[14px] font-medium text-[#F5F0E8]">
                    {testimonials[active].name}
                  </p>
                  <p className="text-[12px] text-[#4A4A4A]">
                    {testimonials[active].handle}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
