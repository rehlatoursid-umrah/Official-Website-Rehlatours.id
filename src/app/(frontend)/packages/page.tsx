/* UX: Comprehensive packages display with filtering, comparison, and clear pricing
   Helps users find the perfect umroh package that matches their budget and preferences */
/* DESIGN: Card-based layout with filtering sidebar, clear pricing, and prominent booking CTAs */

'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Users,
  Calendar,
  Check,
  Grid3X3,
  List,
  Search,
  Heart,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Package, PackageCategory } from '@/types/landing'
import { packagesArray, formatPrice, getDiscountPercentage } from '@/data/packages'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'

const packageCategories: PackageCategory[] = [
  {
    id: 'ekonomi',
    name: 'Paket Ekonomi',
    description: 'Pilihan terjangkau dengan fasilitas standar',
    icon: 'Users',
    packages: [],
  },
  {
    id: 'reguler',
    name: 'Paket Reguler',
    description: 'Paket terpopuler dengan fasilitas lengkap',
    icon: 'Star',
    packages: [],
  },
  {
    id: 'premium',
    name: 'Paket Premium',
    description: 'Fasilitas mewah dengan hotel bintang 5',
    icon: 'Award',
    packages: [],
  },
  {
    id: 'vip',
    name: 'Paket VIP',
    description: 'Pengalaman eksklusif dengan layanan premium',
    icon: 'Sparkles',
    packages: [],
  },
]

// Using shared data from centralized packages data file

export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('popularity')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000])
  const [favoritePackages, setFavoritePackages] = useState<Set<string>>(new Set())

  const filteredPackages = useMemo(() => {
    const filtered = packagesArray.filter((pkg) => {
      const matchesCategory = selectedCategory === 'all' || pkg.type === selectedCategory
      const matchesSearch =
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = pkg.price.discounted
        ? pkg.price.discounted >= priceRange[0] && pkg.price.discounted <= priceRange[1]
        : pkg.price.original >= priceRange[0] && pkg.price.original <= priceRange[1]

      return matchesCategory && matchesSearch && matchesPrice
    })

    // Sort packages
    switch (sortBy) {
      case 'price-low':
        filtered.sort(
          (a, b) =>
            (a.price.discounted || a.price.original) - (b.price.discounted || b.price.original),
        )
        break
      case 'price-high':
        filtered.sort(
          (a, b) =>
            (b.price.discounted || b.price.original) - (a.price.discounted || a.price.original),
        )
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'duration':
        filtered.sort((a, b) => a.duration - b.duration)
        break
      case 'popularity':
      default:
        filtered.sort((a, b) => (b.popularityRank || 999) - (a.popularityRank || 999))
        break
    }

    return filtered
  }, [selectedCategory, sortBy, searchTerm, priceRange])

  const toggleFavorite = (packageId: string) => {
    const newFavorites = new Set(favoritePackages)
    if (newFavorites.has(packageId)) {
      newFavorites.delete(packageId)
    } else {
      newFavorites.add(packageId)
    }
    setFavoritePackages(newFavorites)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Header */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-[#0A7B64] to-[#0A7B64]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Paket Umroh <span className="text-[#C19F50]">ZeenTravel</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Temukan paket umroh yang sesuai dengan kebutuhan dan budget Anda. Nikmati perjalanan
              spiritual yang tak terlupakan bersama kami.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari paket umroh..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7B64]/20 focus:border-[#0A7B64]"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300',
                  selectedCategory === 'all'
                    ? 'bg-[#0A7B64] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                )}
              >
                Semua Paket
              </button>
              {packageCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300',
                    selectedCategory === category.id
                      ? 'bg-[#0A7B64] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort & View */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7B64]/20"
              >
                <option value="popularity">Terpopuler</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="duration">Durasi</option>
              </select>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 transition-colors duration-300',
                    viewMode === 'grid'
                      ? 'bg-[#0A7B64] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50',
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 transition-colors duration-300',
                    viewMode === 'list'
                      ? 'bg-[#0A7B64] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50',
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredPackages.length} Paket Ditemukan
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${sortBy}-${viewMode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={cn(
                'grid gap-6',
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1',
              )}
            >
              {filteredPackages.map((pkg, index) => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  viewMode={viewMode}
                  isFavorite={favoritePackages.has(pkg.id)}
                  onToggleFavorite={() => toggleFavorite(pkg.id)}
                  index={index}
                  formatPrice={formatPrice}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPackages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tidak ada paket ditemukan
              </h3>
              <p className="text-gray-600 mb-4">Coba ubah filter atau kata kunci pencarian Anda</p>
              <Button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchTerm('')
                  setPriceRange([0, 50000000])
                }}
                className="bg-[#0A7B64] hover:bg-[#0A7B64]/90"
              >
                Reset Filter
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

interface PackageCardProps {
  package: Package
  viewMode: 'grid' | 'list'
  isFavorite: boolean
  onToggleFavorite: () => void
  index: number
  formatPrice: (price: number) => string
}

const PackageCard: React.FC<PackageCardProps> = ({
  package: pkg,
  viewMode,
  isFavorite,
  onToggleFavorite,
  index,
  formatPrice,
}) => {
  const discountPercentage = getDiscountPercentage(pkg.price.original, pkg.price.discounted)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        'bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100',
        viewMode === 'list' ? 'flex flex-col lg:flex-row' : '',
      )}
    >
      {/* Image */}
      <div
        className={cn(
          'relative overflow-hidden',
          viewMode === 'list' ? 'lg:w-80 lg:flex-shrink-0' : 'h-56',
        )}
      >
        <Image
          src={pkg.image}
          alt={pkg.name}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Badge */}
        {pkg.badge && (
          <div className="absolute top-4 left-4 bg-[#C19F50] text-white px-3 py-1 rounded-full text-sm font-semibold">
            {pkg.badge}
          </div>
        )}

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
            -{discountPercentage}%
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300"
        >
          <Heart
            className={cn(
              'w-5 h-5 transition-colors duration-300',
              isFavorite ? 'text-red-500 fill-current' : 'text-gray-600',
            )}
          />
        </button>
      </div>

      {/* Content */}
      <div className={cn('p-6', viewMode === 'list' ? 'flex-1' : '')}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#0A7B64] transition-colors duration-300">
              {pkg.name}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{pkg.duration} Hari</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Max {pkg.groupSize.max} orang</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-900">{pkg.rating}</span>
              <span className="text-sm text-gray-500">({pkg.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">{pkg.description}</p>

        {/* Highlights */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
          <ul className="space-y-1">
            {pkg.highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-[#0A7B64] mt-0.5 flex-shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between mb-4">
          <div>
            {pkg.price.discounted && (
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(pkg.price.original)}
              </div>
            )}
            <div className="text-2xl font-bold text-[#0A7B64]">
              {formatPrice(pkg.price.discounted || pkg.price.original)}
            </div>
            <div className="text-sm text-gray-500">per orang</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex-1 bg-[#0A7B64] hover:bg-[#0A7B64]/90 text-white" asChild>
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
            className="flex-1 border-[#C19F50] text-[#C19F50] hover:bg-[#C19F50] hover:text-white"
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
    </motion.div>
  )
}
