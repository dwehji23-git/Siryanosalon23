# Home Service Booking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-step booking page at `/home-service` where customers enter name, WhatsApp, select services, choose date/time from a week calendar, and send booking via WhatsApp.

**Architecture:** Single page component with 3 progressive steps (form → calendar → confirmation). All state managed in React, no backend. Services and pricing defined in a shared utils file. WhatsApp link generated client-side with pre-filled message.

**Tech Stack:** Next.js 16, React, Tailwind v4, Framer Motion, Phosphor Icons

---

## File Structure

**New Files:**
- `app/home-service/page.tsx` — Main page component with step management
- `components/HomeServiceForm.tsx` — Step 1: Name, WhatsApp, service selection, price display
- `components/HomeServiceCalendar.tsx` — Step 2: 7-day week view with hourly time slots
- `components/HomeServiceConfirmation.tsx` — Step 3: Booking summary and WhatsApp action
- `lib/homeServiceUtils.ts` — Utility functions: price calculation, date formatting, WhatsApp link generation
- `lib/homeServiceData.ts` — Service definitions and pricing

**Modified Files:**
- `app/layout.tsx` — Add metadata for `/home-service` route
- `components/Nav.tsx` — Add link to home service page
- `components/Booking.tsx` — Update "Book Online" button to link to `/home-service`

---

## Task 1: Create Service Data & Utilities

**Files:**
- Create: `lib/homeServiceData.ts`
- Create: `lib/homeServiceUtils.ts`

### Step 1: Create service data file

```typescript
// lib/homeServiceData.ts

export const HOME_SERVICE_HOURS = {
  start: 9,    // 9 AM
  end: 23,     // 11 PM
};

export interface Service {
  id: string;
  name: string;
  price: number;
}

export const SERVICES: Service[] = [
  { id: 'haircut', name: 'Haircut', price: 60 },
  { id: 'skin-fade', name: 'Skin Fade', price: 70 },
  { id: 'beard-trim', name: 'Beard Trim', price: 40 },
  { id: 'mani', name: 'Mani', price: 50 },
  { id: 'pedi', name: 'Pedi', price: 60 },
  { id: 'hair-mask', name: 'Hair Mask', price: 80 },
  { id: 'facial', name: 'Facial', price: 100 },
];

export interface BookingFormData {
  name: string;
  whatsapp: string;
  selectedServiceIds: string[];
}

export interface BookingDateTime {
  date: Date;
  hour: number; // 9-23
}

export interface CompleteBooking extends BookingFormData, BookingDateTime {
  totalPrice: number;
}
```

- [ ] **Step 1.1: Write the code above in `lib/homeServiceData.ts`**

### Step 2: Create utility functions

```typescript
// lib/homeServiceUtils.ts

import { SERVICES, BookingFormData, BookingDateTime, CompleteBooking } from './homeServiceData';

/**
 * Calculate total price for selected services
 */
export function calculateTotalPrice(serviceIds: string[]): number {
  return serviceIds.reduce((total, id) => {
    const service = SERVICES.find(s => s.id === id);
    return total + (service?.price || 0);
  }, 0);
}

/**
 * Format date as "Friday, April 5"
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Format time as "2:00 PM"
 */
export function formatTime(hour: number): string {
  const date = new Date();
  date.setHours(hour, 0);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

/**
 * Get service names from IDs
 */
export function getServiceNames(serviceIds: string[]): string[] {
  return serviceIds
    .map(id => SERVICES.find(s => s.id === id)?.name)
    .filter(Boolean) as string[];
}

/**
 * Generate WhatsApp message and URL
 */
export function generateWhatsAppLink(booking: CompleteBooking): string {
  const serviceNames = getServiceNames(booking.selectedServiceIds).join(', ');
  const date = formatDate(booking.date);
  const time = formatTime(booking.hour);

  const message = `Hi Siryano, I'd like to book the following services: ${serviceNames} on ${date} at ${time}. My WhatsApp: ${booking.whatsapp}`;

  // Encode message for WhatsApp URL
  const encodedMessage = encodeURIComponent(message);

  // WhatsApp Business phone for Siryano (from existing Booking component)
  const phone = '971501234567'; // This should match the phone in your Booking.tsx

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

/**
 * Validate phone number (basic check for UAE numbers)
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Accept formats like +971501234567, 0501234567, 971501234567
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10;
}

/**
 * Validate name (non-empty)
 */
export function isValidName(name: string): boolean {
  return name.trim().length > 0;
}

