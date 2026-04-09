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

  const phone = '971568339874';

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
