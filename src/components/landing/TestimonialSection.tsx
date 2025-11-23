'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TestimonialItem } from '@/types/landing'

interface TestimonialSectionProps {
  className?: string
}

const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    name: 'Hanna Fatimah, S.Gz, M.Gz.',
    location: 'Bekasi',
    rating: 5,
    content: `
Umroh backpacker di Rehlatours benar-benar fleksibel dan bikin nagih! Semua diurus tim profesional—mulai tiket, hotel, sampai visa. Nikmatin city tour, kuliner Saudi, dan transportasi lokal tanpa ribet. Pembimbingnya ramah dan berpengalaman. Mau umroh hemat atau backpacker? Pilih Rehlatours aja!
`,
    avatar: '/hana.png',
    package: 'Paket Umroh Reguler 9 Hari',
  },
  {
    id: 2,
    name: 'Bapak Mulyadi',
    location: 'Tangerang',
    rating: 5,
    content: `
Awalnya ragu, ternyata umroh backpacker bareng Rehlatours nyaman dan seru banget! Hotel, maskapai, dan layanan terorganisir, cocok untuk anak muda. Bisa city tour, wisata kuliner, dan makin banyak momen berkesan. Umroh jadi pengalaman spiritual sekaligus gaya hidup muda. Anak muda, pilih Rehlatours!
`,
    avatar: '/pakmul.png',
    package: 'Paket Umroh Premium 10 Hari',
  },
  {
    id: 3,
    name: 'Reviani Lestari, S.P',
    location: 'Bandung',
    rating: 5,
    content: `
Umroh backpacker bareng Rehlatours bikin puas! Awalnya kira fasilitas standar, ternyata semua serba profesional dan nyaman—dari tiket, hotel, sampai request itinerary bebas. Rehlatours jadi pilihan favorit untuk umroh selanjutnya!
`,
    avatar: '/revi.png',
    package: 'Paket Umroh VIP 16 Hari',
  },
  {
    id: 4,
    name: 'Muhammad Iqbal',
    location: 'Sumatera Barat',
    rating: 5,
    content: `
Rehlatours.id benar-benar amanah. Harga transparan, tidak ada biaya tersembunyi. Pelayanan ramah dan profesional. Saya sudah merekomendasikan ke keluarga dan teman-teman untuk umroh bersama Rehlatours.id.
`,
    avatar: '/iqbal.jpg',
    package: 'Paket Umroh Ekonomi 10 Hari',
  },
  {
    id: 5,
    name: 'Afif Fachry, Lc.',
    location: 'Sumatera Barat',
    rating: 5,
    content: `
Perjalanan umroh pertama saya dan keluarga berjalan dengan sempurna. Grup kecil membuat suasana lebih intim dan kekeluargaan. Pembimbing yang berpengalaman membantu kami memahami setiap ritual dengan baik.
`,
    avatar: '/afif.jpg',
    package: 'Paket Umroh Keluarga 12 Hari',
  },
]

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const x = useMotionValue(0)
  const dragProgress = useTransform(x, [-200, 0, 200], [1, 0, -1])

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [isDragging])

  const handleDragEnd = () => {
    setIsDragging(false)
    const dragValue = dragProgress.get()

    if (dragValue > 0.3) {
      setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)
    } else if (dragValue < -0.3) {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
    }

    x.set(0)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
  }

  return (
    <section
      id="testimonials"
      className={cn(
        'py-16 lg:py-24 bg-gradient-to-br from-[#F4E8D0] via-white to-[#F4E8D0] relative overflow-hidden',
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
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-[#3A0519]/10 border border-[#3A0519]/20 mb-6"
          >
            <Star className="w-4 h-4 text-[#3A0519] mr-2" />
            <span className="text-[#3A0519] text-sm font-medium">Testimoni Jamaah</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B] mb-4">
            Cerita Jamaah <span className="text-[#3A0519]">Rehlatours.id</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Jamaah telah merasakan pengalaman umroh yang tak terlupakan bersama kami.
            Dengarkan cerita mereka dan rasakan kepercayaan yang sama.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              style={{ x }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              className="flex cursor-grab active:cursor-grabbing"
              whileTap={{ cursor: 'grabbing' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex-shrink-0"
                >
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-3 gap-6">
                    {[0, 1, 2].map((offset) => {
                      const index = (currentIndex + offset) % testimonialsData.length
                      const testimonial = testimonialsData[index]
                      const isCenter = offset === 1

                      return (
                        <motion.div
                          key={testimonial.id}
                          initial={{ opacity: 0, y: 50, scale: 0.9 }}
                          animate={{
                            opacity: isCenter ? 1 : 0.7,
                            y: 0,
                            scale: isCenter ? 1 : 0.95,
                          }}
                          transition={{ duration: 0.5, delay: offset * 0.1 }}
                          className={cn(
                            'bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-500',
                            isCenter
                              ? 'shadow-2xl border-[#f7c566]/30 scale-105'
                              : 'hover:shadow-xl',
                          )}
                        >
                          <TestimonialCard testimonial={testimonial} />
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Mobile/Tablet Layout */}
                  <div className="lg:hidden">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                      <TestimonialCard testimonial={testimonialsData[currentIndex]} />
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden lg:block">
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  index === currentIndex
                    ? 'bg-[#3A0519] w-8'
                    : 'bg-gray-300 hover:bg-gray-400',
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-16 text-center"
        >
          <div className="grid grid-cols-3 gap-4 lg:gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-[#3A0519] mb-1">4.9</div>
              <div className="text-sm text-gray-600 font-medium">Rating Rata-rata</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-[#3A0519] mb-1">2,500+</div>
              <div className="text-sm text-gray-600 font-medium">Testimoni Positif</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-[#3A0519] mb-1">100%</div>
              <div className="text-sm text-gray-600 font-medium">Kepuasan Jamaah</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#f7c566]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#3A0519]/10 rounded-full blur-3xl -z-10" />
    </section>
  )
}

const TestimonialCard: React.FC<{ testimonial: TestimonialItem }> = ({ testimonial }) => {
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={cn(
              'w-4 h-4',
              index < rating ? 'text-[#f7c566] fill-current' : 'text-gray-300',
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="text-center">
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote className="w-8 h-8 text-[#f7c566] mx-auto" />
      </div>

      {/* Avatar */}
      <div className="mb-4">
        <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-full border-4 border-white shadow-lg overflow-hidden">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="flex justify-center mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Content */}
      <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>

      {/* Name and Location */}
      <div className="mb-3">
        <div className="font-bold text-[#0B0B0B] text-lg">{testimonial.name}</div>
        <div className="flex items-center justify-center text-gray-500 text-sm mt-1">
          <MapPin className="w-3 h-3 mr-1" />
          {testimonial.location}
        </div>
      </div>

      {/* Package */}
      <div className="inline-block bg-[#3A0519]/10 text-[#3A0519] text-xs font-medium px-3 py-1 rounded-full">
        {testimonial.package}
      </div>
    </div>
  )
}

export default TestimonialSection