/**
 * Get array of next 7 days starting today
 */
export function getNext7Days(): Date[] {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);
    days.push(date);
  }
  return days;
}
```

- [ ] **Step 2.1: Write the code above in `lib/homeServiceUtils.ts`**

### Step 3: Verify utilities work

Run: `node --eval "console.log(require('./lib/homeServiceUtils.ts').calculateTotalPrice(['haircut', 'beard-trim']))"`

Or create a simple test file to verify imports work. For now, we'll verify when we build the page.

- [ ] **Step 3.1: Add the files and verify no TypeScript errors**

Run: `npm run build` or `tsc --noEmit`

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add lib/homeServiceData.ts lib/homeServiceUtils.ts
git commit -m "feat: add home service data and utility functions"
```

---

## Task 2: Create Home Service Page with Step Management

**Files:**
- Create: `app/home-service/page.tsx`
- Create: `components/HomeServiceForm.tsx` (stub)
- Create: `components/HomeServiceCalendar.tsx` (stub)
- Create: `components/HomeServiceConfirmation.tsx` (stub)

### Step 1: Create main page component with state management

```typescript
// app/home-service/page.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import HomeServiceForm from '@/components/HomeServiceForm';
import HomeServiceCalendar from '@/components/HomeServiceCalendar';
import HomeServiceConfirmation from '@/components/HomeServiceConfirmation';
import { BookingFormData, BookingDateTime } from '@/lib/homeServiceData';

type Step = 'form' | 'calendar' | 'confirmation';

export default function HomeServicePage() {
  const [currentStep, setCurrentStep] = useState<Step>('form');
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    whatsapp: '',
    selectedServiceIds: [],
  });
  const [dateTime, setDateTime] = useState<BookingDateTime | null>(null);

  const handleFormSubmit = (data: BookingFormData) => {
    setFormData(data);
    setCurrentStep('calendar');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCalendarSubmit = (data: BookingDateTime) => {
    setDateTime(data);
    setCurrentStep('confirmation');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCalendar = () => {
    setCurrentStep('calendar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#0C0C0C]">
      {/* Hero/Intro Section */}
      <section className="py-16 md:py-24 bg-[#0C0C0C] px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-tight tracking-[-0.03em] text-white">
              Cut Your Hair at Home
            </h1>
            <p className="text-[16px] text-[#9A9A9A] font-light max-w-[60ch] leading-relaxed">
              Experience premium men's grooming in the comfort of your own space. Our expert barbers bring the salon to you with our home service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-12 md:py-20 bg-[#0A0A0A] px-6 md:px-12">
        <div className="max-w-[700px] mx-auto">
          {currentStep === 'form' && (
            <HomeServiceForm
              onSubmit={handleFormSubmit}
              initialData={formData}
            />
          )}

          {currentStep === 'calendar' && (
            <HomeServiceCalendar
              onSubmit={handleCalendarSubmit}
              onBack={handleBackToForm}
              formData={formData}
            />
          )}

          {currentStep === 'confirmation' && dateTime && (
            <HomeServiceConfirmation
              formData={formData}
              dateTime={dateTime}
              onBack={handleBackToCalendar}
            />
          )}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2.1: Write the code above in `app/home-service/page.tsx`**

### Step 2: Create stub components

```typescript
// components/HomeServiceForm.tsx

'use client';

import { BookingFormData } from '@/lib/homeServiceData';

interface HomeServiceFormProps {
  onSubmit: (data: BookingFormData) => void;
  initialData: BookingFormData;
}

export default function HomeServiceForm({ onSubmit, initialData }: HomeServiceFormProps) {
  return <div>Form Component - Coming Next</div>;
}
```

- [ ] **Step 2.2: Write the code above in `components/HomeServiceForm.tsx`**

```typescript
// components/HomeServiceCalendar.tsx

'use client';

import { BookingFormData, BookingDateTime } from '@/lib/homeServiceData';

interface HomeServiceCalendarProps {
  onSubmit: (data: BookingDateTime) => void;
  onBack: () => void;
  formData: BookingFormData;
}

export default function HomeServiceCalendar({ onSubmit, onBack, formData }: HomeServiceCalendarProps) {
  return <div>Calendar Component - Coming Next</div>;
}
```

- [ ] **Step 2.3: Write the code above in `components/HomeServiceCalendar.tsx`**

```typescript
// components/HomeServiceConfirmation.tsx

'use client';

import { BookingFormData, BookingDateTime } from '@/lib/homeServiceData';

