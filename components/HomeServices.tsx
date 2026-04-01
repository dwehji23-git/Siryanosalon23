"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Scissors, Drop, Hand, MapPin, Clock, Star, ArrowRight } from "@phosphor-icons/react";

export default function HomeServices() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const services = [
    {
      icon: Scissors,
      title: "Haircut & Styling",
      description: "Professional haircuts and styling at your home or office",
      startingPrice: 70,
      serviceList: ["Haircut with Wash", "Skin Fade Styles", "Hair Coloring"],
    },
    {
      icon: Drop,
      title: "Beard & Shaving",
      description: "Premium beard grooming and traditional shave services",
      startingPrice: 45,
      serviceList: ["Beard Trim & Shape", "Traditional Shave", "Beard Coloring"],
    },
    {
      icon: Hand,
      title: "Manicure & Pedicure",
      description: "Luxurious nail care delivered to your location",
      startingPrice: 60,
      serviceList: ["Professional Manicure", "SPA Pedicure", "Nail Treatments"],
    },
  ];

  const trustSignals = [
    { label: "19+ Years Experience", icon: Star },
    { label: "Dubai-Wide Service", icon: MapPin },
    { label: "Same-Day Booking", icon: Clock },
    { label: "Premium Quality", icon: Scissors },
  ];

  return (
    <section id="home-services" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto" ref={ref}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-20 max-w-[900px] mx-auto"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-block mb-6"
        >
          <span className="text-[11px] tracking-[0.3em] text-[#C8A96E] uppercase font-medium border border-[#C8A96E]/30 px-4 py-2">
            NOW AVAILABLE
          </span>
        </motion.div>

        {/* Headline */}
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-tight tracking-[-0.03em] mb-6">
          <span className="bg-gradient-to-r from-[#C8A96E] via-[#F0D090] to-[#C8A96E] bg-clip-text text-transparent">
            Premium Barber Home Service
            <br />
            Across Dubai
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-[15px] text-[#7A7A7A] leading-relaxed max-w-[60ch] mx-auto font-light">
          Experience Dubai's best barbershop services at your home. Siryano's professional barber home service brings premium haircuts, beard shaping & grooming directly to your door across Business Bay and all of Dubai.
        </p>

        {/* CTA Button */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          href="#contact"
          className="inline-flex items-center gap-3 bg-[#C8A96E] text-[#0C0C0C] px-10 py-5 text-[12px] tracking-[0.2em] uppercase font-semibold mt-10 hover:bg-[#F0D090] transition-all duration-300 active:scale-[0.98] group"
        >
          Book a Home Visit
          <ArrowRight
            size={16}
            weight="bold"
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </motion.a>
      </motion.div>

      {/* Trust Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-20"
      >
        {trustSignals.map((signal, i) => {
          const Icon = signal.icon;
          return (
            <motion.div
              key={signal.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.45 + i * 0.08,
                duration: 0.6,
              }}
              className="border border-[#C8A96E]/30 rounded-none p-4 text-center hover:border-[#C8A96E]/60 transition-colors duration-300"
            >
              <Icon size={24} weight="light" className="text-[#C8A96E] mx-auto mb-2" />
              <p className="text-[12px] text-[#5A5A5A] font-light tracking-wide">
                {signal.label}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2A2A2A] mb-16">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.5 + i * 0.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative bg-[#0C0C0C] p-8 md:p-10 flex flex-col gap-6 hover:bg-[#141414] transition-colors duration-500"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center border border-[#2A2A2A] group-hover:border-[#C8A96E]/30 transition-colors duration-500">
                <Icon size={24} weight="light" className="text-[#C8A96E]" />
              </div>

              {/* Title */}
              <div>
                <h3 className="text-[18px] font-medium text-[#F5F0E8] tracking-tight mb-2">
                  {service.title}
                </h3>
                <p className="text-[13px] text-[#5A5A5A] leading-relaxed font-light">
                  {service.description}
                </p>
              </div>

              {/* Service List */}
              <div className="space-y-2">
                {service.serviceList.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#C8A96E]" />
                    <span className="text-[12px] text-[#5A5A5A] font-light">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="pt-4 border-t border-[#1E1E1E] mt-auto">
                <p className="text-[12px] text-[#5A5A5A] mb-1">Starting from</p>
                <p className="text-xl font-semibold text-[#C8A96E]">
                  {service.startingPrice} AED
                </p>
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] group-hover:w-full transition-all duration-700 ease-out" />
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-center py-8 border-t border-[#1E1E1E]"
      >
        <p className="text-[13px] text-[#5A5A5A] tracking-wide">
          Serving <span className="text-[#C8A96E] font-medium">Business Bay, Dubai & Surrounding Areas</span> • Open <span className="text-[#C8A96E] font-medium">9:00 AM – 11:00 PM</span> Daily
        </p>
        <p className="text-[12px] text-[#4A4A4A] mt-2 font-light">
          Best barber home service in UAE • Professional haircuts, beard shaping & grooming at your location
        </p>
      </motion.div>
    </section>
  );
}
