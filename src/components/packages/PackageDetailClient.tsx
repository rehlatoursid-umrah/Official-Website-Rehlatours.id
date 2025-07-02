/* UX: Client-side interactive wrapper for package detail features
   Handles state management for tabs, favorites, and dynamic content */
/* DESIGN: Seamless integration with server component for optimal performance */

'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Users,
  Calendar,
  MapPin,
  Hotel,
  Utensils,
  Plane,
  Check,
  X,
  Heart,
  Share2,
  Info,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Package } from '@/types/landing'
import { itineraryData, reviewsData, formatPrice } from '@/data/packages'

interface PackageDetailClientProps {
  packageData: Package
  discountPercentage: number
  packageTypeIcon: string
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'itinerary', label: 'Itinerary', icon: Calendar },
  { id: 'accommodation', label: 'Akomodasi', icon: Hotel },
  { id: 'reviews', label: 'Reviews', icon: Star },
]

export default function PackageDetailClient({
  packageData,
  discountPercentage,
  packageTypeIcon,
}: PackageDetailClientProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [isFavorite, setIsFavorite] = useState(false)
  const [showAllItinerary, setShowAllItinerary] = useState(false)
  const [showAllFeatures, setShowAllFeatures] = useState(false)

  const itinerary = itineraryData
  const reviews = reviewsData

  const getPackageTypeIcon = (type: string) => {
    switch (type) {
      case 'vip':
        return Star
      case 'premium':
        return Star
      case 'reguler':
        return Star
      default:
        return Users
    }
  }

  const PackageTypeIcon = getPackageTypeIcon(packageTypeIcon)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Content */}
      <div className="lg:col-span-2">
        {/* Package Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative h-96 rounded-2xl overflow-hidden mb-6 group"
        >
          <Image
            src={packageData.image}
            alt={packageData.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {packageData.badge && (
              <div className="bg-[#C19F50] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {packageData.badge}
              </div>
            )}
            {packageData.isBestSeller && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Best Seller
              </div>
            )}
            {packageData.isNewPackage && (
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                New Package
              </div>
            )}
          </div>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-bold">
              -{discountPercentage}%
            </div>
          )}

          {/* Actions */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300"
            >
              <Heart
                className={cn(
                  'w-5 h-5 transition-colors duration-300',
                  isFavorite ? 'text-red-500 fill-current' : 'text-gray-600',
                )}
              />
            </button>
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </motion.div>

        {/* Package Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <PackageTypeIcon className="w-5 h-5 text-[#0A7B64]" />
              <span className="text-sm font-medium text-[#0A7B64] capitalize">
                {packageData.type}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-900">{packageData.rating}</span>
              <span className="text-sm text-gray-500">({packageData.reviewCount} reviews)</span>
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{packageData.name}</h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{packageData.duration} Hari</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>
                {packageData.groupSize.min}-{packageData.groupSize.max} Jamaah
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Makkah & Madinah</span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">{packageData.description}</p>

          {/* Highlights */}
          <div className="bg-[#F4E8D0]/30 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Star className="w-5 h-5 text-[#C19F50] mr-2" />
              Highlights Paket
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {packageData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-[#0A7B64] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Tab Headers */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300',
                  activeTab === tab.id
                    ? 'bg-white text-[#0A7B64] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900',
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Yang Termasuk dalam Paket
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Hotel className="w-4 h-4 text-[#0A7B64] mr-2" />
                        Akomodasi
                      </h4>
                      <p className="text-gray-600 text-sm">{packageData.included.accommodation}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Utensils className="w-4 h-4 text-[#0A7B64] mr-2" />
                        Makanan
                      </h4>
                      <p className="text-gray-600 text-sm">{packageData.included.meals}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Plane className="w-4 h-4 text-[#0A7B64] mr-2" />
                        Transportasi
                      </h4>
                      <p className="text-gray-600 text-sm">{packageData.included.transportation}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Users className="w-4 h-4 text-[#0A7B64] mr-2" />
                        Bimbingan
                      </h4>
                      <p className="text-gray-600 text-sm">{packageData.included.guidance}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <FileText className="w-4 h-4 text-[#0A7B64] mr-2" />
                      Dokumentasi
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {packageData.included.documentation}
                    </p>

                    <h4 className="font-semibold text-gray-900 mb-3">Bonus Ekstra</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {packageData.included.extras.map((extra, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="w-3 h-3 text-[#0A7B64]" />
                          <span className="text-sm text-gray-600">{extra}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features Comparison */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Fitur & Fasilitas</h4>
                    <div className="space-y-2">
                      {packageData.features
                        .slice(0, showAllFeatures ? undefined : 4)
                        .map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                          >
                            <span className="text-sm text-gray-700">{feature.name}</span>
                            {feature.included ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        ))}
                    </div>
                    {packageData.features.length > 4 && (
                      <button
                        onClick={() => setShowAllFeatures(!showAllFeatures)}
                        className="mt-3 text-sm text-[#0A7B64] hover:text-[#0A7B64]/80 transition-colors duration-300 flex items-center space-x-1"
                      >
                        <span>
                          {showAllFeatures
                            ? 'Lihat Lebih Sedikit'
                            : `Lihat ${packageData.features.length - 4} Fitur Lainnya`}
                        </span>
                        {showAllFeatures ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'itinerary' && (
                <motion.div
                  key="itinerary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Jadwal Perjalanan {packageData.duration} Hari
                  </h3>

                  <div className="space-y-4">
                    {itinerary.slice(0, showAllItinerary ? undefined : 4).map((day) => (
                      <div
                        key={day.day}
                        className="border border-gray-200 rounded-lg p-4 hover:border-[#0A7B64]/30 transition-colors duration-300"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-[#0A7B64] rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {day.day}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{day.title}</h4>
                            <div className="text-xs text-[#C19F50] font-medium mb-3">
                              {day.highlight}
                            </div>
                            <ul className="space-y-1">
                              {day.activities.map((activity, actIndex) => (
                                <li
                                  key={actIndex}
                                  className="text-sm text-gray-600 flex items-start"
                                >
                                  <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {itinerary.length > 4 && (
                    <button
                      onClick={() => setShowAllItinerary(!showAllItinerary)}
                      className="w-full py-2 border border-[#0A7B64] text-[#0A7B64] rounded-lg hover:bg-[#0A7B64] hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>
                        {showAllItinerary
                          ? 'Lihat Lebih Sedikit'
                          : `Lihat ${itinerary.length - 4} Hari Lainnya`}
                      </span>
                      {showAllItinerary ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </motion.div>
              )}

              {activeTab === 'accommodation' && (
                <motion.div
                  key="accommodation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Akomodasi & Fasilitas</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <MapPin className="w-4 h-4 text-[#0A7B64] mr-2" />
                        Hotel Makkah
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {packageData.type === 'vip'
                          ? 'Hotel mewah 5 bintang dengan suite room'
                          : packageData.type === 'premium'
                            ? 'Hotel bintang 5 dengan view Haram'
                            : packageData.type === 'reguler'
                              ? 'Hotel bintang 4 lokasi strategis'
                              : 'Hotel bintang 3 dekat Masjidil Haram'}
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-gray-500">
                          <Check className="w-3 h-3 text-green-500 mr-1" />
                          Walking distance ke Masjidil Haram
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Check className="w-3 h-3 text-green-500 mr-1" />
                          AC & WiFi gratis
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Check className="w-3 h-3 text-green-500 mr-1" />
                          Room service 24 jam
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <MapPin className="w-4 h-4 text-[#0A7B64] mr-2" />
                        Hotel Madinah
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {packageData.type === 'vip'
                          ? 'Hotel mewah dekat Masjid Nabawi'
                          : packageData.type === 'premium'
                            ? 'Hotel bintang 5 premium'
                            : packageData.type === 'reguler'
                              ? 'Hotel bintang 4 nyaman'
                              : 'Hotel bintang 3 dekat Masjid Nabawi'}
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-gray-500">
                          <Check className="w-3 h-3 text-green-500 mr-1" />
                          Dekat dengan Masjid Nabawi
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Check className="w-3 h-3 text-green-500 mr-1" />
                          Makanan halal tersedia
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Check className="w-3 h-3 text-green-500 mr-1" />
                          Ruang sholat di hotel
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F4E8D0]/30 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Fasilitas Transportasi</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Pesawat</h5>
                        <p className="text-sm text-gray-600">
                          {packageData.type === 'vip'
                            ? 'First class flight'
                            : packageData.type === 'premium'
                              ? 'Business class flight'
                              : 'Economy class flight dengan maskapai terpercaya'}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Bus Lokal</h5>
                        <p className="text-sm text-gray-600">
                          {packageData.type === 'vip'
                            ? 'Luxury private car'
                            : packageData.type === 'premium'
                              ? 'Private bus AC'
                              : packageData.type === 'reguler'
                                ? 'Bus VIP AC'
                                : 'Bus AC yang nyaman'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Reviews Jamaah</h3>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{packageData.rating}</span>
                      <span className="text-gray-500">({packageData.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={review.avatar}
                              alt={review.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                <p className="text-xs text-gray-500">
                                  {review.location} • {review.date}
                                </p>
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      'w-3 h-3',
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300',
                                    )}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">{review.content}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#0A7B64] font-medium">
                                {review.package}
                              </span>
                              <button className="text-xs text-gray-500 hover:text-gray-700">
                                👍 Helpful ({review.helpful})
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-2 border border-[#0A7B64] text-[#0A7B64] rounded-lg hover:bg-[#0A7B64] hover:text-white transition-colors duration-300">
                    Lihat Semua Reviews
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Right Sidebar - Booking Card */}
      <div className="lg:col-span-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="sticky top-24"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            {/* Price */}
            <div className="text-center mb-6">
              {packageData.price.discounted && (
                <div className="text-sm text-gray-500 line-through mb-1">
                  {formatPrice(packageData.price.original)}
                </div>
              )}
              <div className="text-3xl font-bold text-[#0A7B64] mb-1">
                {formatPrice(packageData.price.discounted || packageData.price.original)}
              </div>
              <div className="text-sm text-gray-500">per orang</div>
              {discountPercentage > 0 && (
                <div className="inline-block bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium mt-2">
                  Hemat {discountPercentage}%
                </div>
              )}
            </div>

            {/* Departure Dates */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Pilih Jadwal Keberangkatan</h4>
              <div className="space-y-2">
                {packageData.departureSchedule.map((schedule, index) => (
                  <div
                    key={index}
                    className={cn(
                      'border rounded-lg p-3 transition-colors duration-300',
                      schedule.available
                        ? 'border-gray-200 hover:border-[#0A7B64]'
                        : 'border-gray-100 bg-gray-50',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{schedule.month}</div>
                        <div className="text-sm text-gray-600">
                          Tanggal: {schedule.dates.join(', ')}
                        </div>
                      </div>
                      <div
                        className={cn(
                          'text-xs px-2 py-1 rounded',
                          schedule.available
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-500',
                        )}
                      >
                        {schedule.available ? 'Tersedia' : 'Penuh'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Options */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Opsi Pembayaran</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">DP Minimal</span>
                  <span className="font-medium">{formatPrice(5000000)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Cicilan 6 bulan</span>
                  <span className="font-medium">0% bunga</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Lunas</span>
                  <span className="font-medium text-green-600">Diskon 2%</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full bg-[#0A7B64] hover:bg-[#0A7B64]/90 text-white py-3 text-lg font-semibold"
                asChild
              >
                <a
                  href={`https://wa.me/628123456789?text=Halo, saya tertarik dengan paket ${packageData.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.690z" />
                  </svg>
                  <span>Book via WhatsApp</span>
                </a>
              </Button>

              <Button
                variant="outline"
                className="w-full border-[#C19F50] text-[#C19F50] hover:bg-[#C19F50] hover:text-white py-3"
                asChild
              >
                <a href="tel:+628123456789" className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>Hubungi Sekarang</span>
                </a>
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2 text-center">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 text-[#0A7B64] mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Berlisensi Resmi Kemenag
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-[#0A7B64] mr-2" />
                  Garansi Uang Kembali
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Star className="w-4 h-4 text-[#0A7B64] mr-2" />
                  ISO 9001:2015 Certified
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
