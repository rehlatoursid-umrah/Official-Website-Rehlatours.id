/* SHARED DATA: Package information synchronized across all components
   Used by both packages page and package detail pages for consistency */

import type { Package } from '@/types/landing'

export const brandName = 'Rehlatours.id'

export const packagesData: Record<string, Package> = {
  'ekonomi-9-hari': {
    id: 'ekonomi-9-hari',
    name: 'Umrah Subsidi Uang Saku',
    type: 'ekonomi',
    duration: 9,
    price: {
      original: 28000000,
      discounted: 27000000,
      currency: 'IDR',
    },
    image: '/subsidi.jpg',
    badge: 'Hemat',
    description:
      'Paket umrah 7 malam 6 hari dengan subsidi uang saku Rp 4.000.000 per jamaah. Standar PPIU Kemenag, bimbingan mutawwif berpengalaman, dan ziarah ke tempat-tempat bersejarah di Makkah dan Madinah.',
    highlights: [
      'Hotel dekat Masjidil Haram (walking distance)',
      'Makan 3x sehari buffet halal berkualitas',
      'Bimbingan manasik lengkap sebelum keberangkatan',
      'Transportasi AC yang nyaman selama di Arab Saudi',
      'Grup maksimal 45 orang untuk pengalaman yang lebih personal',
      'Visa umroh dan asuransi perjalanan basic',
    ],
    included: {
      accommodation: 'Tiket pesawat PP & visa Saudi',
      meals: 'Makan 3x sehari (buffet halal)',
      transportation: 'Transfer bandara + city tour Makkah & Madinah',
      guidance: 'Mutawwif / mutawwifah, panduan & manasik online',
      documentation: 'Visa umroh,Asuransi Perjalanan, passport assistance',
      extras: ['Pakaian pengenal', 'kain Ihram', 'tanda pengenal', 'Buku doa', 'Air zam-zam 5L'],
    },
    features: [
      { name: 'Hotel ★★★★ /Setaraf', included: true },
      { name: 'Makanan Berat', included: true },
      { name: 'Transfer bandara + city tour', included: true },
      { name: 'Bimbingan manasik', included: true },
      { name: 'City tour Mekkah & Madinah', included: false },
      { name: 'Visa umroh', included: false },
    ],
    departureSchedule: [
      { month: 'Februari 2026', dates: ['15', '22'], available: true },
      { month: 'Maret 2026', dates: ['8', '15', '29'], available: true },
      { month: 'April 2026', dates: ['5', '19'], available: true },
    ],
    groupSize: { min: 15, max: 45 },
    rating: 4.5,
    reviewCount: 89,
    isPopular: true,
  },

  'reguler-12-hari': {
    id: 'reguler-12-hari',
    name: 'Umrah Plus Mesir',
    type: 'reguler',
    duration: 12,
    price: {
      original: 25500000,
      discounted: 23500000,
      currency: 'IDR',
    },
    image: '/umrahmesir.jpg',
    badge: 'Terpopuler',
    description:
      'Paket umroh lengkap dengan fasilitas terbaik dan city tour yang menarik. Ideal untuk jamaah yang menginginkan pengalaman spiritual yang berkesan dengan kenyamanan maksimal.',
    highlights: [
      'Hotel bintang 4 lokasi strategis dekat Masjidil Haram',
      'City tour Madinah & Makkah dengan guide berpengalaman',
      'Grup maksimal 35 orang untuk pelayanan personal',
      'Free upgrade kamar (subject to availability)',
      'Asuransi perjalanan comprehensive',
      'Bimbingan manasik lengkap sebelum keberangkatan',
    ],
    included: {
      accommodation: 'Hotel bintang 4 dekat Masjidil Haram & Masjid Nabawi',
      meals: 'Makan 3x sehari + snack sore (buffet halal)',
      transportation: 'Bus VIP AC, pesawat ekonomi class',
      guidance: 'Pembimbing senior & ceramah harian',
      documentation: 'Visa umroh, asuransi perjalanan',
      extras: ['Tas koper premium', 'Mukena/sarung', 'Air zam-zam 10L', 'City tour'],
    },
    features: [
      { name: 'Hotel bintang 4', included: true },
      { name: 'City tour lengkap', included: true },
      { name: 'Grup kecil (max 35)', included: true },
      { name: 'Asuransi perjalanan', included: true },
      { name: 'Spa & wellness', included: false },
      { name: 'Private guide', included: false },
    ],
    departureSchedule: [
      { month: 'Februari 2024', dates: ['10', '24'], available: true },
      { month: 'Maret 2024', dates: ['10', '24'], available: true },
      { month: 'April 2024', dates: ['7', '21'], available: true },
      { month: 'Mei 2024', dates: ['5', '19'], available: false },
    ],
    groupSize: { min: 25, max: 35 },
    rating: 4.8,
    reviewCount: 156,
    isBestSeller: true,
    popularityRank: 1,
  },

  'premium-14-hari': {
    id: 'premium-14-hari',
    name: 'Umroh Premium Exclusive',
    type: 'premium',
    duration: 14,
    price: {
      original: 35000000,
      discounted: 32000000,
      currency: 'IDR',
    },
    image:
      'https://images.unsplash.com/photo-1591604157118-b94e2684f857?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    badge: 'Premium',
    description:
      'Pengalaman umroh mewah dengan hotel bintang 5 dan fasilitas premium. Nikmati kenyamanan ekstra dengan pelayanan VIP dan akses eksklusif.',
    highlights: [
      'Hotel bintang 5 premium view Masjidil Haram',
      'Private transportation untuk kenyamanan maksimal',
      'Exclusive dining experience dengan menu pilihan',
      'Personal assistant selama perjalanan',
      'Spa dan wellness treatment',
      'Shopping tour dengan personal shopper',
    ],
    included: {
      accommodation: 'Hotel bintang 5 premium view Haram',
      meals: 'Fine dining 3x sehari + afternoon tea',
      transportation: 'Private bus, business class flight',
      guidance: 'Ustadz senior & spiritual counselor',
      documentation: 'Fast track visa, premium insurance',
      extras: ['Luggage premium set', 'Prayer kit deluxe', 'Air zam-zam 20L', 'Spa treatment'],
    },
    features: [
      { name: 'Hotel bintang 5', included: true },
      { name: 'Business class flight', included: true },
      { name: 'Private transportation', included: true },
      { name: 'Personal assistant', included: true },
      { name: 'Spa & wellness', included: true },
      { name: 'Shopping tour', included: true },
    ],
    departureSchedule: [
      { month: 'Februari 2024', dates: ['12', '26'], available: true },
      { month: 'Maret 2024', dates: ['12', '26'], available: true },
      { month: 'April 2024', dates: ['9', '23'], available: false },
    ],
    groupSize: { min: 15, max: 25 },
    rating: 4.9,
    reviewCount: 73,
    isPopular: true,
  },

  'premium-14-hari-turki': {
    id: 'premium-14-hari-turki',
    name: 'Umrah Plus Turki',
    type: 'premium',
    duration: 14,
    price: {
      original: 35000000,
      discounted: 32000000,
      currency: 'IDR',
    },
    image: '/umrahturki.jpg',
    badge: 'Premium',
    description:
      'Paket umroh + Turki dengan fasilitas premium. Cocok untuk jamaah yang ingin ibadah sekaligus wisata sejarah Turki.',
    highlights: [
      'Hotel nyaman & lokasi strategis',
      'Program umroh lengkap (Makkah & Madinah)',
      'Itinerary Turki (Istanbul dan sekitarny
