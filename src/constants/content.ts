import type { StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeDollarSign,
  Building2,
  CalendarDays,
  Car,
  Clock,
  Clock3,
  Globe2,
  Handshake,
  Headphones,
  Languages,
  MapPin,
  MoveRight,
  Plane,
  Route,
  Shield,
  ShieldCheck,
  Shuffle,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  ac101Icon,
  betterLogo,
  ccpaLogo,
  cx888Icon,
  gdprLogo,
  vancouverIcon,
  ws520Icon,
} from "@/page-modules/home/assets";
import { popu1, popu2, popu3, popu4 } from "@/page-modules/newyork/assets";
import { googleLogo, trustpilotLogo } from "@/page-modules/shared/assets";

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

export const AUDIENCES = ["Individual", "Business"] as const;

export type NavDropdownItem = { label: string; href: string };

export type NavDesktopLink = {
  label: string;
  dropdown: boolean;
  href?: string;
  items?: NavDropdownItem[];
};

export const NAV_DESKTOP_LINKS: NavDesktopLink[] = [
  {
    label: "Services",
    dropdown: true,
    items: [{ label: "New York", href: "/services/newyork" }],
  },
  { label: "Top Destinations", dropdown: true },
  { label: "Events", dropdown: true },
  { label: "Calculate Fare", dropdown: false },
  { label: "Join our Fleet", dropdown: false },
];

export const FOOTER_COLUMNS = [
  {
    heading: "Services",
    links: ["Airport Transfers", "City Rides", "Corporate Travel", "Group Transport", "Event Services"],
  },
  {
    heading: "Company",
    links: ["About Us", "Careers", "Become a Driver", "Contact", "Press"],
  },
  {
    heading: "Support",
    links: ["FAQ", "Help Center", "Cancellation Policy", "Privacy Policy", "Terms of Service"],
  },
];

export const FOOTER_AGENT_COLORS = ["#d9a76d", "#dd6b6b", "#8ac6ff"];

/* -------------------------------------------------------------------------- */
/* Shared                                                                     */
/* -------------------------------------------------------------------------- */

export type ReviewFilter = "all" | "google" | "trustpilot";

export const REVIEW_TABS: { label: string; filter: ReviewFilter; icon: StaticImageData | null }[] = [
  { label: "All Reviews", filter: "all", icon: null },
  { label: "Google", filter: "google", icon: googleLogo },
  { label: "Trustpilot", filter: "trustpilot", icon: trustpilotLogo },
];

export const BOOKING_TABS = ["One Way", "Round Trip", "Hourly"] as const;

export const FAQ_ANIMATION_EASE = [0.22, 1, 0.36, 1] as const;

export type FAQItem = {
  question: string;
  answer: string;
};

/* -------------------------------------------------------------------------- */
/* Home page                                                                  */
/* -------------------------------------------------------------------------- */

