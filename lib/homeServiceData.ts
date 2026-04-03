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
  { id: 'haircut-washing-style', name: 'Haircut - Washing - Style', price: 75 },
  { id: 'skin-fade-haircut-washing-style', name: 'Skin Fade Haircut - Washing - Style', price: 85 },
  { id: 'haircut-machine', name: 'Haircut Machine', price: 60 },
  { id: 'hair-style', name: 'Hair Style', price: 50 },
  { id: 'hair-color', name: 'Hair Color', price: 125 },
  { id: 'regular-shave', name: 'Regular Shave', price: 60 },
  { id: 'special-shave', name: 'Special Shave', price: 60 },
  { id: 'beard-color', name: 'Beard Color', price: 75 },
  { id: 'hair-treatment-caviar', name: 'Hair Treatment (Caviar)', price: 250 },
  { id: 'hair-keratin', name: 'Hair Keratin', price: 600 },
  { id: 'manicure-pedicure-and-scrub', name: 'Manicure - Pedicure & Scrub', price: 170 },
  { id: 'manicure', name: 'Manicure', price: 60 },
  { id: 'pedicure', name: 'Pedicure', price: 70 },
  { id: 'pedi-scrub', name: 'Pedi-Scrub', price: 50 },
  { id: 'face-scrub', name: 'Face Scrub', price: 50 },
  { id: 'black-mask', name: 'Black Mask', price: 50 },
  { id: 'mask-and-scrub', name: 'Mask & Scrub', price: 75 },
  { id: 'basic-facial', name: 'Basic Facial', price: 250 },
  { id: 'signature-facial', name: 'Signature Facial', price: 350 },
  { id: 'ocean-oil-facial-treatment', name: 'Ocean Oil Facial Treatment', price: 250 },
  { id: 'brightening-facial-treatment', name: 'Brightening Facial Treatment', price: 300 },
  { id: 'hydra-specula-facial', name: 'Hydra Specula Facial', price: 350 },
  { id: 'massage', name: 'Massage', price: 210 },
  { id: 'moroccan-bath-body-scrub', name: 'Moroccan Bath + Body Scrub', price: 210 },
  { id: 'chair-massage', name: 'Chair Massage', price: 75 },
  { id: 'foot-massage', name: 'Foot Massage', price: 100 },
  { id: 'full-face-wax-or-threading', name: 'Full Face Wax Or Threading', price: 40 },
  { id: 'half-arm-waxing', name: 'Half Arm Waxing', price: 50 },
  { id: 'chest-shaving', name: 'Chest Shaving', price: 100 },
  { id: 'back-shaving', name: 'Back Shaving', price: 100 },
  { id: 'nose-and-ear-wax', name: 'Nose & Ear Wax', price: 40 },
  { id: 'hair-treatment-caviar-special', name: 'Hair Treatment (Caviar) Special Offer', price: 250 },
  { id: 'keratin-treatment', name: 'Keratin Treatment', price: 600 },
  { id: 'btx-keratin', name: 'BTX Keratin', price: 350 },
  { id: 'spa-pedicure', name: 'SPA Pedicure', price: 70 },
  { id: 'manicure-pedicure-with-scrub', name: 'Manicure + Pedicure with Scrub', price: 170 },
  { id: 'foot-scrub', name: 'Foot Scrub', price: 40 },
  { id: 'relaxing-massage', name: 'Relaxing Massage', price: 210 },
  { id: 'moroccan-bath-body-scrub-massage', name: 'Moroccan Bath + Body Scrub & Massage', price: 350 },
  { id: 'scrub-and-mask', name: 'Scrub & Mask', price: 75 },
  { id: 'scrub-face', name: 'Scrub Face', price: 50 },
  { id: 'anti-aging-treatment', name: 'Anti Aging Treatment', price: 350 },
  { id: 'hyaluronic-special-facial', name: 'Hyaluronic Special Facial', price: 250 },
  { id: 'acne-facial', name: 'Acne Facial', price: 300 },
  { id: 'full-body-shaving-with-razor', name: 'Full Body Shaving With Razor', price: 315 },
  { id: 'nose-and-ear-waxing', name: 'Nose & Ear Waxing', price: 40 },
  { id: 'full-hair-with-beard-facial', name: 'Full Hair with Beard & Facial Offer', price: 170 },
  { id: 'high-or-low-taper-fade-haircut', name: 'High or Low Taper Fade Haircut, Hair Washing & Hair Style', price: 85 },
  { id: 'skin-fade-taper-hair-wash-style', name: 'Skin Fade Taper, Hair Wash & Style', price: 85 },
  { id: 'keratin-treatment-with-hair-style', name: 'Keratin Treatment With Hair Style', price: 350 },
  { id: 'hair-cut-washing-style', name: 'Hair Cut - Washing - Style', price: 75 },
  { id: 'beard-shave', name: 'Beard Shave', price: 60 },
  { id: 'special-beard-shave-with-scissors', name: 'Special Beard Shave With Scissors', price: 70 },
  { id: 'children-hair-cut-with-wash-style', name: 'Children Hair Cut with Hair Wash & Style', price: 60 },
  { id: 'normal-hair-style', name: 'Normal Hair Style', price: 50 },
  { id: 'schwarzkopf-treatment', name: 'Schwarzkopf Treatment', price: 150 },
  { id: 'schwarzkopf-bonacure-treatment', name: 'Schwarzkopf Bonacure Treatment', price: 210 },
  { id: 'hot-oil-treatment-2', name: 'Hot Oil Treatment 2', price: 250 },
  { id: 'hot-oil-treatment-1', name: 'Hot Oil Treatment 1', price: 210 },
  { id: 'hot-oil-treatment', name: 'Hot Oil Treatment', price: 120 },
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
