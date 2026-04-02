// lib/homeServiceData.ts

export const HOME_SERVICE_HOURS = {
  start: 11,    // 11 AM
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
  hour: number; // 11-23
}

export interface CompleteBooking extends BookingFormData, BookingDateTime {
  totalPrice: number;
}
