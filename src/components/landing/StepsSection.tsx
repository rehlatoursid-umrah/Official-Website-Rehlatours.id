/* UX: Guides users through 4 clear, actionable steps for booking Umrah, building trust and reducing friction. */
/* DESIGN: Responsive, accessible 4-step flow using Umrah design system colors, shadcn/ui Cards & Buttons, smooth Framer Motion animations. */

'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, FileText, CreditCard, Plane, ArrowRight, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepItem {
  number: number
  title: string
  description: string
  icon: keyof typeof iconComponents
}

interface StepsSectionProps {
  className?: string
}

const stepsData: StepItem[] = [
  {
    number: 1,
    title: 'Konsultasi Gratis',
    description:
      'Hubungi tim ahli kami untuk mendapatkan informasi lengkap tentang paket umroh yang sesuai kebutuhan dan budget Anda.',
    icon: 'MessageCircle',
  },
  {
    number: 2,
    title: 'Pilih Paket',
    description:
      'Tentukan paket umroh terbaik dari berbagai pilihan yang tersedia dengan fasilitas dan harga yang transparan.',
    icon: 'FileText',
  },
  {
    number: 3,
    title: 'Pembayaran',
    description:
      'Lakukan pembayaran dengan sistem cicilan yang fleksibel dan aman melalui berbagai metode pembayaran.',
    icon: 'CreditCard',
  },
  {
    number: 4,
    title: 'Berangkat',
    description:
      'Siap berangkat dengan persiapan lengkap, dokumentasi lengkap, dan bimbingan spiritual dari tim berpengalaman.',
    icon: 'Plane',
  },
]

const iconComponents = {
  MessageCircle,
  FileText,
  CreditCard,
  Plane,
}

