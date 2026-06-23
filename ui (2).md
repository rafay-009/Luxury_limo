# UI/UX Design Document — Premium Chauffeur Service Website
### Tynex Solutions | Niche: Luxury Transportation / Chauffeur Service | Frontend Agent Prompt Guide
**Version:** 2.0.0 | **Stack:** Next.js + TypeScript + Tailwind CSS + Framer Motion

---

## Document Purpose

This document is the **complete UI/UX specification** for the premium chauffeur service website. It is written as a **design brief + agent prompt** — every section tells the implementation agent exactly what to build, how it should look, what animations to apply, and how to wire everything from the single config file at `constants/index.ts`.

The website is **premium, dark-first, luxury automotive**, and motion-rich. It should feel like a world-class executive transportation brand — think: precision, reliability, professionalism, and white-glove service. Inspired by premium brands like Carey International and Blacklane. Sleek, confident, and high-trust.

---

## Global Design Language

### Aesthetic Direction
- **Theme:** Dark mode by default. Deep charcoal/near-black backgrounds with electric cyan/teal accent gradients. Clean glassmorphic booking widget floating over a full-screen hero image. The overall palette is drawn from Image 2 (hero): deep navy-charcoal backgrounds with bright cyan (`#22D3EE`) accents.
- **Mood:** Executive luxury, precision, dependability. Like stepping into the back seat of a flawlessly prepared Mercedes S-Class.
- **Typography:** Large, bold display headings. Clean, modern sans-serif body. Generous whitespace. Key words highlighted in bright cyan — e.g., "**Premium** Chauffeur" where "Premium" is white and "Chauffeur" is cyan, or section titles like "How It **Works**" where the accented word is cyan.
- **Layout Philosophy:** Split/asymmetric sections with bold photography of premium black vehicles and cityscapes. Cards use dark surfaces with subtle glass borders. Fleet section alternates white background for contrast.
- **Motion Philosophy:** Smooth, purposeful transitions. Elements enter from below with fade. Hover states on cards and buttons are refined — no distracting effects. Everything communicates precision.

### Color System (all tokens live in `constants/index.ts`)
```
Background:      #0A0F1A  (deep charcoal-navy)
Surface:         #111827  (card background base)
Surface Light:   #1F2937  (elevated card surface)
Glass:           rgba(17, 24, 39, 0.75) + backdrop-blur-xl
Primary:         #0369A1  (deep sky blue)
Primary Light:   #0EA5E9  (sky blue)
Accent:          #22D3EE  (bright cyan — used on highlighted words, buttons, icons)
Accent Glow:     rgba(34, 211, 238, 0.18)
White BG:        #F8FAFC  (fleet section / light mode sections)
Text Primary:    #FFFFFF
Text Dark:       #0F172A  (for light-bg sections)
Text Muted:      #94A3B8
Border Glass:    rgba(255, 255, 255, 0.10)
Border Dark:     rgba(255, 255, 255, 0.06)
Gradient CTA:    linear-gradient(90deg, #0369A1, #22D3EE)
Gradient Hero:   linear-gradient(135deg, #0c1929, #060D18, #0A0F1A)
Success:         #10B981
Error:           #EF4444
Booking Widget BG: rgba(10, 15, 26, 0.92)
```

> All colors above are the **default chauffeur theme**. Every hex value must be sourced from `constants/index.ts → theme.colors`. The agent must never hardcode colors — always use CSS variables or Tailwind arbitrary values sourced from config.

### Typography Scale (from config)
```
Display XL:  clamp(3rem, 6vw, 5rem)     — Hero headlines
Display LG:  clamp(2.25rem, 4vw, 3.5rem) — Page section titles
Heading MD:  clamp(1.4rem, 2.5vw, 2rem)  — Sub-section titles
Body LG:     1.125rem                    — Lead paragraphs
Body:        1rem                        — General text
Caption:     0.875rem                    — Labels, chips, tags
Mono:        0.8125rem                   — Form labels, metadata
```
Fonts are loaded from `constants/index.ts → theme.fonts.heading` and `theme.fonts.body`.

### Spacing & Grid
- Max content width: `1280px`
- Section vertical padding: `py-20` to `py-28` (configurable via `layout.sectionPadding`)
- Column grid: 12-column base, responsive
- Card border radius: `rounded-2xl` (from `theme.radii.card`)
- Button border radius: `rounded-lg` (from `theme.radii.button`)

---

## The Config File — `constants/index.ts`

This single file is the **entire brain** of the website. Every piece of text, color, link, image URL, animation toggle, feature flag, and layout option lives here. The agent must import everything from this file — **zero hardcoded content anywhere in components**.

### Full Structure of `constants/index.ts`