interface HomeServiceConfirmationProps {
  formData: BookingFormData;
  dateTime: BookingDateTime;
  onBack: () => void;
}

export default function HomeServiceConfirmation({ formData, dateTime, onBack }: HomeServiceConfirmationProps) {
  return <div>Confirmation Component - Coming Next</div>;
}
```

- [ ] **Step 2.4: Write the code above in `components/HomeServiceConfirmation.tsx`**

### Step 3: Verify page builds

Run: `npm run build`

Expected: No errors, page should be navigable at `/home-service`

- [ ] **Step 3.1: Build and verify**

### Step 4: Commit

```bash
git add app/home-service/page.tsx components/HomeServiceForm.tsx components/HomeServiceCalendar.tsx components/HomeServiceConfirmation.tsx
git commit -m "feat: create home service page with step management"
```

---

## Task 3: Build HomeServiceForm Component

**Files:**
- Modify: `components/HomeServiceForm.tsx`

### Step 1: Write form component with validation

```typescript
// components/HomeServiceForm.tsx

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
```

- [ ] **Step 3.1: Replace the stub in `components/HomeServiceForm.tsx` with the code above**

### Step 2: Test the form component

The form should:
- Accept name input
- Accept phone input
- Show all 7 services with prices
- Allow selecting/deselecting services
- Update total price in real-time
- Show validation errors when trying to submit with empty fields
- Only enable submit button when all fields are valid

- [ ] **Step 3.2: Test form manually**

Run: `npm run dev` and navigate to `http://localhost:3000/home-service`

Try:
- Submit with empty fields → should show errors
- Enter name, phone, select a service → button should enable
- Select multiple services → price should update
- Unselect a service → price should update

Expected: Form works as described above

### Step 3: Commit

```bash
git add components/HomeServiceForm.tsx
git commit -m "feat: implement home service booking form with validation"
```

---

## Task 4: Build HomeServiceCalendar Component

**Files:**
- Modify: `components/HomeServiceCalendar.tsx`

### Step 1: Create calendar component

```typescript
// components/HomeServiceCalendar.tsx

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
```

- [ ] **Step 4.1: Replace the stub in `components/HomeServiceCalendar.tsx` with the code above**

### Step 2: Test the calendar component

- [ ] **Step 4.2: Test calendar manually**

Run: `npm run dev` and fill the form, click next

Try:
- Calendar shows next 7 days
- Clicking a day highlights it
- When day selected, time slots appear
- Clicking a time highlights it
- Summary shows selected date and time
- Back button goes back to form
- Confirm button is disabled until both date and time selected

Expected: Calendar works as described

### Step 3: Commit

```bash
git add components/HomeServiceCalendar.tsx
git commit -m "feat: implement week calendar with date and time selection"
```

---

## Task 5: Build HomeServiceConfirmation Component

**Files:**
- Modify: `components/HomeServiceConfirmation.tsx`

### Step 1: Create confirmation component with WhatsApp integration

```typescript
// components/HomeServiceConfirmation.tsx

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
```

- [ ] **Step 5.1: Replace the stub in `components/HomeServiceConfirmation.tsx` with the code above**

### Step 2: Test the complete flow

- [ ] **Step 5.2: Test complete booking flow**

Run: `npm run dev` and test end-to-end:

