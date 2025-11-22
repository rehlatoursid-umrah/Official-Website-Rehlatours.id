"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, MapPin, Clock, Heart, Award, ArrowRight, CheckCircle } from 'lucide-react'
import { cn } from "@/lib/utils"
import type { FeatureItem } from "@/types/landing"

interface FeatureSectionProps {
  className?: string
}

const featuresData: FeatureItem[] = [
  {
    title: "Bimbingan Spiritual Lengkap",
    description: "Tim pembimbing berpengalaman mendampingi perjalanan ibadah Anda dengan materi spiritual yang komprehensif dan bimbingan manasik yang detail.",
    icon: "Heart",
    color: "from-[#3A0519] to-[#3A0519]/80",
  },
  {
    title: "Akomodasi Premium",
    description: "Hotel bintang 4-5 di lokasi strategis dekat Masjidil Haram dan Masjid Nabawi dengan fasilitas modern dan pelayanan terbaik.",
    icon: "MapPin",
    color: "from-[#3A0519] to-[#3A0519]/80",
  },
  {
    title: "Jaminan Keamanan",
    description: "Perjalanan yang aman dengan asuransi lengkap, dokumentasi resmi, dan sistem keamanan 24/7 untuk ketenangan pikiran Anda.",
    icon: "Shield",
    color: "from-[#3A0519] to-[#3A0519]/80",
  },
  {
    title: "Grup Kecil Eksklusif",
    description: "Maksimal 45 jamaah per grup untuk pelayanan yang lebih personal, perhatian khusus, dan kekeluargaan yang erat selama perjalanan.",
    icon: "Users",
    color: "from-[#3A0519] to-[#3A0519]/80",
  },
  {
    title: "Fleksibilitas Jadwal",
    description: "Berbagai pilihan keberangkatan sepanjang tahun dengan durasi 9-16 hari sesuai kebutuhan dan kesempatan Anda.",
    icon: "Clock",
    color: "from-[#3A0519] to-[#3A0519]/80",
  },
  {
    title: "Sertifikat Resmi",
    description: "Bersertifikat resmi Kementerian Agama dan IATA dengan track record pelayanan umroh terpercaya sejak tahun 2015.",
    icon: "Award",
    color: "from-[#3A0519] to-[#3A0519]/80",
  },
]

const iconComponents = {
  Heart,
  MapPin,
  Shield,
  Users,
  Clock,
  Award,
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ className }) => {
  return (
    <section
      id="features"
      className={cn(
        "py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden",
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
          className="text-center mb-12 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-[#3A0519]/10 border border-[#3A0519]/20 mb-6"
          >
            <CheckCircle className="w-4 h-4 text-[#3A0519] mr-2" />
            <span className="text-[#3A0519] text-sm font-medium">
              Keunggulan ZeenTravel
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B] mb-4">
            Mengapa Memilih{" "}
            <span className="text-[#3A0519]">ZeenTravel?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pengalaman umroh yang tak terlupakan dengan standar pelayanan internasional
            dan sentuhan personal yang membuat perjalanan spiritual Anda sempurna.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuresData.map((feature, index) => {
            const IconComponent =
              iconComponents[feature.icon as keyof typeof iconComponents]
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#3A0519]/20 h-full overflow-hidden">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3A0519]/5 to-[#3A0519]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div
                      className={cn(
                        "w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg",
                        `bg-gradient-to-br ${feature.color}`,
                      )}
                    >
                      <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl lg:text-2xl font-bold text-[#0B0B0B] mb-4 group-hover:text-[#3A0519] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    {/* Learn More Link */}
                    <div className="flex items-center text-[#3A0519] font-semibold group-hover:text-[#f7c566] transition-colors duration-300">
                      <span className="text-sm">Pelajari Lebih Lanjut</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#3A0519]/10 to-transparent rounded-full group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-[#3A0519]/10 to-transparent rounded-full group-hover:scale-150 transition-transform duration-700" />

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl lg:rounded-3xl border-2 border-transparent group-hover:border-[#3A0519]/20 transition-colors duration-500" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-20"
        >
          <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
              {/* Left Content */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#0B0B0B] mb-4">
                  Komitmen Kami untuk{" "}
                  <span className="text-[#3A0519]">Pelayanan Terbaik</span>
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Setiap detail perjalanan umroh Anda direncanakan dengan cermat oleh tim berpengalaman.
                  Dari persiapan dokumen hingga kepulangan, kami pastikan perjalanan spiritual Anda berjalan lancar dan berkesan.
                </p>
                <div className="space-y-3">
                  {[
                    "Konsultasi gratis sebelum keberangkatan",
                    "Pendampingan 24/7 selama di tanah suci",
                    "Garansi kepuasan atau uang kembali",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-[#3A0519] flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right CTA */}
              <div className="text-center lg:text-right">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#3A0519] to-[#3A0519]/90 hover:from-[#3A0519]/90 hover:to-[#3A0519] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-lg w-full lg:w-auto"
                >
                  Konsultasi Sekarang
                </motion.button>
                <p className="text-sm text-gray-500 mt-3">
                  Gratis & tanpa komitmen
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#3A0519]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#3A0519]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#3A0519]/3 to-[#3A0519]/3 rounded-full blur-3xl -z-10" />
    </section>
  )
}

export default FeatureSection
