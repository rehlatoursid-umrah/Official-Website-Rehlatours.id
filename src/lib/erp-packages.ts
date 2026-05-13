/**
 * ERP → Website Package Transformer
 * Converts ERP API package data into the Website's Package type format
 */

import type { Package } from '@/types/landing'

// Type for what comes from ERP API
export interface ERPPackageData {
  id: string
  name: string
  slug: string
  type: string
  description: string | null
  priceQuad: number
  priceTriple: number
  priceDouble: number
  priceSingle: number
  priceOriginal: number | null
  currency: string
  durationDays: number
  durationNights: number
  includes: string | null
  excludes: string | null
  hotelMakkah: string | null
  hotelMadinah: string | null
  airline: string | null
  coverImage: string | null
  badge: string | null
  highlights: string | null
  rating: number | null
  reviewCount: number | null
  isPopular: boolean
  isBestSeller: boolean
  groupSizeMin: number | null
  groupSizeMax: number | null
}

const TYPE_MAP: Record<string, Package['type']> = {
  REGULAR: 'reguler',
  VIP: 'vip',
  VVIP: 'executive',
  CUSTOM: 'premium',
}

/**
 * Transform a single ERP package into the Website Package format.
 */
export function transformERPPackage(erp: ERPPackageData): Package {
  // Parse highlights: stored as newline-separated text in ERP
  const highlights = erp.highlights
    ? erp.highlights.split('\n').filter(Boolean).map(h => h.trim())
    : ['Bimbingan manasik lengkap', 'Transportasi nyaman', 'Hotel berkualitas']

  // Parse includes text into structured format
  const includesText = erp.includes || ''
  const included = {
    accommodation: erp.hotelMakkah
      ? `Hotel ${erp.hotelMakkah}${erp.hotelMadinah ? ` & ${erp.hotelMadinah}` : ''}`
      : 'Hotel bintang 4/setaraf',
    meals: 'Makan 3x sehari (buffet halal)',
    transportation: 'Transfer bandara + city tour',
    guidance: 'Mutawwif berpengalaman',
    documentation: 'Visa umroh & asuransi perjalanan',
    extras: includesText
      ? includesText.split('\n').filter(Boolean).map(s => s.trim())
      : ['Perlengkapan umroh', 'Air zam-zam 5L'],
  }

  return {
    id: erp.slug || erp.id,
    name: erp.name,
    type: TYPE_MAP[erp.type] || 'reguler',
    duration: erp.durationDays,
    price: {
      original: erp.priceOriginal || erp.priceQuad,
      discounted: erp.priceOriginal ? erp.priceQuad : undefined,
      currency: erp.currency || 'IDR',
    },
    image: erp.coverImage || '/subsidi.jpg',
    badge: erp.badge || undefined,
    description: erp.description || `Paket umrah ${erp.durationDays} hari ${erp.durationNights} malam`,
    highlights,
    included,
    features: [
      { name: `Hotel ${erp.hotelMakkah || 'Bintang 4'}`, included: true },
      { name: 'Makan 3x sehari', included: true },
      { name: 'Transfer bandara + city tour', included: true },
      { name: 'Bimbingan manasik', included: true },
      { name: 'Visa umroh', included: true },
      { name: erp.airline ? `Pesawat ${erp.airline}` : 'Pesawat PP', included: true },
    ],
    departureSchedule: [],
    groupSize: {
      min: erp.groupSizeMin || 15,
      max: erp.groupSizeMax || 45,
    },
    rating: erp.rating || 4.5,
    reviewCount: erp.reviewCount || 0,
    isPopular: erp.isPopular,
    isBestSeller: erp.isBestSeller,
  }
}

/**
 * Transform an array of ERP packages.
 */
export function transformERPPackages(erpPackages: ERPPackageData[]): Package[] {
  return erpPackages.map(transformERPPackage)
}

/**
 * Fetch packages from ERP and return as Website Package format.
 */
export async function fetchPackagesFromERP(): Promise<Package[]> {
  const ERP_URL = process.env.ERP_API_URL || process.env.NEXT_PUBLIC_ERP_API_URL || 'http://localhost:3000'

  try {
    const res = await fetch(`${ERP_URL}/api/public/packages`, {
      next: { revalidate: 300 }, // ISR: 5 minutes
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data.success && data.packages?.length > 0) {
      return transformERPPackages(data.packages)
    }
  } catch (error) {
    console.error('[ERP Bridge] Failed to fetch packages:', error)
  }

  return [] // Return empty — fallback to static data handled by caller
}