```typescript
export const SITE_CONFIG = {

  // ─── META & SEO ────────────────────────────────────────────────────
  meta: {
    siteName: "Luxy Rides",
    siteUrl: "https://luxyrides.ca",
    defaultTitle: "Luxy Rides — Premium Chauffeur Rides Across Canada",
    defaultDescription: "Premium chauffeur services for airport transfers, corporate travel, and special occasions. Professional, reliable, luxurious.",
    defaultOgImage: "/og-image.jpg",
    favicon: "/favicon.ico",
    locale: "en_CA",
    twitterHandle: "@luxyrides",
    themeColor: "#22D3EE",
    googleVerification: "",
    structuredData: {
      type: "LocalBusiness",
      priceRange: "$$$",
      servesCuisine: null,
    },
  },

  // ─── COMPANY IDENTITY ──────────────────────────────────────────────
  company: {
    name: "Luxy Rides",
    tagline: "Premium Chauffeur Rides Across Canada",
    description: "Premium chauffeur services for airport transfers, corporate travel, and special occasions. Professional, reliable, luxurious.",
    logo: {
      light: "/logo-light.svg",
      dark: "/logo-dark.svg",
      width: 160,
      height: 40,
    },
    founded: "2015",
    location: "Canada",
    address: "Canada",
    mapEmbedUrl: "https://maps.google.com/...",
    phone: "+1 800 123 4567",
    email: "info@luxyrides.ca",
    hours: [
      { days: "Monday – Sunday", time: "24/7 Available" },
    ],
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com/luxyrides",  icon: "Instagram" },
      { platform: "facebook",  url: "https://facebook.com/luxyrides",   icon: "Facebook" },
      { platform: "twitter",   url: "https://twitter.com/luxyrides",    icon: "Twitter" },
      { platform: "linkedin",  url: "https://linkedin.com/company/luxyrides", icon: "Linkedin" },
    ],
    stats: [
      { label: "Trips Completed",     value: "12,000+", icon: "Car" },
      { label: "Professional Drivers", value: "50+",    icon: "UserCheck" },
      { label: "Cities Covered",       value: "24/7",   icon: "Clock" },
      { label: "Satisfaction Rate",    value: "4.9★",   icon: "Star" },
    ],
    trustBadges: [
      "Licensed & Insured",
      "Professional Drivers",
      "24/7 Support",
    ],
    mediaLogos: [
      { name: "Ray-Ban",   logo: "/media/rayban.svg" },
      { name: "Politico",  logo: "/media/politico.svg" },
      { name: "Verizon",   logo: "/media/verizon.svg" },
      { name: "Thomson Reuters", logo: "/media/reuters.svg" },
      { name: "POLITICO",  logo: "/media/politico2.svg" },
    ],
  },

  // ─── THEME ─────────────────────────────────────────────────────────
  theme: {
    defaultMode: "dark",
    allowToggle: false,
    colors: {
      background: "#0A0F1A",
      surface: "#111827",
      surfaceLight: "#1F2937",
      primary: "#0369A1",
      primaryLight: "#0EA5E9",
      accent: "#22D3EE",
      accentGlow: "rgba(34, 211, 238, 0.18)",
      whiteBg: "#F8FAFC",
      textPrimary: "#FFFFFF",
      textDark: "#0F172A",
      textMuted: "#94A3B8",
      borderGlass: "rgba(255, 255, 255, 0.10)",
      borderDark: "rgba(255, 255, 255, 0.06)",
      gradientCta: "linear-gradient(90deg, #0369A1, #22D3EE)",
      gradientHero: "linear-gradient(135deg, #0c1929, #060D18, #0A0F1A)",
      success: "#10B981",
      error: "#EF4444",
      bookingWidgetBg: "rgba(10, 15, 26, 0.92)",
    },
    fonts: {
      heading: "var(--font-outfit)",
      body: "var(--font-inter)",
      mono: "var(--font-fira-code)",
    },
    radii: {
      card: "1rem",
      button: "0.5rem",
      pill: "9999px",
    },
    blur: {
      glass: "20px",
      heavy: "40px",
    },
  },

  // ─── ANIMATIONS ────────────────────────────────────────────────────
  animations: {
    enabled: true,
    reducedMotionRespect: true,
    pageTransition: "fade-slide",
    scrollReveal: {
      enabled: true,
      defaultDelay: 0,
      staggerChildren: 0.10,
      duration: 0.65,
      yOffset: 30,
    },
    cursor: {
      custom: false,
      color: "#22D3EE",
      magneticElements: ["a", "button", ".magnetic"],
    },
  },

  // ─── NAVIGATION ────────────────────────────────────────────────────
  navigation: {
    sticky: true,
    transparent: true,
    scrollThreshold: 80,
    links: [
      { label: "Services",     href: "/services",     pageKey: "services" },
      { label: "Our Fleet",    href: "/fleet",        pageKey: "fleet" },
      { label: "Events",       href: "/events",       pageKey: "events" },
      { label: "Calendar Fare",href: "/calendar-fare",pageKey: "calendar-fare" },
      { label: "Join our Team",href: "/join-team",    pageKey: "join-team" },
    ],
    cta: {
      label: "Book Now",
      href: "#booking",
      variant: "gradient",
    },
    topBar: {
      show: true,
      message: "🎉 FPN Partner deal is closing — Book your airport transfers to Canada. Hurry, offer is limited.",
      cta: { label: "Explore FPN Services →", href: "/fpn" },
    },
  },

  // ─── HERO ──────────────────────────────────────────────────────────
  hero: {
    layout: "split-with-booking-widget",
    badge: { show: false },
    headline: {
      line1: "Premium Chauffeur",
      line2: "Rides Across Canada",
      highlightWord: "Rides Across Canada",
    },
    subheadline: "Premium chauffeur services for airport transfers, corporate travel and special occasions. Professional, reliable, luxurious.",
    backgroundImage: {
      src: "/hero-chauffeur.jpg",
      alt: "Premium chauffeur service Canada",
    },
    overlayGradient: "linear-gradient(to right, rgba(10,15,26,0.90) 45%, rgba(10,15,26,0.20) 100%)",
    trustPills: [
      { icon: "Shield",    label: "Licensed & Insured" },
      { icon: "UserCheck", label: "Professional Drivers" },
      { icon: "Clock",     label: "24/7 Support" },
    ],
    scrollIndicator: false,
  },

  // ─── BOOKING WIDGET ────────────────────────────────────────────────
  bookingWidget: {
    title: "Book Your Ride",
    subtitle: "Reserve your premium chauffeur",
    tabs: [
      { id: "one-way",    label: "One Way",    icon: "ArrowRight" },
      { id: "round-trip", label: "Round Trip", icon: "Repeat2" },
      { id: "hourly",     label: "Hourly",     icon: "Clock" },
    ],
    fields: [
      { name: "tripType",     label: "Trip Type",         type: "select",   required: true,
        options: ["Airport Transfer", "Corporate", "Events", "Hourly Charter"] },
      { name: "pickupAddress",  label: "Pickup Location",  type: "location-autocomplete", required: true, placeholder: "Enter pickup location" },
      { name: "dropoffAddress", label: "Drop-off Location", type: "location-autocomplete", required: true, placeholder: "Enter destination" },
      { name: "pickupDate",   label: "Date",              type: "date",     required: true },
      { name: "pickupTime",   label: "Time",              type: "time",     required: true },
      { name: "passengers",   label: "Passengers",        type: "number",   required: true, min: 1, max: 14 },
      { name: "luggage",      label: "Luggage",           type: "number",   required: false, min: 0 },
    ],
    submitLabel: "Get Instant Quote",
    appearance: {
      position: "right",      // floating on right side of hero
      width: "380px",
      background: "rgba(10, 15, 26, 0.92)",
      backdropBlur: "20px",
      borderColor: "rgba(255, 255, 255, 0.10)",
    },
    paymentNote: "All payment methods accepted",
    freeCancel: "Free cancellation",
    instantConfirm: "Instant confirmation",
  },

  // ─── SERVICES ──────────────────────────────────────────────────────
  services: {
    page: {
      title: "Our Services",
      subtitle: "What We Offer",
      description: "From airport pickups to city tours, we provide a full suite of premium transportation solutions.",
    },
    items: [
      {
        id: "airport-transfer",
        icon: "Plane",
        title: "Airport Transfers",
        shortDesc: "On-time, stress-free pickups and drop-offs at all major Canadian airports.",
        fullDesc: "Flight tracking included. Meet-and-greet service. 60-minute wait included for international arrivals.",
        price: "From $45",
        badge: "Most Popular",
        image: "/services/airport.jpg",
        featured: true,
        href: "/services/airport-transfer",
        color: "#22D3EE",
      },
      {
        id: "corporate-travel",
        icon: "Briefcase",
        title: "Corporate Travel",
        shortDesc: "Dedicated chauffeur accounts for executive business travel.",
        fullDesc: "Monthly billing, dedicated account manager, privacy policy compliance.",
        price: "Custom Rates",
        badge: "Business",
        image: "/services/corporate.jpg",
        featured: true,
        href: "/services/corporate-travel",
        color: "#0EA5E9",
      },
      {
        id: "special-occasions",
        icon: "Sparkles",
        title: "Special Occasions",
        shortDesc: "Weddings, galas, proms, and milestone celebrations in style.",
        fullDesc: "Red carpet treatment. Decorated vehicles available on request.",
        price: "From $120",
        badge: null,
        image: "/services/occasions.jpg",
        featured: true,
        href: "/services/special-occasions",
        color: "#8B5CF6",
      },
      {
        id: "city-tours",
        icon: "MapPin",
        title: "City Tours",
        shortDesc: "Discover Canada's cities with a knowledgeable personal chauffeur.",
        fullDesc: "Custom itineraries, flexible hours, local expertise.",
        price: "From $85/hr",
        badge: null,
        image: "/services/city-tours.jpg",
        featured: false,
        href: "/services/city-tours",
        color: "#10B981",
      },
    ],
  },

  // ─── HOW IT WORKS ──────────────────────────────────────────────────
  howItWorks: {
    heading: "How It Works",
    highlightWord: "Works",
    subheading: "Three simple steps to experience premium travel tailored to your schedule.",
    steps: [
      {
        step: 1,
        title: "Enter Your Trip Details",
        description: "Tell us your pickup, destination, date and vehicle preference",
        icon: "MapPin",
      },
      {
        step: 2,
        title: "Get Your Quote & Confirm",
        description: "Review your instant price quote, choose your vehicle, and confirm your booking securely.",
        icon: "CreditCard",
      },
      {
        step: 3,
        title: "Your Chauffeur On Time",
        description: "Your professionally dressed chauffeur arrives on time, every time.",
        icon: "UserCheck",
      },
    ],
    mobileAppMockup: {
      show: true,
      image: "/mockups/trip-details-screen.png",
      alt: "Luxy Rides app trip details screen",
      sampleTrip: {
        pickup: "New York, NY (JFK Airport)",
        destination: "Manhattan, New York, NY",
        dateTime: "May 24, 2025 · 10:00 AM",
        vehicle: "Sedan (3 Passengers)",
        estimatedFare: "$85.00",
        fareNote: "Includes taxes and fees",
        ctaLabel: "Get Quote",
      },
    },
    layout: "accordion-with-mockup",  // left: accordion steps, right: phone mockup
  },

  // ─── FLEET ─────────────────────────────────────────────────────────
  fleet: {
    page: {
      title: "Our Fleet",
      highlightWord: "Fleet",
      subtitle: "Premium vehicles for every occasion",
    },
    categories: [
      { id: "sedan",        label: "Sedan" },
      { id: "suv",          label: "SUV" },
      { id: "sprinter-van", label: "Sprinter Van" },
      { id: "limousine",    label: "Limousine" },
      { id: "buses",        label: "Buses" },
    ],
    vehicles: [
      {
        id: "economy-sedan",
        category: "sedan",
        tier: "Budget Friendly",
        name: "Economy Sedan",
        makes: ["Camry | Corolla", "Accord | Civic", "Elantra", "Sentra"],
        makeIcons: ["toyota", "honda", "hyundai", "nissan"],
        passengers: 2,
        luggage: "2-3 suitcases",
        priceFrom: "$45",
        image: "/fleet/economy-sedan.jpg",
        imageAlt: "Economy Sedan — Toyota Camry or similar",
        href: "/fleet/economy-sedan",
        featured: false,
      },
      {
        id: "luxury-sedan-exec",
        category: "sedan",
        tier: "Executive Choice",
        name: "Luxury Sedan",
        makes: ["Benz-E-Class", "5 Series", "A6 | A8", "ES | GS"],
        makeIcons: ["mercedes", "bmw", "audi", "lexus"],
        passengers: 3,
        luggage: "2-3 suitcases",
        priceFrom: "$85",
        image: "/fleet/luxury-sedan-exec.jpg",
        imageAlt: "Luxury Sedan — Mercedes E-Class or similar",
        href: "/fleet/luxury-sedan-executive",
        featured: true,
      },
      {
        id: "luxury-sedan-flagship",
        category: "sedan",
        tier: "Flagship",
        name: "Luxury Sedan",
        makes: ["Benz-S-Class", "7 Series"],
        makeIcons: ["mercedes", "bmw"],
        passengers: 3,
        luggage: "2-3 suitcases",
        priceFrom: "$120",
        image: "/fleet/luxury-sedan-flagship.jpg",
        imageAlt: "Flagship Luxury Sedan — Mercedes S-Class or BMW 7 Series",
        href: "/fleet/luxury-sedan-flagship",
        featured: true,
      },
    ],
    // Additional categories follow the same vehicle schema above
    ctaLabel: "Book Now",
    sectionBackground: "#F8FAFC",  // White background for fleet section (light contrast)
  },

  // ─── TESTIMONIALS ──────────────────────────────────────────────────
  testimonials: {
    items: [
      {
        id: "t1",
        name: "Sarah M.",
        role: "Corporate Executive",
        avatar: "/testimonials/sarah.jpg",
        rating: 5,
        text: "Absolutely impeccable service. The driver was on time, the car was immaculate, and the experience was first class all the way. My go-to for all business travel in Canada.",
        service: "Corporate Travel",
        date: "2025-03-15",
        verified: true,
        platform: "Google",
      },
      {
        id: "t2",
        name: "James T.",
        role: "Frequent Traveler",
        avatar: "/testimonials/james.jpg",
        rating: 5,
        text: "Best airport transfer I've ever had. The driver tracked my flight, was waiting at arrivals with a name sign, and helped with all my luggage. Will never book another service.",
        service: "Airport Transfer",
        date: "2025-02-28",
        verified: true,
        platform: "Google",
      },
      {
        id: "t3",
        name: "Emily R.",
        role: "Wedding Planner",
        avatar: "/testimonials/emily.jpg",
        rating: 5,
        text: "Used Luxy Rides for our wedding day transport. Flawless from start to finish. The vehicles were stunning and the drivers were professional and discreet.",
        service: "Special Occasions",
        date: "2025-01-20",
        verified: true,
        platform: "Facebook",
      },
    ],
  },

  // ─── ABOUT PAGE ────────────────────────────────────────────────────
  about: {
    page: {
      title: "Who We Are",
      subtitle: "Our Story",
      description: "Built on a belief that every journey should be as seamless as the destination. Since 2015, we've served executives, travelers, and celebrants across Canada.",
    },
    story: {
      headline: "Canada's Most Trusted Chauffeur Service",
      body: "Luxy Rides was founded with a singular commitment: to redefine what premium transportation means in Canada. We combine the precision of a corporate service with the warmth of a personal concierge.",
      image: "/about/chauffeur-team.jpg",
      imageAlt: "Luxy Rides professional chauffeur team",
    },
    values: [
      { icon: "Clock",       title: "Always On Time",       description: "We track flights, monitor traffic, and plan ahead — because your time is the most precious resource." },
      { icon: "Shield",      title: "Safety First",         description: "All vehicles fully insured. Drivers background-checked, licensed, and professionally trained." },
      { icon: "Star",        title: "White-Glove Service",  description: "From a chilled bottle of water to a preferred playlist — we remember every detail." },
      { icon: "Globe",       title: "Canada-Wide Coverage", description: "Operating in every major Canadian city with a unified standard of excellence." },
    ],
    team: [
      {
        id: "ceo",
        name: "Michael Laurent",
        role: "Founder & CEO",
        bio: "Former luxury hospitality executive with 20 years in premium service delivery.",
        image: "/team/michael.jpg",
        credentials: ["Ex-Four Seasons VP Operations", "Certified Fleet Manager"],
        socials: { linkedin: "#" },
      },
      {
        id: "ops-director",
        name: "Priya Sharma",
        role: "Director of Operations",
        bio: "Oversees a network of 50+ licensed chauffeurs and real-time dispatch across all Canadian cities.",
        image: "/team/priya.jpg",
        credentials: ["PMP Certified", "10 Years Ground Transport"],
        socials: { linkedin: "#" },
      },
    ],
    certifications: [
      { name: "Fully Licensed",         logo: "/certs/licensed.svg" },
      { name: "Fully Insured",          logo: "/certs/insured.svg" },
      { name: "Transport Canada",       logo: "/certs/transport-canada.svg" },
      { name: "Professional Drivers",   logo: "/certs/professional.svg" },
      { name: "Ray-Ban Partner",        logo: "/certs/rayban.svg" },
    ],
  },

  // ─── CONTACT PAGE ──────────────────────────────────────────────────
  contact: {
    page: {
      title: "Get In Touch",
      subtitle: "Book a Ride",
      description: "Ready to experience the finest in chauffeured transportation? Contact us or book directly online.",
    },
    layout: "split-form",
    form: {
      fields: [
        { name: "fullName",      label: "Full Name",            type: "text",     required: true,  placeholder: "Your full name" },
        { name: "phone",         label: "Phone Number",         type: "tel",      required: true,  placeholder: "+1 000 000 0000" },
        { name: "email",         label: "Email Address",        type: "email",    required: true,  placeholder: "you@example.com" },
        { name: "serviceType",   label: "Service Type",         type: "select",   required: true,
          options: ["Airport Transfer", "Corporate Travel", "Special Occasion", "City Tour", "Hourly Charter", "Other"]
        },
        { name: "pickupDate",    label: "Pickup Date",          type: "date",     required: true },
        { name: "pickupTime",    label: "Pickup Time",          type: "time",     required: true },
        { name: "pickupLocation",label: "Pickup Location",      type: "text",     required: true,  placeholder: "e.g. YYZ Airport Terminal 1" },
        { name: "dropoffLocation",label: "Drop-off Location",   type: "text",     required: false, placeholder: "e.g. Downtown Toronto Marriott" },
        { name: "passengers",    label: "Number of Passengers", type: "number",   required: true,  placeholder: "1" },
        { name: "message",       label: "Special Requests",     type: "textarea", required: false, placeholder: "Child seats, preferred vehicle, special instructions..." },
      ],
      submitLabel: "Request a Quote",
      successMessage: "Thank you! One of our coordinators will confirm your booking within 30 minutes.",
      errorMessage: "Something went wrong. Please call or email us directly.",
      apiEndpoint: "/api/contact",
    },
    info: {
      showMap: false,
      showHours: true,
      showSocials: true,
      phoneCTA: {
        show: true,
        number: "+18001234567",
        label: "Call Us 24/7",
      },
    },
  },

  // ─── FOOTER ────────────────────────────────────────────────────────
  footer: {
    layout: "4-column",
    tagline: "Premium Chauffeur Rides Across Canada",
    columns: [
      {
        heading: "Services",
        links: [
          { label: "Airport Transfers",   href: "/services/airport-transfer" },
          { label: "Corporate Travel",    href: "/services/corporate-travel" },
          { label: "Special Occasions",   href: "/services/special-occasions" },
          { label: "City Tours",          href: "/services/city-tours" },
          { label: "Hourly Charter",      href: "/services/hourly-charter" },
        ],
      },
      {
        heading: "Our Fleet",
        links: [
          { label: "Economy Sedan",    href: "/fleet/economy-sedan" },
          { label: "Luxury Sedan",     href: "/fleet/luxury-sedan-executive" },
          { label: "Flagship Sedan",   href: "/fleet/luxury-sedan-flagship" },
          { label: "SUV",              href: "/fleet/suv" },
          { label: "Sprinter Van",     href: "/fleet/sprinter-van" },
          { label: "Limousine",        href: "/fleet/limousine" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About Us",         href: "/about" },
          { label: "Join Our Team",    href: "/join-team" },
          { label: "Events",           href: "/events" },
          { label: "Blog",             href: "/blog" },
          { label: "Contact",          href: "/contact" },
        ],
      },
    ],
    newsletter: {
      show: false,
    },
    bottomBar: {
      copyright: "© 2025 Luxy Rides. All rights reserved.",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Sitemap",        href: "/sitemap.xml" },
      ],
    },
  },

  // ─── GLOBAL COMPONENTS ─────────────────────────────────────────────
  globalComponents: {
    bookingCTABanner: {
      show: true,
      text: "Ready to ride in luxury? Book your chauffeur in 60 seconds.",
      cta: { label: "Book Now", href: "#booking" },
    },
    phoneFAB: {
      show: true,
      number: "+18001234567",
      label: "Call 24/7",
    },
    cookieBanner: {
      show: true,
      message: "We use cookies to improve your experience.",
      acceptLabel: "Accept",
      declineLabel: "Decline",
    },
    chatWidget: {
      show: false,
      provider: "crisp",
      widgetId: "",
    },
  },

};
```

