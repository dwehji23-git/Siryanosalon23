"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Scissors, Drop, Palette, Sparkle, Wind, Hand, Flame } from "@phosphor-icons/react";

interface Service {
  name: string;
  price: number;
  duration: string;
  tag?: string;
}

interface Category {
  label: string;
  icon: React.ElementType;
  services: Service[];
}

const categories: Category[] = [
  {
    label: "Hair",
    icon: Scissors,
    services: [
      { name: "Haircut - Washing - Style", price: 75, duration: "30 min" },
      { name: "Skin Fade Haircut - Washing - Style", price: 85, duration: "45 min", tag: "Popular" },
      { name: "High or Low Taper Fade Haircut", price: 85, duration: "45 min" },
      { name: "Haircut Machine", price: 60, duration: "25 min" },
      { name: "Hair Style", price: 50, duration: "20 min" },
      { name: "Children Hair Cut with Wash & Style", price: 60, duration: "30 min" },
    ],
  },
  {
    label: "Beard & Shave",
    icon: Drop,
    services: [
      { name: "Regular Shave", price: 60, duration: "20 min" },
      { name: "Special Shave", price: 60, duration: "30 min" },
      { name: "Beard Shave", price: 60, duration: "20 min" },
      { name: "Special Beard Shave With Scissors", price: 70, duration: "30 min" },
      { name: "Beard Color", price: 75, duration: "30 min" },
      { name: "Full Hair with Beard & Facial", price: 170, duration: "1 hr 30 min", tag: "Package" },
    ],
  },
  {
    label: "Hair Treatments",
    icon: Palette,
    services: [
      { name: "Hair Color", price: 125, duration: "60 min" },
      { name: "Hair Treatment (Caviar)", price: 250, duration: "60 min" },
      { name: "Hair Treatment (Caviar) - Special", price: 250, duration: "30 min", tag: "Offer" },
      { name: "Keratin Treatment", price: 600, duration: "40 min - 2 hr" },
      { name: "Keratin Treatment With Hair Style", price: 350, duration: "1 hr" },
      { name: "BTX Keratin", price: 350, duration: "40 min" },
      { name: "Hair Keratin", price: 600, duration: "60 min", tag: "Premium" },
      { name: "Schwarzkopf Treatment", price: 150, duration: "1 hr" },
      { name: "Schwarzkopf Bonacure Treatment", price: 210, duration: "1 hr" },
      { name: "Hot Oil Treatment", price: 120, duration: "1 hr" },
      { name: "Hot Oil Treatment 1", price: 210, duration: "1 hr" },
      { name: "Hot Oil Treatment 2", price: 250, duration: "1 hr" },
    ],
  },
  {
    label: "Facials & Skin",
    icon: Sparkle,
    services: [
      { name: "Face Scrub", price: 50, duration: "20 min" },
      { name: "Scrub Face", price: 50, duration: "25 min" },
      { name: "Black Mask", price: 50, duration: "25 min" },
      { name: "Mask & Scrub", price: 75, duration: "45 min" },
      { name: "Basic Facial", price: 250, duration: "40 min" },
      { name: "Signature Facial", price: 350, duration: "60 min", tag: "Most Popular" },
      { name: "Ocean Oil Facial Treatment", price: 250, duration: "60 min" },
      { name: "Brightening Facial Treatment", price: 300, duration: "60 min" },
      { name: "Hydra Specula Facial", price: 350, duration: "60 min" },
      { name: "Anti Aging Treatment", price: 350, duration: "1 hr" },
      { name: "Hyaluronic Special Facial", price: 250, duration: "1 hr" },
      { name: "Acne Facial", price: 300, duration: "1 hr" },
    ],
  },
  {
    label: "Massage & Spa",
    icon: Wind,
    services: [
      { name: "Massage", price: 210, duration: "1 hr" },
      { name: "Relaxing Massage", price: 210, duration: "1 hr" },
      { name: "Chair Massage", price: 75, duration: "30 min" },
      { name: "Foot Massage", price: 100, duration: "30 min - 1 hr" },
      { name: "Moroccan Bath + Body Scrub", price: 210, duration: "55 min" },
      { name: "Moroccan Bath + Body Scrub & Massage", price: 350, duration: "1 hr 30 min", tag: "Premium" },
      { name: "Scrub & Mask", price: 75, duration: "30 min" },
    ],
  },
  {
    label: "Nail Care",
    icon: Hand,
    services: [
      { name: "Manicure", price: 60, duration: "25 min" },
      { name: "Pedicure", price: 70, duration: "20 min" },
      { name: "SPA Pedicure", price: 70, duration: "30 min - 1 hr" },
      { name: "Pedi-Scrub", price: 50, duration: "20 min" },
      { name: "Foot Scrub", price: 40, duration: "30 min" },
      { name: "Manicure + Pedicure & Scrub", price: 170, duration: "50 min" },
      { name: "Manicure + Pedicure with Scrub", price: 170, duration: "1 hr 15 min" },
    ],
  },
  {
    label: "Waxing & Body",
    icon: Flame,
    services: [
      { name: "Full Face Wax Or Threading", price: 40, duration: "10 min" },
      { name: "Half Arm Waxing", price: 50, duration: "30 min" },
      { name: "Chest Shaving", price: 100, duration: "30 min" },
      { name: "Back Shaving", price: 100, duration: "25 min" },
      { name: "Full Body Shaving With Razor", price: 315, duration: "1 hr", tag: "Premium" },
      { name: "Nose & Ear Wax", price: 40, duration: "10 min" },
      { name: "Nose & Ear Waxing", price: 40, duration: "30 min" },
    ],
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const currentCategory = categories[activeTab];

  return (
    <section id="services" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto" ref={ref}>
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
              Our Services
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight tracking-[-0.02em] text-[#F5F0E8]">
            Crafted for the
            <br />
            <span className="font-semibold italic">Modern Man.</span>
          </h2>
        </div>
        <p className="text-[14px] text-[#7A7A7A] leading-relaxed max-w-[35ch] md:text-right font-light">
          Every service is a considered ritual. We take the time to understand
          what you need and deliver premium results.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex gap-3 mb-12 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:pb-0 scrollbar-hide [overscroll-behavior-x:contain]"
      >
        {categories.map((category, idx) => {
          const Icon = category.icon;
          const isActive = idx === activeTab;
          return (
            <button
              key={category.label}
              onClick={() => setActiveTab(idx)}
              className="group flex items-center gap-2 px-4 py-3 text-[12px] tracking-[0.15em] uppercase font-medium whitespace-nowrap transition-colors duration-300"
            >
              <Icon
                size={16}
                weight={isActive ? "bold" : "light"}
                className={isActive ? "text-[#C8A96E]" : "text-[#5A5A5A] group-hover:text-[#F5F0E8]"}
              />
              <span className={isActive ? "text-[#C8A96E]" : "text-[#5A5A5A] group-hover:text-[#F5F0E8]"}>
                {category.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C8A96E]"
                />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2A2A]">
        {currentCategory.services.map((service, i) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: i * 0.06,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative bg-[#0C0C0C] p-8 md:p-10 flex flex-col gap-4 hover:bg-[#141414] transition-colors duration-500 cursor-default"
          >
            {/* Tag */}
            {service.tag && (
              <span className="absolute top-6 right-6 text-[10px] tracking-[0.2em] uppercase text-[#C8A96E] border border-[#C8A96E]/30 px-2.5 py-1">
                {service.tag}
              </span>
            )}

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-[16px] font-medium text-[#F5F0E8] tracking-tight group-hover:text-[#C8A96E] transition-colors duration-300">
                {service.name}
              </h3>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1E1E1E]">
              <span className="text-[12px] text-[#5A5A5A] tracking-wide">
                {service.duration}
              </span>
              <span className="text-lg font-semibold text-[#C8A96E]">
                {service.price} AED
              </span>
            </div>

            {/* Hover accent */}
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] group-hover:w-full transition-all duration-700 ease-out" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
