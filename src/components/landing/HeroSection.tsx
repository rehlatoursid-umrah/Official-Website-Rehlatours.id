/* HERO SECTION — WARNA SUDAH DISESUAIKAN */
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Star, Users, Calendar, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { HeroData } from '@/types/landing'

const PRIMARY = '#0A7B64'
const SECONDARY = '#C19F50'

const heroData: HeroData = {
  title: 'Wujudkan Impian Umroh Anda',
  subtitle: 'Bersama ZeenTravel',
  description:
    'Nikmati perjalanan spiritual yang tak terlupakan dengan pelayanan terbaik, bimbingan profesional, dan harga terjangkau. Telah dipercaya ribuan jamaah sejak 2015.',
  primaryCTA: {
    text: 'Daftar Sekarang',
    href: '/packages',
  },
  secondaryCTA: {
    text: 'Lihat Video',
    href: '#video',
  },
  backgroundImage:
    'https://images.unsplash.com/photo-1591604157118-b94e2684f857?q=80&w=2070&auto=format&fit=crop',
}

const trustIndicators = [
  { icon: Users, value: '2,500+', label: 'Jamaah Terlayani' },
  { icon: Star, value: '4.9', label: 'Rating Kepuasan' },
  { icon: Calendar, value: '8', label: 'Tahun Pengalaman' },
  { icon: Shield, value: '100%', label: 'Terpercaya' },
]

const HeroSection = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <section
      id="hero"
      className={cn(
        'relative min-h-screen pt-20 lg:pt-0 flex items-center justify-center overflow-hidden',
        className,
      )}
    >
      {/* Primary Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to bottom right, ${PRIMARY}, ${PRIMARY}CC)`,
        }}
      />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroData.backgroundImage})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full mb-6"
          style={{
            background: `${SECONDARY}20`,
            border: `1px solid ${SECONDARY}55`,
          }}
        >
          <Star className="w-4 h-4 mr-2" style={{ color: SECONDARY }} />
          <span className="text-sm font-medium" style={{ color: SECONDARY }}>
            #1 Travel Umroh Terpercaya
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
          {heroData.title}
        </h1>

        {/* Subtitle */}
        <div
          className="text-3xl font-semibold mb-6"
          style={{ color: SECONDARY }}
        >
          {heroData.subtitle}
        </div>

        {/* Description */}
        <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
          {heroData.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button
            size="xl"
            className="text-white px-8 py-4 text-lg font-semibold shadow-lg hover:scale-105 transition"
            style={{
              backgroundColor: PRIMARY,
            }}
            asChild
          >
            <Link href={heroData.primaryCTA.href}>
              <span>{heroData.primaryCTA.text}</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>

          <Button
            size="xl"
            variant="outline"
            className="border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-black transition"
            asChild
          >
            <Link href={heroData.secondaryCTA.href}>
              <Play className="w-5 h-5 mr-2" />
              <span>{heroData.secondaryCTA.text}</span>
            </Link>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustIndicators.map((item) => (
            <div
              key={item.label}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-center border border-white/20"
            >
              <item.icon className="w-8 h-8 mx-auto mb-3" style={{ color: SECONDARY }} />
              <div className="text-3xl font-bold text-white">{item.value}</div>
              <div className="text-gray-300 text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
