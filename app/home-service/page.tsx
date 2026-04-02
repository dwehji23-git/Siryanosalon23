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