---

## Page 1 — Home (`/`)

### Page Role
The home page is the **booking engine**. A visitor should arrive, immediately feel the premium quality of the brand, be drawn to the booking widget, and leave either having booked a ride or understanding exactly what Luxy Rides offers.

### Layout: `HERO_BOOKING_SCROLL`
Full-page sections stack vertically. The hero dominates with a full-screen background image and an embedded booking widget. Subsequent sections build trust and showcase the fleet.

---

### Section 1.1 — Top Announcement Bar

**Visual Description:**
- A thin banner above the navigation.
- Dark background with a subtle gradient shimmer.
- Text: announcement from `navigation.topBar.message`. Right side: a cyan CTA link.
- Dismissable via an `×` button.

**Animations:**
- Slides down from y: -40 on mount (delay: 0.1s).
- Dismiss: slides back up and collapses height smoothly.

**Config keys used:** `navigation.topBar`

---

### Section 1.2 — Navigation Bar

**Visual Description:**
- Positioned over the hero, fully transparent on load.
- On scroll past `navigation.scrollThreshold`, transitions to: `backdrop-blur-xl`, `bg-[background]/80`, `border-b border-[borderGlass]`.
- Left: Logo (`company.logo`) — light version on dark navbar.
- Center: Navigation links as ghost/muted text. Active page link is white. Hover: underline slides in from left in accent cyan.
- Right: Phone number (small, muted) + primary `"Book Now"` CTA button (gradient pill).
- Mobile: Hamburger → full-screen dark overlay menu with staggered link animations.

