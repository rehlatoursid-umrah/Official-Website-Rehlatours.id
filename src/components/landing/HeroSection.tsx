/* UX: Immediately communicate trust and spiritual journey value within 5 seconds
   Creates emotional connection through Kaaba imagery and clear conversion paths */
/* DESIGN: Fullscreen parallax background with overlay, centered content, dual prominent CTAs */

'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Star, Users, Calendar, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { HeroData } from '@/types/landing'

interface HeroSectionProps {
  className?: string
}

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
    'https://images.unsplash.com/photo-1591604157118-b94e2684f857?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}

const trustIndicators = [
  { icon: Users, value: '2,500+', label: 'Jamaah Terlayani' },
  { icon: Star, value: '4.9', label: 'Rating Kepuasan' },
  { icon: Calendar, value: '8', label: 'Tahun Pengalaman' },
  { icon: Shield, value: '100%', label: 'Terpercaya' },
]

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const _y = useTransform(scrollY, [0, 800], [0, 200])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Debug: Check if image URL is accessible
  useEffect(() => {
    const img = new window.Image()
    img.onload = () => console.log('Hero background image loaded successfully')
    img.onerror = () => console.error('Hero background image failed to load')
    img.src = heroData.backgroundImage
  }, [])

  if (!mounted) return null

  return (
    <section
      id="hero"
      className={cn(
        'relative min-h-screen pt-20 lg:pt-0 flex items-center justify-center overflow-hidden',
        className,
      )}
    >
      {/* Fallback Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0A7B64] via-[#0A7B64]/90 to-[#0A7B64]/80">
        <div className="absolute inset-0 islamic-pattern opacity-20"></div>
      </div>

      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroData.backgroundImage})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-[#C19F50]/20 border border-[#C19F50]/30 backdrop-blur-sm mb-6"
          >
            <Star className="w-4 h-4 text-[#C19F50] mr-2" />
            <span className="text-[#C19F50] text-sm font-medium">#1 Travel Umroh Terpercaya</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight"
          >
            {heroData.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#C19F50] mb-6"
          >
            {heroData.subtitle}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {heroData.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="xl"
              className="bg-[#0A7B64] hover:bg-[#0A7B64]/90 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
              asChild
            >
              <Link href={heroData.primaryCTA.href} className="flex items-center space-x-2">
                <span>{heroData.primaryCTA.text}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>

            <Button
              size="xl"
              variant="outline"
              className="border-2 border-white text-gray-900 hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm group"
              asChild
            >
              <Link href={heroData.secondaryCTA.href} className="flex items-center space-x-2">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>{heroData.secondaryCTA.text}</span>
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 hover:bg-white/20 hover:scale-105 border border-white/20">
                  <indicator.icon className="w-8 h-8 text-[#C19F50] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                    {indicator.value}
                  </div>
                  <div className="text-sm text-gray-300 font-medium">{indicator.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#C19F50]/10 rounded-full blur-xl" />
      <div className="absolute bottom-40 right-10 w-32 h-32 bg-[#0A7B64]/10 rounded-full blur-xl" />
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-white/5 rounded-full blur-lg" />
    </section>
  )
}

export default HeroSection
