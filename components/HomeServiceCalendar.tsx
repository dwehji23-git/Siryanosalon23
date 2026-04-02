'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { BookingFormData, BookingDateTime, HOME_SERVICE_HOURS } from '@/lib/homeServiceData';
import { getNext7Days, formatDate, formatTime } from '@/lib/homeServiceUtils';

interface HomeServiceCalendarProps {
  onSubmit: (data: BookingDateTime) => void;
  onBack: () => void;
  formData: BookingFormData;
}

export default function HomeServiceCalendar({ onSubmit, onBack, formData }: HomeServiceCalendarProps) {
  const days = getNext7Days();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  const timeSlots = Array.from({ length: HOME_SERVICE_HOURS.end - HOME_SERVICE_HOURS.start + 1 }, (_, i) =>
    HOME_SERVICE_HOURS.start + i
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedHour !== null) {
      onSubmit({
        date: selectedDate,
        hour: selectedHour,
      });
    }
  };

  const isFormValid = selectedDate && selectedHour !== null;

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
        <span>Step 2 of 3</span>
        <div className="h-px flex-1 bg-[#2A2A2A]" />
      </div>

      {/* Title */}
      <h2 className="text-[2.5rem] font-semibold leading-tight text-white">
        Select Your Preferred Date & Time
      </h2>

      {/* Days Selection */}
      <div className="space-y-4">
        <label className="block text-[13px] tracking-[0.15em] text-[#C8A96E] uppercase font-medium">
          Choose a Date
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {days.map((date, index) => {
            const isSelected = selectedDate?.getTime() === date.getTime();
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = date.getDate();

            return (
              <motion.button
                key={index}
                type="button"
                onClick={() => setSelectedDate(date)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 border text-center transition-all ${
                  isSelected
                    ? 'border-[#C8A96E] bg-[#C8A96E]/10'
                    : 'border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#C8A96E]/50'
                }`}
              >
                <div className="text-[12px] tracking-[0.1em] text-[#9A9A9A] uppercase font-medium">
                  {dayName}
                </div>
                <div className="text-[18px] font-semibold text-white mt-1">
                  {dayNum}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Selection */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <label className="block text-[13px] tracking-[0.15em] text-[#C8A96E] uppercase font-medium">
            Choose a Time
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {timeSlots.map((hour) => {
              const isSelected = selectedHour === hour;
              const timeLabel = formatTime(hour);

              return (
                <motion.button
                  key={hour}
                  type="button"
                  onClick={() => setSelectedHour(hour)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 border text-center text-[12px] tracking-[0.1em] uppercase font-medium transition-all ${
                    isSelected
                      ? 'border-[#C8A96E] bg-[#C8A96E] text-[#0C0C0C]'
                      : 'border-[#2A2A2A] bg-[#1A1A1A] text-white hover:border-[#C8A96E]/50'
                  }`}
                >
                  {timeLabel}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Selection Summary */}
      {selectedDate && selectedHour !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A1A1A] border border-[#C8A96E]/30 p-4"
        >
          <p className="text-[13px] text-[#9A9A9A] font-light">
            <span className="text-[#C8A96E] font-medium">Selected:</span> {formatDate(selectedDate)} at {formatTime(selectedHour)}
          </p>
        </motion.div>
      )}

      {/* Button Group */}
      <div className="flex gap-3">
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 py-4 px-6 text-[12px] tracking-[0.2em] uppercase font-semibold bg-transparent border border-[#C8A96E] text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all"
        >
          <ArrowLeft size={14} weight="bold" />
          Back
        </motion.button>

        <motion.button
          type="submit"
          disabled={!isFormValid}
          whileHover={isFormValid ? { scale: 1.02 } : {}}
          whileTap={isFormValid ? { scale: 0.98 } : {}}
          className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-[12px] tracking-[0.2em] uppercase font-semibold transition-all ${
            isFormValid
              ? 'bg-[#C8A96E] text-[#0C0C0C] hover:bg-[#D9B984] cursor-pointer'
              : 'bg-[#2A2A2A] text-[#7A7A7A] cursor-not-allowed'
          }`}
        >
          Confirm Booking
          <ArrowRight size={14} weight="bold" />
        </motion.button>
      </div>
    </motion.form>
  );
}
