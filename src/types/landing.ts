export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  backgroundImage: string;
}

export interface StatItem {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  color?: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  location: string;
  rating: number;
  content: string;
  avatar: string;
  package: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CTAData {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  features: string[];
  backgroundImage?: string;
}

export interface FooterSection {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
}

// Package Types
export interface PackageFeature {
  name: string;
  included: boolean;
}

export interface PackageIncluded {
  accommodation: string;
  meals: string;
  transportation: string;
  guidance: string;
  documentation: string;
  extras: string[];
}

export interface Package {
  id: string;
  name: string;
  type: 'ekonomi' | 'reguler' | 'premium' | 'vip' | 'executive';
  duration: number; // days
  price: {
    original: number;
    discounted?: number;
    currency: string;
  };
  image: string;
  badge?: string;
  description: string;
  highlights: string[];
  included: PackageIncluded;
  features: PackageFeature[];
  departureSchedule: {
    month: string;
    dates: string[];
    available: boolean;
  }[];
  groupSize: {
    min: number;
    max: number;
  };
  rating: number;
  reviewCount: number;
  popularityRank?: number;
  isPopular?: boolean;
  isBestSeller?: boolean;
  isNewPackage?: boolean;
}

export interface PackageCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  packages: Package[];
}
