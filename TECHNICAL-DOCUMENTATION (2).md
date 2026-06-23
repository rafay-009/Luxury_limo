# Luxy Rides — Technical Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Philosophy](#architecture-philosophy)
4. [Folder Structure](#folder-structure)
5. [The Central Configuration Hub](#the-central-configuration-hub)
6. [Component Architecture](#component-architecture)
7. [Page Organization](#page-organization)
8. [Theming System](#theming-system)
9. [Animation System](#animation-system)
10. [SEO & Metadata](#seo--metadata)
11. [Creating a New Domain](#creating-a-new-domain)
12. [Customization Guide](#customization-guide)

---

## Project Overview

The **Luxy Rides** website is a **Next.js 16** application built with the App Router architecture. It serves as a comprehensive, template-ready premium chauffeur service website featuring:

- **Homepage** with hero section + inline booking widget, stats bar, how-it-works, fleet preview, and testimonials
- **Fleet catalog** with dynamic category filtering and individual vehicle pages
- **Services page** with bento grid and how-it-works integration
- **About page** with team, values, and certifications
- **Contact page** with booking inquiry form
- **Dark-first theme** (no toggle by default — luxury dark aesthetic)
- **Responsive design** for all devices
- **SEO optimization** with sitemap, robots.txt, JSON-LD structured data
- **Accessibility features** including ARIA labels and reduced motion support

This codebase is designed as a **reusable template architecture** where a new chauffeur or luxury transportation website can be created by primarily modifying a single configuration file.

---

## Technology Stack

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.2.2 | React framework with App Router |
| **React** | 19.2.4 | UI library |
| **TypeScript** | 5 | Type safety |

### Styling & Theming

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 4 | Utility-first CSS framework |
| **CSS Custom Properties** | — | Dynamic theming via CSS variables |
| **Framer Motion** | 12.38.0 | Animation library |

### UI Components & Icons

| Technology | Version | Purpose |
|------------|---------|---------|
| **Lucide React** | Latest | Icon library |
| **Radix UI** | Latest | Accessible UI primitives (Dialog, Accordion, Select, Tabs, etc.) |
| **Class Variance Authority (CVA)** | Latest | Component variant management |
| **clsx + tailwind-merge** | Latest | Conditional className utilities |

### Forms & Validation

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Hook Form** | 7.72.1 | Form state management |
| **Zod** | 4.3.6 | Schema validation |

### Data Fetching

| Technology | Version | Purpose |
|------------|---------|---------|
| **SWR** | 2.4.1 | Data fetching (optional) |
| **TanStack React Query** | 5.96.2 | Async state management (optional) |

### Maps & Location

| Technology | Version | Purpose |
|------------|---------|---------|
| **Google Places Autocomplete** | Latest | Pickup/drop-off location input in booking widget |

### SEO

| Technology | Version | Purpose |
|------------|---------|---------|
| **next-seo** | 7.2.0 | SEO meta tags management |

### Other

| Technology | Version | Purpose |
|------------|---------|---------|
| **Swiper** | 12.1.3 | Carousel / mobile team section |
| **ESLint** | 9 | Code linting |

---

## Architecture Philosophy

This project follows a **Configuration-Driven Architecture** pattern. The fundamental principle is:

> **All content, styling, and business logic should be data, not code.**

### Key Principles

1. **Single Source of Truth**: Every piece of content (text, images, colors, links, fleet data, booking widget config) lives in `src/constants/index.ts`

2. **Component Reusability**: Components are written to be data-agnostic — they receive data as props or read from configuration

3. **Separation of Concerns**:
   - `constants/index.ts` → Content & Configuration
   - `components/` → Presentation Logic
   - `lib/` → Utilities & Animations
   - `types/` → TypeScript interfaces

4. **Easy Domain Replication**: Creating a new chauffeur / luxury transport website requires minimal code changes — primarily updating the configuration file

5. **Type Safety**: Full TypeScript coverage ensures configuration data is validated at compile time

---

## Folder Structure

```
luxy-rides/
├── public/                          # Static assets served directly
│   ├── assets/
│   │   └── images/                  # Local images (logos, icons, etc.)
│   ├── fleet/                       # Vehicle photography
│   │   ├── economy-sedan.jpg
│   │   ├── luxury-sedan-exec.jpg
│   │   ├── luxury-sedan-flagship.jpg
│   │   └── ...
│   ├── services/                    # Service photography
│   ├── team/                        # Team portraits
│   ├── testimonials/                # Client avatars
│   ├── mockups/                     # App UI mockup images
│   ├── media/                       # Partner/media brand logos
│   ├── certs/                       # Certification logos
│   ├── og-image.jpg                 # Open Graph image
│   └── favicon.ico
│
├── src/
│   ├── app/                         # Next.js App Router (Pages)
│   │   ├── about/
│   │   │   └── page.tsx             # About page
│   │   ├── contact/
│   │   │   └── page.tsx             # Contact / booking inquiry page
│   │   ├── fleet/
│   │   │   ├── page.tsx             # Fleet listing page (filtered grid)
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Dynamic individual vehicle page
│   │   ├── services/
│   │   │   ├── page.tsx             # Services listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Dynamic service detail pages
│   │   ├── events/
│   │   │   └── page.tsx             # Events page
│   │   ├── join-team/
│   │   │   └── page.tsx             # Driver / staff recruitment page
│   │   ├── calendar-fare/
│   │   │   └── page.tsx             # Fare calendar page
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts         # Contact / quote form API endpoint
│   │   ├── favicon.ico
│   │   ├── globals.css              # Global styles & CSS variables
│   │   ├── layout.tsx               # Root layout (metadata, providers, top bar)
│   │   ├── page.tsx                 # Homepage
│   │   ├── robots.ts                # robots.txt generation
│   │   └── sitemap.ts               # Sitemap generation
│   │
│   ├── components/                  # React components
│   │   ├── layout/                  # Structural components
│   │   │   ├── AnnouncementBar.tsx  # Top promo/announcement strip
│   │   │   ├── Footer.tsx           # Site footer with columns
│   │   │   ├── Navbar.tsx           # Navigation header (transparent → frosted on scroll)
│   │   │   └── PageTransition.tsx   # Route transition animations
│   │   │
│   │   ├── providers/               # React Context providers
│   │   │   └── ThemeProvider.tsx    # Dark theme context (no toggle in this build)
│   │   │
│   │   ├── sections/                # Page-specific section components
│   │   │   ├── HeroSection.tsx      # Homepage hero with full-bleed image + booking widget
│   │   │   ├── BookingWidget.tsx    # Inline/floating booking form (tabs + fields + CTA)
│   │   │   ├── StatsBar.tsx         # Animated count-up stats strip
│   │   │   ├── HowItWorks.tsx       # 3-step accordion + phone mockup layout
│   │   │   ├── FleetGrid.tsx        # Filtered vehicle card grid (category tabs)
│   │   │   ├── FleetCard.tsx        # Individual vehicle card (split light/dark design)
│   │   │   ├── ServicesTeaser.tsx   # Featured services preview cards
│   │   │   ├── ServicesBentoGrid.tsx # Full services bento grid
│   │   │   ├── TestimonialsStrip.tsx # 3-column testimonial card grid
│   │   │   ├── CTABanner.tsx        # Gradient call-to-action section
│   │   │   ├── OurStory.tsx         # About page story section
│   │   │   ├── ValuesGrid.tsx       # Core values display (2×2 grid)
│   │   │   ├── TeamSection.tsx      # Team member cards / Swiper carousel
│   │   │   ├── CertificationsMarquee.tsx # Scrolling certifications/partners strip
│   │   │   ├── ContactForm.tsx      # Booking inquiry form + info panel
│   │   │   └── PageHero.tsx         # Generic compact inner page header
│   │   │
│   │   └── ui/                      # Reusable UI primitives
│   │       ├── CookieBanner.tsx     # Cookie consent banner
│   │       ├── PhoneFAB.tsx         # Fixed floating phone call button
│   │       ├── Icons.tsx            # Custom SVG icon components
│   │       ├── ScrollProgressBar.tsx # Reading progress bar
│   │       ├── VehicleMakeChip.tsx  # Make/model pill chip (used in fleet cards)
│   │       └── TrustPill.tsx        # Trust badge pill (hero section)
│   │
│   ├── constants/                   # Configuration & content
│   │   └── index.ts                 # CENTRAL CONFIGURATION HUB
│   │
│   ├── lib/                         # Utilities & helpers
│   │   ├── animations.ts            # Framer Motion variants
│   │   └── utils.ts                 # Utility functions (cn, parseCountTarget, generateJsonLd)
│   │
│   └── types/                       # TypeScript type definitions
│       └── index.ts                 # Shared interfaces
│
├── .gitignore
├── AGENTS.md                        # AI agent instructions
├── CLAUDE.md                        # Claude AI context
├── eslint.config.mjs                # ESLint configuration
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies
├── postcss.config.mjs               # PostCSS configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project readme
```

---

## The Central Configuration Hub

The `src/constants/index.ts` file is the **single source of truth** for the entire application. It contains all content, configuration, and business data structured into logical sections.

### Configuration Structure

```typescript
export const SITE_CONFIG = {

  // 1. META & SEO
  meta: {
    siteName: string,
    siteUrl: string,
    defaultTitle: string,
    defaultDescription: string,
    defaultOgImage: string,
    favicon: string,
    locale: string,
    twitterHandle: string,
    themeColor: string,
    googleVerification: string,
    structuredData: {
      type: string,        // "LocalBusiness"
      priceRange: string,  // "$$$"
      servesCuisine: null,
    },
  },

  // 2. COMPANY IDENTITY
  company: {
    name: string,
    tagline: string,
    description: string,
    logo: { light, dark, width, height },
    founded: string,
    location: string,
    address: string,
    mapEmbedUrl: string,
    phone: string,
    email: string,
    hours: Array<{ days, time }>,
    socialLinks: Array<{ platform, url, icon }>,
    stats: Array<{ label, value, icon }>,
    trustBadges: string[],
    mediaLogos: Array<{ name, logo }>,
  },

  // 3. THEME
  theme: {
    defaultMode: "dark",
    allowToggle: boolean,
    colors: {
      background: string,
      surface: string,
      surfaceLight: string,
      primary: string,
      primaryLight: string,
      accent: string,          // Bright cyan — #22D3EE
      accentGlow: string,
      whiteBg: string,         // Used for fleet section light background
      textPrimary: string,
      textDark: string,
      textMuted: string,
      borderGlass: string,
      borderDark: string,
      gradientCta: string,
      gradientHero: string,
      success: string,
      error: string,
      bookingWidgetBg: string,
    },
    fonts: { heading, body, mono },
    radii: { card, button, pill },
    blur: { glass, heavy },
  },

  // 4. ANIMATIONS
  animations: {
    enabled: boolean,
    reducedMotionRespect: boolean,
    pageTransition: string,
    scrollReveal: { enabled, defaultDelay, staggerChildren, duration, yOffset },
    cursor: { custom, color, magneticElements },
  },

  // 5. NAVIGATION
  navigation: {
    sticky: boolean,
    transparent: boolean,
    scrollThreshold: number,
    links: Array<{ label, href, pageKey }>,
    cta: { label, href, variant },
    topBar: { show, message, cta: { label, href } },
  },

  // 6. HERO
  hero: {
    layout: string,               // "split-with-booking-widget"
    badge: { show: false },
    headline: { line1, line2, highlightWord },
    subheadline: string,
    backgroundImage: { src, alt },
    overlayGradient: string,
    trustPills: Array<{ icon, label }>,
    scrollIndicator: boolean,
  },

  // 7. BOOKING WIDGET
  bookingWidget: {
    title: string,
    subtitle: string,
    tabs: Array<{ id, label, icon }>,
    fields: Array<BookingField>,
    submitLabel: string,
    appearance: {
      position: string,
      width: string,
      background: string,
      backdropBlur: string,
      borderColor: string,
    },
    paymentNote: string,
    freeCancel: string,
    instantConfirm: string,
  },

  // 8. SERVICES
  services: {
    page: { title, subtitle, description },
    items: Array<ServiceItem>,
  },

  // 9. HOW IT WORKS
  howItWorks: {
    heading: string,
    highlightWord: string,
    subheading: string,
    steps: Array<HowItWorksStep>,
    mobileAppMockup: {
      show: boolean,
      image: string,
      alt: string,
      sampleTrip: {
        pickup, destination, dateTime, vehicle, estimatedFare, fareNote, ctaLabel,
      },
    },
    layout: string,               // "accordion-with-mockup"
  },

  // 10. FLEET
  fleet: {
    page: { title, highlightWord, subtitle },
    categories: Array<{ id, label }>,
    vehicles: Array<FleetVehicle>,
    ctaLabel: string,
    sectionBackground: string,   // "#F8FAFC" — light bg for vehicle photos
  },

  // 11. TESTIMONIALS
  testimonials: {
    items: Array<Testimonial>,
  },

  // 12. ABOUT
  about: {
    page: { title, subtitle, description },
    story: { headline, body, image, imageAlt },
    values: Array<Value>,
    team: Array<TeamMember>,
    certifications: Array<Certification>,
  },

  // 13. CONTACT
  contact: {
    page: { title, subtitle, description },
    layout: string,
    form: {
      fields: Array<FormField>,
      submitLabel: string,
      successMessage: string,
      errorMessage: string,
      apiEndpoint: string,
    },
    info: { showMap, showHours, showSocials, phoneCTA },
  },

  // 14. FOOTER
  footer: {
    layout: string,
    tagline: string,
    columns: Array<{ heading, links: Array<{ label, href }> }>,
    newsletter: { show: boolean },
    bottomBar: {
      copyright: string,
      links: Array<{ label, href }>,
    },
  },

  // 15. GLOBAL COMPONENTS
  globalComponents: {
    bookingCTABanner: { show, text, cta },
    phoneFAB: { show, number, label },
    cookieBanner: { show, message, acceptLabel, declineLabel },
    chatWidget: { show, provider, widgetId },
  },

};
```

### Exported Helper Functions

The constants file also exports utility functions for consistent styling:

```typescript
// Export theme and colors directly
export const theme = SITE_CONFIG.theme;
export const colors = theme.colors;

// Generate gradient strings
export function getGradient(type: "hero" | "cta" | "primary" | "accent"): string

// Generate placeholder gradients with intensity
export function getPlaceholderGradient(intensity: "light" | "medium" | "dark"): string

// Get specific theme color by key
export function getThemeColor(colorKey: keyof typeof colors): string

// Generate rgba colors with alpha from hex
export function getAccentWithAlpha(alpha: number): string
export function getPrimaryWithAlpha(alpha: number): string

// Generate box-shadow glow effects
export function getGlowEffect(type: "primary" | "accent" | "soft"): string
```

### Why This Architecture?

1. **Easy Updates**: Non-technical staff can update content without touching code
2. **Consistency**: All pages use the same data structure, ensuring consistency
3. **Type Safety**: TypeScript validates the configuration at compile time
4. **No Duplication**: Content defined once, used everywhere
5. **Theme Switching**: Change brand palette by updating one object
6. **New Domain Creation**: Copy file, update values, done

---

## Component Architecture

### Directory Organization

```
components/
├── layout/          # Site-wide structural components
├── providers/       # React Context providers
├── sections/        # Page-specific section components
└── ui/              # Reusable UI primitives
```

### Component Categories

#### Layout Components

| Component | File | Purpose |
|-----------|------|---------|
| **AnnouncementBar** | `layout/AnnouncementBar.tsx` | Dismissable top promo bar driven by `navigation.topBar` config |
| **Navbar** | `layout/Navbar.tsx` | Transparent-to-frosted scroll navbar, desktop links, mobile hamburger, "Book Now" CTA |
| **Footer** | `layout/Footer.tsx` | 4-column footer with links, social icons, copyright bar |
| **PageTransition** | `layout/PageTransition.tsx` | Framer Motion `AnimatePresence` wrapper for route transitions |

#### UI Components (Primitives)

| Component | File | Purpose |
|-----------|------|---------|
| **ScrollProgressBar** | `ui/ScrollProgressBar.tsx` | Cyan gradient reading progress indicator at top of viewport |
| **Icons** | `ui/Icons.tsx` | Custom SVG icons (social platforms, car brand logos) |
| **PhoneFAB** | `ui/PhoneFAB.tsx` | Fixed floating phone call button (bottom-right), expands to pill on hover |
| **CookieBanner** | `ui/CookieBanner.tsx` | GDPR-compliant cookie consent |
| **VehicleMakeChip** | `ui/VehicleMakeChip.tsx` | Small dark pill showing car brand icon + model name, used in fleet cards |
| **TrustPill** | `ui/TrustPill.tsx` | Glassmorphic pill badge with icon + label, used in hero trust row |

#### Section Components

Section components are page-specific and render major page sections. They:

1. Import all data from `constants/index.ts`
2. Use Framer Motion for animations
3. Follow consistent patterns for responsiveness
4. Include proper ARIA labels for accessibility

| Component | Page(s) | Description |
|-----------|---------|-------------|
| **HeroSection** | Homepage | Full-bleed background image, dark gradient overlay, headline, trust pills, inline BookingWidget |
| **BookingWidget** | Homepage hero, fleet modal, contact | Tabbed booking form (One Way / Round Trip / Hourly), location autocomplete, date/time/passengers, gradient CTA |
| **StatsBar** | Homepage | Animated count-up stats strip with icon + number + label |
| **HowItWorks** | Homepage, /services | Left: numbered accordion steps; Right: floating phone mockup with sample trip details |
| **FleetGrid** | Homepage (preview), /fleet | Category-filtered grid of FleetCards. Active tab uses Framer Motion `layoutId` magic move |
| **FleetCard** | /fleet, Homepage | Split card — light top (vehicle photo + tier badge) + dark bottom (name, make chips, passengers, price, book CTA) |
| **ServicesTeaser** | Homepage | Featured service cards preview |
| **ServicesBentoGrid** | /services | Full bento grid of all service items |
| **TestimonialsStrip** | Homepage | 3-column glassmorphic testimonial cards with stars, verified badge |
| **CTABanner** | All pages | Full-width gradient banner with headline + "Book Now" button |
| **PageHero** | All inner pages | Compact ~40vh hero with breadcrumb, eyebrow, headline, description |
| **OurStory** | /about | Two-column story layout with photo, pull quote, founded badge |
| **ValuesGrid** | /about | 2×2 glassmorphic value cards |
| **TeamSection** | /about | Team cards (desktop row, Swiper coverflow on mobile) |
| **CertificationsMarquee** | /about | Dual-row auto-scrolling certification logos strip |
| **ContactForm** | /contact | 55/45 split: left booking inquiry form + right info/phone panel |

#### Providers

| Component | File | Purpose |
|-----------|------|---------|
| **ThemeProvider** | `providers/ThemeProvider.tsx` | Context for theme mode, injects all `theme.colors` as CSS custom properties at app root |

### Component Pattern

Section components follow a consistent pattern:

```typescript
"use client";

import { motion } from "framer-motion";
import { staggerContainerVariant, fadeUpVariant } from "@/lib/animations";
import { SITE_CONFIG, colors } from "@/constants";

export default function SectionComponent() {
  const { sectionData } = SITE_CONFIG;

  return (
    <section
      className="py-24 px-6"
      aria-label="Section name"
    >
      <motion.div
        variants={staggerContainerVariant(0.10)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section content */}
      </motion.div>
    </section>
  );
}
```

---

## Page Organization

### App Router Structure

```
app/
├── page.tsx                      # Homepage
├── about/
│   └── page.tsx                  # About page
├── contact/
│   └── page.tsx                  # Contact / booking inquiry page
├── fleet/
│   ├── page.tsx                  # Fleet listing (filtered grid)
│   └── [slug]/
│       └── page.tsx              # Dynamic individual vehicle page
├── services/
│   ├── page.tsx                  # Services listing
│   └── [slug]/
│       └── page.tsx              # Dynamic service detail
├── events/
│   └── page.tsx                  # Events page
├── join-team/
│   └── page.tsx                  # Driver recruitment page
├── calendar-fare/
│   └── page.tsx                  # Fare calendar page
├── api/
│   └── contact/
│       └── route.ts              # Contact form API handler
├── sitemap.ts                    # Sitemap generation
└── robots.ts                     # Robots.txt
```

### Page-to-Component Mapping

#### Homepage (`app/page.tsx`)

```typescript
import HeroSection from "@/components/sections/HeroSection";
// HeroSection internally renders BookingWidget
import StatsBar from "@/components/sections/StatsBar";
import HowItWorks from "@/components/sections/HowItWorks";
import FleetGrid from "@/components/sections/FleetGrid";
import TestimonialsStrip from "@/components/sections/TestimonialsStrip";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <HowItWorks />
      <FleetGrid preview={true} />
      <TestimonialsStrip />
      <CTABanner />
    </>
  );
}
```

#### Fleet Page (`app/fleet/page.tsx`)

```typescript
import PageHero from "@/components/sections/PageHero";
import FleetGrid from "@/components/sections/FleetGrid";
import CTABanner from "@/components/sections/CTABanner";

export default function FleetPage() {
  return (
    <>
      <PageHero pageKey="fleet" />
      <FleetGrid preview={false} />
      <CTABanner />
    </>
  );
}
```

#### Services Page (`app/services/page.tsx`)

```typescript
import PageHero from "@/components/sections/PageHero";
import ServicesBentoGrid from "@/components/sections/ServicesBentoGrid";
import HowItWorks from "@/components/sections/HowItWorks";
import CTABanner from "@/components/sections/CTABanner";

export default function ServicesPage() {
  return (
    <>
      <PageHero pageKey="services" />
      <ServicesBentoGrid />
      <HowItWorks />
      <CTABanner />
    </>
  );
}
```

#### About Page (`app/about/page.tsx`)

```typescript
import PageHero from "@/components/sections/PageHero";
import OurStory from "@/components/sections/OurStory";
import ValuesGrid from "@/components/sections/ValuesGrid";
import TeamSection from "@/components/sections/TeamSection";
import CertificationsMarquee from "@/components/sections/CertificationsMarquee";
import CTABanner from "@/components/sections/CTABanner";

export default function AboutPage() {
  return (
    <>
      <PageHero pageKey="about" />
      <OurStory />
      <ValuesGrid />
      <TeamSection />
      <CertificationsMarquee />
      <CTABanner />
    </>
  );
}
```

#### Contact Page (`app/contact/page.tsx`)

```typescript
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/sections/ContactForm";

export default function ContactPage() {
  return (
    <>
      <PageHero pageKey="contact" />
      <ContactForm />
    </>
  );
}
```

### Dynamic Fleet Vehicle Pages

`/fleet/[slug]/page.tsx` generates individual vehicle pages dynamically from the `fleet.vehicles` array:

```typescript
export async function generateStaticParams() {
  return SITE_CONFIG.fleet.vehicles.map((vehicle) => ({
    slug: vehicle.id,
  }));
}
```

### Dynamic Service Pages

`/services/[slug]/page.tsx` generates individual service pages from `services.items`:

```typescript
export async function generateStaticParams() {
  return SITE_CONFIG.services.items.map((service) => ({
    slug: service.id,
  }));
}
```

---

## Theming System

### How Theming Works

The theming system uses **CSS Custom Properties** (CSS Variables) combined with **React Context**. The default mode is `dark` and toggle is disabled unless `theme.allowToggle: true` is set in config.

### 1. CSS Variables (in `globals.css`)

```css
:root {
  --color-background: #0A0F1A;
  --color-surface: #111827;
  --color-surface-light: #1F2937;
  --color-primary: #0369A1;
  --color-primary-light: #0EA5E9;
  --color-accent: #22D3EE;
  --color-accent-glow: rgba(34, 211, 238, 0.18);
  --color-white-bg: #F8FAFC;
  --color-text-primary: #FFFFFF;
  --color-text-dark: #0F172A;
  --color-text-muted: #94A3B8;
  --color-border-glass: rgba(255, 255, 255, 0.10);
  --color-border-dark: rgba(255, 255, 255, 0.06);
  --color-gradient-cta: linear-gradient(90deg, #0369A1, #22D3EE);
  --color-gradient-hero: linear-gradient(135deg, #0c1929, #060D18, #0A0F1A);
  --color-booking-widget-bg: rgba(10, 15, 26, 0.92);
  /* ... more variables */
}

[data-theme="light"] {
  /* Light mode overrides — only used if theme.allowToggle: true */
  --color-background: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-text-primary: #0F172A;
  /* ... */
}
```

### 2. Theme Provider (`providers/ThemeProvider.tsx`)

```typescript
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SITE_CONFIG } from "@/constants";

interface ThemeContextType {
  mode: "light" | "dark";
  toggleMode: () => void;
  colors: typeof SITE_CONFIG.theme.colors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState<"dark" | "light">(
    SITE_CONFIG.theme.defaultMode
  );

  useEffect(() => {
    // Inject all theme.colors as CSS custom properties
    const root = document.documentElement;
    Object.entries(SITE_CONFIG.theme.colors).forEach(([key, value]) => {
      const cssVarName = `--color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      root.style.setProperty(cssVarName, value);
    });
    root.setAttribute("data-theme", mode);
  }, [mode]);

  const toggleMode = () => {
    if (!SITE_CONFIG.theme.allowToggle) return;
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, colors: SITE_CONFIG.theme.colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
```

### 3. Configuration-Driven Colors

All colors are defined in `constants/index.ts`:

```typescript
theme: {
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
    gradientCta: "linear-gradient(90deg, #0369A1, #22D3EE)",
    bookingWidgetBg: "rgba(10, 15, 26, 0.92)",
    // ... full set of tokens
  }
}
```

### Theme Color Usage in Components

```typescript
import { SITE_CONFIG, colors } from "@/constants";

// Direct Tailwind arbitrary value
<div className="bg-[#22D3EE]">...</div>

// Using exported colors object
<div className={`text-[${colors.accent}]`}>...</div>

// Helper functions
import { getGradient, getGlowEffect } from "@/constants";
<div style={{ background: getGradient("cta") }}>...</div>
<div style={{ boxShadow: getGlowEffect("accent") }}>...</div>
```

> **Important:** The fleet section uses `fleet.sectionBackground` (`#F8FAFC`) — a white/light background — which is the only section that breaks from the dark theme. This is intentional for premium vehicle photography contrast. Always apply this background via `style={{ background: SITE_CONFIG.fleet.sectionBackground }}` so it can be overridden from config.

---

## Animation System

### Animation Library

**Framer Motion** is used for all animations with reusable variants defined in `lib/animations.ts`.

### Available Animation Variants

```typescript
// lib/animations.ts

// Fade up animation (most common — used for cards, headings)
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } }
};

// Simple fade
export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

// Slide from left (used for story columns, form panels)
export const slideFromLeftVariant = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
};

// Slide from right (used for booking widget, phone mockup)
export const slideFromRightVariant = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
};

// Stagger container for lists (fleet cards, steps, testimonials)
export const staggerContainerVariant = (staggerChildren = 0.10, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren }
  }
});

// Scale animation (used for stats, badges)
export const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Spring pop (used for trust pills, chip badges)
export const springPopVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
};

// Page transition
export const pageTransitionVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

// Float bob (used for phone mockup in HowItWorks)
export const floatBobVariant = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};
```

### Animation Pattern in Components

```typescript
"use client";

import { motion } from "framer-motion";
import { staggerContainerVariant, fadeUpVariant } from "@/lib/animations";

export default function AnimatedSection() {
  const items = SITE_CONFIG.fleet.vehicles;

  return (
    <section>
      <motion.div
        variants={staggerContainerVariant(0.10)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {items.map((vehicle) => (
          <motion.div key={vehicle.id} variants={fadeUpVariant}>
            <FleetCard vehicle={vehicle} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

### Animation Configuration

Animations can be enabled/disabled via `constants/index.ts`:

```typescript
animations: {
  enabled: true,
  reducedMotionRespect: true,    // Respects prefers-reduced-motion
  pageTransition: "fade-slide",
  scrollReveal: {
    enabled: true,
    defaultDelay: 0,
    staggerChildren: 0.10,
    duration: 0.65,
    yOffset: 30,
  },
  cursor: {
    custom: false,               // No custom cursor in this build
    color: "#22D3EE",
    magneticElements: ["a", "button", ".magnetic"],
  },
}
```

### Key Animation Behaviors by Component

| Component | Animation Behavior |
|-----------|-------------------|
| **HeroSection** | Background image fades in → headline lines stagger up → trust pills spring in → BookingWidget slides from right |
| **BookingWidget** | Slides from x: 60 on mount; field focus triggers cyan border glow |
| **StatsBar** | Count-up from 0 on `useInView` trigger; icons pulse on completion |
| **HowItWorks** | Accordion open/close via `AnimatePresence` height; phone mockup slides in + continuous float bob |
| **FleetGrid** | Category filter: active pill slides via `layoutId`; category change: `AnimatePresence` fade out/in cards |
| **FleetCard** | Stagger in on scroll; hover: scale 1.02 + box-shadow lift; "Book Now" arrow translates x: 4px |
| **TestimonialsStrip** | Cards stagger in from y: 40; stars fill sequentially; verified badge pulses green |
| **CTABanner** | Headline words spring in on scroll; button cyan glow pulse every 4s |
| **PhoneFAB** | Spring bounce in from y: 80 on mount (delay 2s); expands to pill on hover |

---

## SEO & Metadata

### Metadata Configuration

All SEO data is centralized in `constants/index.ts`:

```typescript
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
}
```

### Next.js Metadata (`app/layout.tsx`)

```typescript
import { SITE_CONFIG } from "@/constants";

export const metadata = {
  title: {
    default: SITE_CONFIG.meta.defaultTitle,
    template: `%s | ${SITE_CONFIG.meta.siteName}`,
  },
  description: SITE_CONFIG.meta.defaultDescription,
  openGraph: {
    siteName: SITE_CONFIG.meta.siteName,
    url: SITE_CONFIG.meta.siteUrl,
    images: [{ url: SITE_CONFIG.meta.defaultOgImage }],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.meta.twitterHandle,
  },
};
```

### Sitemap Generation (`app/sitemap.ts`)

```typescript
import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.meta.siteUrl;

  const staticPages = ["/", "/about", "/services", "/fleet", "/contact", "/events", "/join-team", "/calendar-fare"];

  const fleetPages = SITE_CONFIG.fleet.vehicles.map((vehicle) => ({
    url: `${baseUrl}/fleet/${vehicle.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const servicePages = SITE_CONFIG.services.items.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...staticPages.slice(1).map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...fleetPages,
    ...servicePages,
  ];
}
```

### Robots Configuration (`app/robots.ts`)

```typescript
import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_CONFIG.meta.siteUrl}/sitemap.xml`,
  };
}
```

### JSON-LD Structured Data

```typescript
// lib/utils.ts
export function generateJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    ...data,
  });
}
```

JSON-LD blocks generated per page:
- **Homepage**: `LocalBusiness` schema from `meta.structuredData` + `company`
- **Fleet vehicles**: `Product` schema per vehicle
- **Services**: `Service` schema per item
- **Testimonials**: `Review` schema

---

## Creating a New Domain

### Overview

To create a new chauffeur or luxury transport website based on this template:

1. **Copy the Template**: Copy the `luxy-rides` folder and rename it
2. **Update Dependencies**: Run `npm install`
3. **Update Configuration**: Modify `src/constants/index.ts`
4. **Replace Assets**: Update images in `/public/`
5. **Add Image Domains**: Update `next.config.ts`
6. **Build & Deploy**: Run `npm run build`

### Step-by-Step Guide

#### Step 1: Copy Template

```bash
cp -r luxy-rides new-brand-name
cd new-brand-name
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Update Meta & Company

Edit `src/constants/index.ts`:

```typescript
meta: {
  siteName: "New Brand Name",
  siteUrl: "https://newbrand.com",
  defaultTitle: "New Brand — Premium Chauffeur Service",
  defaultDescription: "Your service description here.",
  twitterHandle: "@newbrand",
  themeColor: "#22D3EE",
},

company: {
  name: "New Brand Name",
  tagline: "Your tagline here",
  phone: "+1 000 000 0000",
  email: "info@newbrand.com",
  location: "Your City, Country",
},
```

#### Step 4: Update Theme Colors

```typescript
theme: {
  colors: {
    background: "#YOUR_BACKGROUND",
    surface: "#YOUR_SURFACE",
    primary: "#YOUR_PRIMARY_COLOR",
    accent: "#YOUR_ACCENT_COLOR",
    gradientCta: "linear-gradient(90deg, #YOUR_PRIMARY, #YOUR_ACCENT)",
    // ... update all tokens
  }
}
```

#### Step 5: Update Fleet Vehicles

```typescript
fleet: {
  categories: [
    { id: "sedan", label: "Sedan" },
    // ... your categories
  ],
  vehicles: [
    {
      id: "your-vehicle-id",
      category: "sedan",
      tier: "Budget Friendly",
      name: "Economy Sedan",
      makes: ["Camry | Corolla"],
      makeIcons: ["toyota"],
      passengers: 2,
      luggage: "2-3 suitcases",
      priceFrom: "$XX",
      image: "/fleet/your-vehicle.jpg",
      imageAlt: "Vehicle description",
      href: "/fleet/your-vehicle-id",
      featured: false,
    },
  ],
}
```

#### Step 6: Update Services

```typescript
services: {
  items: [
    {
      id: "new-service",
      icon: "Plane",
      title: "New Service Name",
      shortDesc: "Brief description",
      fullDesc: "Full description",
      price: "From $X",
      badge: null,
      image: "/services/new-service.jpg",
      featured: true,
      href: "/services/new-service",
      color: "#22D3EE",
    },
  ],
}
```

#### Step 7: Update Booking Widget

```typescript
bookingWidget: {
  title: "Book Your Ride",
  subtitle: "Reserve your premium chauffeur",
  tabs: [
    { id: "one-way",    label: "One Way",    icon: "ArrowRight" },
    { id: "round-trip", label: "Round Trip", icon: "Repeat2" },
    { id: "hourly",     label: "Hourly",     icon: "Clock" },
  ],
  // ... configure fields as needed
}
```

#### Step 8: Update How It Works Steps

```typescript
howItWorks: {
  steps: [
    { step: 1, title: "Your Step 1", description: "Description", icon: "MapPin" },
    { step: 2, title: "Your Step 2", description: "Description", icon: "CreditCard" },
    { step: 3, title: "Your Step 3", description: "Description", icon: "UserCheck" },
  ],
}
```

#### Step 9: Replace Images

Update all images in `/public/`:
- `/public/fleet/` — vehicle photography (white/light background for best card contrast)
- `/public/services/` — service photography
- `/public/team/` — team portraits
- `/public/mockups/trip-details-screen.png` — phone mockup screenshot
- `/public/media/` — partner/media brand logos
- `/public/og-image.jpg` — OG share image
- `/public/favicon.ico`
- Hero background image referenced in `hero.backgroundImage.src`

#### Step 10: Update Image Domains

In `next.config.ts`, add any external image domains:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "your-cdn.com",
    },
  ],
},
```

#### Step 11: Configure Google Places API

Add your Google Places API key to `.env.local` for the booking widget location autocomplete:

```
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_key_here
```

#### Step 12: Build and Test

```bash
npm run build
npm run start
```

---

## Customization Guide

### Changing Colors

All colors in `constants/index.ts` under `theme.colors`:

```typescript
colors: {
  background: "#0A0F1A",        // Main page background
  surface: "#111827",           // Card / section backgrounds
  surfaceLight: "#1F2937",      // Elevated card backgrounds
  primary: "#0369A1",           // Deep blue
  accent: "#22D3EE",            // Bright cyan — buttons, highlights, icons
  whiteBg: "#F8FAFC",           // Fleet section light background
  textPrimary: "#FFFFFF",       // Main text on dark backgrounds
  gradientCta: "linear-gradient(90deg, #0369A1, #22D3EE)",
  bookingWidgetBg: "rgba(10, 15, 26, 0.92)",
}
```

### Changing Fonts

Update font variables in `constants/index.ts`:

```typescript
fonts: {
  heading: "var(--font-outfit)",
  body: "var(--font-inter)",
  mono: "var(--font-fira-code)",
},
```

Update `globals.css` with font definitions:

```css
@theme {
  --font-outfit: "Outfit", sans-serif;
  --font-inter: "Inter", sans-serif;
}
```

### Adding Fleet Vehicles

Add to `constants/index.ts` under `fleet.vehicles`:

```typescript
{
  id: "new-vehicle-id",
  category: "suv",              // Must match a category id in fleet.categories
  tier: "Executive Choice",
  name: "Luxury SUV",
  makes: ["Escalade", "Navigator"],
  makeIcons: ["cadillac", "lincoln"],
  passengers: 6,
  luggage: "4-5 suitcases",
  priceFrom: "$150",
  image: "/fleet/luxury-suv.jpg",
  imageAlt: "Luxury SUV — Cadillac Escalade or similar",
  href: "/fleet/luxury-suv",
  featured: true,
}
```

### Adding Fleet Categories

Add to `constants/index.ts` under `fleet.categories`:

```typescript
fleet: {
  categories: [
    // ... existing categories
    { id: "electric", label: "Electric" },
  ],
}
```

### Adding Team Members

```typescript
about: {
  team: [
    // ... existing members
    {
      id: "new-member",
      name: "Full Name",
      role: "Role / Title",
      bio: "Biography text",
      image: "/team/new-member.jpg",
      credentials: ["Certification 1", "Years Experience"],
      socials: { linkedin: "#" },
    },
  ],
}
```

### Adding Services

```typescript
services: {
  items: [
    // ... existing services
    {
      id: "new-service-id",
      icon: "IconName",         // Lucide icon name
      title: "New Service",
      shortDesc: "Brief description",
      fullDesc: "Full description",
      price: "From $X",
      badge: null,
      image: "/services/new-service.jpg",
      featured: false,
      href: "/services/new-service-id",
      color: "#HEXCOLOR",
    },
  ],
}
```

### Changing Layouts

```typescript
hero: {
  layout: "split-with-booking-widget" | "centered" | "full-width",
},
fleet: {
  sectionBackground: "#F8FAFC",   // Change to dark for vehicles on dark bg
},
footer: {
  layout: "4-column" | "3-column" | "centered",
},
```

### Disabling Features

```typescript
globalComponents: {
  cookieBanner: { show: false },       // Disable cookie banner
  phoneFAB: { show: false },           // Disable floating phone button
  bookingCTABanner: { show: false },   // Disable CTA banner
},
navigation: {
  topBar: { show: false },             // Disable announcement bar
},
animations: {
  enabled: false,                      // Disable all animations globally
},
```

### Booking Widget Tab Configuration

Remove or reorder booking tabs:

```typescript
bookingWidget: {
  tabs: [
    { id: "one-way",    label: "One Way",    icon: "ArrowRight" },
    // Remove round-trip or hourly by simply omitting them
  ],
}
```

---

## TypeScript Interfaces

All TypeScript interfaces are defined in `src/types/index.ts`:

```typescript
// Navigation
interface NavLink {
  label: string;
  href: string;
  pageKey: string;
}

