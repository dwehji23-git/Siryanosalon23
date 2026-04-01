"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const images = [
  { image: "technique-scissors-cut.jpg", aspect: "tall", caption: "Precision Technique" },
  { image: "gallery-tools-products.jpg", aspect: "wide", caption: "Premium Tools" },
  { image: "technique-beard-shave.jpg", aspect: "square", caption: "Beard Mastery" },
  { image: "gallery-professional-kit.jpg", aspect: "square", caption: "Professional Kit" },
];

const aspectMap = {
  tall: "row-span-2",
  square: "row-span-1",
  wide: "row-span-1 col-span-2",
};

const sizeMap = {
  tall: "400/600",
  square: "400/400",
  wide: "800/400",
};

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-32 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#C8A96E]" />
              <span className="text-[11px] tracking-[0.3em] text-[#C8A96E] uppercase font-medium">
                Gallery
              </span>
            </div>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight tracking-[-0.02em] text-[#F5F0E8]">
              Proof in
              <br />
              <span className="font-semibold italic">Every Detail.</span>
            </h2>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-auto md:grid-rows-[280px_280px] gap-2">
          {images.map((img, i) => (
            <motion.div
              key={img.image}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative overflow-hidden group cursor-pointer ${
                aspectMap[img.aspect as keyof typeof aspectMap]
              }`}
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
            >
              <motion.img
                src={`/${img.image}`}
                alt={img.caption}
                className="w-full h-full object-cover"
                animate={{
                  scale: hoveredIdx === i ? 1.06 : 1,
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Overlay */}
              <AnimatePresence>
                {hoveredIdx === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-[#0C0C0C]/50 flex flex-col items-start justify-end p-5"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[13px] font-medium text-[#F5F0E8] tracking-wide">
                        {img.caption}
                      </span>
                      <ArrowUpRight size={16} className="text-[#C8A96E]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
