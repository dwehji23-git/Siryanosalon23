'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, MapPin, WhatsappLogo } from '@phosphor-icons/react';
import { SERVICES, BookingFormData, BookingDateTime } from '@/lib/homeServiceData';
import {
  calculateTotalPrice,
  getServiceNames,
  formatDate,
  formatTime,
  getNext7Days,
  isValidName,
  isValidPhoneNumber,
} from '@/lib/homeServiceUtils';

const LOCATIONS = [
  {
    id: 'dubai',
    name: 'Dubai',
    address: 'Business Bay — Escape Tower',
    detail: 'Next to Metro · Free Parking',
    whatsapp: '97143387337',
  },
  {
    id: 'abu-dhabi',
    name: 'Abu Dhabi',
    address: 'Al Seef Village Mall, 1st Floor',
    detail: '27 Al Murouj St · Al Muntazah',
    whatsapp: '97124403338',
  },
];

const SHOP_HOURS = { start: 9, end: 23 };

type Step = 'location' | 'form' | 'calendar' | 'confirmation';

export default function BookPage() {
  const [step, setStep] = useState<Step>('location');
  const [locationId, setLocationId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({ name: '', whatsapp: '', selectedServiceIds: [] });
  const [dateTime, setDateTime] = useState<BookingDateTime | null>(null);

  const location = LOCATIONS.find((l) => l.id === locationId);
  const totalSteps = 4;
  const stepNum = step === 'location' ? 1 : step === 'form' ? 2 : step === 'calendar' ? 3 : 4;

  const goTo = (s: Step) => {
    setStep(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#0C0C0C]">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-[#0C0C0C] px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-4">
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-tight tracking-[-0.03em] text-white">
              Book Your Visit
            </h1>
            <p className="text-[16px] text-[#9A9A9A] font-light max-w-[60ch] leading-relaxed">
              Reserve your spot at Siryano. Pick a location, choose your services, and we'll have everything ready when you arrive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 bg-[#0A0A0A] px-6 md:px-12">
        <div className="max-w-[700px] mx-auto">
          {step === 'location' && <LocationStep onSelect={(id) => { setLocationId(id); goTo('form'); }} />}
          {step === 'form' && (
            <FormStep
              initialData={formData}
              onSubmit={(data) => { setFormData(data); goTo('calendar'); }}
              onBack={() => goTo('location')}
              stepNum={stepNum}
              totalSteps={totalSteps}
            />
          )}
          {step === 'calendar' && (
            <CalendarStep
              onSubmit={(dt) => { setDateTime(dt); goTo('confirmation'); }}
              onBack={() => goTo('form')}
              stepNum={stepNum}
              totalSteps={totalSteps}
            />
          )}
          {step === 'confirmation' && dateTime && location && (
            <ConfirmationStep
              formData={formData}
              dateTime={dateTime}
              location={location}
              onBack={() => goTo('calendar')}
              stepNum={stepNum}
              totalSteps={totalSteps}
            />
          )}
        </div>
      </section>
    </main>
  );
}

/* ─── Step 1: Location ─── */
function LocationStep({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
      <div className="flex gap-3 items-center text-[12px] tracking-[0.2em] text-[#C8A96E] uppercase font-medium">
        <span>Step 1 of 4</span>
        <div className="h-px flex-1 bg-[#2A2A2A]" />
      </div>
      <h2 className="text-[2.5rem] font-semibold leading-tight text-white">Choose Your Location</h2>
      <div className="space-y-3">
        {LOCATIONS.map((loc) => (
          <motion.button
            key={loc.id}
            type="button"
            onClick={() => onSelect(loc.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-5 p-6 border border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#C8A96E] transition-all text-left group"
          >
            <div className="w-12 h-12 flex items-center justify-center border border-[#C8A96E]/30 shrink-0">
              <MapPin size={20} weight="light" className="text-[#C8A96E]" />
            </div>
            <div className="flex-1">
              <p className="text-[16px] text-white font-medium group-hover:text-[#C8A96E] transition-colors">{loc.name}</p>
              <p className="text-[13px] text-[#7A7A7A] font-light mt-1">{loc.address}</p>
              <p className="text-[12px] text-[#5A5A5A] font-light">{loc.detail}</p>
            </div>
            <ArrowRight size={16} weight="bold" className="text-[#5A5A5A] group-hover:text-[#C8A96E] transition-colors" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Step 2: Form ─── */
function FormStep({
  initialData,
  onSubmit,
  onBack,
  stepNum,
  totalSteps,
}: {
  initialData: BookingFormData;
  onSubmit: (data: BookingFormData) => void;
  onBack: () => void;
  stepNum: number;
  totalSteps: number;
}) {
  const [name, setName] = useState(initialData.name);
  const [whatsapp, setWhatsapp] = useState(initialData.whatsapp);
  const [selectedServiceIds, setSelectedServiceIds] = useState(initialData.selectedServiceIds);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalPrice = calculateTotalPrice(selectedServiceIds);
  const isFormValid = isValidName(name) && isValidPhoneNumber(whatsapp) && selectedServiceIds.length > 0;

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    if (errors.services) { const { services, ...rest } = errors; setErrors(rest); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!isValidName(name)) newErrors.name = 'Please enter your name';
    if (!isValidPhoneNumber(whatsapp)) newErrors.whatsapp = 'Please enter a valid phone number';
    if (selectedServiceIds.length === 0) newErrors.services = 'Please select at least one service';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onSubmit({ name, whatsapp, selectedServiceIds });
  };

  return (
    <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
      <div className="flex gap-3 items-center text-[12px] tracking-[0.2em] text-[#C8A96E] uppercase font-medium">
        <span>Step {stepNum} of {totalSteps}</span>
        <div className="h-px flex-1 bg-[#2A2A2A]" />
      </div>
      <h2 className="text-[2.5rem] font-semibold leading-tight text-white">Your Details & Services</h2>

      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="book-name" className="block text-[13px] tracking-[0.15em] text-[#C8A96E] uppercase font-medium">Your Name *</label>
        <input id="book-name" type="text" placeholder="Your full name" value={name}
          onChange={(e) => { setName(e.target.value); if (errors.name) { const { name: _, ...rest } = errors; setErrors(rest); } }}
          className={`w-full bg-[#1A1A1A] border ${errors.name ? 'border-red-500' : 'border-[#2A2A2A]'} text-white px-4 py-3 text-[14px] focus:outline-none focus:border-[#C8A96E] transition-colors`}
        />
        {errors.name && <p className="text-[12px] text-red-400">{errors.name}</p>}
      </div>

      {/* WhatsApp */}
      <div className="space-y-2">
        <label htmlFor="book-whatsapp" className="block text-[13px] tracking-[0.15em] text-[#C8A96E] uppercase font-medium">WhatsApp Number *</label>
        <input id="book-whatsapp" type="tel" placeholder="+971 50 123 4567" value={whatsapp}
          onChange={(e) => { setWhatsapp(e.target.value); if (errors.whatsapp) { const { whatsapp: _, ...rest } = errors; setErrors(rest); } }}
          className={`w-full bg-[#1A1A1A] border ${errors.whatsapp ? 'border-red-500' : 'border-[#2A2A2A]'} text-white px-4 py-3 text-[14px] focus:outline-none focus:border-[#C8A96E] transition-colors`}
        />
        {errors.whatsapp && <p className="text-[12px] text-red-400">{errors.whatsapp}</p>}
      </div>

      {/* Services */}
      <div className="space-y-4">
        <label className="block text-[13px] tracking-[0.15em] text-[#C8A96E] uppercase font-medium">Select Services *</label>
        <div className="space-y-3">
          {SERVICES.map((service) => {
            const isSelected = selectedServiceIds.includes(service.id);
            return (
              <motion.button key={service.id} type="button" onClick={() => toggleService(service.id)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-between p-4 border transition-all ${isSelected ? 'border-[#C8A96E] bg-[#C8A96E]/10' : 'border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#C8A96E]/50'}`}
              >
                <span className="text-[14px] text-white font-light">{service.name}</span>
                <span className="flex items-center gap-3">
                  <span className="text-[13px] text-[#9A9A9A]">AED {service.price}</span>
                  {isSelected && <Check size={16} weight="bold" className="text-[#C8A96E]" />}
                </span>
              </motion.button>
            );
          })}
        </div>
        {errors.services && <p className="text-[12px] text-red-400">{errors.services}</p>}
      </div>

      {/* Total */}
      {selectedServiceIds.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1A1A1A] border border-[#C8A96E]/30 p-4 flex items-center justify-between">
          <span className="text-[13px] tracking-[0.1em] text-[#9A9A9A] uppercase font-medium">Total Price</span>
          <span className="text-[20px] font-semibold text-[#C8A96E]">AED {totalPrice}</span>
        </motion.div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <motion.button type="button" onClick={onBack} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 py-4 px-6 text-[12px] tracking-[0.2em] uppercase font-semibold bg-transparent border border-[#C8A96E] text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all">
          <ArrowLeft size={14} weight="bold" /> Back
        </motion.button>
        <motion.button type="submit" disabled={!isFormValid} whileHover={isFormValid ? { scale: 1.02 } : {}} whileTap={isFormValid ? { scale: 0.98 } : {}}
          className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-[12px] tracking-[0.2em] uppercase font-semibold transition-all ${isFormValid ? 'bg-[#C8A96E] text-[#0C0C0C] hover:bg-[#D9B984] cursor-pointer' : 'bg-[#2A2A2A] text-[#7A7A7A] cursor-not-allowed'}`}>
          Next: Choose Date & Time <ArrowRight size={14} weight="bold" />
        </motion.button>
      </div>
    </motion.form>
  );
}

/* ─── Step 3: Calendar ─── */
function CalendarStep({
  onSubmit,
  onBack,
  stepNum,
  totalSteps,
}: {
  onSubmit: (dt: BookingDateTime) => void;
  onBack: () => void;
  stepNum: number;
  totalSteps: number;
}) {
  const days = getNext7Days();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const timeSlots = Array.from({ length: SHOP_HOURS.end - SHOP_HOURS.start + 1 }, (_, i) => SHOP_HOURS.start + i);
  const isFormValid = selectedDate && selectedHour !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedHour !== null) onSubmit({ date: selectedDate, hour: selectedHour });
  };

  return (
    <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
      <div className="flex gap-3 items-center text-[12px] tracking-[0.2em] text-[#C8A96E] uppercase font-medium">
        <span>Step {stepNum} of {totalSteps}</span>
        <div className="h-px flex-1 bg-[#2A2A2A]" />
      </div>
      <h2 className="text-[2.5rem] font-semibold leading-tight text-white">Select Date & Time</h2>

      {/* Days */}
      <div className="space-y-4">
        <label className="block text-[13px] tracking-[0.15em] text-[#C8A96E] uppercase font-medium">Choose a Date</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {days.map((date, i) => {
            const isSelected = selectedDate?.getTime() === date.getTime();
            return (
              <motion.button key={i} type="button" onClick={() => setSelectedDate(date)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`p-4 border text-center transition-all ${isSelected ? 'border-[#C8A96E] bg-[#C8A96E]/10' : 'border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#C8A96E]/50'}`}>
                <div className="text-[12px] tracking-[0.1em] text-[#9A9A9A] uppercase font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className="text-[18px] font-semibold text-white mt-1">{date.getDate()}</div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Times */}
      {selectedDate && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <label className="block text-[13px] tracking-[0.15em] text-[#C8A96E] uppercase font-medium">Choose a Time</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {timeSlots.map((hour) => {
              const isSelected = selectedHour === hour;
              return (
                <motion.button key={hour} type="button" onClick={() => setSelectedHour(hour)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className={`p-3 border text-center text-[12px] tracking-[0.1em] uppercase font-medium transition-all ${isSelected ? 'border-[#C8A96E] bg-[#C8A96E] text-[#0C0C0C]' : 'border-[#2A2A2A] bg-[#1A1A1A] text-white hover:border-[#C8A96E]/50'}`}>
                  {formatTime(hour)}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Summary */}
      {selectedDate && selectedHour !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1A1A1A] border border-[#C8A96E]/30 p-4">
          <p className="text-[13px] text-[#9A9A9A] font-light">
            <span className="text-[#C8A96E] font-medium">Selected:</span> {formatDate(selectedDate)} at {formatTime(selectedHour)}
          </p>
        </motion.div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <motion.button type="button" onClick={onBack} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 py-4 px-6 text-[12px] tracking-[0.2em] uppercase font-semibold bg-transparent border border-[#C8A96E] text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all">
          <ArrowLeft size={14} weight="bold" /> Back
        </motion.button>
        <motion.button type="submit" disabled={!isFormValid} whileHover={isFormValid ? { scale: 1.02 } : {}} whileTap={isFormValid ? { scale: 0.98 } : {}}
          className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-[12px] tracking-[0.2em] uppercase font-semibold transition-all ${isFormValid ? 'bg-[#C8A96E] text-[#0C0C0C] hover:bg-[#D9B984] cursor-pointer' : 'bg-[#2A2A2A] text-[#7A7A7A] cursor-not-allowed'}`}>
          Confirm Booking <ArrowRight size={14} weight="bold" />
        </motion.button>
      </div>
    </motion.form>
  );
}

/* ─── Step 4: Confirmation ─── */
function ConfirmationStep({
  formData,
  dateTime,
  location,
  onBack,
  stepNum,
  totalSteps,
}: {
  formData: BookingFormData;
  dateTime: BookingDateTime;
  location: (typeof LOCATIONS)[number];
  onBack: () => void;
  stepNum: number;
  totalSteps: number;
}) {
  const serviceNames = getServiceNames(formData.selectedServiceIds);
  const totalPrice = calculateTotalPrice(formData.selectedServiceIds);

  const message = `Hi Siryano (${location.name}), I'd like to book the following services: ${serviceNames.join(', ')} on ${formatDate(dateTime.date)} at ${formatTime(dateTime.hour)}. Name: ${formData.name}. WhatsApp: ${formData.whatsapp}`;
  const whatsappLink = `https://wa.me/${location.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
      <div className="flex gap-3 items-center text-[12px] tracking-[0.2em] text-[#C8A96E] uppercase font-medium">
        <span>Step {stepNum} of {totalSteps}</span>
        <div className="h-px flex-1 bg-[#2A2A2A]" />
      </div>
      <h2 className="text-[2.5rem] font-semibold leading-tight text-white">Confirm Your Booking</h2>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#1A1A1A] border border-[#C8A96E]/30 p-8 space-y-6">
        {[
          { label: 'Location', value: `${location.name} — ${location.address}` },
          { label: 'Name', value: formData.name },
          { label: 'WhatsApp', value: formData.whatsapp },
        ].map((row) => (
          <div key={row.label} className="flex justify-between items-start pb-6 border-b border-[#2A2A2A]">
            <span className="text-[13px] tracking-[0.15em] text-[#9A9A9A] uppercase font-medium">{row.label}</span>
            <span className="text-[14px] text-white font-light text-right">{row.value}</span>
          </div>
        ))}

        <div className="flex justify-between items-start pb-6 border-b border-[#2A2A2A]">
          <span className="text-[13px] tracking-[0.15em] text-[#9A9A9A] uppercase font-medium">Services</span>
          <div className="text-right">
            {serviceNames.map((n) => <p key={n} className="text-[14px] text-white font-light">{n}</p>)}
          </div>
        </div>

        <div className="flex justify-between items-start pb-6 border-b border-[#2A2A2A]">
          <span className="text-[13px] tracking-[0.15em] text-[#9A9A9A] uppercase font-medium">Date</span>
          <span className="text-[14px] text-white font-light">{formatDate(dateTime.date)}</span>
        </div>

        <div className="flex justify-between items-start pb-6 border-b border-[#2A2A2A]">
          <span className="text-[13px] tracking-[0.15em] text-[#9A9A9A] uppercase font-medium">Time</span>
          <span className="text-[14px] text-white font-light">{formatTime(dateTime.hour)}</span>
        </div>

        <div className="flex justify-between items-start pt-2">
          <span className="text-[13px] tracking-[0.15em] text-[#C8A96E] uppercase font-medium">Total Price</span>
          <span className="text-[20px] font-semibold text-[#C8A96E]">AED {totalPrice}</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-[#0C0C0C] border border-[#2A2A2A] p-4 text-[13px] text-[#9A9A9A] leading-relaxed">
        <p>Click "Send Booking via WhatsApp" below to complete your booking. Our team will confirm availability and finalize your appointment.</p>
      </motion.div>

      <div className="flex gap-3">
        <motion.button onClick={onBack} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 py-4 px-6 text-[12px] tracking-[0.2em] uppercase font-semibold bg-transparent border border-[#C8A96E] text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all">
          <ArrowLeft size={14} weight="bold" /> Back
        </motion.button>
        <motion.a href={whatsappLink} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-center gap-2 py-4 px-6 text-[12px] tracking-[0.2em] uppercase font-semibold bg-[#C8A96E] text-[#0C0C0C] hover:bg-[#D9B984] transition-all">
          <WhatsappLogo size={14} weight="bold" /> Send Booking via WhatsApp
        </motion.a>
      </div>
    </motion.div>
  );
}