1. Fill form (name: "Ahmed", phone: "+971501234567", services: Haircut + Beard Trim)
2. Click "Next: Choose Date & Time"
3. Select a date and time
4. Click "Confirm Booking"
5. Verify summary shows correct details and total price (60 + 40 = 100)
6. Copy the WhatsApp link that would be generated (don't click if no WhatsApp installed)
7. Verify message format

Expected:
- All data flows correctly through steps
- Price calculation is correct
- WhatsApp link is generated with pre-filled message

### Step 3: Commit

```bash
git add components/HomeServiceConfirmation.tsx
git commit -m "feat: implement confirmation with WhatsApp integration"
```

---

## Task 6: Add Navigation Links

**Files:**
- Modify: `components/Nav.tsx`
- Modify: `components/Booking.tsx`

### Step 1: Update Nav component to link to home service

Read the current Nav component to understand its structure first, then add the link.

- [ ] **Step 6.1: Read `components/Nav.tsx` to understand structure**

After reading, add a link in the navigation menu. The exact location depends on the current structure, but typically:

- [ ] **Step 6.2: Add link to Nav**

Add a new navigation item that links to `/home-service`. Example:

```typescript
<Link href="/home-service" className="...">
  Home Service
</Link>
```

Or if using a menu item component, add it to the menu items array.

### Step 2: Update Booking component "Book Online" button

Read the current Booking component and update the "Book Online" button href to point to `/home-service`.

- [ ] **Step 6.3: Read `components/Booking.tsx`**

Locate the "Book Online" button (line ~50 based on earlier read).

- [ ] **Step 6.4: Update "Book Online" button href**

Change:
```typescript
href="#"
```

To:
```typescript
href="/home-service"
```

### Step 3: Commit

```bash
git add components/Nav.tsx components/Booking.tsx
git commit -m "feat: add navigation links to home service page"
```

---

## Task 7: Update Page Metadata

**Files:**
- Modify: `app/layout.tsx`

### Step 1: Add metadata for home-service route

The home service page should have proper metadata for SEO. Update `app/layout.tsx` to add a separate metadata configuration, or update the existing one.

For a Next.js 16 app, you can generate metadata per route. However, since it's a single layout, we'll ensure the default metadata is appropriate.

- [ ] **Step 7.1: Read current `app/layout.tsx` (already done earlier)**

The layout already has good base metadata. We should add a route-specific metadata file.

Create `app/home-service/layout.tsx`:

```typescript
// app/home-service/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Home Service | Siryano Barbershop Dubai",
  description: "Book premium haircut and grooming services in the comfort of your home. Same-day booking available across Dubai. Haircut, skin fade, beard trim, and more.",
  keywords: [
    "home barber service dubai",
    "barber home service",
    "at-home haircut",
    "mobile barber dubai",
  ],
};

export default function HomeServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
```

- [ ] **Step 7.2: Create `app/home-service/layout.tsx` with the code above**

### Step 2: Commit

```bash
git add app/home-service/layout.tsx
git commit -m "feat: add metadata for home service page"
```

---

## Task 8: Final Testing & Verification

**Files:**
- No new files, testing existing components

### Step 1: Full page build and run

- [ ] **Step 8.1: Build the project**

Run: `npm run build`

Expected: Build succeeds with no errors

### Step 2: Manual testing checklist

- [ ] **Step 8.2: Test complete user flow**

Run: `npm run dev` and test:

1. **Navigation:**
   - Can access `/home-service` directly
   - Nav menu has link to home service (if visible in nav)
   - Main Booking component's "Book Online" button links to `/home-service`

2. **Form Step:**
   - All fields validate
   - Price updates in real-time as services selected
   - Cannot proceed without all fields filled

3. **Calendar Step:**
   - Shows next 7 days correctly
   - Shows 15 hourly time slots (9 AM - 11 PM)
   - Can select date and time
   - Summary displays correctly
   - Back button returns to form

4. **Confirmation Step:**
   - Shows all booking details
   - Total price is correct
   - Back button returns to calendar
   - WhatsApp link opens WhatsApp (or WhatsApp Web)

5. **Responsiveness:**
   - Test on mobile (use browser dev tools)
   - Form is full-width
   - Calendar is stacked vertically on mobile
   - All buttons are thumb-friendly

6. **Styling:**
   - Dark background (#0C0C0C) matches site
   - Gold accents (#C8A96E) used correctly
   - Animations are smooth
   - Text is readable

- [ ] **Step 8.3: Verify on multiple screen sizes**

Test on:
- Desktop (1920px)
- Tablet (768px)
- Mobile (375px)

### Step 3: Visual consistency check

- [ ] **Step 8.4: Compare with existing components**

Verify that:
- Font sizes match existing components
- Spacing follows existing patterns
- Color palette is consistent
- Icon style matches (Phosphor Icons)
- Animation style matches (Framer Motion)

### Step 4: Final commit

- [ ] **Step 8.5: Commit if any final tweaks made**

```bash
git add .
git commit -m "feat: complete home service booking page with full testing"
```

Or if no changes:

```bash
git log --oneline -10
```

To verify all commits are there.

---

## Summary

This plan creates a complete, production-ready home service booking page with:

✅ Multi-step form with validation
✅ Dynamic pricing calculation
✅ 7-day week calendar with hourly time slots
✅ Confirmation with WhatsApp integration
✅ Responsive design matching Siryano brand
✅ Framer Motion animations
✅ Zero backend requirements (WhatsApp-based)
✅ SEO-optimized

**Total estimated implementation:** 2-3 hours for a skilled developer following this plan step-by-step.
