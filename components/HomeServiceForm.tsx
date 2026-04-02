'use client';

import { BookingFormData } from '@/lib/homeServiceData';

interface HomeServiceFormProps {
  onSubmit: (data: BookingFormData) => void;
  initialData: BookingFormData;
}

export default function HomeServiceForm({ onSubmit, initialData }: HomeServiceFormProps) {
  return <div>Form Component - Coming Next</div>;
}