// Social
interface SocialLink {
  platform: "instagram" | "facebook" | "twitter" | "linkedin";
  url: string;
  icon: string;
}

// Statistics
interface Stat {
  label: string;
  value: string;
  icon: string;
}

// Trust Pill (hero section badges)
interface TrustPill {
  icon: string;
  label: string;
}

// Media Logo (hero section partner logos)
interface MediaLogo {
  name: string;
  logo: string;
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

// Booking Widget Tab
interface BookingTab {
  id: string;
  label: string;
  icon: string;
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

// Team Member
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  credentials: string[];
  socials: {
    linkedin?: string;
    instagram?: string;
  };
}

// Values
interface Value {
  icon: string;
  title: string;
  description: string;
}

// Certifications
interface Certification {
  name: string;
  logo: string;
}

// Testimonials
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

// Contact Form Field
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
```

---

## Utility Functions

### Class Name Merging (`lib/utils.ts`)

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Usage:

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base classes",
  isActive && "active classes",
  className
)}>
```

### Count Animation Helper (`lib/utils.ts`)

```typescript
export function parseCountTarget(value: string): number {
  // Extracts number from strings like "12,000+", "4.9★", "24/7"
  const match = value.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}
```

### JSON-LD Generator (`lib/utils.ts`)

```typescript
export function generateJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    ...data,
  });
}
```

---

## Best Practices

### 1. Always Import from Constants

```typescript
// BAD
const title = "Luxy Rides";

// GOOD
import { SITE_CONFIG } from "@/constants";
const title = SITE_CONFIG.company.name;
```

### 2. Use Animation Variants

```typescript
// BAD
<motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}>

// GOOD
<motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
```

### 3. Respect Reduced Motion

```typescript
import { useReducedMotion } from "framer-motion";

export default function AnimatedComponent() {
  const prefersReduced = useReducedMotion();
  // Pass prefersReduced to motion variants or skip animation entirely
}
```

### 4. Use TypeScript Types

```typescript
// Define new interfaces in src/types/index.ts
import type { FleetVehicle, ServiceItem, Testimonial } from "@/types";
```

### 5. Follow Component Patterns

```typescript
// Section components should:
// 1. Be "use client"
// 2. Use motion.div wrapper with variants from lib/animations.ts
// 3. Import all data from @/constants
// 4. Include aria-label on <section> element
// 5. Use cn() for conditional classNames
```

### 6. Fleet Section Background

```typescript
// The fleet section uses a LIGHT background — always source from config:
<section style={{ background: SITE_CONFIG.fleet.sectionBackground }}>
  {/* FleetGrid */}
</section>
// Never hardcode #F8FAFC directly in the component
```

### 7. Booking Widget Reuse

```typescript
// BookingWidget is a standalone component — reuse it in:
// - HeroSection (primary placement, floating right)
// - Fleet vehicle modal (secondary placement)
// - Contact page (optional embedded placement)
// Always pass the full bookingWidget config as a prop or import from constants
```

---

## Deployment Checklist

Before deploying a new domain:

- [ ] Update `meta.siteUrl` in constants
- [ ] Update `meta.siteName` and all meta fields
- [ ] Update `company.*` with real information (phone, email, location)
- [ ] Update `theme.colors` with brand palette
- [ ] Replace all images in `/public/` (fleet, services, team, hero, mockup)
- [ ] Update `next.config.ts` with new image domains
- [ ] Generate new OG image (`/public/og-image.jpg`)
- [ ] Update favicon
- [ ] Add `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` to environment
- [ ] Add Google Analytics / Tag Manager IDs
- [ ] Add Google Search Console verification token
- [ ] Test booking widget form submission (all 3 tab modes)
- [ ] Verify fleet category filters work correctly
- [ ] Test How It Works accordion on mobile
- [ ] Verify announcement bar dismiss works and stores in localStorage
- [ ] Verify sitemap generation includes fleet + service pages
- [ ] Check robots.txt
- [ ] Test mobile responsiveness (especially booking widget stacking below hero)
- [ ] Verify page speed (image lazy loading, font preloading, `next/image` optimization)
- [ ] Check accessibility (ARIA labels, keyboard navigation, focus states)

---

## Support & Maintenance

For updates and maintenance:

1. **Content Updates**: Edit `src/constants/index.ts` — zero code changes needed
2. **Add Fleet Vehicle**: Add entry to `fleet.vehicles`, add image to `/public/fleet/`
3. **Add Service**: Add entry to `services.items`, add image to `/public/services/`
4. **New Features**: Create component in `components/sections/`, wire to config
5. **Bug Fixes**: Use TypeScript type errors as first signal; run `npm run build` to surface issues
6. **Styling**: Use Tailwind utilities + CSS variables from `theme.colors`
7. **Booking Widget**: All field configuration lives in `bookingWidget.fields` — add/remove fields without touching the component

---

*Document Version: 2.0*
*Last Updated: 2026-06-09*
*Template Version: luxy-rides v1.0*
