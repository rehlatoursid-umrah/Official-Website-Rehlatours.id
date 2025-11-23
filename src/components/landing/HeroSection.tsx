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
  title: 'Wujudkan Umroh Pertamamu, Gampang & Tenang',
  subtitle: 'Bersama Rehlatours.id',
  description:
    'Mulai umroh pertamamu dengan mudah, didampingi tim profesional dan harga bersahabat. Sudah banyak jamaah baru percaya ke Rehlatours.id. Sekarang giliran Anda!',
  primaryCTA: {
    text: 'Daftar Sekarang',
    href: '/packages',
  },
  secondaryCTA: {
    text: 'Lihat Video',
    href: '#video',
  },
  backgroundImage:
    'https://images.unsplash.com/photo-1579305796538-03268c05b65c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}

const trustIndicators = [
  { icon: Users, value: 'Layanan', label: 'Layanan penuh perhatian di setiap perjalanan.' },
  { icon: Star, value: 'Kepuasan', label: 'Kenyamanan dan respons cepat setiap saat.' },
  { icon: Calendar, value: 'Pengalaman', label: 'Tim berpengalaman, siap membimbing' },
  { icon: Shield, value: 'Kepercayaan', label: 'Proses transparan, aman, dan nyaman.' },
]

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const _y = useTransform(scrollY, [0, 800], [0, 200])
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
      {/* BACKGROUND GRADIENT — primary */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#3A0519] via-[#3A0519]/90 to-[#3A0519]/80">
        <div className="absolute inset-0 islamic-pattern opacity-20" />
      </div>

      {/* BACKGROUND IMAGE */}
      <motion.div
        style={{ y: _y, backgroundImage: `url(${heroData.backgroundImage})` }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      />

      {/* PURE DARK OVERLAY (NO WHITE) */}
      <div className="absolute inset-0 bg-black/55" />

      {/* CONTENT */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          {/* BADGE — secondary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-[#F7C566]/20 border border-[#F7C566]/40 mb-6"
          >
            <Star className="w-4 h-4 text-[#F7C566] mr-2" />
            <span className="text-[#F7C566] text-sm font-medium">#1 Travel Umroh Terpercaya</span>
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight"
          >
            {heroData.title}
          </motion.h1>

          {/* SUBTITLE — secondary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#F7C566] mb-6"
          >
            {heroData.subtitle}
          </motion.div>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {heroData.description}
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            {/* PRIMARY BUTTON — primary */}
            <Button
              size="xl"
              className="bg-[#3A0519] hover:bg-[#3A0519]/90 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
              asChild
            >
              <Link href={heroData.primaryCTA.href} className="flex items-center space-x-2">
                <span>{heroData.primaryCTA.text}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>

            {/* SECONDARY BUTTON — BG #F7C566, BORDER/TEXT/ICON #3A0519 */}
            <Button
              size="xl"
              variant="outline"
              className={cn(
                'px-8 py-4 text-lg font-semibold',
                'bg-[#F7C566]',
                'text-[#3A0519]',
                'border-2 border-[#3A0519]',
                'focus:outline-none',
                'hover:bg-[#F7C566] hover:text-[#3A0519] hover:border-[#3A0519]',
              )}
              asChild
            >
              <Link href={heroData.secondaryCTA.href} className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-[#3A0519]" />
                <span className="text-[#3A0519]">{heroData.secondaryCTA.text}</span>
              </Link>
            </Button>
          </motion.div>

          {/* TRUST INDICATORS (DARK CARDS) */}
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
                <div className="bg-black/40 rounded-2xl p-6 transition-all duration-300 hover:bg-black/55 hover:scale-105 border border-white/10">
                  <indicator.icon className="w-8 h-8 text-[#F7C566] mx-auto mb-3" />
                  <div className="text-lg lg:text-xl font-bold text-white mb-1">
                    {indicator.value}
                  </div>
                  <div className="text-sm text-gray-200 font-medium">{indicator.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection


