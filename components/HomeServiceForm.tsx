'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from '@phosphor-icons/react';
import { SERVICES, BookingFormData } from '@/lib/homeServiceData';
import { calculateTotalPrice, isValidName, isValidPhoneNumber } from '@/lib/homeServiceUtils';

interface HomeServiceFormProps {
  onSubmit: (data: BookingFormData) => void;
  initialData: BookingFormData;
}

export default function HomeServiceForm({ onSubmit, initialData }: HomeServiceFormProps) {
  const [name, setName] = useState(initialData.name);
  const [whatsapp, setWhatsapp] = useState(initialData.whatsapp);
  const [selectedServiceIds, setSelectedServiceIds] = useState(initialData.selectedServiceIds);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalPrice = calculateTotalPrice(selectedServiceIds);
  const isFormValid = isValidName(name) && isValidPhoneNumber(whatsapp) && selectedServiceIds.length > 0;

  const toggleService = (serviceId: string) => {
    setSelectedServiceIds(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
    // Clear error when user makes a selection
    if (errors.services) {
      const { services, ...rest } = errors;
      setErrors(rest);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!isValidName(name)) {
      newErrors.name = 'Please enter your name';
    }
    if (!isValidPhoneNumber(whatsapp)) {
      newErrors.whatsapp = 'Please enter a valid phone number';
    }
    if (selectedServiceIds.length === 0) {
      newErrors.services = 'Please select at least one service';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      name,
      whatsapp,
      selectedServiceIds,
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Step Indicator */}
      <div className="flex gap-3 items-center text-[12px] tracking-[0.2em] text-[#C8A96E] uppercase font-medium">
        <span>Step 1 of 3</span>
        <div className="h-px flex-1 bg-[#2A2A2A]" />
      </div>

      {/* Form Title */}
      <h2 className="text-[2.5rem] font-semibold leading-tight text-white">
        Let's Get You Booked
      </h2>

      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-[13px] tracking-[0.15em] text-[#C8A96E] uppercase font-medium">
          Your Name *
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) {
              const { name: _, ...rest } = errors;
              setErrors(rest);
            }
          }}
          className={`w-full bg-[#1A1A1A] border ${
            errors.name ? 'border-red-500' : 'border-[#2A2A2A]'
          } text-white px-4 py-3 text-[14px] focus:outline-none focus:border-[#C8A96E] transition-colors`}
        />
        {errors.name && (
          <p className="text-[12px] text-red-400">{errors.name}</p>
        )}
      </div>

      {/* WhatsApp Field */}
      <div className="space-y-2">
        <label htmlFor="whatsapp" className="block text-[13px] tracking-[0.15em] text-[#C8A96E] uppercase font-medium">
          Functioning WhatsApp Number *
        </label>
        <input
          id="whatsapp"
          type="tel"
          placeholder="+971 50 123 4567"
          value={whatsapp}
          onChange={(e) => {
            setWhatsapp(e.target.value);
            if (errors.whatsapp) {
              const { whatsapp: _, ...rest } = errors;
              setErrors(rest);
            }
          }}
          className={`w-full bg-[#1A1A1A] border ${
            errors.whatsapp ? 'border-red-500' : 'border-[#2A2A2A]'
          } text-white px-4 py-3 text-[14px] focus:outline-none focus:border-[#C8A96E] transition-colors`}
        />
        {errors.whatsapp && (
          <p className="text-[12px] text-red-400">{errors.whatsapp}</p>
        )}
      </div>

      {/* Services Selection */}
      <div className="space-y-4">
        <label className="block text-[13px] tracking-[0.15em] text-[#C8A96E] uppercase font-medium">
          Select Services *
        </label>
        <div className="space-y-3">
          {SERVICES.map((service) => {
            const isSelected = selectedServiceIds.includes(service.id);
            return (
              <motion.button
                key={service.id}
                type="button"
                onClick={() => toggleService(service.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-between p-4 border transition-all ${
                  isSelected
                    ? 'border-[#C8A96E] bg-[#C8A96E]/10'
                    : 'border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#C8A96E]/50'
                }`}
              >
                <span className="text-[14px] text-white font-light">{service.name}</span>
                <span className="flex items-center gap-3">
                  <span className="text-[13px] text-[#9A9A9A]">AED {service.price}</span>
                  {isSelected && (
                    <Check size={16} weight="bold" className="text-[#C8A96E]" />
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
        {errors.services && (
          <p className="text-[12px] text-red-400">{errors.services}</p>
        )}
      </div>

      {/* Price Summary */}
      {selectedServiceIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A1A1A] border border-[#C8A96E]/30 p-4 flex items-center justify-between"
        >
          <span className="text-[13px] tracking-[0.1em] text-[#9A9A9A] uppercase font-medium">
            Total Price
          </span>
          <span className="text-[20px] font-semibold text-[#C8A96E]">
            AED {totalPrice}
          </span>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={!isFormValid}
        whileHover={isFormValid ? { scale: 1.02 } : {}}
        whileTap={isFormValid ? { scale: 0.98 } : {}}
        className={`w-full flex items-center justify-center gap-2 py-4 px-6 text-[12px] tracking-[0.2em] uppercase font-semibold transition-all ${
          isFormValid
            ? 'bg-[#C8A96E] text-[#0C0C0C] hover:bg-[#D9B984] cursor-pointer'
            : 'bg-[#2A2A2A] text-[#7A7A7A] cursor-not-allowed'
        }`}
      >
        Next: Choose Date & Time
        <ArrowRight size={14} weight="bold" />
      </motion.button>
    </motion.form>
  );
}
