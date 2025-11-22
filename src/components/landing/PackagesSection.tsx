'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import {
  Star,
  Users,
  Calendar,
  ArrowRight,
  Check,
  Heart,
  Sparkles,
  Award,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { featuredPackages, formatPrice, getDiscountPercentage } from '@/data/packages'

interface PackagesSectionProps {
  className?: string
}

// Using shared data from centralized packages data file

const PackagesSection: React.FC<PackagesSectionProps> = ({ className }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [favoritePackages, setFavoritePackages] = useState<Set<string>>(new Set())
  const sliderRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const slidesToShow = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  }

  const maxSlides = Math.max(0, featuredPackages.length - slidesToShow.desktop)

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlides))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }

  const toggleFavorite = (packageId: string) => {
    const newFavorites = new Set(favoritePackages)
    if (newFavorites.has(packageId)) {
      newFavorites.delete(packageId)
    } else {
      newFavorites.add(packageId)
    }
    setFavoritePackages(newFavorites)
  }

  const getPackageIcon = (type: string) => {
    switch (type) {
      case 'vip':
        return Sparkles
      case 'premium':
        return Award
      case 'reguler':
        return Star
      default:
        return Users
    }
  }

  return (
    <section
      id="packages"
      ref={sectionRef}
      className={cn(
        'py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden',
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-[#3A0519]/10 border border-[#3A0519]/20 mb-6"
          >
            <TrendingUp className="w-4 h-4 text-[#3A0519] mr-2" />
            <span className="text-[#3A0519] text-sm font-medium">Paket Populer</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B] mb-4">
            Pilihan Paket <span className="text-[#3A0519]">Umroh Terbaik</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nikmati perjalanan spiritual yang tak terlupakan dengan berbagai pilihan paket yang
            sesuai kebutuhan dan budget Anda.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-4 z-10">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-4 z-10">
            <button
              onClick={nextSlide}
              disabled={currentSlide >= maxSlides}
              className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Packages Slider */}
          <div className="overflow-hidden" ref={sliderRef}>
            <motion.div
              className="flex transition-transform duration-500 ease-in-out items-stretch min-h-[600px]"
              style={{
                transform: `translateX(-${currentSlide * (100 / slidesToShow.desktop)}%)`,
              }}
            >
              {featuredPackages.map((pkg, index) => {
                const Icon = getPackageIcon(pkg.type)
                const discountPercentage = getDiscountPercentage(
                  pkg.price.original,
                  pkg.price.discounted,
                )

                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="w-full lg:w-1/3 flex-shrink-0 px-3 flex h-full"
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 flex flex-col h-full w-full">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden flex-shrink-0">
                        <Image
                          src={pkg.image}
                          alt={pkg.name}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Badges */}
                        <div className="absolute top-4 left-4">
                          {pkg.badge && (
                            <div className="bg-[#f7c566] text-[#3A0519] px-3 py-1 rounded-full text-sm font-semibold mb-2">
                              {pkg.badge}
                            </div>
                          )}
                          {pkg.isBestSeller && (
                            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              Best Seller
                            </div>
                          )}
                        </div>

                        {/* Discount Badge */}
                        {discountPercentage > 0 && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                            -{discountPercentage}%
                          </div>
                        )}

                        {/* Favorite Button */}
                        <button
                          onClick={() => toggleFavorite(pkg.id)}
                          className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300"
                        >
                          <Heart
                            className={cn(
                              'w-5 h-5 transition-colors duration-300',
                              favoritePackages.has(pkg.id)
                                ? 'text-red-500 fill-current'
                                : 'text-gray-600',
                            )}
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon className="w-5 h-5 text-[#3A0519]" />
                            <span className="text-sm font-medium text-[#3A0519] capitalize">
                              {pkg.type}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-semibold text-gray-900">{pkg.rating}</span>
                            <span className="text-sm text-gray-500">({pkg.reviewCount})</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3A0519] transition-colors duration-300">
                          {pkg.name}
                        </h3>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{pkg.duration} Hari</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>Max {pkg.groupSize.max}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                          {pkg.description}
                        </p>

                        {/* Highlights */}
                        <div className="mb-4">
                          <ul className="space-y-1">
                            {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                              <li
                                key={idx}
                                className="flex items-start space-x-2 text-sm text-gray-600"
                              >
                                <Check className="w-4 h-4 text-[#3A0519] mt-0.5 flex-shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                          {pkg.price.discounted && (
                            <div className="text-sm text-gray-500 line-through">
                              {formatPrice(pkg.price.original)}
                            </div>
                          )}
                          <div className="text-2xl font-bold text-[#3A0519]">
                            {formatPrice(pkg.price.discounted || pkg.price.original)}
                          </div>
                          <div className="text-sm text-gray-500">per orang</div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="space-y-3 mt-auto">
                          <Button
                            className="w-full bg-[#3A0519] hover:bg-[#3A0519]/90 text-white"
                            asChild
                          >
                            <Link
                              href={`/packages/${pkg.id}`}
                              className="flex items-center justify-center space-x-2"
                            >
                              <span>Lihat Detail</span>
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-[#f7c566] text-[#f7c566] hover:bg-[#f7c566] hover:text-[#3A0519]"
                            asChild
                          >
                            <Link
                              href={`https://wa.me/628123456789?text=Halo, saya tertarik dengan paket ${pkg.name}`}
                            >
                              Book Now
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex lg:hidden justify-center space-x-2 mt-6">
            {Array.from({ length: featuredPackages.length }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  index === currentSlide ? 'bg-[#3A0519] w-8' : 'bg-gray-300',
                )}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-[#3A0519] text-[#3A0519] hover:bg-[#3A0519] hover:text-white px-8 py-4"
            asChild
          >
            <Link href="/packages" className="flex items-center space-x-2">
              <span>Lihat Semua Paket</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#f7c566]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#3A0519]/5 rounded-full blur-3xl -z-10" />
    </section>
  )
}

export default PackagesSection
