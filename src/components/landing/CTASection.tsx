'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, MessageCircle, Clock, Shield, Users, Star, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { CTAData } from '@/types/landing'

interface CTASectionProps {
  className?: string
}

const ctaData: CTAData = {
  title: 'Jangan Tunda Niat Baikmu, Mulai Umroh Pertamamu Hari Ini!',
  subtitle: 'Penawaran Terbatas untuk Jamaah Baru',
  description:
    'Wujudkan impian ke tanah suci dengan proses mudah, bimbingan ramah, dan harga terjangkau.
     kami berkomitmen memberikan layanan jujur, transparan, dan selalu siap mendampingi setiap langkah perjalanan umroh Anda.',
  buttonText: 'Daftar Sekarang - Promo Terbatas',
  buttonHref: '#contact',
  features: [
    'Pendaftaran mudah dan dibantu tim profesional﻿',
    'Bimbingan manasik & konsultasi gratis sebelum keberangkatan',
    'Proses dokumen umroh mudah dan jelas',
    'Fleksibilitas paket sesuai kebutuhan jamaah﻿',
    'Harga transparan dan bisa konsultasi langsung﻿',
    'Cicilan 0% hingga 12 bulan tanpa bunga',
  ],
}

const urgencyFeatures = [
  {
    icon: Clock,
    text: 'Tersisa 3 Hari',
    subtext: 'Promo berakhir',
  },
  {
    icon: Users,
    text: '47 Slot Tersisa',
    subtext: 'dari 100 kuota',
  },
  {
    icon: Gift,
    text: 'Bonus Eksklusif',
    subtext: 'Senilai Rp 2.5 Juta',
  },
]

const CTASection: React.FC<CTASectionProps> = ({ className }) => {
  return (
    <section id="cta" className={cn('py-16 lg:py-24 relative overflow-hidden', className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3A0519] via-[#3A0519]/95 to-[#3A0519]/90" />
      <div className="absolute inset-0 islamic-pattern" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Urgency Indicators */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 lg:gap-8 mb-8"
        >
          {urgencyFeatures.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 flex items-center space-x-3 group hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-[#f7c566] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-5 h-5 text-[#3A0519]" />
              </div>
              <div>
                <div className="text-white font-bold text-sm lg:text-base">{feature.text}</div>
                <div className="text-gray-200 text-xs">{feature.subtext}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-[#f7c566]/20 border border-[#f7c566]/30 backdrop-blur-sm mb-6"
          >
            <Star className="w-4 h-4 text-[#f7c566] mr-2" />
            <span className="text-[#f7c566] text-sm font-medium">Promo Eksklusif Terbatas</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight max-w-4xl mx-auto"
          >
            {ctaData.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl lg:text-2xl font-semibold text-[#f7c566] mb-6"
          >
            {ctaData.subtitle}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {ctaData.description}
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-4xl mx-auto"
          >
            {ctaData.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 group hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-6 h-6 bg-[#f7c566] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[#3A0519] text-sm font-bold">✓</span>
                </div>
                <span className="text-white font-medium text-sm lg:text-base text-left">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Button
              size="xl"
              className="bg-[#f7c566] hover:bg-[#f7c566]/90 text-[#3A0519] px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl group border-2 border-[#f7c566] w-full sm:w-auto"
              asChild
            >
              <Link href={ctaData.buttonHref} className="flex items-center space-x-3">
                <span>{ctaData.buttonText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#3A0519] text-[#3A0519] hover:bg-white hover:text-[#3A0519] px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm w-full sm:w-auto"
                asChild
              >
                <Link
                  href="https://wa.me/+6283197321658"
                  className="flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#3A0519] text-[#3A0519] hover:bg-white hover:text-[#3A0519] px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm w-full sm:w-auto"
                asChild
              >
                <Link
                  href="tel:+6283197321658"
                  className="flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Center</span>
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-6 text-gray-300"
          >
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-[#f7c566]" />
              <span className="text-sm font-medium">Berlisensi Resmi Kemenag</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-[#f7c566]" />
              <span className="text-sm font-medium">Rating 4.9/5</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#f7c566]" />
              <span className="text-sm font-medium">2,500+ Jamaah Puas</span>
            </div>
          </motion.div>
        </div>

        {/* Countdown Timer Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-md mx-auto">
            <div className="text-[#f7c566] font-semibold text-sm mb-2">PROMO BERAKHIR DALAM:</div>
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { value: '02', label: 'Hari' },
                { value: '14', label: 'Jam' },
                { value: '32', label: 'Menit' },
                { value: '45', label: 'Detik' },
              ].map((time) => (
                <div key={time.label} className="bg-white/20 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white">{time.value}</div>
                  <div className="text-xs text-gray-300">{time.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-[#f7c566]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#f7c566]/10 to-white/5 rounded-full blur-3xl" />
    </section>
  )
}

export default CTASection

