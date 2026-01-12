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
      'Itinerary Turki (Istanbul dan sekitarnya)',
      'Grup kecil untuk pelayanan lebih personal',
      'Pembimbing ibadah & tour leader berpengalaman',
      'Dokumentasi dan pendampingan perjalanan',
    ],
    included: {
      accommodation: 'Hotel selama umroh & Turki (sesuai program)',
      meals: 'Makan sesuai program',
      transportation: 'Transportasi program (bus) + penerbangan sesuai itinerary',
      guidance: 'Pembimbing ibadah + tour leader',
      documentation: 'Visa umroh (sesuai kebutuhan) & asuransi (sesuai paket)',
      extras: ['Air zam-zam', 'Perlengkapan (sesuai program)'],
    },
    features: [
      { name: 'Hotel nyaman', included: true },
      { name: 'City tour Turki', included: true },
      { name: 'Bimbingan manasik', included: true },
      { name: 'Asuransi perjalanan', included: true },
      { name: 'Private guide', included: false },
      { name: 'Business class flight', included: false },
    ],
    departureSchedule: [
      { month: 'Februari 2026', dates: ['9', '23'], available: true },
      { month: 'Maret 2026', dates: ['9', '23'], available: true },
      { month: 'April 2026', dates: ['13', '27'], available: true },
    ],
    groupSize: { min: 15, max: 25 },
    rating: 4.9,
    reviewCount: 18,
    isPopular: true,
  },

  'vip-16-hari': {
    id: 'vip-16-hari',
    name: 'Umroh VIP Deluxe',
    type: 'vip',
    duration: 16,
    price: {
      original: 48000000,
      discounted: 45000000,
      currency: 'IDR',
    },
    image:
      'https://images.unsplash.com/photo-1591604157118-b94e2684f857?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    badge: 'VIP',
    description:
      'Paket umroh paling eksklusif dengan layanan VIP dan fasilitas terlengkap. Pengalaman spiritual yang tak terlupakan dengan kemewahan yang luar biasa.',
    highlights: [
      'Hotel mewah dengan suite room dan balkon view Haram',
      'First class flight experience untuk kenyamanan perjalanan',
      'Private guide & driver personal sepanjang perjalanan',
      'Akses VIP ke area khusus di Masjidil Haram',
      'Personal shopper untuk kebutuhan shopping',
      'Helicopter tour untuk pengalaman tak terlupakan',
    ],
    included: {
      accommodation: 'Hotel mewah suite room dengan balkon view Haram',
      meals: 'Fine dining & private chef service',
      transportation: 'First class flight, luxury private car',
      guidance: 'Exclusive ustadz & spiritual mentor',
      documentation: 'VIP visa processing, comprehensive insurance',
      extras: ['Designer luggage set', 'Gold prayer accessories', 'Air zam-zam 50L', 'Personal shopper'],
    },
    features: [
      { name: 'Suite room premium', included: true },
      { name: 'First class flight', included: true },
      { name: 'Private guide', included: true },
      { name: 'VIP access areas', included: true },
      { name: 'Personal shopper', included: true },
      { name: 'Helicopter tour', included: true },
    ],
    departureSchedule: [
      { month: 'Maret 2024', dates: ['5', '19'], available: true },
      { month: 'April 2024', dates: ['2', '16', '30'], available: true },
      { month: 'Mei 2024', dates: ['14', '28'], available: true },
    ],
    groupSize: { min: 8, max: 15 },
    rating: 5.0,
    reviewCount: 42,
    isNewPackage: true,
  },
}

// Convert to array for easier iteration
export const packagesArray: Package[] = Object.values(packagesData)

// Featured packages for homepage (silakan pilih mau yang mana ditampilkan)
export const featuredPackages: Package[] = [
  packagesData['reguler-12-hari'],
  packagesData['ekonomi-9-hari'],
  packagesData['premium-14-hari-turki'],
  packagesData['vip-16-hari'],
]

// Helper functions
export const getPackageById = (id: string): Package | undefined => {
  return packagesData[id]
}

export const getPackagesByType = (type: Package['type']): Package[] => {
  return packagesArray.filter((pkg) => pkg.type === type)
}

