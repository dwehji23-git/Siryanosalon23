'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, WhatsappLogo } from '@phosphor-icons/react';
import { BookingFormData, BookingDateTime } from '@/lib/homeServiceData';
import {
  calculateTotalPrice,
  getServiceNames,
  generateWhatsAppLink,
  formatDate,
  formatTime,
} from '@/lib/homeServiceUtils';

interface HomeServiceConfirmationProps {
  formData: BookingFormData;
  dateTime: BookingDateTime;
  onBack: () => void;
}

export default function HomeServiceConfirmation({ formData, dateTime, onBack }: HomeServiceConfirmationProps) {
  const serviceNames = getServiceNames(formData.selectedServiceIds);
  const totalPrice = calculateTotalPrice(formData.selectedServiceIds);

  const booking = {
    ...formData,
    ...dateTime,
    totalPrice,
  };

  const whatsappLink = generateWhatsAppLink(booking);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Step Indicator */}
      <div className="flex gap-3 items-center text-[12px] tracking-[0.2em] text-[#C8A96E] uppercase font-medium">
        <span>Step 3 of 3</span>
        <div className="h-px flex-1 bg-[#2A2A2A]" />
      </div>

      {/* Title */}
      <h2 className="text-[2.5rem] font-semibold leading-tight text-white">
        Booking Confirmed
      </h2>

      {/* Booking Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#1A1A1A] border border-[#C8A96E]/30 p-8 space-y-6"
      >
        {/* Name */}
        <div className="flex justify-between items-start pb-6 border-b border-[#2A2A2A]">
          <span className="text-[13px] tracking-[0.15em] text-[#9A9A9A] uppercase font-medium">
            Name
          </span>
          <span className="text-[14px] text-white font-light text-right">
            {formData.name}
          </span>
        </div>

        {/* WhatsApp */}
        <div className="flex justify-between items-start pb-6 border-b border-[#2A2A2A]">
          <span className="text-[13px] tracking-[0.15em] text-[#9A9A9A] uppercase font-medium">
            WhatsApp
          </span>
          <span className="text-[14px] text-white font-light text-right">
            {formData.whatsapp}
          </span>
        </div>

        {/* Services */}
        <div className="flex justify-between items-start pb-6 border-b border-[#2A2A2A]">
          <span className="text-[13px] tracking-[0.15em] text-[#9A9A9A] uppercase font-medium">
            Services
          </span>
          <div className="text-right">
            {serviceNames.map((name) => (
              <p key={name} className="text-[14px] text-white font-light">
                {name}
              </p>
            ))}
          </div>
        </div>

        {/* Date */}
        <div className="flex justify-between items-start pb-6 border-b border-[#2A2A2A]">
          <span className="text-[13px] tracking-[0.15em] text-[#9A9A9A] uppercase font-medium">
            Date
          </span>
          <span className="text-[14px] text-white font-light">
            {formatDate(dateTime.date)}
          </span>
        </div>

        {/* Time */}
        <div className="flex justify-between items-start pb-6 border-b border-[#2A2A2A]">
          <span className="text-[13px] tracking-[0.15em] text-[#9A9A9A] uppercase font-medium">
            Time
          </span>
          <span className="text-[14px] text-white font-light">
            {formatTime(dateTime.hour)}
          </span>
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-start pt-2">
          <span className="text-[13px] tracking-[0.15em] text-[#C8A96E] uppercase font-medium">
            Total Price
          </span>
          <span className="text-[20px] font-semibold text-[#C8A96E]">
            AED {totalPrice}
          </span>
        </div>
      </motion.div>

      {/* Info Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#0C0C0C] border border-[#2A2A2A] p-4 text-[13px] text-[#9A9A9A] leading-relaxed"
      >
        <p>
          Click "Send Booking via WhatsApp" below to complete your booking. Our team will confirm availability and finalize your appointment details.
        </p>
      </motion.div>

      {/* Button Group */}
      <div className="flex gap-3">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 py-4 px-6 text-[12px] tracking-[0.2em] uppercase font-semibold bg-transparent border border-[#C8A96E] text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all"
        >
          <ArrowLeft size={14} weight="bold" />
          Back
        </motion.button>

        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-center gap-2 py-4 px-6 text-[12px] tracking-[0.2em] uppercase font-semibold bg-[#C8A96E] text-[#0C0C0C] hover:bg-[#D9B984] transition-all"
        >
          <WhatsappLogo size={14} weight="bold" />
          Send Booking via WhatsApp
        </motion.a>
      </div>
    </motion.div>
  );
}
