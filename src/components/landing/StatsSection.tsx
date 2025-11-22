/* UX: Statistik utama tampil flat, seragam, mudah dibaca, membangun kepercayaan */
/* DESIGN: Flat, tanpa shadow, tanpa highlight, warna Umrah, grid responsif, animasi counter */

'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Users, Star, Calendar, MapPin, Award, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface StatItem {
  value: number
  label: string
  suffix?: string
  prefix?: string
}

interface StatsSectionProps {
  className?: string
}

const statsData: StatItem[] = [
  { value: 2500, label: 'Jamaah Terlayani', suffix: '+', prefix: '' },
  { value: 4.9, label: 'Rating Kepuasan', suffix: '/5', prefix: '' },
  { value: 8, label: 'Tahun Pengalaman', suffix: '+', prefix: '' },
  { value: 15, label: 'Paket Tersedia', suffix: '+', prefix: '' },
  { value: 100, label: 'Kepuasan Jamaah', suffix: '%', prefix: '' },
  { value: 50, label: 'Kota di Indonesia', suffix: '+', prefix: '' },
]

const statIcons = [Users, Star, Calendar, MapPin, Award, Heart]

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2.2 })
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent =
          prefix +
          (typeof value === 'number' && !Number.isInteger(value)
            ? latest.toFixed(1)
            : Math.floor(latest).toLocaleString()) +
          suffix
      }
    })
  }, [springValue, prefix, suffix, value])

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  )
}

export default function StatsSection({ className }: StatsSectionProps) {
  return (
    <section
      id="stats"
      className={cn(
        'py-14 md:py-20 bg-[#F9F7F3] relative overflow-hidden',
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B0B0B] mb-3">
            Dipercaya{' '}
            <span className="text-[#3A0519]">
              Ribuan Jamaah
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Angka-angka ini membuktikan komitmen kami dalam memberikan pelayanan
            terbaik untuk perjalanan spiritual Anda.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
          {statsData.map((stat, index) => {
            const Icon = statIcons[index]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.09,
                  ease: 'easeOut',
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
                className="group flex flex-col items-center px-4 py-7 md:py-10 rounded-xl border-2 border-[#3A0519]/20 bg-white"
              >
                <div className="mb-3 md:mb-5 flex items-center justify-center rounded-full bg-[#3A0519]/10">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#3A0519]" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-[#0B0B0B] transition-colors duration-300">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-xs md:text-sm font-semibold text-center text-gray-700 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-16"
        >
          <div className="rounded-xl border-2 border-[#3A0519]/20 bg-white px-6 py-8 md:py-10 max-w-2xl mx-auto">
            <h3 className="text-lg md:text-xl font-bold text-[#0B0B0B] mb-2">
              Bergabunglah dengan Ribuan Jamaah Lainnya
            </h3>
            <p className="text-gray-700 mb-4">
              Rasakan pengalaman umroh yang tak terlupakan bersama ZeenTravel.
            </p>
            <Button
              type="button"
              size="lg"
              className="bg-[#3A0519] hover:bg-[#3A0519]/90 text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors duration-300"
              aria-label="Konsultasi Gratis"
            >
              Konsultasi Gratis
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
