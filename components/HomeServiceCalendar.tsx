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