**Animations:**
- On mount: logo fades in from x: -20 (0.4s).
- Nav links: stagger fade down from y: -10 (0.08s apart).
- CTA button: scales in from 0.95 → 1 (delay 0.5s).
- Scroll transition: navbar background fades in over 300ms.
- Mobile menu: slides in from x: 100%. Links stagger in from x: 30.

**Config keys used:** `navigation`, `company.logo`, `company.phone`

---

### Section 1.3 — Hero with Booking Widget

**Visual Description:**
- Full-viewport-height section.
- **Background:** Full-bleed professional photo of a chauffeur standing beside a black luxury sedan in an upscale urban environment. A dark gradient overlay covers the left 50% heavily (`hero.overlayGradient`) so text is readable, and fades out toward the right.
- **Left column (~50%):**
  - Headline: two lines from `hero.headline`. Line 1 "Premium Chauffeur" is white; line 2 "Rides Across Canada" can be split with the last word or key phrase subtly accented.
  - Subheadline text in `textMuted`.
  - Trust pills row: three glassmorphic pill badges from `hero.trustPills` — "Licensed & Insured", "Professional Drivers", "24/7 Support" — each with a small Lucide icon.
- **Right column (~40%):**
  - Floating glassmorphic Booking Widget card (from `bookingWidget` config). Positioned absolutely or in right column. Dark frosted glass (`bookingWidget.appearance.background`), rounded-2xl, `border border-[borderGlass]`.
  - Widget header: "Book Your Ride" title + "Reserve your premium chauffeur" subtitle.
  - Tabs row: "One Way", "Round Trip", "Hourly" — active tab has solid dark background (pill style).
  - Form fields built from `bookingWidget.fields`: location autocomplete inputs (with pin icons), date picker, time picker, passenger count.
  - Submit button: full-width gradient CTA — "Get Instant Quote".
  - Below submit: three small trust icons (payment methods, free cancel, instant confirm).
