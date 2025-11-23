/* UX: Comprehensive package detail page with all information needed for booking decision
   Builds trust through detailed itinerary, transparent pricing, and customer reviews */
/* DESIGN: Hero section with package image, detailed tabs, pricing sidebar, and booking CTAs */

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import { packagesData, formatPrice, getDiscountPercentage } from '@/data/packages'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import PackageDetailClient from '@/components/packages/PackageDetailClient'
import type { Metadata } from 'next'

interface PackageDetailPageProps {
  params: Promise<{ id: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PackageDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const packageData = packagesData[id]

  if (!packageData) {
    return {
      title: 'Package Tidak Ditemukan - Rehlatours.id',
      description: 'Paket umroh yang Anda cari tidak dapat ditemukan.',
    }
  }

  const basePrice = formatPrice(packageData.price.discounted || packageData.price.original)

  return {
    title: `${packageData.name} - ${basePrice} | Rehlatours.id Umroh Terpercaya`,
    description: `${packageData.description} Durasi ${packageData.duration} hari dengan rating ${packageData.rating}/5 dari ${packageData.reviewCount} reviews. ${packageData.highlights.slice(0, 2).join(', ')}.`,
    keywords: [
      'umroh',
      'umroh murah',
      'travel umroh',
      'paket umroh',
      packageData.type,
      `umroh ${packageData.duration} hari`,
      'makkah',
      'madinah',
      'rehlatours.id',
    ],
    openGraph: {
      title: `${packageData.name} - ${basePrice}`,
      description: packageData.description,
      images: [
        {
          url: packageData.image,
          width: 1200,
          height: 630,
          alt: packageData.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${packageData.name} - ${basePrice}`,
      description: packageData.description,
      images: [packageData.image],
    },
  }
}

// Using shared data from centralized packages data file

// Generate static params for all packages
export async function generateStaticParams() {
  return Object.keys(packagesData).map((id) => ({
    id: id,
  }))
}

// Using shared data from centralized packages data file

export default async function PackageDetailPage(props: PackageDetailPageProps) {
  const params = await props.params

  const packageData = packagesData[params.id]

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Package tidak ditemukan</h1>
          <p className="text-gray-600 mb-6">
            Maaf, paket umroh yang Anda cari tidak dapat ditemukan.
          </p>
          <Link
            href="/packages"
            className="inline-flex items-center space-x-2 bg-[#0A7B64] text-white px-6 py-3 rounded-lg hover:bg-[#0A7B64]/90 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Packages</span>
          </Link>
        </div>
      </div>
    )
  }

  const discountPercentage = getDiscountPercentage(
    packageData.price.original,
    packageData.price.discounted,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-20 pb-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#0A7B64] transition-colors duration-300">
              Home
            </Link>
            <span>/</span>
            <Link href="/packages" className="hover:text-[#0A7B64] transition-colors duration-300">
              Packages
            </Link>
            <span>/</span>
            <span className="text-gray-900">{packageData.name}</span>
          </div>
        </div>
      </div>

      {/* Package Details Content */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/packages"
            className="inline-flex items-center space-x-2 text-[#0A7B64] hover:text-[#0A7B64]/80 mb-6 group transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Kembali ke Packages</span>
          </Link>

          <PackageDetailClient
            packageData={packageData}
            discountPercentage={discountPercentage}
            packageTypeIcon={packageData.type}
          />
        </div>
      </section>

      {/* Related Packages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Paket Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(packagesData)
              .filter((pkg) => pkg.id !== packageData.id)
              .slice(0, 3)
              .map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="text-xl font-bold text-[#0A7B64] mb-4">
                      {formatPrice(pkg.price.discounted || pkg.price.original)}
                    </div>
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="block w-full bg-[#0A7B64] hover:bg-[#0A7B64]/90 text-white text-center py-2 rounded-lg font-semibold transition-colors duration-300"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
