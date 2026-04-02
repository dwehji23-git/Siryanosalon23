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
  { id: 'haircut---washing---style', name: 'Haircut - Washing - Style', price: 70 },
  { id: 'skin-fade-haircut---washing---', name: 'Skin fade haircut - washing - style', price: 80 },
  { id: 'haircut-machine', name: 'Haircut Machine', price: 60 },
  { id: 'hair-style', name: 'Hair Style', price: 45 },
  { id: 'hair-color', name: 'Hair color', price: 125 },
  { id: 'regular-shave', name: 'Regular Shave', price: 45 },
  { id: 'special-shave', name: 'Special Shave', price: 60 },
  { id: 'beard-color', name: 'Beard Color', price: 75 },
  { id: 'hair-treatment-caviar', name: 'Hair Treatment (Caviar)', price: 99 },
  { id: 'hair-keratin', name: 'Hair Keratin', price: 499 },
  { id: 'manicure---pedicure-and-scrub', name: '(Manicure - Pedicure & Scrub)', price: 120 },
  { id: 'manicure', name: 'Manicure', price: 60 },
  { id: 'pedicure', name: 'Pedicure', price: 60 },
  { id: 'pedi-scrub', name: 'Pedi-Scrub', price: 40 },
  { id: 'face-scrub', name: 'Face Scrub', price: 50 },
  { id: 'black-mask', name: 'Black Mask', price: 50 },
  { id: 'mask-and-scrub', name: 'Mask & Scrub', price: 75 },
  { id: 'basic-facial', name: 'Basic Facial', price: 250 },
  { id: 'signature-facial', name: 'Signature Facial', price: 349 },
  { id: 'ocean-oil-facial-treatment', name: 'Ocean Oil Facial Treatment', price: 250 },
  { id: 'brightening-facial-treatment', name: 'Brightening Facial Treatment', price: 300 },
  { id: 'hydra-specula-facial', name: 'Hydra Specula Facial', price: 350 },
  { id: 'massage', name: 'Massage', price: 209 },
  { id: 'moroccan-bath', name: 'Moroccan bath', price: 209 },
  { id: 'chair-massage', name: 'Chair Massage', price: 71 },
  { id: 'foot-massage', name: 'Foot massage', price: 95 },
  { id: 'full-face-wax-or-threading', name: 'Full Face Wax Or Threading', price: 23 },
  { id: 'half-arm-waxing', name: 'Half arm waxing', price: 47 },
  { id: 'chest-shaving', name: 'Chest shaving', price: 57 },
  { id: 'back-shaving', name: 'Back shaving', price: 57 },
  { id: 'nose-and-ear-wax', name: 'Nose & Ear Wax', price: 28 },
  { id: 'hair-treatment-caviar--special', name: 'Hair Treatment (Caviar ) Special Offer', price: 149 },
  { id: 'keratin-treatment', name: 'Keratin Treatment', price: 350 },
  { id: 'btx-keratin', name: 'BTX Keratin', price: 350 },
  { id: 'spa-pedicure', name: 'SPA Pedicure', price: 66 },
  { id: 'manicure+pedicure-with-scrub', name: 'Manicure+Pedicure with scrub', price: 161 },
  { id: 'foot-scrub', name: 'Foot Scrub', price: 38 },
  { id: 'relaxing-massage', name: 'Relaxing Massage', price: 200 },
  { id: 'moroccan-bath-+-body-scrub-and', name: 'Moroccan Bath + Body Scrub & Massage', price: 350 },
  { id: 'moroccan-bath-+-body-scrub', name: 'Moroccan Bath + Body Scrub', price: 200 },
  { id: 'scrub-and-mask', name: 'Scrub & Mask', price: 71 },
  { id: 'scrub-face', name: 'Scrub Face', price: 47 },
  { id: 'anti-aging-treatment', name: 'Anti Aging Treatment', price: 333 },
  { id: 'hyaluronic-special-facial', name: 'Hyaluronic Special Facial', price: 238 },
  { id: 'acne-facial', name: 'Acne Facial', price: 285 },
  { id: 'full-body-shaving-with-razor', name: 'Full Body Shaving With Razor', price: 300 },
  { id: 'nose-and-ear-waxing', name: 'Nose & Ear Waxing', price: 40 },
  { id: 'full-hair-with-beard-and-facia', name: 'Full Hair with Beard & Facial Offer', price: 170 },
  { id: 'high-or-lowtaper-fade-haircut,', name: 'High or LowTaper Fade Haircut, Hair Washing & Hair Style', price: 80 },
  { id: 'skin-fade-taper,-hair-wash-and', name: 'Skin Fade Taper, Hair Wash & Style', price: 80 },
  { id: 'keratin-treatment-with-hair-st', name: 'Keratin treatment With Hair Style', price: 350 },
  { id: 'hair-cut--washing--style', name: 'Hair Cut -Washing -Style', price: 71 },
  { id: 'beard-shave', name: 'Beard Shave', price: 57 },
  { id: 'special-beard-shave-with-sciss', name: 'Special Beard Shave With Scissors', price: 66 },
  { id: 'children-hair-cut-with-hair-wa', name: 'Children Hair Cut with Hair Wash & Style', price: 57 },
  { id: 'normal-hair-style', name: 'Normal Hair Style', price: 47 },
  { id: 'schwarzkopf-treatment', name: 'Schwarzkopf Treatment', price: 150 },
  { id: 'schwarzkopf-bonacure-treatment', name: 'Schwarzkopf Bonacure Treatment', price: 199 },
  { id: 'hot-oil-treatment-2', name: 'Hot oil treatment 2', price: 238 },
  { id: 'hot-oil-treatment-1', name: 'Hot oil treatment 1', price: 209 },
  { id: 'hot-oil-treatment', name: 'Hot oil treatment', price: 114 },
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
