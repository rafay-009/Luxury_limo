export interface NavLink {
  label: string;
  href: string;
  pageKey: string;
}

export interface SocialLink {
  platform: "instagram" | "facebook" | "twitter" | "linkedin";
  url: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface TrustPill {
  icon: string;
  label: string;
}

export interface BookingField {
  name: string;
  label: string;
  type: "text" | "select" | "date" | "time" | "number" | "location-autocomplete";
  required: boolean;
  placeholder?: string;
  options?: string[];
  min?: number;
  max?: number;
}

export interface BookingTab {
  id: string;
  label: string;
  icon: string;
}

export interface FleetVehicle {
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

export interface FleetCategory {
  id: string;
  label: string;
}

export interface ServiceItem {
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

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  verified: boolean;
  platform: "Google" | "Trustpilot";
  ridesCompleted?: number;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "date" | "time" | "number" | "textarea";
  required: boolean;
  placeholder: string;
  options?: string[];
}

export interface FooterColumn {
  heading: string;
  links: Array<{ label: string; href: string }>;
}

export interface TeamMember {
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

export interface Value {
  icon: string;
  title: string;
  description: string;
}

export interface Certification {
  name: string;
  logo: string;
}
