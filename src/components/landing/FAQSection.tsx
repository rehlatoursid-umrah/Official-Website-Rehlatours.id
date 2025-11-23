'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, HelpCircle, Plus } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import type { FAQItem } from '@/types/landing'

interface FAQSectionProps {
  className?: string
}

const faqData: FAQItem[] = [
  {
    question: 'Bagaimana cara mendaftar umroh di Rehlatours.id?',
    answer:
      'Pendaftaran sangat mudah! Anda bisa menghubungi kami melalui WhatsApp, telepon, atau datang langsung ke kantor. Tim kami akan membantu memilihkan paket yang sesuai dengan kebutuhan dan budget Anda. Proses pendaftaran hanya membutuhkan fotokopi KTP, KK, dan foto 4x6 latar belakang putih.',
  },
  {
    question: 'Apakah ada sistem cicilan untuk pembayaran?',
    answer:
      'Ya, kami menyediakan sistem cicilan yang fleksibel mulai dari 6 bulan hingga 12 bulan. Anda cukup membayar DP minimal 5 juta rupiah, sisanya bisa dicicil hingga 1 bulan sebelum keberangkatan. Tidak ada bunga atau biaya tambahan untuk cicilan.',
  },
  {
    question: 'Apa saja yang sudah termasuk dalam paket umroh?',
    answer:
      'Paket umroh kami sudah all-inclusive meliputi: tiket pesawat PP, visa umroh, hotel bintang 4-5 dekat Masjidil Haram dan Masjid Nabawi, transportasi selama di Arab Saudi, makan 3x sehari, air zam-zam 5 liter, tas koper, buku panduan, dan pembimbing berpengalaman. Tidak ada biaya tersembunyi.',
  },
  {
    question: 'Berapa lama proses pengurusan visa umroh?',
    answer:
      'Proses pengurusan visa umroh membutuhkan waktu 14-21 hari kerja setelah dokumen lengkap diserahkan. Kami akan membantu mengurus semua dokumen yang diperlukan termasuk paspor jika belum memiliki. Tim kami berpengalaman dalam pengurusan visa sehingga tingkat approval sangat tinggi.',
  },
  {
    question: 'Apakah ada pembimbing yang mendampingi selama umroh?',
    answer:
      'Tentu saja! Setiap grup umroh didampingi oleh pembimbing (muthawwif) yang berpengalaman dan berlisensi resmi dari pemerintah Arab Saudi. Pembimbing akan membantu Anda dalam pelaksanaan manasik, memberikan ceramah spiritual, dan mendampingi 24/7 selama di tanah suci.',
  },
  {
    question: 'Bagaimana jika ada masalah kesehatan selama perjalanan?',
    answer:
      'Kami menyediakan asuransi perjalanan yang mencakup biaya pengobatan di Arab Saudi. Setiap grup juga didampingi oleh tenaga medis atau memiliki akses ke klinik terdekat. Kami bekerja sama dengan rumah sakit di Makkah dan Madinah untuk memberikan pelayanan kesehatan terbaik bagi jamaah.',
  },
]

const FAQSection: React.FC<FAQSectionProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState<string[]>(['item-0'])

  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section id="faq" className={cn('py-16 lg:py-24 bg-white relative overflow-hidden', className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <HelpCircle className="w-4 h-4 text-[#3A0519] mr-2" />
            <span className="text-[#3A0519] text-sm font-medium">
              Frequently Asked Questions
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B] mb-4">
            Pertanyaan yang <span className="text-[#3A0519]">Sering Ditanyakan</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum seputar layanan umroh kami. Jika tidak menemukan
            jawaban yang Anda cari, jangan ragu untuk menghubungi tim kami.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3A0519]/20 focus:border-[#3A0519] transition-colors duration-300"
            />
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {filteredFAQs.length > 0 ? (
              <motion.div
                key="faq-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Accordion
                  type="multiple"
                  value={openItems}
                  onValueChange={setOpenItems}
                  className="space-y-4"
                >
                  {filteredFAQs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:no-underline group [&[data-state=open]]:bg-[#3A0519]/5">
                          <div className="flex items-center justify-between w-full">
                            <span className="text-left font-semibold text-gray-900 group-hover:text-[#3A0519] transition-colors duration-300">
                              {faq.question}
                            </span>
                            <div className="ml-4 flex-shrink-0">
                              <div className="w-8 h-8 bg-[#3A0519]/10 rounded-full flex items-center justify-center group-hover:bg-[#3A0519]/20 transition-colors duration-300">
                                <Plus className="w-4 h-4 text-[#3A0519] transition-transform duration-300 group-data-[state=open]:rotate-45" />
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-600 leading-relaxed"
                          >
                            {faq.answer}
                          </motion.div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tidak ada hasil ditemukan
                </h3>
                <p className="text-gray-600">
                  Coba gunakan kata kunci yang berbeda atau hubungi tim kami untuk bantuan lebih
                  lanjut.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-16"
        >
          <div className="bg-gradient-to-br from-[#F4E8D0] to-[#F4E8D0]/80 rounded-2xl p-6 lg:p-8 text-center border border-[#f7c566]/20">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-[#0B0B0B] mb-4">
                Masih Ada Pertanyaan?
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tim customer service kami siap membantu Anda 24/7. Dapatkan konsultasi gratis dan
                jawaban langsung untuk semua pertanyaan Anda.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#3A0519] hover:bg-[#3A0519]/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  Chat WhatsApp
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#3A0519] text-[#3A0519] hover:bg-[#3A0519] hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto"
                >
                  Hubungi Telepon
                </motion.button>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>📞 Call Center: (021) 123-4567</p>
                <p>📱 WhatsApp: +62 812-3456-7890</p>
                <p>⏰ Layanan 24 Jam Setiap Hari</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#f7c566]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#3A0519]/5 rounded-full blur-3xl -z-10" />
    </section>
  )
}

export default FAQSection
