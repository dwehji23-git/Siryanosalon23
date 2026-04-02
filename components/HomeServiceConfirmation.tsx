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