export const getPopularPackages = (): Package[] => {
  return packagesArray.filter((pkg) => pkg.isPopular || pkg.isBestSeller)
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

export const getDiscountPercentage = (original: number, discounted?: number): number => {
  if (!discounted) return 0
  return Math.round(((original - discounted) / original) * 100)
}

// Itinerary data for package details
export const itineraryData = [
  {
    day: 1,
    title: 'Keberangkatan Jakarta - Madinah',
    activities: [
      'Berkumpul di Bandara Soekarno-Hatta pukul 19.00 WIB',
      'Check-in dan briefing keberangkatan oleh tour leader',
      'Penerbangan Jakarta - Madinah (transit Jeddah)',
      'Tiba di Madinah, transfer ke hotel dengan bus AC',
      'Check-in hotel dan istirahat, persiapan ibadah',
    ],
    highlight: 'Perjalanan dimulai',
  },
  {
    day: 2,
    title: 'Ziarah Madinah - Kota Rasulullah',
    activities: [
      'Shalat Subuh berjamaah di Masjid Nabawi',
      'Ziarah Raudhah dan berdoa di makam Rasulullah SAW',
      'City tour: Masjid Quba, Jabal Uhud, dan Bir Ali',
      'Ziarah Baqi dan masjid-masjid bersejarah',
      'Kembali ke hotel dan istirahat, shalat Maghrib berjamaah',
    ],
    highlight: 'Ziarah di kota Nabi',
  },
  {
    day: 3,
    title: 'Madinah - Makkah',
    activities: [
      'Shalat Subuh dan sarapan di hotel',
      'Check-out hotel Madinah',
      'Perjalanan Madinah - Makkah dengan bus VIP (5-6 jam)',
      'Tiba di Makkah, check-in hotel',
      'Persiapan ihram dan miqat di hotel',
    ],
    highlight: 'Menuju Tanah Haram',
  },
  {
    day: 4,
    title: 'Umroh Pertama',
    activities: [
      'Persiapan mental dan spiritual untuk umroh',
      "Pelaksanaan umroh pertama: Tawaf, Sa'i, dan tahallul",
      'Istirahat di hotel setelah umroh',
      'Shalat berjamaah di Masjidil Haram',
      'Free time untuk ibadah pribadi dan tawaf sunnah',
    ],
    highlight: 'Umroh pertama',
  },
  {
    day: 5,
    title: 'City Tour Makkah',
    activities: [
      'Ziarah Jabal Rahmah dan Padang Arafah',
      'Ziarah Ghar Hira dan Jabal Thaur',
      'Kunjungi museum Makkah dan situs bersejarah',
      'Shopping di Abraj Al Bait Mall',
      'Kembali ke hotel, shalat dan istirahat',
    ],
    highlight: 'Wisata religi Makkah',
  },
  {
    day: 6,
    title: 'Ibadah di Masjidil Haram',
    activities: [
      'Shalat Subuh di Masjidil Haram',
      "Tawaf sunnah dan sa'i sunnah",
      'Kajian dan ceramah spiritual',
      "I'tikaf di Masjidil Haram",
      'Shalat Maghrib dan Isya berjamaah',
    ],
    highlight: 'Ibadah intensif',
  },
  {
    day: 7,
    title: 'Shopping dan Persiapan Pulang',
    activities: [
      'Shopping oleh-oleh di Souk Al Haramain',
      'Kunjungi toko kurma dan air zam-zam',
      'Persiapan packing dan check-out hotel',
      'Umroh terakhir sebelum kepulangan',
      'Transfer ke bandara untuk penerbangan pulang',
    ],
    highlight: 'Persiapan kepulangan',
  },
  {
    day: 8,
    title: 'Kepulangan',
    activities: [
      'Penerbangan Jeddah - Jakarta',
      'Transit di bandara (jika ada)',
      'Tiba di Bandara Soekarno-Hatta',
      'Penjemputan keluarga',
      'Pulang dengan penuh keberkahan',
    ],
    highlight: 'Kembali ke tanah air',
  },
]

// Reviews data for package details
export const reviewsData = [
  {
    id: 1,
    name: 'Ibu Siti Aminah',
    location: 'Jakarta',
    rating: 5,
    date: 'Januari 2024',
    content:
      'Alhamdulillah paket ini sangat memuaskan. Hotel dekat dengan Masjidil Haram, pelayanan tour guide sangat baik, dan city tour sangat informatif. Highly recommended untuk keluarga!',
    helpful: 12,
    package: 'Umroh Reguler Plus',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 2,
    name: 'Bapak Ahmad Rizki',
    location: 'Surabaya',
    rating: 5,
    date: 'Desember 2023',
    content:
      'Pengalaman umroh yang luar biasa. Grup kecil membuat suasana lebih intim, pembimbing sangat sabar menjelaskan. Fasilitas hotel juga sangat nyaman.',
    helpful: 8,
    package: 'Umroh Premium Exclusive',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 3,
    name: 'Ibu Fatimah',
    location: 'Bandung',
    rating: 4,
    date: 'November 2023',
    content:
      'Secara keseluruhan sangat puas. Makanan enak, transportasi nyaman. Hanya saja wifi hotel agak lambat, tapi overall excellent service!',
    helpful: 6,
    package: 'Umroh Ekonomi Hemat',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 4,
    name: 'Bapak Muhammad Yusuf',
    location: 'Medan',
    rating: 5,
    date: 'Oktober 2023',
    content:
      'Rehlatours.id benar-benar amanah. Harga transparan, tidak ada biaya tersembunyi. Bimbingan spiritual yang diberikan sangat berkesan dan membantu.',
    helpful: 15,
    package: 'Umroh VIP Deluxe',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
]