export default function StepsSection({ className }: StepsSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="steps"
      className={cn('py-12 md:py-20 bg-[#F4E8D0] relative overflow-hidden', className)}
      aria-labelledby="steps-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-[#3A0519]/10 border border-[#3A0519]/20 mb-5"
            aria-label="Proses Mudah & Terpercaya"
          >
            <CheckCircle className="w-4 h-4 text-[#3A0519] mr-2" />
            <span className="text-[#3A0519] text-sm font-medium">
              Proses Mudah & Terpercaya
            </span>
          </motion.div>
          <h2
            id="steps-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B0B0B] mb-3"
          >
            Langkah Mudah Menuju{' '}
            <span className="text-[#3A0519]">Tanah Suci</span>
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Hanya 4 langkah sederhana untuk mewujudkan impian umroh Anda. Proses yang transparan dan
            mudah dipahami dari awal hingga keberangkatan.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop Steps */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {stepsData.map((step, idx) => {
              const Icon = iconComponents[step.icon]
              return (
                <div key={step.number} className="relative flex flex-col items-center">
                  {/* Connecting Line */}
                  {idx < stepsData.length - 1 && (
                    <motion.div
                      initial={shouldReduceMotion ? false : { scaleX: 0 }}
                      whileInView={shouldReduceMotion ? {} : { scaleX: 1 }}
                      transition={{ duration: 0.7, delay: 0.3 + idx * 0.15 }}
                      viewport={{ once: true }}
                      className="absolute top-16 left-full w-12 h-1 bg-gradient-to-r from-[#3A0519] to-[#f7c566] origin-left z-10"
                      aria-hidden="true"
                    />
                  )}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.12,
                      ease: 'easeOut',
                    }}
                    viewport={{ once: true }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                    className="w-full"
                  >
                    <Card
                      className={cn(
                        'relative bg-white rounded-2xl p-6 shadow-md border border-[#f7c566]/10 group transition-all duration-300 cursor-pointer',
                        'hover:shadow-lg hover:border-[#f7c566]/30',
                      )}
                      tabIndex={0}
                      aria-label={`Langkah ${step.number}: ${step.title}`}
                    >
                      {/* Step Number */}
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#3A0519] to-[#3A0519]/80 rounded-xl text-white font-bold text-lg mb-4 shadow">
                        {step.number}
                      </div>
                      {/* Icon */}
                      <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#f7c566]/10 to-[#f7c566]/20 rounded-xl mb-4">
                        <Icon className="w-7 h-7 text-[#3A0519]" aria-hidden="true" />
                      </div>
                      {/* Content */}
                      <CardContent className="p-0">
                        <h3 className="text-lg font-semibold text-[#0B0B0B] mb-2 group-hover:text-[#3A0519] transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              )
            })}
          </div>
          {/* Mobile/Tablet Steps */}
          <div className="lg:hidden flex flex-col gap-6">
            {stepsData.map((step, idx) => {
              const Icon = iconComponents[step.icon]
              return (
                <div key={step.number} className="relative">
                  {/* Connecting Line */}
                  {idx < stepsData.length - 1 && (
                    <motion.div
                      initial={shouldReduceMotion ? false : { scaleY: 0 }}
                      whileInView={shouldReduceMotion ? {} : { scaleY: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 + idx * 0.12 }}
                      viewport={{ once: true }}
                      className="absolute left-7 top-full w-1 h-8 bg-gradient-to-b from-[#3A0519] to-[#f7c566] origin-top z-10"
                      aria-hidden="true"
                    />
                  )}
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.09,
                      ease: 'easeOut',
                    }}
                    viewport={{ once: true }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  >
                    <Card
                      className={cn(
                        'flex items-start gap-4 bg-white rounded-xl p-5 shadow border border-[#f7c566]/10 group transition-all duration-300 cursor-pointer',
                        'hover:shadow-lg hover:border-[#f7c566]/30',
                      )}
                      tabIndex={0}
                      aria-label={`Langkah ${step.number}: ${step.title}`}
                    >
                      {/* Step Number & Icon */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#3A0519] to-[#3A0519]/80 rounded-xl flex items-center justify-center text-white font-bold text-base shadow">
                          {step.number}
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-br from-[#f7c566]/20 to-[#f7c566]/30 rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#3A0519]" aria-hidden="true" />
                        </div>
                      </div>
                      {/* Content */}
                      <CardContent className="p-0 flex-1">
                        <h3 className="text-base font-semibold text-[#0B0B0B] mb-1 group-hover:text-[#3A0519] transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </CardContent>
                      {/* Arrow */}
                      <div className="flex-shrink-0 self-center">
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#3A0519] transition-colors duration-300" />
                      </div>
                    </Card>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>

      {/* Bottom CTA */}
<motion.div
  initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  viewport={{ once: true }}
  className="text-center mt-10 md:mt-16"
>
  <div className="bg-gradient-to-br from-[#3A0519] to-[#3A0519]/90 rounded-2xl p-7 md:p-10 text-white relative overflow-hidden">
    <div className="relative z-10">
      <h3 className="text-xl md:text-2xl font-bold mb-3">
        Siap Memulai Perjalanan Spiritual Anda?
      </h3>
      <p className="text-base md:text-lg text-gray-100 mb-5 max-w-xl mx-auto">
        Tim konsultan kami siap membantu Anda dari langkah pertama hingga kembali dengan
        penuh keberkahan.
      </p>
      <Button
        type="button"
        size="lg"
        className="bg-[#f7c566] hover:bg-[#f7c566]/90 text-[#3A0519] px-7 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl text-base md:text-lg transition-colors duration-300"
        aria-label="Mulai Konsultasi Gratis"
      >
        Mulai Konsultasi Gratis
      </Button>
    </div>
    {/* Decorative Blurs */}
    <div
      className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
      aria-hidden="true"
    />
    <div
      className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#f7c566]/20 rounded-full blur-2xl"
      aria-hidden="true"
    />
  </div>
</motion.div>
      </div>
      {/* Section Decorative Blurs */}
      <div
        className="absolute top-16 left-8 w-24 h-24 bg-[#f7c566]/10 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 right-8 w-32 h-32 bg-[#3A0519]/10 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
    </section>
  )
}
