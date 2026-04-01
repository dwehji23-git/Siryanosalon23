"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const values = [
  {
    number: "01",
    title: "Precision",
    body: "Every cut is a craft. We approach each appointment with exactness that shows in every line, edge, and fade.",
  },
  {
    number: "02",
    title: "Ritual",
    body: "A visit to Siryano is a pause from the pace of everyday life. An experience worth carving time for.",
  },
  {
    number: "03",
    title: "Character",
    body: "We believe your appearance is an expression of who you are. We help you say it with confidence.",
  },
];

export default function About() {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section id="about" className="py-32 max-w-[1400px] mx-auto px-6 md:px-12" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-20 items-center">
        {/* Left — Image */}
        <div ref={imageRef} className="relative overflow-hidden h-[500px] lg:h-[680px]">
          <motion.img
            style={{ y: imageY }}
            src="https://picsum.photos/seed/siryano-about/700/900"
            alt="Siryano barbershop atmosphere"
            className="w-full h-[calc(100%+80px)] object-cover object-center"
          />
          {/* Gold accent border */}
          <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#C8A96E]/20 pointer-events-none" />

          {/* Quote floating card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-8 -right-4 md:-right-10 bg-[#0C0C0C] border border-[#2A2A2A] p-6 max-w-[260px]"
            style={{ boxShadow: "inset 0 1px 0 rgba(200,169,110,0.08)" }}
          >
            <p className="text-[13px] italic text-[#F5F0E8] leading-relaxed font-light">
              "We don't just cut hair. We restore confidence, one session at
              a time."
            </p>
            <p className="text-[11px] text-[#C8A96E] mt-3 tracking-widest uppercase">
              — Siryano
            </p>
          </motion.div>
        </div>

        {/* Right — Content */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#C8A96E]" />
              <span className="text-[11px] tracking-[0.3em] text-[#C8A96E] uppercase font-medium">
                Our Story
              </span>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.8rem)] font-light leading-tight tracking-[-0.02em] text-[#F5F0E8]">
              Built on the
              <br />
              <span className="font-semibold italic">Old Codes.</span>
            </h2>
            <p className="text-[14px] text-[#7A7A7A] leading-relaxed max-w-[42ch] font-light">
              Siryano was born from a conviction that great barbering is a lost
              art worth reviving. We opened our doors in 2018 with a singular
              mission: bring back the integrity of the craft in a space that
              felt worthy of it.
            </p>
            <p className="text-[14px] text-[#7A7A7A] leading-relaxed max-w-[42ch] font-light">
              No rush. No compromise. Just the cleanest cut you've ever had.
            </p>
          </motion.div>

          {/* Values */}
          <div className="space-y-0 border-t border-[#1E1E1E]">
            {values.map((v, i) => (
              <motion.div
                key={v.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.12,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group py-6 border-b border-[#1E1E1E] flex gap-6 cursor-default hover:bg-[#0F0F0F] -mx-4 px-4 transition-colors duration-300"
              >
                <span className="text-[11px] text-[#3A3A3A] tracking-widest font-mono mt-1 shrink-0">
                  {v.number}
                </span>
                <div className="space-y-1.5">
                  <h4 className="text-[15px] font-medium text-[#F5F0E8] group-hover:text-[#C8A96E] transition-colors duration-300 tracking-tight">
                    {v.title}
                  </h4>
                  <p className="text-[13px] text-[#5A5A5A] leading-relaxed font-light">
                    {v.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
