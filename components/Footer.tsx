"use client";

import { InstagramLogo, XLogo, FacebookLogo } from "@phosphor-icons/react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1E1E1E] py-12 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex flex-col items-start gap-1">
          <img
            src="/siryano-logo-gold.png"
            alt="Siryano"
            width={40}
            height={24}
            className="object-contain"
          />
          <p className="text-[12px] text-[#3A3A3A] font-light tracking-wide mt-1">
            Premium Barbershop — Est. 2018
          </p>
        </div>

        {/* Nav links */}
        <ul className="flex flex-wrap gap-6">
          {["Services", "Gallery", "About", "Contact"].map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-[12px] tracking-[0.1em] text-[#4A4A4A] hover:text-[#C8A96E] transition-colors duration-300 uppercase font-medium"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Social + copyright */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-4">
            {[
              { Icon: InstagramLogo, label: "Instagram" },
              { Icon: XLogo, label: "X" },
              { Icon: FacebookLogo, label: "Facebook" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex items-center justify-center w-11 h-11 text-[#3A3A3A] hover:text-[#C8A96E] transition-colors duration-300"
              >
                <Icon size={18} weight="light" />
              </a>
            ))}
          </div>
          <p className="text-[11px] text-[#2A2A2A] tracking-wide">
            © {year} Siryano. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