- **Bottom of hero:** Logos strip from `company.mediaLogos` — "As seen in" row of partner/media brand logos in low-opacity white. Desktop horizontal row, no label.

**Animations:**
- Hero load sequence:
  1. Background image fades in (opacity 0→1, duration 0.8s).
  2. Left headline fades + slides up (y: 40→0, delay 0.2s, stagger per line 0.15s).
  3. Trust pills stagger in (y: 20→0, delay 0.6s, 0.1s apart).
  4. Booking widget slides in from right (x: 60→0, opacity 0→1, delay 0.3s).
  5. Media logos row fades in last (delay 1.0s).
- Parallax: background image moves at 0.3x scroll speed.
- Booking widget: on field focus, border glows cyan.

**Config keys used:** `hero`, `bookingWidget`, `company.mediaLogos`, `navigation.cta`

---

### Section 1.4 — Stats Bar

**Visual Description:**
- Full-width dark glass panel. Subtle top/bottom 1px gradient separator lines.
- 4 stats in a row from `company.stats`: Lucide icon (accent cyan) + large animated number + label in muted text.
- Desktop: horizontal row. Mobile: 2×2 grid.
- Vertical 1px gradient dividers between stats (fade at top and bottom).

**Animations:**
- Scroll reveal: bar slides up (y: 30→0) + fade in.
- Numbers: count-up from 0 to final value over 2s (ease-out) using `useInView` + custom counter hook.
- Icons: brief pulse/glow on count completion.