export const HOME_FAQS: FAQItem[] = [
  {
    question: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint",
    answer:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
  },
  {
    question: "Dictum dolor fringilla nibh egestas morbi semper luctus facilisis",
    answer:
      "Our team confirms trip details, vehicle preference, and pickup timing before dispatch so your booking feels predictable.",
  },
  {
    question: "Donec eget faucibus varius pretium, massa nunc dui. Sed pharetra est",
    answer:
      "You can request airport transfers, hourly chauffeur service, event transportation, or custom point-to-point rides.",
  },
  {
    question: "Id feugiat diam lectus cursus leo libero urna sem platea. Urna ac lacus",
    answer:
      "Changes can be handled by contacting concierge support. We recommend sharing updates as early as possible.",
  },
  {
    question: "Id feugiat diam lectus cursus leo libero urna sem platea. Urna ac lacus",
    answer:
      "All rides are handled by vetted chauffeurs and commercially insured vehicles with service standards reviewed regularly.",
  },
  {
    question: "Exercitation veniam consequat sunt nostrud amet",
    answer:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
];

export const HERO_COUNTRIES = [
  { label: "Canada", logo: "https://flagcdn.com/w40/ca.png" },
  { label: "USA", logo: "https://flagcdn.com/w40/us.png" },
  { label: "Mexico", logo: "https://flagcdn.com/w40/mx.png" },
  { label: "United Kingdom", logo: "https://flagcdn.com/w40/gb.png" },
];

export const HERO_PROOF = [
  { label: "Google Review", logo: googleLogo },
  { label: "Trustpilot", logo: trustpilotLogo },
];

export const GLOBAL_PRESENCE_MOBILE_STATS = [
  { label: "Rides Completed", value: "1200+", icon: Car },
  { label: "Average Rating", value: "4.9/5", icon: Star },
  { label: "Daily Active Fleet", value: "180+", icon: TrendingUp },
  { label: "On-Time Arrival", value: "98.7%", icon: Clock },
  { label: "Cities Covered", value: "25", icon: MapPin },
  { label: "Support", value: "24/7", icon: Headphones },
];

export const GLOBAL_PRESENCE_DESKTOP_STATS = [
  { label: "Rides Completed", value: "1200+", icon: Car },
  { label: "Daily Active Fleet", value: "180+", icon: TrendingUp },
  { label: "Cities Covered", value: "25", icon: MapPin },
  { label: "Average Rating", value: "4.9/5", icon: Star },
  { label: "On-Time Arrival", value: "98.7%", icon: Clock },
  { label: "Support", value: "24/7", icon: Headphones },
];

export const SAFETY_TRUST_ITEMS = [
  {
    title: "Bg-Checked Chauffeurs",
    text: "Every driver undergoes thorough background verification.",
    badge: "Verified & Certified",
    icon: Shield,
  },
  {
    title: "Licensed & Insured Vehicles",
    text: "Full commercial insurance and licensing compliance.",
    badge: "Verified & Certified",
    icon: Car,
  },
  {
    title: "24/7 Support",
    text: "Round-the-clock assistance for any concern.",
    badge: "Verified & Certified",
    icon: Headphones,
  },
  {
    title: "EU Business Ready",
    text: "Fully aligned with European business regulations and cross-border operations.",
    badge: "Euro Certified",
    icon: Globe2,
  },
];

export const SAFETY_COMPLIANCE_ITEMS = [
  {
    title: "CCPA Compliant",
    text: "California Consumer Privacy Act compliance for full data transparency.",
    logo: ccpaLogo,
  },
  {
    title: "GDPR Compliant",
    text: "Your data is protected under EU General Data Protection Regulation standards.",
    logo: gdprLogo,
  },
  {
    title: "Better Business Bureau",
    text: "BBB helps consumers and businesses in the United States and Canada.",
    logo: betterLogo,
  },
];

export const PROFESSIONAL_CHAUFFEUR_FEATURES = [
  {
    title: "8+ Years Experience",
    text: "Average driving experience across our entire fleet of professional chauffeurs.",
    icon: Clock3,
  },
  {
    title: "5-Star Standards",
    text: "Rigorous training protocols ensuring premium service on every ride.",
    icon: Star,
  },
  {
    title: "Local Experts",
    text: "Deep knowledge of routes, airports, hotels, and city navigation.",
    icon: MapPin,
  },
  {
    title: "Vetted & Licensed",
    text: "Background-checked, licensed, and fully insured for your peace of mind.",
    icon: ShieldCheck,
  },
  {
    title: "Executive Etiquette",
    text: "Discretion, professionalism, and executive-level service standards.",
    icon: Award,
  },
  {
    title: "Multilingual",
    text: "Chauffeurs fluent in multiple languages for international travelers.",
    icon: Languages,
  },
];

export const PROFESSIONAL_CHAUFFEUR_MOBILE_ORDER = [
  "8+ Years Experience",
  "Local Experts",
  "Executive Etiquette",
  "5-Star Standards",
  "Vetted & Licensed",
  "Multilingual",
];

export const PROFESSIONAL_CHAUFFEUR_MOBILE_FEATURES = PROFESSIONAL_CHAUFFEUR_MOBILE_ORDER.map(
  (title) => PROFESSIONAL_CHAUFFEUR_FEATURES.find((feature) => feature.title === title)!,
);

export const LIVE_ACTIVITY_BOOKINGS = [
  { from: "YVR Airport", to: "Downtown Vancouver", vehicle: "Benz-E-Class" },
  { from: "YVR Airport", to: "Whistler", vehicle: "Benz-E-Class" },
  { from: "Pearson Airport", to: "Yorkville", vehicle: "Benz-E-Class" },
  { from: "Toronto Downtown", to: "Billy Bishop Airport", vehicle: "Elantra" },
  { from: "Vancouver Airport", to: "Downtown Vancouver", vehicle: "7 Series" },
  { from: "Toronto Downtown", to: "Billy Bishop Airport", vehicle: "Elantra" },
  { from: "Vancouver Airport", to: "Downtown Vancouver", vehicle: "Benz-E-Class" },
];

export type IncomingFlight = {
  airline: string;
  code: string;
  origin: string;
  destination: string;
  status: string;
  statusTone: string;
  icon: StaticImageData;
};

export const INCOMING_FLIGHTS: IncomingFlight[] = [
  {
    airline: "AC",
    code: "AC 101",
    origin: "Vancouver (YVR)",
    destination: "Toronto Pearson",
    status: "On Time",
    statusTone: "text-cyan-500",
    icon: vancouverIcon,
  },
  {
    airline: "CX",
    code: "CX 888",
    origin: "Hong Kong (HKG)",
    destination: "Montréal-Trudeau",
    status: "On Time",
    statusTone: "text-cyan-500",
    icon: cx888Icon,
  },
  {
    airline: "WS",
    code: "WS 620",
    origin: "Chicago (ORD)",
    destination: "Vancouver Intl",
    status: "Delayed",
    statusTone: "text-red-500",
    icon: ws520Icon,
  },
  {
    airline: "AC",
    code: "AC 101",
    origin: "Vancouver (YVR)",
    destination: "Toronto Pearson",
    status: "On Time",
    statusTone: "text-cyan-500",
    icon: ac101Icon,
  },
  {
    airline: "CX",
    code: "CX 888",
    origin: "Hong Kong (HKG)",
    destination: "Montréal-Trudeau",
    status: "Delayed",
    statusTone: "text-red-500",
    icon: cx888Icon,
  },
];

export const INCOMING_FLIGHT_DATE = "Tuesday April 12, 2026";
export const INCOMING_FLIGHT_TIME = "12:20 AM";
export const INCOMING_FLIGHT_DURATION = "01 h 50 Min";

export const SERVICES_BENTO_ITEMS: {
  title: string;
  text: string;
  icon: LucideIcon;
  href: string;
}[] = [
  {
    title: "Airport Transfers",
    text: "Seamless pickups and drop-offs at all major Canadian airports with flight tracking and meet & greet.",
    icon: Plane,
    href: "/services/airport-transfer",
  },
  {
    title: "City Rides",
    text: "Premium point-to-point rides within the city for meetings, events, or personal travel.",
    icon: Car,
    href: "/services/city-tours",
  },
  {
    title: "Hourly Chauffeur",
    text: "Book a dedicated chauffeur by the hour for meetings, shopping, or city exploration.",
    icon: Clock3,
    href: "/services/city-tours",
  },
  {
    title: "Corporate Travel",
    text: "Executive transportation solutions for businesses with priority booking and invoicing.",
    icon: Building2,
    href: "/services/corporate-travel",
  },
  {
    title: "Group Transport",
    text: "Spacious vehicles for group travel, conferences, and team events.",
    icon: Users,
    href: "/fleet",
  },
  {
    title: "Event Transport",
    text: "Weddings, galas, and special event transportation with premium vehicles.",
    icon: Shuffle,
    href: "/events",
  },
];

export type LiveActivityMarker = {
  id: string;
  x: number;
  y: number;
  delay?: number;
};

export const LIVE_ACTIVITY_MARKERS: LiveActivityMarker[] = [
  { id: "la", x: 148, y: 168, delay: 0 },
  { id: "nyc", x: 248, y: 152, delay: 0.3 },
  { id: "miami", x: 238, y: 188, delay: 0.6 },
  { id: "toronto", x: 252, y: 138, delay: 0.2 },
  { id: "vancouver", x: 168, y: 128, delay: 0.5 },
  { id: "mexico", x: 198, y: 198, delay: 0.8 },
  { id: "saopaulo", x: 318, y: 268, delay: 0.4 },
  { id: "buenos", x: 298, y: 318, delay: 1 },
  { id: "london", x: 468, y: 128, delay: 0.1 },
  { id: "paris", x: 488, y: 138, delay: 0.7 },
  { id: "lagos", x: 498, y: 218, delay: 0.9 },
  { id: "cairo", x: 548, y: 178, delay: 0.35 },
  { id: "dubai", x: 598, y: 188, delay: 0.55 },
  { id: "mumbai", x: 648, y: 198, delay: 0.25 },
  { id: "beijing", x: 738, y: 148, delay: 0.65 },
  { id: "tokyo", x: 798, y: 158, delay: 0.45 },
  { id: "sydney", x: 818, y: 288, delay: 0.75 },
  { id: "singapore", x: 718, y: 238, delay: 0.85 },
];

export const TOP_ROUTES_COUNTRIES = [
  { id: "canada", label: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
  { id: "usa", label: "USA", flag: "https://flagcdn.com/w40/us.png" },
  { id: "mexico", label: "Mexico", flag: "https://flagcdn.com/w40/mx.png" },
  { id: "uk", label: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
];

export const TOP_ROUTES_BY_COUNTRY: Record<string, string[]> = {
  canada: [
    "YVR Airport Vancouver → Downtown",
    "Toronto → Blue Mountain Resort",
    "YVR Airport Ontario → Stratford, Ontario",
    "Vancouver → Victoria (Via Ferry)",
    "Toronto → Niagara Falls",
  ],
  usa: [
    "JFK Airport → Manhattan",
    "LAX Airport → Santa Monica",
    "Miami → Fort Lauderdale",
    "Chicago Loop → O'Hare Airport",
    "Las Vegas Strip → Red Rock Canyon",
  ],
  mexico: [
    "CUN Airport → Hotel Zone",
    "Mexico City → Polanco",
    "Los Cabos Airport → Cabo San Lucas",
    "Puerto Vallarta → Sayulita",
    "Guadalajara → Tequila",
  ],
  uk: [
    "Heathrow → Central London",
    "Gatwick → Mayfair",
    "Manchester Airport → City Centre",
    "Edinburgh Airport → Old Town",
    "London → Oxford",
  ],
};

export const TOP_ROUTE_TYPES = [
  { id: "airport", title: "Airport Routes", count: "18 Routes", badge: "Most Popular", icon: Plane },
  { id: "downtown", title: "Downton Routes", count: "11 Routes", badge: "City Core", icon: Building2 },
  { id: "long-distance", title: "Long Distance", count: "5 Routes", badge: "Scenic", icon: Route },
];

export type QuickBookingCountry = { id: string; label: string; flag: string; desktopOnly?: boolean };

export const QUICK_BOOKING_COUNTRIES: QuickBookingCountry[] = [
  { id: "canada", label: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
  { id: "usa", label: "USA", flag: "https://flagcdn.com/w40/us.png" },
  { id: "mexico", label: "Mexico", flag: "https://flagcdn.com/w40/mx.png" },
  { id: "uk", label: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png", desktopOnly: true },
];

export const QUICK_BOOKING_ROUTES_BY_COUNTRY: Record<
  string,
  Array<{ from: string; to: string; fare: string; time: string }>
> = {
  canada: [
    { from: "YVR Airport", to: "Downtown Vancouver", fare: "65", time: "30 min" },
    { from: "YYZ Airport", to: "Downtown Toronto", fare: "85", time: "35 min" },
    { from: "YUL Airport", to: "Old Montreal", fare: "75", time: "28 min" },
    { from: "YYC Airport", to: "Downtown Calgary", fare: "70", time: "25 min" },
    { from: "YOW Airport", to: "Parliament Hill", fare: "68", time: "26 min" },
    { from: "YEG Airport", to: "Downtown Edmonton", fare: "72", time: "32 min" },
  ],
  usa: [
    { from: "JFK Airport", to: "Manhattan", fare: "95", time: "45 min" },
    { from: "LAX Airport", to: "Beverly Hills", fare: "110", time: "40 min" },
    { from: "ORD Airport", to: "Chicago Loop", fare: "88", time: "35 min" },
    { from: "MIA Airport", to: "Miami Beach", fare: "78", time: "30 min" },
    { from: "SFO Airport", to: "Union Square", fare: "92", time: "34 min" },
    { from: "LAS Airport", to: "The Strip", fare: "70", time: "18 min" },
  ],
  mexico: [
    { from: "MEX Airport", to: "Polanco", fare: "60", time: "35 min" },
    { from: "CUN Airport", to: "Hotel Zone", fare: "72", time: "28 min" },
    { from: "GDL Airport", to: "Centro Guadalajara", fare: "58", time: "30 min" },
    { from: "SJD Airport", to: "Cabo San Lucas", fare: "90", time: "42 min" },
    { from: "PVR Airport", to: "Zona Romantica", fare: "64", time: "25 min" },
    { from: "MTY Airport", to: "San Pedro", fare: "68", time: "32 min" },
  ],
  uk: [
    { from: "Heathrow", to: "Central London", fare: "95", time: "45 min" },
    { from: "Gatwick", to: "Mayfair", fare: "120", time: "60 min" },
    { from: "Manchester Airport", to: "City Centre", fare: "78", time: "28 min" },
    { from: "Edinburgh Airport", to: "Old Town", fare: "70", time: "25 min" },
    { from: "Birmingham Airport", to: "City Centre", fare: "74", time: "26 min" },
    { from: "Luton Airport", to: "London", fare: "115", time: "55 min" },
  ],
};

/* -------------------------------------------------------------------------- */
/* New York page                                                              */
/* -------------------------------------------------------------------------- */

export const NEW_YORK_HERO_SUBHEADLINE =
  "Premium chauffeur services for airport transfers, corporate travel, and special occasions. Professional, reliable, luxurious.";

export const NEW_YORK_FAQS: FAQItem[] = [
  {
    question: "Do you offer airport transfers in New York?",
    answer:
      "Yes. We provide private airport transfers to and from JFK, LaGuardia, Newark, and other regional airports with meet-and-greet options available.",
  },
  {
    question: "Can I book hourly chauffeur service in New York?",
    answer:
      "Yes. Hourly chauffeur service is available for meetings, shopping, sightseeing, events, and multi-stop itineraries across the city.",
  },
  {
    question: "Can you meet me at the airport?",
    answer:
      "Yes. Your chauffeur can meet you inside the terminal with a name sign and assist with luggage to your vehicle.",
  },
  {
    question: "What vehicle types are available?",
    answer:
      "We offer executive sedans, luxury SUVs, and Sprinter vans for individuals, families, and small groups.",
  },
  {
    question: "Is your service private or shared?",
    answer:
      "All rides are private. Your vehicle is reserved exclusively for you and your party with no shared pickups.",
  },
  {
    question: "Do you support event transportation?",
    answer:
      "Yes. We handle weddings, concerts, corporate events, dinners, and private celebrations with tailored pickup schedules.",
  },
  {
    question: "Are tips included in the fare?",
    answer:
      "Your quoted fare is transparent. Gratuity policies are shared during booking so you know the total before you ride.",
  },
  {
    question: "What happens if my flight is delayed?",
    answer:
      "We monitor flight status and adjust pickup timing automatically. Your chauffeur will be ready when you land.",
  },
  {
    question: "Can I request a specific vehicle?",
    answer:
      "Yes. You can request a preferred vehicle category or model based on availability when you book.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 24 hours ahead for airport transfers. Same-day requests are accepted when capacity allows.",
  },
  {
    question: "Exercitation veniam consequat sunt nostrud amet",
    answer:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
];

export const DESTINATION_STATS = [
  { value: "1200+", label: "Rides Completed" },
  { value: "180+", label: "Daily Active Fleet" },
  { value: "23", label: "Cities Covered" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "93.8%", label: "On-Time Arrival" },
  { value: "24/7", label: "Support" },
];

export type PopularRouteCard = {
  id: string;
  from: string;
  to: string;
  image: StaticImageData;
};

export const NEW_YORK_POPULAR_ROUTES: PopularRouteCard[] = [
  { id: "yvr-downtown", from: "YVR Airport", to: "Downtown Vancouver", image: popu1 },
  { id: "ny-toronto", from: "New York", to: "Downtown Toronto", image: popu2 },
  { id: "ny-times-square", from: "New York", to: "Times Square", image: popu3 },
  { id: "ny-harry-reid", from: "New York", to: "Harry Reid International", image: popu4 },
];

export const NEW_YORK_ARRIVE_FEATURES = [
  {
    icon: Headphones,
    title: "24/7 booking support",
    description: "Concierge level assistance at any hour",
  },
  {
    icon: Shield,
    title: "Private rides only",
    description: "Exclusive use of the vehicle for your journey",
  },
  {
    icon: Car,
    title: "Sedan, SUV, and Sprinter options",
    description: "A tailored fleet for every passenger count",
  },
  {
    icon: BadgeDollarSign,
    title: "Fast quote response",
    description: "Instant pricing for your Manhattan transit",
  },
];

export const NEW_YORK_AIRPORT_FEATURES = [
  {
    icon: Handshake,
    title: "Meet-and-greet airport service",
    description: "Professional chauffeurs welcome you at the terminal",
  },
  {
    icon: Plane,
    title: "Private airport transfers",
    description: "Direct, comfortable transportation without shared rides",
  },
  {
    icon: Car,
    title: "Premium vehicle",
    description: "Choose from executive sedans or spacious SUVs,",
  },
  {
    icon: BadgeDollarSign,
    title: "Transparent pricing",
    description: "Know your fare in advance with no surprises upon arrival",
  },
];

export const NEW_YORK_RIDE_OPTIONS = [
  {
    icon: Plane,
    title: "Airport Transfers",
    description:
      "Private pickups and drop-offs to and from JFK, LaGuardia, Newark, and nearby airports.",
  },
  {
    icon: Clock3,
    title: "Hourly Chauffeur",
    description: "Keep your chauffeur for meetings, shopping, sightseeing, events, or multiple stops.",
  },
  {
    icon: MoveRight,
    title: "One-Way Transfers",
    description: "Simple private transportation from one location to another across New York City.",
  },
  {
    icon: CalendarDays,
    title: "Event & Night Out Rides",
    description: "Arrive in style for concerts, weddings, dinners, parties, and private events.",
  },
  {
    icon: Route,
    title: "Long-Distance Rides",
    description: "From New York to nearby cities, airports, or business destinations.",
  },
  {
    icon: Users,
    title: "Group Transportation",
    description: "SUVs, vans, and Sprinters for families, guests, teams, and small groups.",
  },
];
