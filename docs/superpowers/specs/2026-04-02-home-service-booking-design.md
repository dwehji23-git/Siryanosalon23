# Home Service Booking Page Design

**Date:** April 2, 2026
**Feature:** "Cut Your Hair at Home" — Multi-step booking experience for home barber service

---

## Overview

A dedicated booking page for customers to reserve home haircut services. The page follows a 3-step progressive flow:
1. Fill service booking form (name, WhatsApp, services, auto-calculated price)
2. Select date/time from a 7-day week calendar
3. Review confirmation and send booking via WhatsApp

**Route:** `/home-service`
**Single page with progressive step reveal** (no page navigation between steps)

---

## Step 1: Service Booking Form

### Fields
- **Name** (text input)
  - Required, validates non-empty
  - Placeholder: "Your full name"

- **WhatsApp Number** (tel input)
  - Required, validates phone format
  - Placeholder: "+971 50 123 4567"
  - Label emphasizes "Functioning WhatsApp" for confirmations

- **Services** (multi-select dropdown)
  - Options: Haircut, Skin Fade, Beard Trim, Mani, Pedi, Hair Mask, Facial
  - Customer can select one or multiple services
  - Each service shows individual price (pricing TBD by barbershop)
  - Real-time total price calculation and display
  - Required, at least one service must be selected

### Behavior
- All fields validated before "Next" button enables
- Submit button text: "Next: Choose Date & Time"
- On valid submission: Page scrolls to Step 2 (calendar) or smooth transition

---

## Step 2: Week Calendar (Date/Time Selection)

### Layout
- **Header:** "Select Your Preferred Date & Time"
- **Week view:** 7 consecutive days starting today
- Each day shows:
  - Day name (e.g., "Friday")
  - Date (e.g., "April 5")
  - Available time slots: 9 AM, 10 AM, 11 AM... 11 PM (hourly intervals)

### Time Slots
- **Operating hours:** 9 AM – 11 PM (same as main shop)
- 15 available slots per day (9 AM to 11 PM, hourly)
- All slots shown as available (no unavailable slot blocking yet)
- Customer clicks a slot to select

### Selection Feedback
- Selected slot is highlighted/marked
- Summary shows below calendar: "Selected: [Day], [Date] at [Time]"
- "Confirm Booking" button to proceed to Step 3

---

## Step 3: Confirmation & WhatsApp

### Summary Display
- **Booking Details:**
  - Name: [from form]
  - Services: [all selected services, comma-separated]
  - Total Price: [auto-calculated]
  - Date: [selected date]
  - Time: [selected time]

### WhatsApp Action
- **Pre-filled WhatsApp message:**
  ```
  Hi Siryano, I'd like to book the following services: [Services] on [Date] at [Time]. My WhatsApp: [Number]
  ```
- **Button text:** "Send Booking via WhatsApp"
- Clicking opens WhatsApp (web or app) with pre-filled message ready to send
- Customer reviews and sends manually

---

## Data Flow

### State Management
- Form data (name, WhatsApp, services) persisted during page session
- Can use URL params or React state (whichever is simpler)
- Calendar selection (date, time) added to state when confirmed
- WhatsApp link generated with complete booking object

### No Backend Required (Initially)
- All data flows directly to WhatsApp message
- Barbershop receives bookings through WhatsApp
- Future: can add backend booking database if needed

---

## Design System Integration

### Colors & Theme
- **Background:** Dark (#0C0C0C) matching site
- **Accent:** Gold (#C8A96E) for buttons and highlights
- **Text:** Light grays for secondary text (#7A7A7A)
- **Borders:** Subtle dividers (#2A2A2A)

### Components & Patterns
- **Icons:** Phosphor Icons (matching existing site)
- **Animations:** Framer Motion for step transitions and interactions
- **Typography:** Outfit font family (existing)
- **Responsive:** Mobile-first design, full width on small screens

### Interactive Elements
- Form inputs with hover/focus states (gold border on focus)
- Dropdown multi-select with clear visual feedback
- Calendar day/time selection with hover and active states
- Buttons with hover animations (scale/color shift)
- Price updates smoothly as services are selected

---

## User Experience Flow

1. Customer lands on `/home-service`
2. Sees hero/intro section (brief description of home service)
3. Form appears: fill name, WhatsApp, select services
4. See total price update in real-time
5. Click "Next: Choose Date & Time" → page scrolls/transitions to calendar
6. Calendar shows next 7 days with hourly slots
7. Click preferred slot (highlighted)
8. See selection summary
9. Click "Confirm Booking" → see confirmation section
10. Review booking details
11. Click "Send Booking via WhatsApp"
12. WhatsApp opens with pre-filled message
13. Customer reviews and sends

---

## Mobile Optimization

- Full-width form on mobile (no multi-column)
- Calendar: day and time stacked vertically on small screens
- Buttons full-width and thumb-friendly (min 44px height)
- Scrollable week calendar if needed on very small screens
- Confirmation section: card-based layout that stacks vertically

---

## Pricing (To Be Configured)

Services and individual prices should be configurable. Placeholder structure:

```
Haircut: AED 60
Skin Fade: AED 70
Beard Trim: AED 40
Mani: AED 50
Pedi: AED 60
Hair Mask: AED 80
Facial: AED 100
```

*(Actual prices to be set by barbershop)*

---

## Navigation & Links

- Add link in main nav (Nav component) or as button in existing "Book Online" CTA
- Footer can also link to this page
- Page should include back/home button for navigation

---

## Future Enhancements (Out of Scope)

- Backend booking database to prevent double-bookings
- Email confirmation in addition to WhatsApp
- Barber/staff selection
- Unavailable time slot management
- Payment integration
- Calendar integration (sync with Google Calendar, etc.)

---

## Acceptance Criteria

- [ ] Form validates name, WhatsApp, and services
- [ ] Price calculates correctly as services are selected
- [ ] Calendar shows 7 days with hourly slots (9 AM – 11 PM)
- [ ] Selected slot is highlighted and summary displays
- [ ] WhatsApp message pre-fills with booking details
- [ ] Page is responsive on mobile, tablet, desktop
- [ ] Animations and interactions match existing Siryano site style
- [ ] All copy uses luxury/professional tone matching brand