**Config keys used:** `company.stats`

---

### Section 1.5 — How It Works

**Visual Description:**
- Full dark-background section.
- **Left column (~55%):**
  - Section title: "How It **Works**" — "Works" rendered in bright accent cyan. Same typographic pattern as shown in Image 3.
  - Subheading paragraph: "Three simple steps to experience premium travel tailored to your schedule."
  - Accordion of 3 steps from `howItWorks.steps`:
    - Each row: step number (muted, e.g. "01") + bold step title + expand icon (+ / −).
    - Active/open step: expands to show full description text. Background slightly elevated. Step title highlighted in white.
    - Closed steps: title in muted color with + icon.
    - Style: dark rounded card border for each step, slight glass background.
- **Right column (~45%):**
  - Floating phone mockup image (`howItWorks.mobileAppMockup.image`) showing a "Trip Details" screen.
  - The mockup displays: pickup location, destination, date & time, vehicle preference, estimated fare, "Get Quote" button — all from `howItWorks.mobileAppMockup.sampleTrip`.
  - Behind the phone: large soft radial teal glow orb (decorative, low opacity).

**Animations:**
- Section title: scroll reveal — words fade up.
- Accordion steps: stagger in from y: 20 on scroll enter.
- Accordion open/close: `AnimatePresence` height animation + icon rotates 45°.
- Phone mockup: slides in from x: 50, fade in, slight floating bob animation on a 4s loop (y oscillation ±8px).
- Teal orb behind phone: slow pulse scale 0.95 → 1.05 on 5s loop.

**Config keys used:** `howItWorks`

---

### Section 1.6 — Our Fleet

**Visual Description:**
- **Light background section** (`fleet.sectionBackground: "#F8FAFC"`) — sharp contrast from all other dark sections. This makes the black vehicle photography pop dramatically.
- Section title: "Our **Fleet**" — "Fleet" in cyan on the light background. Subtitle: "Premium vehicles for every occasion."
- Category filter tabs: pill-style toggle row — "Sedan", "SUV", "Sprinter Van", "Limousine", "Buses". Active tab: solid dark/black background with white text. Inactive: outlined or ghost style.
- Vehicle cards grid (3 columns desktop, 2 tablet, 1 mobile):
  - Each card from `fleet.vehicles` filtered by active category.
  - **Card structure:**
    - Top: white/light image area with the vehicle photo centered on a white/grey gradient background. Tier badge in top-left corner (e.g. "Budget Friendly", "Executive Choice", "Flagship") in small dark pill.
    - Bottom: dark background panel (`#0F172A`) with:
      - Vehicle name in bold white.
      - Make/model pills: small dark rounded chips with car brand icon + model name (e.g. "⊕ Camry | Corolla").
      - Passenger count icon + luggage count icon with labels.
      - Price ("From $45") on the left + "Book Now →" cyan gradient button on the right.
  - Card `rounded-2xl`, subtle shadow, border on hover glows cyan.

**Animations:**
- Category filter: active pill slides via `layoutId` Framer Motion magic move.
- On category change: cards fade out (opacity→0, y→10) and new category cards fade in — `AnimatePresence`.
- Cards on scroll reveal: stagger in from y: 40, 0.1s apart.
- Card hover: subtle scale 1.02 + bottom panel box-shadow lifts.
- "Book Now" button hover: arrow icon translates x: 4px.

**Config keys used:** `fleet`

---

### Section 1.7 — Testimonials Strip

**Visual Description:**
- Dark background. Section heading centered.
- 3-column card grid of testimonials from `testimonials.items`.
- Each card: glassmorphic dark panel, large quote mark in muted cyan, testimonial text (clamped 3 lines on mobile, full on desktop), avatar photo, name, role, star rating row, verified badge + platform icon.

**Animations:**
- Cards stagger in from y: 40 on scroll reveal.
- Star rating: stars fill in sequentially with a 0.05s stagger on first view.
- Verified badge: pulsing green dot for `verified: true`.

**Config keys used:** `testimonials.items`

---

### Section 1.8 — CTA Banner

**Visual Description:**
- Full-width gradient section (`theme.colors.gradientCta`).
- Center-aligned: bold headline from `globalComponents.bookingCTABanner.text` + one large "Book Now" CTA button.
- Subtle dark vehicle silhouette watermark behind the text at low opacity.

**Animations:**
- Headline words animate in with spring stagger on scroll.
- Button: pulsing glow ring in accent cyan every 4 seconds.

**Config keys used:** `globalComponents.bookingCTABanner`

---

### Section 1.9 — Footer

_(See Footer specification below.)_

---

## Page 2 — Fleet (`/fleet`)

### Page Role
The fleet page is the **vehicle catalogue**. Visitors compare vehicle tiers and book the one that suits their trip.

### Layout: `FILTERED_GRID`

---

### Section 2.1 — Page Hero (Inner)

**Visual Description:**
- Compact full-width hero (~40vh).
- Dark background with soft cyan orbs. Bold hero image of premium vehicles.
- Left-aligned: eyebrow pill → large headline → description.
- Breadcrumb: `Home / Our Fleet`.

**Animations:**
- Eyebrow, heading, description stagger in on mount.
- Breadcrumb fades in from top.

---

### Section 2.2 — Fleet Filtered Grid

**Visual Description:**
- Full category filter tab bar (same as homepage fleet section).
- Full grid of all vehicles for the selected category. White section background for vehicle photography clarity.
- Expanded detail on click: modal or inline expander showing full specs, interior photo, and "Book This Vehicle" button.

**Animations:**
- Filter change: `AnimatePresence` — outgoing cards fade + scale down, incoming fade + scale up.
- Modal: slides up from bottom on mobile, scales in from center on desktop.

**Config keys used:** `fleet`

---

## Page 3 — Services (`/services`)

### Page Role
The services page communicates what Luxy Rides does for different customer types — airport traveler, corporate client, event attendee.

### Layout: `EDITORIAL_SERVICES`

---

### Section 3.1 — Page Hero (Inner)

Same compact inner hero pattern. Background: dark with subtle vehicle photography.

---

### Section 3.2 — Services Bento Grid

**Visual Description:**
- Bento grid of `services.items`. Featured items (3) get large slots.
- Each card: full-bleed service photography with dark overlay, service icon in top corner, service name, short description, price, and "Book Now" CTA.

**Animations:**
- Cards stagger in on scroll.
- Hover: image zooms subtly (1.04×) + CTA button reveals with slide-up animation.

---

### Section 3.3 — How It Works

Same `howItWorks` section as homepage (reusable component).

---

### Section 3.4 — CTA Banner

Same CTA banner component as homepage.

---

## Page 4 — About (`/about`)

### Page Role
Builds trust and credibility. Visitors — corporate travel managers, event planners — want to know the team and values behind the service.

### Layout: `EDITORIAL_LONG_FORM`

---

### Section 4.1 — Page Hero (Inner)

Compact hero with `about.page` content. Background: dark-tinted blurred team or vehicle photo.

---

### Section 4.2 — Our Story

**Visual Description:**
- Two-column: left — headline + body from `about.story`. Right — photo with gradient frame.
- Pull quote in large italic gradient text breaking the flow.
- Founded year badge: "EST. 2015" decorative circle at column intersection.

**Animations:**
- Headline: words reveal with upward wipe stagger.
- Image: fades in from right.
- Pull quote: slides in from left with micro-bounce.

---

### Section 4.3 — Values Grid

**Visual Description:**
- 2×2 grid from `about.values`. Each card: glassmorphic dark panel, Lucide icon in cyan, bold title, description.

**Animations:**
- Z-pattern stagger. Icon hover: brief scale pulse.

---

### Section 4.4 — Meet The Team

**Visual Description:**
- Team cards from `about.team`. Desktop row; Swiper carousel on mobile.
- Each card: portrait photo + name, role, credentials as pills, social links.
- Hover: image scales 1.04×, "Contact" button reveals from below.

---

### Section 4.5 — Certifications & Partners

**Visual Description:**
- Dark glassmorphic banner. Heading: "Trusted by Industry. Certified for Excellence."
- Two auto-scrolling marquee rows of `about.certifications` logos. Row 1 moves left, row 2 moves right.

---

## Page 5 — Contact (`/contact`)

### Page Role
Lead capture and booking inquiry destination. Zero friction, clear CTA.

### Layout: `SPLIT_FORM`

---

### Section 5.1 — Page Hero (Inner)

Compact hero with `contact.page` content. Right side: glassmorphic card "We confirm within 30 minutes" + phone CTA.

---

### Section 5.2 — Contact Split Layout

**Visual Description:**
- Two columns at 55% / 45%.

**Left Column — Booking Inquiry Form:**
- Heading: "Request a Quote".
- Form fields from `contact.form.fields` — dark glass input style, cyan glow on focus.
- Submit button: full-width gradient — "Request a Quote".
- Below: "We confirm within 30 minutes. Your info is never shared."
- Success state: form replaced by confirmation card with checkmark.

**Right Column — Info Panel:**
- Glassmorphic card. Phone number as large tapable link. Hours. Social links row.
- "Need immediate assistance? Call us 24/7" card with pulsing cyan border.

**Animations:**
- Form fields stagger in from y: 20 (0.07s apart).
- Input focus: border glow spreads 0→6px in accent cyan.
- Submit hover: arrow icon translates x: 4px.
- Emergency card: pulsing cyan border shadow, 2s loop.

**Config keys used:** `contact`, `company`

---

### Section 5.3 — Footer

---

## Shared Footer (All Pages)

**Visual Description:**
- Dark surface (`#111827`), top: 1px gradient separator.
- 4-column layout: Column 1 — Logo + tagline + social icons. Columns 2–4 — link columns from `footer.columns`.
- Bottom bar: copyright left, legal links right.
- Subtle background: micro dot-grid at 3% opacity.

**Animations:**
- Footer reveals with y: 30→0 fade as it enters viewport.
- Social icons: stagger + hover scale 1.2 + cyan glow.
- Bottom links: underline slides in from left on hover.

**Config keys used:** `footer`, `company.socialLinks`, `company`

---

## Global Component Specs

### Booking Widget (Reusable)
- Dark frosted glass card (`bookingWidget.appearance`).
- Tab-based interface (One Way / Round Trip / Hourly).
- Location autocomplete with pin icon.
- Date & time pickers: dark-themed native or custom.
- Passenger counter: +/− stepper.
- Gradient submit button spanning full width.
- Trust row below submit (payment icons, cancellation, confirmation).
- Used on: homepage hero, fleet pages ("Book This Vehicle" modal), contact page.

### Phone FAB (Global)
- Fixed bottom-right, circular dark button with phone icon.
- Hover: expands to pill "Call 24/7".
- Controlled by `globalComponents.phoneFAB`.
- On mount: spring bounce in from y: 80 (delay: 2s).
- Every 10s: brief attention pulse.

### Scroll Progress Bar
- Thin 2px gradient line at top of viewport (fixed). Tracks reading progress.
- Color: `gradientCta` (blue → cyan).

### Toast Notifications
- Bottom-right glassmorphic pill — success (green border), error (red border).
- Auto-dismiss after 4 seconds.

### Page Transition
- `AnimatePresence` in `app/layout.tsx`.
- `fade-slide`: exit opacity 1→0, y 0→−20; enter opacity 0→1, y 20→0.

### Glassmorphic Card Pattern
```
bg-[surface]/70
backdrop-blur-xl
border border-[borderGlass]
rounded-2xl
shadow-[0_8px_32px_rgba(0,0,0,0.5)]
```

---

## TypeScript Interfaces

All interfaces defined in `src/types/index.ts`:

```typescript
// Navigation
interface NavLink {
  label: string;
  href: string;
  pageKey: string;
}

// Fleet Vehicle
interface FleetVehicle {
  id: string;
  category: string;
  tier: string;
  name: string;
  makes: string[];
  makeIcons: string[];
  passengers: number;
  luggage: string;
  priceFrom: string;
  image: string;
  imageAlt: string;
  href: string;
  featured: boolean;
}

// Fleet Category
interface FleetCategory {
  id: string;
  label: string;
}

// Service Item
interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  price: string;
  badge: string | null;
  image: string;
  featured: boolean;
  href: string;
  color: string;
}

// How It Works Step
interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

// Booking Widget Field
interface BookingField {
  name: string;
  label: string;
  type: "text" | "select" | "date" | "time" | "number" | "location-autocomplete";
  required: boolean;
  placeholder?: string;
  options?: string[];
  min?: number;
  max?: number;
}

// Testimonial
interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  verified: boolean;
  platform: string;
}

// Stat
interface Stat {
  label: string;
  value: string;
  icon: string;
}

// Social Link
interface SocialLink {
  platform: "instagram" | "facebook" | "twitter" | "linkedin";
  url: string;
  icon: string;
}

// Form Field
interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "date" | "time" | "number" | "textarea";
  required: boolean;
  placeholder: string;
  options?: string[];
}

// Footer Column
interface FooterColumn {
  heading: string;
  links: Array<{ label: string; href: string }>;
}

// Team Member
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  credentials: string[];
  socials: { linkedin?: string; instagram?: string };
}

// Value
interface Value {
  icon: string;
  title: string;
  description: string;
}

// Certification
interface Certification {
  name: string;
  logo: string;
}

// Trust Pill
interface TrustPill {
  icon: string;
  label: string;
}
```

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| `sm` (640px)  | 1-column layout, stacked hero (text above, widget below), fleet cards single column, phone FAB prominent |
| `md` (768px)  | 2-column fleet grid, How It Works stacked (accordion above, phone mockup below) |
| `lg` (1024px) | 3-column fleet grid, hero split layout + side widget activates, How It Works side-by-side |
| `xl` (1280px) | Max content width, full bento complexity |
| `2xl` (1536px)| Font sizes scale via clamp |

All breakpoints via Tailwind classes — no hardcoded pixel checks in component logic.

---

## SEO Implementation Notes

Every page renders from `meta` and relevant page config:
1. `<title>` — `{page.title} | {meta.siteName}`
2. `<meta name="description">` — from page description
3. `<meta property="og:...">` — full Open Graph set
4. `<meta name="twitter:...">` — Twitter Card set
5. JSON-LD blocks:
   - Homepage: `LocalBusiness` schema
   - Fleet: `Product` schema per vehicle
   - Services: `Service` schema per item
   - Testimonials: `Review` schema

All JSON-LD generated server-side via Next.js `<Script type="application/ld+json">`.

---

## Agent Implementation Instructions

1. **Read `constants/index.ts` first.** All component props must trace back to this file. No magic strings.
2. **Build components atomically.** Atoms → Molecules → Organisms → Templates → Pages.
3. **Use `motion.div` (Framer Motion) for all animated elements.** Group scroll-reveal elements inside `motion.section` with `variants` + `staggerChildren`.
4. **Respect `animations.enabled` globally.** Wrap all motion calls in a check.
5. **Respect `prefers-reduced-motion`.** Use `useReducedMotion()` hook.
6. **Forms:** Use `React Hook Form + Zod`. Schema derives field types from form field configs.
7. **Images:** Always use `next/image` with `width`/`height` from config or `fill` with wrapper. Prioritize real premium vehicle photography throughout.
8. **Fonts:** Load via `next/font`. Names from `theme.fonts`.
9. **CSS Variables:** Inject all `theme.colors` as CSS custom properties at app root.
10. **Fleet section:** The fleet section uses a **white/light background** (`#F8FAFC`) unlike the rest of the dark site — this is intentional for vehicle photography contrast. Toggle via `fleet.sectionBackground`.
11. **Booking Widget:** The widget is the centerpiece conversion tool. It must be pixel-perfect, performant, and accessible. Location inputs should integrate with Google Places Autocomplete or a stub for now. Date/time pickers must be mobile-friendly.
12. **How It Works accordion:** Active step must be visually distinct (elevated background, white title). Closed steps are muted. Step numbers ("01", "02", "03") are displayed in large muted text on the left of each row.
13. **Fleet vehicle cards:** The split card design (white/light top with vehicle photo + dark bottom with specs) must be maintained across all vehicle categories. The tier badge (e.g. "Budget Friendly", "Executive Choice", "Flagship") appears as a small pill in the top-left corner of the image area.
14. **When the backend is ready:** Replace the entire `SITE_CONFIG` object with the API response. Components need zero changes — they consume the same shape.

---

## Deployment Checklist

Before deploying:

- [ ] Update `meta.siteUrl` in constants
- [ ] Update `meta.siteName` and all meta fields
- [ ] Update `company.*` with real information
- [ ] Update `theme.colors` to match final brand palette
- [ ] Replace all images in `/public/assets/` (hero, fleet, team, services)
- [ ] Update `next.config.ts` with new image domains
- [ ] Generate new OG image
- [ ] Update favicon
- [ ] Configure Google Places Autocomplete API key
- [ ] Test booking widget form submission
- [ ] Verify all fleet category filters work
- [ ] Test How It Works accordion on mobile
- [ ] Verify sitemap and robots.txt generation
- [ ] Test mobile responsiveness (especially booking widget stacking)
- [ ] Verify page speed optimization (image lazy loading, font preloading)
- [ ] Check accessibility (ARIA labels on form fields, keyboard navigation)

---

*Document Version: 2.0*
*Last Updated: 2026-06-09*
*Template Version: luxy-rides v1.0*
